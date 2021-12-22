import { Polymesh } from '@polymathnetwork/polymesh-sdk'

process.on('uncaughtException', error => console.log('stav1', error))
process.on('uncaughtExceptionMonitor', error => console.log('stav1', error))
process.on('unhandledRejection', error => console.log('stav1', error))

async function run() {
  const polyClient = await Polymesh.connect({
    nodeUrl: 'ws://localhost:9944',
  })

  // const array = await Promise.all([
  //   polyClient.getLatestBlock(),
  //   // p.getNetworkProperties(),
  //   // p.getSecurityToken({ticker:'ST1'}),
  //   polyClient._polkadotApi.query.system.account('2H5RtdHkbUUW4NvtCJxk1JggJW9WdEfxmpcVydjzTh1BJiPi'),
  // ])

  const keys = await polyClient._polkadotApi.query.staking.nominators.keys()
  /// / extract the first key argument [AccountId] as string
  const nominatorIds = keys.map(({ args: [nominatorId] }) => nominatorId)
  console.log('all nominators:', nominatorIds.join(', '))

  console.log(polyClient._polkadotApi.query.asset)

  const keys2 = await polyClient._polkadotApi.query.asset.classicTickers.keys()
  const stam = keys2.map(({ meta: name }) => name)
  console.log('all assets:', stam.join(', '))

  // console.log(JSON.stringify(array,null,2))

  // do stuff with the client
}

run()
