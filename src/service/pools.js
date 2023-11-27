import BigNumber from 'bignumber.js'
import store from '../store'
import { multipliedBy,dividedBy, plus, sanitizeHex } from '../helpers/util'
import { convertStringToHex } from '../helpers/bignumber'
import { getTokenPriceFromMdex } from './home'
const events = require('events')
const abiJson = require('../config/abi.json')
export const pendingEvent = new events.EventEmitter()

// Get allownce
export function getAllownce(walletState,lp) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        const lpt = new walletState.web3.eth.Contract(abiJson.lpAbi, lp.lpAddress); // lp erc20 token contract instance
        let allowance = await lpt.methods.allowance(walletState.address, lp.lpPoolAddress).call();
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
export function getBalance(walletState,lp) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        const lpt = new walletState.web3.eth.Contract(abiJson.lpAbi, lp.lpAddress); // lp erc20 token contract instance
        let balance = await lpt.methods.balanceOf(walletState.address).call();
        console.log('balance',balance);
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
export function approve(walletState,lp) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        const lpt = new walletState.web3.eth.Contract(abiJson.lpAbi, lp.lpAddress); // lp erc20 token contract instance
        const approveAmount ="0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
        switch (walletState.isWeb) {
            case true:
                lpt.methods.approve(lp.lpPoolAddress, approveAmount).send({
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
                const encodeABI = lpt.methods.approve(lp.lpPoolAddress, approveAmount).encodeABI()
                const tx = {
                    nonce: sanitizeHex(_nonce),
                    from: walletState.address,
                    to: lp.lpAddress,
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

// stake lp token
export function stake(walletState,amount, lp) {
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
        const lpPoolContract = new walletState.web3.eth.Contract(abiJson.lpPoolAbi, lp.lpPoolAddress)
        switch (walletState.isWeb) {
            case true:
                lpPoolContract.methods.stake('0x'+ stakeAmount.toString(16)).send({
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
                const encodeABI = lpPoolContract.methods.stake('0x'+ stakeAmount.toString(16)).encodeABI()
                const tx = {
                    nonce: sanitizeHex(_nonce),
                    from: walletState.address,
                    to: lp.lpPoolAddress,
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

// withdraw lp token + reward
export function withdraw(walletState,amount, lp) {
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
      const withdrawAmount = '0x'+ convertStringToHex(precision.multipliedBy(amount))
      const lpPoolContract = new walletState.web3.eth.Contract(abiJson.lpPoolAbi, lp.lpPoolAddress)
      switch (walletState.isWeb) {
          case true:
            lpPoolContract.methods.withdraw(withdrawAmount).send({
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
              const encodeABI = lpPoolContract.methods.withdraw('0x'+ withdrawAmount.toString(16)).encodeABI()
              const tx = {
                  nonce: sanitizeHex(_nonce),
                  from: walletState.address,
                  to: lp.lpPoolAddress,
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
// getReward
export function getReward(walletState,lp) {
  return new Promise(async (resolve, reject) => {
      if (!walletState.address) {
          return resolve({
              code: 10001,
              msg: 'empty address'
          })
      }
      const lpPoolContract = new walletState.web3.eth.Contract(abiJson.lpPoolAbi, lp.lpPoolAddress)
      switch (walletState.isWeb) {
          case true:
            lpPoolContract.methods.getReward().send({
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
              const encodeABI = lpPoolContract.methods.getReward().encodeABI()
              const tx = {
                  nonce: sanitizeHex(_nonce),
                  from: walletState.address,
                  to: lp.lpPoolAddress,
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
export function getUserInfo(walletState,lp) {
    return new Promise(async (resolve, reject) => {
        if (!walletState.address) {
            return resolve({
                code: 10001,
                msg: 'empty address'
            })
        }
        const lpPoolContract = new walletState.web3.eth.Contract(abiJson.lpPoolAbi, lp.lpPoolAddress);
        const earned = await lpPoolContract.methods.UserInfo(walletState.address).call();
        let data = {
            earned: dividedBy(earned, Math.pow(10, 18)) || '0.000',
            staked: dividedBy(staked, Math.pow(10, 18)) || '0.000'
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
// get lp info
export function getlpInfo(walletState, lp) {
    return new Promise(async (resolve, reject) => {
        const lpPoolContract = new walletState.web3.eth.Contract(abiJson.lpPoolAbi, lp.lpPoolAddress);
        let totalStakedLp = await lpPoolContract.methods.totalSupply().call();
        totalStakedLp = dividedBy(totalStakedLp, Math.pow(10, 18));
        console.log(lp.token2,'totalStakedLp',totalStakedLp); // lp池中LP 的质押量

        const token2Contract = new walletState.web3.eth.Contract(abiJson.erc20Abi, lp.address2); // token2 合约
        let token2Balance = await token2Contract.methods.balanceOf(lp.lpAddress).call(); // lpt合约中的 token2 数量

        let token2Decimals = await token2Contract.methods.decimals().call();
        console.log(lp.token2,'token2Decimals',token2Decimals);

        token2Balance = dividedBy(token2Balance, Math.pow(10, token2Decimals)); // lpt合约中的 token2 数量
        console.log(lp.token2,'token2Balance',token2Balance);

        const ffContract = new walletState.web3.eth.Contract(abiJson.erc20Abi, lp.address1);
        let ffTotalSupply = await ffContract.methods.totalSupply().call();
        let ffBlance = await ffContract.methods.balanceOf(lp.lpAddress).call();
        ffBlance = dividedBy(ffBlance, Math.pow(10, 18)); // lpt合约中的 FF 量
        ffTotalSupply = dividedBy(ffTotalSupply, Math.pow(10, 18)); // FF 供应量量
        console.log(lp.token2,'ffBlance',ffBlance);
        console.log('TotalSupply',ffTotalSupply);

        const ffPrice = await getTokenPriceFromMdex(walletState, "0xa71edc38d189767582c38a3145b5873052c3e47a", 18, lp.address1, 18); // USDT/ff 交易对
        console.log('ffPrice',ffPrice);
        store.commit('Set_Price', ffPrice);
        let ffTvl = multipliedBy(ffBlance,ffPrice);
        console.log(lp.token2,'ffTvl',ffTvl);
        let token2Price = 1;
        if (lp.token2 !== 'USDT') {
            token2Price = await getTokenPriceFromMdex(walletState, "0xa71edc38d189767582c38a3145b5873052c3e47a", 18, lp.address2,token2Decimals); // USDT/token 交易对
        }
        console.log(lp.token2,'token2Price',token2Price);
        let token2Tvl = multipliedBy(token2Balance,token2Price);
        console.log(lp.token2,'token2Tvl',token2Tvl);
        
        let tvl = plus(ffTvl, token2Tvl);
        if (Number(tvl) == 0 || Number(totalStakedLp) == 0) {
            return resolve({
                code: 1,
                msg: 'success',
                data: {
                    ffPrice: isNaN(Number(ffPrice)) ? '0.000' : ffPrice,
                    ffTotalSupply: isNaN(Number(ffTotalSupply)) ? '0.000' : ffTotalSupply,
                    tvl: '--',
                    apy: '--'
                }
            })
        }
        const lpContract = new walletState.web3.eth.Contract(abiJson.lpAbi, lp.lpAddress);
        let lpTotalSupply = await lpContract.methods.totalSupply().call(); // LP 的发行总量
        lpTotalSupply = dividedBy(lpTotalSupply, Math.pow(10, 18));
        console.log(lp.token2,'lpTotalSupply',lpTotalSupply);

        const lpPrice = dividedBy(tvl,lpTotalSupply);
        console.log(lp.token2,'lpPrice',lpPrice);
        tvl = multipliedBy(totalStakedLp,lpPrice);
        const apy = Date.now() > Number(lp.end) ? '--' : dividedBy(multipliedBy(lp.dailyOut, ffPrice), multipliedBy(totalStakedLp,lpPrice)) * 365 * 100;
        return resolve({
            code: 1,
            msg: 'success',
            data: {
                ffPrice: isNaN(Number(ffPrice)) ? '0.000' : ffPrice,
                ffTotalSupply: isNaN(Number(ffTotalSupply)) ? '0.000' : ffTotalSupply,
                tvl: isNaN(Number(tvl)) ? '--' : tvl,
                apy: isNaN(Number(apy)) ? '--' : apy
            }
        })
    }).catch((err) => {
        return {
            code: -1,
            msg: err.message
        }
    })
}