import WalletConnect from '@walletconnect/client'
import QRCodeModal from '@walletconnect/qrcode-modal'
import { params } from '../config/params'
import Web3 from 'web3'
import store from '../store'

export function connectWebWallet () {
  return new Promise((resolve, reject) => {
    const winWeb3 = window.web3
    if (!winWeb3) {
      const result = {
        code: 5002,
        msg: 'No web3'
      }
      return resolve(result)
    }
    const winEtherum = window.ethereum
    if (typeof winEtherum !== 'undefined') {
      const provider = winWeb3.currentProvider || window.ethereum
      const web3 = new Web3(provider)
      web3.eth.getChainId().then((chainId) => {
        if (isNaN(Number(chainId))) {
          store.commit('Set_Wallet_State', { isWeb: true, chainId })
        }
      }).catch((err) => {
        console.log(err)
      })
      winEtherum.enable().then(accounts => {
        if (accounts.length > 0) {
          store.commit('Set_Wallet_State', { isWeb: true, web3, connected: true, address: accounts[0], accounts })
        }
        winEtherum.on('accountsChanged', (accounts) => {
          store.commit('Set_Wallet_State', { isWeb: true, web3, connected: true, address: accounts[0], accounts })
        })
        winEtherum.on('chainChanged', (network) => {
          store.commit('Set_Wallet_State', { isWeb: true, chainId: network })
        })
        winEtherum.autoRefreshOnNetworkChange = true
        const result = {
          code: 1,
          msg: 'connected',
          data: web3
        }
        resolve(result)
      }).catch(error => {
        console.log(error)
        const result = {
          code: 5001,
          msg: error.message
        }
        reject(result)
      })
    } else {
      const result = {
        code: 5000,
        msg: 'The current browser does not support plug-in wallets'
      }
      resolve(result)
    }
  })
}

export const INITIAL_STATE = {
  connector: null,
  isWeb: false,
  connected: false,
  chainId: 128,
  address: '',
  accounts: []
}

export async function connectAppWallet () {
  const bridge = 'https://bridge.walletconnect.org'
  const connector = new WalletConnect({
    bridge,
    qrcodeModal: QRCodeModal
  })
  if (!connector.connected) {
    await connector.createSession()
  }
  store.commit('Set_Wallet_State', { isWeb: false, connector: connector })
  await subscribeToEvents(connector)
}

export async function subscribeToEvents (connector) {
  if (!connector) {
    return
  }
  connector.on('session_update', async (error, payload) => {
    console.log('[session_update]:', error, payload)
    if (error) {
      throw error
    }
    const { chainId, accounts } = payload.params[0]
    store.commit('Set_Wallet_State', { isWeb: false, chainId: chainId, accounts: accounts })
    onSessionUpdate(accounts, chainId)
  })

  connector.on('connect', (error, payload) => {
    if (error) {
      throw error
    }
    onConnect(payload)
  })

  connector.on('disconnect', (error, payload) => {
    console.log('[disconnect]:', error, payload)
    if (error) {
      throw error
    }
    onDisconnect()
  })

  if (connector.connected) {
    const { chainId, accounts } = connector
    onSessionUpdate(accounts, chainId)
  }
}

export async function onSessionUpdate (accounts, chainId) {
  store.commit('Set_Wallet_State', { isWeb: false, accounts: accounts, chainId: chainId, connected: true })
}

export async function killSession (connector) {
  if (connector) {
    connector.killSession(connector)
  }
  store.commit('Set_Wallet_State', INITIAL_STATE)
}

export async function onConnect (payload) {
  const { chainId, accounts } = payload.params[0]
  const address = accounts[0]
  const web3 = new Web3(params.defaultProvider)
  store.commit('Set_Wallet_State', { isWeb: false, web3, connected: true, address, chainId, accounts })
}

export async function onDisconnect () {
  store.commit('Set_Wallet_State', INITIAL_STATE)
}
