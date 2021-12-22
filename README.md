# Singer Project

Octopol's Singer project aims to process Live Soccer Game events & offers (Rb+Molly) and call research
models on any change in offer/odds. Research responses to Singer with requests to open PMMs (Price min/max) and Order requests for execution in Molly (PMMs - in order to receive pre-execution information, execute - in order to make money) and these requests responses coming back from Molly's underlying bookies are forwarded back to research models.

## Product wise

Resulting Product: Research model is invoked per live game, sees Rb Snapshot, Molly Offers snapshots and information from Punteam, like picks, Shotsy data etc. Research models can request PMM and execution and get
back any async response from Molly execution engine like PMMS, Bet statuses as result of Execution Orders, etc.

[Product diagram](./packages/docs/singer-research-execution-overview-10-11-2021.md)

## Overview

Signer project is made of multiple micro-services communicating together over Redis:

| Microservice                                               |              Production URL              |                                                                                                                Production Swagger / Docs |
| ---------------------------------------------------------- | :--------------------------------------: | ---------------------------------------------------------------------------------------------------------------------------------------: |
| [csm-im](./packages/csm-im/README.md)                      |    https://singer-csm-im.octopol.io/     |               [swagger](https://singer-csm-im.octopol.io/api/docs/) / [pub/sub swagger](https://singer-csm-im.octopol.io/async-api/docs) |
| [csm](./packages/csm/README.md)                            |      https://singer-csm.octopol.io/      |                     [swagger](https://singer-csm.octopol.io/api/docs/) / [pub/sub swagger](https://singer-csm.octopol.io/async-api/docs) |
| [singer-molly-crawler](./packages/molly-crawler/README.md) | https://singer-molly-crawler.octopol.io/ | [swagger](https://singer-molly-crawler.octopol.io/api/docs/) / [pub/sub swagger](https://singer-molly-crawler.octopol.io/async-api/docs) |
| [singer-rb-crawler](./packages/rb-crawler/README.md)       |  https://singer-rb-crawler.octopol.io/   |       [swagger](https://singer-rb-crawler.octopol.io/api/docs/) / [pub/sub swagger](https://singer-rb-crawler.octopol.io/async-api/docs) |
| [csm-ui](./packages/csm-ui/README.md)                      |    https://singer-csm-ui.octopol.io/     |                                                                                           [front-end](https://singer-csm-ui.octopol.io/) |

Singer connect to 2 providers: Molly & RunningBall and processes messages in Redis streams so that Singer is able to call research models based on Live Soccer Game events & odds changes.

Singer exposes all metrics to Prometheus (/metrics on each micro-service)

## Dependencies:

- Redis - Each game in Molly and each game in Running-Ball have a Redis-Stream for that Molly/Rb game betting offers / game events respectively.

- Redis - Flow_Audit - i.e: research calls requests/responses are sent over Redis-Stream.
- MS-SQL - Archiving research calls requests/responses.

rb when finished or cancelled
pf - 4h after gameStart
molly - 4h after startGame

![Build Status](https://codebuild.eu-west-1.amazonaws.com/badges?uuid=eyJlbmNyeXB0ZWREYXRhIjoiSFJFdVBSRUlkenIxMTNwaVVEM1BjN2V5VC9WYmd0Qmc5YTMwdGhPWStsYW5PNkxCNFRPMUxXdmZ0ZVhNWk55L0V0WUVreWIzcVBVc25rZzhiK2xoSzdrPSIsIml2UGFyYW1ldGVyU3BlYyI6IkQ3Z0ZVemZSR3B2ZjFtcUsiLCJtYXRlcmlhbFNldFNlcmlhbCI6MX0%3D&branch=main)

## Debug readiness and any end-point internally from a k8s pod

Connect to K8s pod, i.e: splitter, for example, like so:

kubectl exec --stdin --tty singer-splitter-0 -- sh

Install curl:

apk add curl

Run following commands:

curl -o /dev/null -s -w "%{http_code}\n" 'http://singer-csm:8080/'
curl -o /dev/null -s -w "%{http_code}\n" 'http://singer-splitter:8080/'
curl -o /dev/null -s -w "%{http_code}\n" 'http://singer-csm-im-0:8080/'
curl -o /dev/null -s -w "%{http_code}\n" 'http://singer-rb-crawler:8080/'

curl -o /dev/null -s -w "%{http_code}\n" 'http://singer-molly-crawler:8080/'
curl -o /dev/null -s -w "%{http_code}\n" 'http://singer-molly-crawler:8080/readiness'

curl http://singer-csm-im-0.singer-csm-im.default.svc.cluster.local:8080

## Singer Project Overview and Method-Of-Operandi

### Singer Overview

Singer is built to process Molly offers and Running-Ball game events in a fully-scalable manner. Since each Soccer game Singer processes is a "world" of
its own, we can divide the 100% of Soccer games that Singer processes to infinite
number of **"pools"**, where each "pool" processes a set Distinct of Soccer games. It is assumed that around 100+ Soccer games can be managed in a single pool.

### Singer Method of Operation

> Assumption:

Rb-Crawler end-point of Singer is configured on RB servers as secondary
end-point, additional to Punteam's primary end-point. Reason: to allow Punteam to register as is on Rb servers and have Singer get Rb events "automatically" through
the secondary configured end-point.

#### Rb Events

Rb events are processed by rb_crawler service which simply exposes Rest end-point accessible to Rb servers (see secondary end-point above) to publish events to. When
an event from Rb is received on the HTTP server Single publishes the event on a per
game Redis-Stream containing that game events

#### Molly Events (Offers)

molly-crawler is the service that connect to Molly WS server directly. On molly-crawler instantiation it does a REST api call to a Splitter end-point to get 2 redis stream names for registration requests and registration responses.

#### Main starting point of Singer project

Splitter is the main service under Singer. It directly queries MSSQL Stored Procedure (hereafter "SP")
that returns any change in Punteam-Fixtures. A change means, any new/re-matching etc, Shotsy or Molly Pre-game changes on a specific PF game. This call is made every so-often configured in Config.

Whenever a new PF is received from Punteam SP, Splitter requests that a registration be made by Molly crawler. It uses the 2 redis-streams which Molly-crawler acquired upon instantiation to command and control ("cc2") Molly crawler registrations.

Splitter immediately assigns that new game a specific poolId. It does so ensuring **Atomicity** using a set of LUA Redis scripts.
It then pushes that Pf to the redis-stream session topic name to the correct pool based on the pool id to which this new pf was assigned to. A specific CSM-IM processing that pool set of Soccer games is now responsible for processing of the game.

### CSM-IM - The service processing a specific _pool_ or set of Soccer games

CSM-IM instantiates and asks Splitter for a new session topic or stream name.

### Redis - Momory usage

Singer is built around Redis. It persists both pool and game related maps to Redis using LUA scripts and uses Redis-Stream to save
each specific game Molly Events and Rb Events in two streams, based on the game id or Molly event Id.
