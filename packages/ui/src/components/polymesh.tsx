import React, { useEffect } from 'react'
import { Polymesh } from '@polymathnetwork/polymesh-sdk'

export function PolymeshTokens() {
  useEffect(() => {
    async function init() {
      const polyClient = await Polymesh.connect({
        nodeUrl: 'ws://localhost:9944',
      })
    }
    init()
  }, [])

  return <div>Polymesh</div>
}
