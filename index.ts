import { Polymesh,WsProvider } from '@polymathnetwork/polymesh-sdk'

process.on('uncaughtException', error => console.log("stav1",error))
process.on('uncaughtExceptionMonitor', error => console.log("stav1",error))
process.on('unhandledRejection', (error) => console.log("stav1",error))

async function run() {
  const polyClient = await Polymesh.connect({
    nodeUrl: 'ws://localhost:9944',
    accountSeed: '0xd823b46b0a74350c6d10f43075ef119c30ab8141c65a2f6a17eff6b52a8e32ed',
  })

  // @ts-ignore
  console.log("stav1",polyClient.reserveTicker)
  

  const array = await Promise.all([
    polyClient.getLatestBlock(),
    polyClient.getAccountBalance(),
    polyClient.getTickerReservations()
    
  ])

  console.log(JSON.stringify(array,null,2))

  // do stuff with the client
}

run()