import BigNumber from 'bignumber.js'
import { multipliedBy,dividedBy, plus, sanitizeHex } from '../helpers/util'
import { convertStringToHex } from '../helpers/bignumber'
import { getTokenPriceFromMdex } from './home'
const events = require('events')
const abiJson = require('../config/abi.json')
export const pendingEvent = new events.EventEmitter()

// Get allownce
export function getAllownce(walletState,vault) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        const lpt = new walletState.web3.eth.Contract(abiJson.lpAbi, vault.lpAddress); // vault erc20 token contract instance
        let allowance = await lpt.methods.allowance(walletState.address, vault.vaultAddress).call();
        allowance = dividedBy(allowance, Math.pow(10, 18))
        return resolve({
            code: 1,
            msg: 'success',
            data: allowance
        })
    }).catch((err) => {
        return {
            code: -1,
            msg: err.message
        }
    })
}
// Get balance
export function getBalance(walletState,vault) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        const lpt = new walletState.web3.eth.Contract(abiJson.lpAbi, vault.lpAddress); // vault erc20 token contract instance
        let balance = await lpt.methods.balanceOf(walletState.address).call();
        // console.log('balance',balance);
        balance = dividedBy(balance, Math.pow(10, 18));
        return resolve({
            code: 1,
            msg: 'success',
            data: balance
        })
    }).catch((err) => {
        return {
            code: -1,
            msg: err.message
        }
    })
}

// approve
export function approve(walletState,vault) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        const lpt = new walletState.web3.eth.Contract(abiJson.lpAbi, vault.lpAddress); // vault erc20 token contract instance
        const approveAmount ="0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        switch (walletState.isWeb) {
            case true:
                lpt.methods.approve(vault.vaultAddress, approveAmount).send({
                    from: walletState.address
                }).once('transactionHash', function (hash) {
                    pendingEvent.emit('pending')
                    console.log(hash)
                }).once('receipt', function (receipt) {
                    resolve({
                        code: 1,
                        msg: 'success',
                        data: receipt.transactionHash
                    })
                }).once('error', function (error) {
                    reject(error)
                })
                break;
            case false:
                const nonce = await walletState.web3.eth.getTransactionCount(walletState.address)
                const _nonce = convertStringToHex(nonce)
                const encodeABI = lpt.methods.approve(vault.vaultAddress, approveAmount).encodeABI()
                const tx = {
                    nonce: sanitizeHex(_nonce),
                    from: walletState.address,
                    to: vault.lpAddress,
                    data: encodeABI
                }
                walletState.connector.sendTransaction(tx)
                    .then((txHash) => {
                        resolve({
                            code: 1,
                            msg: 'success',
                            data: txHash
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                        reject(error)
                    });
                break;
            default:
                break;
        }
    }).catch(err => {
        return {
            code: -1,
            msg: err.message
        }
    })
}

// deposit vault token
export function deposit(walletState,vault,amount) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        if (!amount || isNaN(amount) || isNaN(Number(amount))) {
            return resolve({
                code: 10001,
                msg: 'Error amount'
            })
        }
        const precision = BigNumber(10).pow(18);
        const stakeAmount = precision.multipliedBy(amount);
        const vaultContract = new walletState.web3.eth.Contract(abiJson.vaultAbi, vault.vaultAddress)
        switch (walletState.isWeb) {
            case true:
                vaultContract.methods.deposit(vault.farmFlat,'0x'+ stakeAmount.toString(16)).send({
                    from: walletState.address
                }).once('transactionHash', function (hash) {
                    pendingEvent.emit('pending')
                    console.log(hash)
                }).once('receipt', function (receipt) {
                    resolve({
                        code: 1,
                        msg: 'success',
                        data: receipt.transactionHash
                    })
                }).once('error', function (error) {
                    reject(error)
                })
                break;
            case false:
                const nonce = await walletState.web3.eth.getTransactionCount(walletState.address)
                const _nonce = convertStringToHex(nonce)
                const encodeABI = vaultContract.methods.deposit(vault.farmFlat,'0x'+ stakeAmount.toString(16)).encodeABI()
                const tx = {
                    nonce: sanitizeHex(_nonce),
                    from: walletState.address,
                    to: vault.vaultAddress,
                    data: encodeABI
                }
                walletState.connector.sendTransaction(tx)
                    .then((txHash) => {
                        console.log(txHash);
                        resolve({
                            code: 1,
                            msg: 'success',
                            data: txHash
                        })
                    })
                    .catch((error) => {
                        console.error(error);
                        reject(error)
                    });
                break;
            default:
                break;
        }
    }).catch(err => {
        return {
            code: -1,
            msg: err.message
        }
    })
}

// withdraw vault token + reward
export function withdraw(walletState,vault,amount) {
  return new Promise(async (resolve, reject) => {
      if (!walletState.address) {
          return resolve({
              code: 10001,
              msg: 'empty address'
          })
      }
      if (!amount || isNaN(amount) || isNaN(Number(amount))) {
          return resolve({
              code: 10001,
              msg: 'Error amount'
          })
      }
      const precision = BigNumber(10).pow(18)
      const withdrawAmount = precision.multipliedBy(amount)
      const vaultContract = new walletState.web3.eth.Contract(abiJson.vaultAbi, vault.vaultAddress)
      switch (walletState.isWeb) {
          case true:
            vaultContract.methods.withdraw(vault.farmFlat,'0x'+ withdrawAmount.toString(16)).send({
                  from: walletState.address
              }).once('transactionHash', function (hash) {
                pendingEvent.emit('pending')
                console.log(hash)
              }).once('receipt', function (receipt) {
                  resolve({
                      code: 1,
                      msg: 'success',
                      data: receipt.transactionHash
                  })
              }).once('error', function (error) {
                  reject(error)
              })
              break;
          case false:
            const nonce = await walletState.web3.eth.getTransactionCount(walletState.address)
            const _nonce = convertStringToHex(nonce)
              const encodeABI = vaultContract.methods.withdraw(vault.farmFlat,'0x'+ withdrawAmount.toString(16)).encodeABI()
              const tx = {
                  nonce: sanitizeHex(_nonce),
                  from: walletState.address,
                  to: vault.vaultAddress,
                  data: encodeABI
              }
              walletState.connector.sendTransaction(tx)
                  .then((txHash) => {
                      console.log(txHash);
                      resolve({
                          code: 1,
                          msg: 'success',
                          data: txHash
                      })
                  })
                  .catch((error) => {
                      console.error(error);
                      reject(error)
                  });
              break;
          default:
              break;
      }
  }).catch(err => {
      return {
          code: -1,
          msg: err.message
      }
  })
}
// emergencyWithdraw
export function emergencyWithdraw(walletState,vault) {
  return new Promise(async (resolve, reject) => {
      if (!walletState.address) {
          return resolve({
              code: 10001,
              msg: 'empty address'
          })
      }
      const vaultContract = new walletState.web3.eth.Contract(abiJson.vaultAbi, vault.vaultAddress)
      switch (walletState.isWeb) {
          case true:
            vaultContract.methods.emergencyWithdraw(vault.farmFlat).send({
                  from: walletState.address
              }).once('transactionHash', function (hash) {
                pendingEvent.emit('pending')
                console.log(hash)
              }).once('receipt', function (receipt) {
                  resolve({
                      code: 1,
                      msg: 'success',
                      data: receipt.transactionHash
                  })
              }).once('error', function (error) {
                  reject(error)
              })
              break;
          case false:
            const nonce = await walletState.web3.eth.getTransactionCount(walletState.address)
            const _nonce = convertStringToHex(nonce)
              const encodeABI = vaultContract.methods.emergencyWithdraw(vault.farmFlat).encodeABI()
              const tx = {
                  nonce: sanitizeHex(_nonce),
                  from: walletState.address,
                  to: vault.vaultAddress,
                  data: encodeABI
              }
              walletState.connector.sendTransaction(tx)
                  .then((txHash) => {
                      console.log(txHash);
                      resolve({
                          code: 1,
                          msg: 'success',
                          data: txHash
                      })
                  })
                  .catch((error) => {
                      console.error(error);
                      reject(error)
                  });
              break;
          default:
              break;
      }
  }).catch(err => {
      return {
          code: -1,
          msg: err.message
      }
  })
}

// get user info
export function getUserInfo(walletState,vault) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        const vaultContract = new walletState.web3.eth.Contract(abiJson.vaultAbi, vault.vaultAddress);

        const userInfo = await vaultContract.methods.userInfo(vault.farmFlat+'',walletState.address).call();
        const { shares } = userInfo;
        console.log('shares',shares);
        const earnExp = await vaultContract.methods.stakedWantTokens(vault.farmFlat,walletState.address).call();
        console.log('deposited',earnExp);
        let data = {
            shares: dividedBy(shares,Math.pow(10,18)),
            deposited: dividedBy(earnExp,Math.pow(10,18))
        }
        return resolve({
            code: 1,
            msg: 'success',
            data: data
        })
    }).catch((err) => {
        return {
            code: -1,
            msg: err.message
        }
    })
}
// get vault info
export function getVault(walletState, vault) {
    return new Promise(async (resolve, reject) => {
        
        const vaultContract = new walletState.web3.eth.Contract(abiJson.stratAbi, vault.stratAddress);
        let totalStakedLp = await vaultContract.methods.wantLockedTotal().call(); // vault 池子中的 LP 总质押量
        totalStakedLp = dividedBy(totalStakedLp, Math.pow(10, 18));
        // console.log('totalStakedLp',totalStakedLp);
        
        const token1Contract = new walletState.web3.eth.Contract(abiJson.erc20Abi, vault.address1);
        let token1Balance = await token1Contract.methods.balanceOf(vault.lpAddress).call();
        let token1Decimals = await token1Contract.methods.decimals().call();
        // console.log(vault.token1,'token1Decimals',token1Decimals);
        token1Balance = dividedBy(token1Balance, Math.pow(10,token1Decimals)); // lpt合约中的 token1 量
        // console.log(vault.token1,'token1Balance',token1Balance);

        let token1Price = 1;
        if (vault.token1 !== 'USDT') {
            token1Price = await getTokenPriceFromMdex(walletState, "0xa71edc38d189767582c38a3145b5873052c3e47a", 18, vault.address1,token1Decimals); // USDT/token1 交易对
        }
        // console.log('token1Price',token1Price);
        let token1Tvl = multipliedBy(token1Balance,token1Price);
        // console.log(vault.token1,'token1Tvl',token1Tvl);

        const token2Contract = new walletState.web3.eth.Contract(abiJson.erc20Abi, vault.address2);
        let token2Balance = await token2Contract.methods.balanceOf(vault.lpAddress).call();
        let token2Decimals = await token2Contract.methods.decimals().call();
        // console.log(vault.token2,'token2Decimals',token2Decimals);
        token2Balance = dividedBy(token2Balance, Math.pow(10,token2Decimals)); // lpt合约中的 token2 量
        // console.log(vault.token2,'token2Balance',token2Balance);

        let token2Price = 1;
        if (vault.token2 !== 'USDT') {
            token2Price = await getTokenPriceFromMdex(walletState, "0xa71edc38d189767582c38a3145b5873052c3e47a", 18, vault.address2,token2Decimals); // USDT/token2 交易对
        }
        // console.log('token2Price',token2Price);
        let token2Tvl = multipliedBy(token2Balance,token2Price);
        // console.log(vault.token2,'token2Tvl',token2Tvl);
        
        let tokenTvl = plus(token1Tvl, token2Tvl);
        // console.log(tokenTvl);
        // if (Number(tvl) == 0 || Number(totalStakedLp) == 0) {
        if (Number(tokenTvl) == 0) {
            return resolve({
                code: 1,
                msg: 'success',
                data: {
                    // lpPrice: '--',
                    tvl: '--',
                    apy: '--'
                }
            })
        }
        
        const lpContract = new walletState.web3.eth.Contract(abiJson.lpAbi, vault.lpAddress);
        let lpTotalSupply = await lpContract.methods.totalSupply().call(); // LP 的发行总量
        lpTotalSupply = dividedBy(lpTotalSupply, Math.pow(10, 18));
        // console.log('lpTotalSupply',lpTotalSupply);
        // console.log('mdexPoolAddress==========',vault.mdexPoolAddress);
        let mdexTotallLp = await lpContract.methods.balanceOf(vault.mdexPoolAddress).call(); // mdexPool 中的 LP 质押量
        mdexTotallLp = dividedBy(mdexTotallLp, Math.pow(10, 18));
        // console.log('mdexTotallLp=====',mdexTotallLp);

        const lpPrice = dividedBy(tokenTvl,lpTotalSupply);
        // console.log('lpPrice',lpPrice);

        const tvl = multipliedBy(totalStakedLp,lpPrice);
        // console.log(tvl);
        // console.log('dailyOut',vault.dailyOut);
        const mdexPrice = await getTokenPriceFromMdex(walletState, "0xa71edc38d189767582c38a3145b5873052c3e47a", 18, "0x25D2e80cB6B86881Fd7e07dd263Fb79f4AbE033c",18); // USDT/MDX 交易对
        // console.log('mdexPrice========',mdexPrice);

        const perDaily = dividedBy(multipliedBy(vault.dailyOut, mdexPrice),multipliedBy(mdexTotallLp, lpPrice));
        // console.log('perDaily========',perDaily);
        const perYear = perDaily * 365 * 100;
        // console.log('perYear========',perYear);

        const perPeriod = dividedBy(multipliedBy(perDaily, 5),1440);
        // console.log('perPeriod========',perPeriod);

        // 一年有频段: 365*1440/5 = 105120
        // console.log(plus(1,perPeriod));
        const apy = Math.pow(plus(1,perPeriod),105120) - 1;

        return resolve({
            code: 1,
            msg: 'success',
            data: {
                tvl: isNaN(Number(tvl)) ? '0.000' : tvl,
                apy: isNaN(Number(apy)) ? '0.000' : apy * 100
            }
        })
    }).catch((err) => {
        return {
            code: -1,
            msg: err.message
        }
    })
}