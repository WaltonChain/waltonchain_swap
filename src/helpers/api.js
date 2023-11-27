import axios from 'axios'

export const apiConfig = {
  baseURL: process.env.NODE_ENV === 'development' ? '' : '',
  timeout: 30000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
}

const api = axios.create(apiConfig)

export async function getPoolInfo() {
  const response = await api.get(`/api/pool.json?t=` + Date.now())
  return response.data
}
export async function getHomeInfo() {
  const response = await api.get(`/api/trans.json?t=` + Date.now())
  return response.data
}
export async function getBridgeRecord(account, size = 100) {
  const response = await api.get(`/bridge/query-latest-order?fromUser=${account}&size=${size}&t=` + Date.now())
  return response.data
}

export async function apiGetIndexInfo(chainId = 128) {
  const response = await api.get(`getIndexInfo?chainId=${chainId}`)
  return response.data
}

export async function apiGetLpPoolList(chainId = 128) {
  const response = await api.get(`getLpPoolList?chainId=${chainId}`)
  return response.data
}

export async function apiGetLpPool(address, chainId = 128) {
  const response = await api.get(`getLpPoolList?address=${address}&chainId=${chainId}`)
  return response.data
}

export async function apiUpdateLpPool(tvl = '--', apy = '--', lpPoolAddress, chainId = 128) {
  const response = await api.post(`updateLpPool`, { tvl, apy, lpPoolAddress, chainId })
  return response.data
}

export async function apiGetPairInfo(chainId = 128) {
  const response = await api.get(`getPairInfo?chainId=${chainId}`)
  return response.data
}

export async function apiGetVaultList(chainId = 128) {
  const response = await api.get(`getVaultList?chainId=${chainId}`)
  return response.data
}

export async function apiGetVault(address, chainId = 128) {
  const response = await api.get(`getVault?address=${address}&chainId=${chainId}`)
  return response.data
}
