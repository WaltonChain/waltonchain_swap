import OKBImg from '../../assets/images/bridge-token/logo_okb.png'
import BSCImg from '../../assets/images/bridge-token/logo_bsc.png'
import HECOImg from '../../assets/images/bridge-token/logo_heco.png'

export const bridgeToken = [
  {
    chainId: 65,
    logoUrl: OKBImg,
    bridgeAddress: '0xadE8b092afdA09B4e26B8EB1E1ae9bEc9377CB36',
    tokenAddress: '0xe579156f9dEcc4134B5E3A30a24Ac46BB8B01281',
    chainName: 'OKTEST',
    nativeCurrency: {
      symbol: 'OKB',
      name: 'OKB',
      decimals: 18
    },
    rpcUrls: 'https://exchaintest.okexcn.com',
    blockExplorerUrls: 'https://www.oklink.com/okexchain-test'
  },
  {
    chainId: 97,
    logoUrl: BSCImg,
    bridgeAddress: '0xE63cBE0886808db9B8502915935a3F5d0b233A31',
    tokenAddress: '0xCB0282FD4A9F4B4Deb1673f760c016A3a8D98866',
    chainName: 'BSC-TEST',
    nativeCurrency: {
      symbol: 'BNB',
      name: 'BNB',
      decimals: 18
    },
    rpcUrls: 'https://data-seed-prebsc-1-s1.binance.org:8545',
    blockExplorerUrls: 'https://testnet.bscscan.com/'
  },
  {
    chainId: 256,
    logoUrl: HECOImg,
    bridgeAddress: '0xaeAC88B2469050466D14AcD438D1Acba744ef81A',
    tokenAddress: '0x04F535663110A392A6504839BEeD34E019FdB4E0',
    chainName: 'HECO-TEST',
    nativeCurrency: {
      symbol: 'HECO',
      name: 'HECO',
      decimals: 18
    },
    rpcUrls: 'https://http-testnet.hecochain.com',
    blockExplorerUrls: 'https://scan-testnet.hecochain.com'
  }
]
