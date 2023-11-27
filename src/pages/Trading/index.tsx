import React, { useEffect, useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { getPoolInfo } from '../../helpers/api'
import { useActiveWeb3React } from '../../hooks'
import { getLpContract } from '../../utils/index'
import BigNumber from 'bignumber.js'
import { TransactionResponse } from '@ethersproject/providers'
import { dividedBy } from 'helpers/util'
import { toFixedDigit } from 'utils/numFormat'
import { compare } from 'utils/numSort'
import { Dots } from '../../components/swap/styleds'
import { isMobile } from 'react-device-detect'
import { TradContent, TradFunc, TradTable } from './styled'

export default function Trading() {
  const { t } = useTranslation()
  const [miningList, setminingList] = useState<any>([]) //获取交易挖矿列表数据
  const [poolReward, setpoolReward] = useState<number>(0) //获取池奖励
  const [personReward, setpersonReward] = useState<number>(0) //获取个人奖励
  const { account, chainId, library } = useActiveWeb3React()
  const [initApy, setinitApy] = useState<string>('') //初始化Apy排序
  const [loadStatus, setloadStatus] = useState<number>(0) //获取数据加载状态
  const [initAlloc, setinitAlloc] = useState<string>('') //初始化Alloc排序
  const [initTotal, setTotal] = useState<string>('') //初始化Total排序
  const [initPool, setPool] = useState<string>('') //初始化Pool排序
  const [initQuantity, setQuantity] = useState<string>('') //初始化Quantity排序
  const [initReward, setReward] = useState<string>('') //初始化Reward排序
  const abiJson = require('../../config/abi.json') //获取合约ABI
  const miningAddress = require('config/json/address.json').SwapMining //获取交易挖矿合约地址
  const ref: any = useRef() //定时监听对象

  //获取个人奖励
  async function onUserReward(pId: any) {
    let op = 0
    if (!chainId || !library || !account) return
    const router = getLpContract(miningAddress, abiJson.miningAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.getUserReward
    args = [pId]
    value = null
    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        op = res[0]
      })
      .catch(err => {
        console.log('err', err)
      })
    return op
  }
  //获取个人交易额
  async function onUserQuantity(pId: any) {
    let op = 0
    if (!chainId || !library || !account) return
    const router = getLpContract(miningAddress, abiJson.miningAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.userInfo
    args = [pId, account]
    value = null
    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        op = res.quantity
      })
      .catch(err => {
        console.log('err', err)
      })

    return op
  }
  //提取奖励
  async function withdraw() {
    if (!chainId || !library || !account) return
    const router = getLpContract(miningAddress, abiJson.miningAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.takerWithdraw
    args = []
    value = null
    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        console.log('res', res)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //数组排序
  async function getSortData(name: any, compareType: any) {
    let arr = [...miningList]
    arr.sort(compare(name, compareType === 1 ? true : false))
    setminingList(arr)

    if (name === 'apy') {
      if (compareType === 1) {
        setinitApy(name + 'Down')
        localStorage.setItem('initApy', name + 'Down')
      } else {
        setinitApy(name + 'Up')
        localStorage.setItem('initApy', name + 'Up')
      }
    } else if (name === 'alloc_mdx_amt') {
      if (compareType === 1) {
        setinitAlloc(name + 'Down')
        localStorage.setItem('initAlloc', name + 'Down')
      } else {
        setinitAlloc(name + 'Up')
        localStorage.setItem('initAlloc', name + 'Up')
      }
    } else if (name === 'total_quantity') {
      if (compareType === 1) {
        setTotal(name + 'Down')
        localStorage.setItem('initTotal', name + 'Down')
      } else {
        setTotal(name + 'Up')
        localStorage.setItem('initTotal', name + 'Up')
      }
    } else if (name === 'pool_quantity') {
      if (compareType === 1) {
        setPool(name + 'Down')
        localStorage.setItem('initPool', name + 'Down')
      } else {
        setPool(name + 'Up')
        localStorage.setItem('initPool', name + 'Up')
      }
    } else if (name === 'person_quantity') {
      if (compareType === 1) {
        setQuantity(name + 'Down')
        localStorage.setItem('initQuantity', name + 'Down')
      } else {
        setQuantity(name + 'Up')
        localStorage.setItem('initQuantity', name + 'Up')
      }
    } else if (name === 'person_reward') {
      if (compareType === 1) {
        setReward(name + 'Down')
        localStorage.setItem('initReward', name + 'Up')
      } else {
        setReward(name + 'Up')
        localStorage.setItem('initReward', name + 'Up')
      }
    }
  }
  //获取交易挖矿池数据列表
  async function getPoolData() {
    let dataset = await getPoolInfo()
    let arrList = [...dataset.minging]
    arrList ? setloadStatus(1) : setloadStatus(0)
    let poolReward = 0
    let personReward = 0
    if (!isNaN(arrList.length)) {
      for (let i = 0; i < arrList.length; i++) {
        let op = (await onUserReward(arrList[i].pool_id))?.toString()
        arrList[i].person_reward = Number(dividedBy(op, Math.pow(10, 18)))

        let op2 = (await onUserQuantity(arrList[i].pool_id))?.toString()
        arrList[i].person_quantity = Number(dividedBy(op2, Math.pow(10, 10)))

        poolReward += Number(arrList[i].alloc_mdx_amt)
        personReward += Number(arrList[i].person_reward)
      }
    }

    setpoolReward(poolReward)
    setpersonReward(personReward)
    if (localStorage.getItem('initApy')) {
      let arr = [...arrList]
      arr.sort(
        compare(
          'apy',
          localStorage.getItem('initApy')?.indexOf('Down') !== -1
            ? true
            : localStorage.getItem('initApy')?.indexOf('Up') !== -1
            ? false
            : false
        )
      )
      setminingList(arr)
    } else if (localStorage.getItem('initAlloc')) {
      let arr = [...arrList]
      arr.sort(
        compare(
          'alloc_mdx_amt',
          localStorage.getItem('initAlloc')?.indexOf('Down') !== -1
            ? true
            : localStorage.getItem('initAlloc')?.indexOf('Up') !== -1
            ? false
            : false
        )
      )
      setminingList(arr)
    } else if (localStorage.getItem('initTotal')) {
      let arr = [...arrList]
      arr.sort(
        compare(
          'total_quantity',
          localStorage.getItem('initTotal')?.indexOf('Down') !== -1
            ? true
            : localStorage.getItem('initTotal')?.indexOf('Up') !== -1
            ? false
            : false
        )
      )
      setminingList(arr)
    } else if (localStorage.getItem('initPool')) {
      let arr = [...arrList]
      arr.sort(
        compare(
          'pool_quantity',
          localStorage.getItem('initPool')?.indexOf('Down') !== -1
            ? true
            : localStorage.getItem('initPool')?.indexOf('Up') !== -1
            ? false
            : false
        )
      )
      setminingList(arr)
    } else if (localStorage.getItem('initQuantity')) {
      let arr = [...arrList]
      arr.sort(
        compare(
          'person_quantity',
          localStorage.getItem('initQuantity')?.indexOf('Down') !== -1
            ? true
            : localStorage.getItem('initQuantity')?.indexOf('Up') !== -1
            ? false
            : false
        )
      )
      setminingList(arr)
    } else if (localStorage.getItem('initReward')) {
      let arr = [...arrList]
      arr.sort(
        compare(
          'person_reward',
          localStorage.getItem('initReward')?.indexOf('Down') !== -1
            ? true
            : localStorage.getItem('initReward')?.indexOf('Up') !== -1
            ? false
            : false
        )
      )
      setminingList(arr)
    } else {
      setminingList([...arrList])
    }
  }
  //无状态组件事件执行(监听钱包状态,更新触发)
  useEffect(() => {
    getPoolData()
    const timer = setInterval(() => {
      getPoolData()
    }, 10000)
    ref.current = timer
    return () => {
      clearInterval(ref.current)
    }
  }, [account]) // eslint-disable-line react-hooks/exhaustive-deps
  //无状态组件事件执行(页面初次渲染执行一次)
  useEffect(() => {
    let arrList
    getPoolInfo()
      .then(res => {
        arrList = [...res.minging]
        arrList ? setloadStatus(1) : setloadStatus(0)
        let poolReward = 0
        let personReward = 0
        setpoolReward(poolReward)
        setpersonReward(personReward)
        setminingList([...arrList])
      })
      .catch(err => {
        console.log(err)
      })

    return () => {
      localStorage.removeItem('initApy')
      localStorage.removeItem('initTotal')
      localStorage.removeItem('initReward')
      localStorage.removeItem('initQuantity')
      localStorage.removeItem('initPool')
      localStorage.removeItem('initAlloc')
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <TradContent>
        <TradFunc className="trad-func">
          <div className="func-pool">
            <div>{t('trad.PoolRewards')}:</div>
            <div>
              <span>{poolReward ? toFixedDigit(poolReward, 4) : '0.0000'}XT</span>
            </div>
          </div>
          <div className="func-withdraw">
            <div>{t('trad.WithdrawRewards')}:</div>
            <div>
              <span>{personReward ? toFixedDigit(personReward, 4) : '0.0000'}XT</span>
              <button className={personReward > 0 ? '' : 'disable'} onClick={personReward > 0 ? withdraw : () => {}}>
                {t('trad.Withdraw')}
              </button>
            </div>
          </div>
        </TradFunc>
        <TradTable className="trad-table">
          <div className="table-content">
            {loadStatus === 0 ? (
              <Dots className="loadDot">{t('trad.Loading')}</Dots>
            ) : (
              <>
                {!isNaN(miningList.length) && miningList.length <= 0 ? (
                  <>
                    <span className="noData">{t('trad.NoData')}</span>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
            <table>
              <thead>
                <tr>
                  {isMobile ? (
                    <>
                      <th className="lp-swap">{t('trad.TradPair')}</th>
                      <th className="apy">
                        {t('trad.APY')}
                        <span>
                          <span
                            className={initApy === 'apyDown' ? 'active apyDown' : ''}
                            onClick={event => getSortData('apy', 1)}
                          ></span>
                          <span
                            className={initApy === 'apyUp' ? 'active apyUp' : ''}
                            onClick={event => getSortData('apy', -1)}
                          ></span>
                        </span>
                      </th>
                      <th className="person-reward">
                        {t('trad.PersonReward')}
                        <span>
                          <span
                            className={initReward === 'person_rewardDown' ? 'active person_rewardDown' : ''}
                            onClick={event => getSortData('person_reward', 1)}
                          ></span>
                          <span
                            className={initReward === 'person_rewardUp' ? 'active person_rewardUp' : ''}
                            onClick={event => getSortData('person_reward', -1)}
                          ></span>
                        </span>
                      </th>
                    </>
                  ) : (
                    <>
                      <th className="lp-swap">{t('trad.TradPair')}</th>
                      <th className="apy">
                        {t('trad.APY')}
                        <span>
                          <span
                            className={initApy === 'apyDown' ? 'active apyDown' : ''}
                            onClick={event => getSortData('apy', 1)}
                          ></span>
                          <span
                            className={initApy === 'apyUp' ? 'active apyUp' : ''}
                            onClick={event => getSortData('apy', -1)}
                          ></span>
                        </span>
                      </th>
                      <th className="all-reward">
                        {t('trad.CurrentReward')}
                        <span>
                          <span
                            className={initAlloc === 'alloc_mdx_amtDown' ? 'active alloc_mdx_amtDown' : ''}
                            onClick={event => getSortData('alloc_mdx_amt', 1)}
                          ></span>
                          <span
                            className={initAlloc === 'alloc_mdx_amtUp' ? 'active alloc_mdx_amtUp' : ''}
                            onClick={event => getSortData('alloc_mdx_amt', -1)}
                          ></span>
                        </span>
                      </th>
                      <th className="total-quantity">
                        {t('trad.TradVolume')}
                        <span>
                          <span
                            className={initTotal === 'total_quantityDown' ? 'active total_quantityDown' : ''}
                            onClick={event => getSortData('total_quantity', 1)}
                          ></span>
                          <span
                            className={initTotal === 'total_quantityUp' ? 'active total_quantityUp' : ''}
                            onClick={event => getSortData('total_quantity', -1)}
                          ></span>
                        </span>
                      </th>
                      <th className="pool-quantity">
                        {t('trad.CurrentVolume')}
                        <span>
                          <span
                            className={initPool === 'pool_quantityDown' ? 'active pool_quantityDown' : ''}
                            onClick={event => getSortData('pool_quantity', 1)}
                          ></span>
                          <span
                            className={initPool === 'pool_quantityUp' ? 'active pool_quantityUp' : ''}
                            onClick={event => getSortData('pool_quantity', -1)}
                          ></span>
                        </span>
                      </th>
                      <th className="person-quantity">
                        {t('trad.PersonVolume')}
                        <span>
                          <span
                            className={initQuantity === 'person_quantityDown' ? 'active person_quantityDown' : ''}
                            onClick={event => getSortData('person_quantity', 1)}
                          ></span>
                          <span
                            className={initQuantity === 'person_quantityUp' ? 'active person_quantityUp' : ''}
                            onClick={event => getSortData('person_quantity', -1)}
                          ></span>
                        </span>
                      </th>
                      <th className="person-reward">
                        {t('trad.PersonReward')}
                        <span>
                          <span
                            className={initReward === 'person_rewardDown' ? 'active person_rewardDown' : ''}
                            onClick={event => getSortData('person_reward', 1)}
                          ></span>
                          <span
                            className={initReward === 'person_rewardUp' ? 'active person_rewardUp' : ''}
                            onClick={event => getSortData('person_reward', -1)}
                          ></span>
                        </span>
                      </th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {miningList &&
                  miningList.map((item: any, index: any) => {
                    return (
                      <tr key={index}>
                        {isMobile ? (
                          <>
                            <td className="lp-swap">
                              <div>
                                <img
                                  src={require(`assets/images/token-list/` +
                                    (item.symbol0 === 'WOKT' ? 'OKT' : item.symbol0) +
                                    `.png`)}
                                  alt=""
                                />
                                <img
                                  src={require(`assets/images/token-list/` +
                                    (item.symbol1 === 'WOKT' ? 'OKT' : item.symbol1) +
                                    `.png`)}
                                  alt=""
                                />
                              </div>
                              <div>
                                {item.symbol0}-{item.symbol1}
                              </div>
                            </td>
                            <td className="apy">{item.apy ? toFixedDigit(Number(item.apy), 4) : '0.0000'}%</td>
                            <td className="person-reward">
                              {item.person_reward ? toFixedDigit(item.person_reward, 4) : '0.0000'} XT
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="lp-swap">
                              <div>
                                <img
                                  src={require(`assets/images/token-list/` +
                                    (item.symbol0 === 'WOKT' ? 'OKT' : item.symbol0) +
                                    `.png`)}
                                  alt=""
                                />
                                <img
                                  src={require(`assets/images/token-list/` +
                                    (item.symbol1 === 'WOKT' ? 'OKT' : item.symbol1) +
                                    `.png`)}
                                  alt=""
                                />
                              </div>
                              <div>
                                {item.symbol0}-{item.symbol1}
                              </div>
                            </td>
                            <td className="apy">{item.apy ? toFixedDigit(Number(item.apy), 4) : '0.0000'}%</td>
                            <td className="all-reward">
                              {item.alloc_mdx_amt ? toFixedDigit(Number(item.alloc_mdx_amt), 4) : '0.0000'} XT
                            </td>
                            <td className="total-quantity">
                              $ {item.total_quantity ? toFixedDigit(Number(item.total_quantity), 4) : '0.0000'}
                            </td>
                            <td className="pool-quantity">
                              $ {item.pool_quantity ? toFixedDigit(Number(item.pool_quantity), 4) : '0.0000'}
                            </td>
                            <td className="person-quantity">
                              $ {item.person_quantity ? toFixedDigit(item.person_quantity, 4) : '0.0000'}
                            </td>
                            <td className="person-reward">
                              {item.person_reward ? toFixedDigit(item.person_reward, 4) : '0.0000'} XT
                            </td>
                          </>
                        )}
                      </tr>
                    )
                  })}
              </tbody>
            </table>
          </div>
        </TradTable>
      </TradContent>
    </>
  )
}
