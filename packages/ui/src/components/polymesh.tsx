import React, { useEffect, useState } from 'react'
import { Polymesh, Keyring } from 'fork1-polymathnetwork-polymesh-sdk'
import { web3AccountsSubscribe, web3Enable } from '@polkadot/extension-dapp'
import { InjectedExtension, InjectedAccount } from '@polkadot/extension-inject/types'

export enum NetworkName {
  pmf = 'pmf',
  alcyone = 'alcyone',
  pme = 'pme',
  local = 'local',
  itn = 'itn',
}

export type NetworkMeta = {
  name: NetworkName
  label?: string
  wssUrl: string
}

export const networkURLs: Record<string, string> = {
  mainnet: 'wss://mainnet-rpc.polymesh.network',
  testnet: 'wss://testnet-rpc.polymesh.live',
  pmf: 'wss://pmf.polymath.network',
  pme: 'wss://pme.polymath.network',
  local: 'ws://localhost:9944',
}

const missingWalletError = new Error('Please install and enable Polymesh wallet extension from Chrome store')

export type State = {
  wallet: InjectedExtension
  network: NetworkMeta
  account: InjectedAccount
  polyClientPromise: Promise<Polymesh>
}

async function initializePolyClient({
  network,
  account,
}: {
  wallet: InjectedExtension
  network: NetworkMeta
  account: InjectedAccount
}): Promise<Polymesh> {
  const keyring = new Keyring()

  keyring.addFromAddress(account.address)

  return Polymesh.connect({
    nodeUrl: networkURLs[network.name],
    // keyring,
    // // @ts-ignore
    // signer: wallet.signer,
  })
}

export function PolymeshTokens() {
  const [state, setState] = useState<State>()
  const [securityTokenIdToName, setSecurityTokenIdToName] = useState<Map<string, string>>(new Map())

  useEffect(() => {
    async function initWalletAndNetwork() {
      const extensions = await web3Enable('A dapp')

      const currentWallet = extensions.find(extension => extension.name === 'polywallet')

      if (!currentWallet) {
        throw missingWalletError
      }

      // @ts-ignore
      const currentNetwork = await currentWallet.network.get()

      // @ts-ignore
      currentWallet.network.subscribe(currentNetwork =>
        setState(prev => {
          if (!prev) {
            return
          }
          return {
            wallet: prev.wallet,
            network: currentNetwork,
            account: prev.account,
            polyClientPromise: initializePolyClient({
              wallet: prev.wallet,
              network: currentNetwork,
              account: prev.account,
            }),
          }
        }),
      )

      const accounts = await currentWallet.accounts.get()

      if (accounts.length === 0) {
        throw new Error('No accounts found in Polymesh wallet')
      }

      const [currentAccount] = accounts

      web3AccountsSubscribe(accounts => {
        if (accounts.length > 0) {
          setState(prev => {
            if (!prev) {
              return
            }
            return {
              wallet: prev.wallet,
              network: prev.network,
              account: accounts[0],
              polyClientPromise: initializePolyClient({
                wallet: prev.wallet,
                network: prev.network,
                account: accounts[0],
              }),
            }
          })
        }
      })

      setState({
        wallet: currentWallet,
        network: currentNetwork,
        account: currentAccount,
        polyClientPromise: initializePolyClient({
          wallet: currentWallet,
          network: currentNetwork,
          account: currentAccount,
        }),
      })
    }
    initWalletAndNetwork()
  }, [])

  useEffect(() => {
    const fetchSecurityTokenIdToName = async () => {
      if (!state) {
        return
      }

      const polyClient = await state.polyClientPromise

      const entires = await polyClient._polkadotApi.query.asset.assetNames.entries()

      const securityTokenIdToName = new Map(entires.map(([k, v]) => [k.toString(), v.toString()]))
      setSecurityTokenIdToName(securityTokenIdToName)

      console.log('detials', await polyClient._polkadotApi.query.asset.tokens('st2'))
    }
    const id = setInterval(fetchSecurityTokenIdToName, 10_000)

    fetchSecurityTokenIdToName()

    return () => {
      clearInterval(id)
    }
  }, [state])

  return (
    <div>
      {Array.from(securityTokenIdToName.entries()).map(([id, name], i) => (
        <div key={i}>
          id: {id}, name: {name}
        </div>
      ))}
    </div>
  )
}
