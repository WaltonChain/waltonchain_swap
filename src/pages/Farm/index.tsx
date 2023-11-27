import React, { useState, useCallback, useEffect, useRef } from 'react'
import { useActiveWeb3React } from '../../hooks'
import { getLpContract } from '../../utils/index'
import { RouteComponentProps, Link } from 'react-router-dom'
import Stake from '../../components/Stake'
import { useTranslation } from 'react-i18next'
import { TransactionResponse } from '@ethersproject/providers'
import { dividedBy } from 'helpers/util'
import BigNumber from 'bignumber.js'
import { getPoolInfo } from '../../helpers/api'
import { toFixedDigit, toFixedNumber } from 'utils/numFormat'
import { compare } from 'utils/numSort'
import { arrSplit } from 'utils/pageNar'
import { Dots } from '../../components/swap/styleds'
import prevImg from 'assets/images/ok-swap/prev.png'
import nextImg from 'assets/images/ok-swap/next.png'
import disPrevImg from 'assets/images/ok-swap/disPrev.png'
import disNextImg from 'assets/images/ok-swap/disNext.png'
import { isMobile } from 'react-device-detect'
import { FarmContent, FarmTable, FarmDataset } from './styled'

export default function Farm({
  match: {
    params: { pid }
  },
  history
}: RouteComponentProps<{ pid?: any }>) {
  let backTypeStr = history.location.search //获取子页面返回状态
  let backType = backTypeStr.substring(6) //子页面状态格式化

  const { t } = useTranslation()
  const isStake = history.location.pathname.includes('/stake') //判断是不是子页面
  const [isSingle, setSingle] = useState<boolean>(false) //判断是不是单币池
  const [initApy, setinitApy] = useState<string>('') //初始化Apy排序
  const [initTvl, setinitTvl] = useState<string>('') //初始化Tvl排序
  const [loadStatus, setloadStatus] = useState<number>(0) //获取数据加载状态
  const [allProfit, setallProfit] = useState<number>(0) //获取总收益
  const [isDefault, setisDefault] = useState<boolean>(true) //判断是不是默认排序
  const [lpList, setlpList] = useState<any>([]) //获取lp流动矿池
  const [singleList, setsingleList] = useState<any>([]) //获取单币池
  const [userList, setuserList] = useState<any>([]) //个人数据列表
  const [pageList, setpageList] = useState<any>([]) //个人分页数据列表
  const [pageNo, setpageNo] = useState<any>(1) //初始分页号
  const [totalNo, settotalNo] = useState<any>(0) //总分页号
  const { account, chainId, library } = useActiveWeb3React()
  const lpPoolAddress = require('config/json/address.json').WSwapPool //获取lp流动矿池合约地址
  const abiJson = require('../../config/abi.json') //获取合约ABI
  const ref: any = useRef() //定时监听对象

  //判断展示lp矿池/单币池数据
  const changeSingle = useCallback((name: string) => {
    if (name === 'single') {
      setSingle(true)
    } else {
      setSingle(false)
    }
  }, [])
  //缓存子页面数据
  const getLpToken = useCallback((data: any, isSingle: any) => {
    isSingle ? localStorage.setItem('isSingle', 'true') : localStorage.setItem('isSingle', 'false')
    localStorage.setItem('lpData', JSON.stringify(data))
  }, [])
  //数组排序
  async function getSortData(name: any, compareType: any) {
    let arr = isSingle ? [...singleList] : [...lpList]
    arr.sort(compare(name, compareType === 1 ? true : false))
    isSingle ? setsingleList(arr) : setlpList(arr)
    setisDefault(false)
    if (name === 'apy') {
      if (compareType === 1) {
        setinitApy(name + 'Down')
        localStorage.setItem('initApy', name + 'Down')
      } else {
        setinitApy(name + 'Up')
        localStorage.setItem('initApy', name + 'Up')
      }
    } else if (name === 'totalUsdtValue') {
      if (compareType === 1) {
        setinitTvl(name + 'Down')
        localStorage.setItem('initTvl', name + 'Down')
      } else {
        setinitTvl(name + 'Up')
        localStorage.setItem('initTvl', name + 'Up')
      }
    }
  }
  //获取默认数据
  async function getDefaultData() {
    getPoolData()
    setisDefault(true)
    setinitApy('')
    setinitTvl('')
    localStorage.removeItem('initApy')
    localStorage.removeItem('initTvl')
  }
  //获取池里面的数据
  async function getPoolData() {
    let dataset = await getPoolInfo()
    let lpData = [...dataset.lps]
    let singleData = [...dataset.single]
    if (localStorage.getItem('initApy')) {
      let arr = isSingle ? [...dataset.single] : [...dataset.lps]
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
      isSingle ? setsingleList(arr) : setlpList(arr)
    } else if (localStorage.getItem('initTvl')) {
      let arr = isSingle ? [...dataset.single] : [...dataset.lps]
      arr.sort(
        compare(
          'totalUsdtValue',
          localStorage.getItem('initTvl')?.indexOf('Down') !== -1
            ? true
            : localStorage.getItem('initTvl')?.indexOf('Up') !== -1
            ? false
            : false
        )
      )
      isSingle ? setsingleList(arr) : setlpList(arr)
    } else {
      setlpList(lpData)
      setsingleList(singleData)
    }

    getPersonData([...dataset.lps, ...dataset.single])
  }
  //合约获取用户个人质押数
  async function onUserInfo(pid: any, item: any) {
    let mou
    if (!chainId || !library || !account) return
    const router = getLpContract(lpPoolAddress, abiJson.lpPoolAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.userInfo
    args = [pid, account]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        let amount = res['amount']
        if (!item.symbol0) {
          let decimal = item.decimal
          mou = toFixedNumber(Number(dividedBy(amount.toString(), Math.pow(10, decimal))))
        } else {
          mou = toFixedNumber(Number(dividedBy(amount.toString(), Math.pow(10, 18))))
        }
      })
      .catch(err => {
        console.log('err', err)
      })

    return mou
  }
  //合约获取用户个人收益数
  async function onPending(pid: any) {
    let reward
    if (!chainId || !library || !account) return
    const router = getLpContract(lpPoolAddress, abiJson.lpPoolAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.pending
    args = [pid, account]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        reward = toFixedNumber(Number(dividedBy(res[0].toString(), Math.pow(10, 18))))
      })
      .catch(err => {
        console.log('err', err)
      })

    return reward
  }
  //组合用户个人信息
  async function getPersonData(list: any) {
    let newArr = [...list]
    let tmpArr = []
    let allReward = 0
    if (!isNaN(newArr.length)) {
      for (let i = 0; i < newArr.length; i++) {
        if (Number(newArr[i].totalUsdtValue) > 0) {
          tmpArr.push(newArr[i])
        }
      }
    }

    if (!isNaN(tmpArr.length)) {
      for (let i = 0; i < tmpArr.length; i++) {
        tmpArr[i].stakeAmount = await onUserInfo(tmpArr[i].pid, tmpArr[i])
        tmpArr[i].profit = await onPending(tmpArr[i].pid)

        allReward += tmpArr[i].profit
      }
    }

    tmpArr ? setloadStatus(1) : setloadStatus(0)
    setuserList(tmpArr)
    setallProfit(allReward)
    let totalNo = !isNaN(tmpArr.length) ? Math.ceil(tmpArr.length / 3) : 0
    settotalNo(totalNo)
  }
  //上一页
  async function getPrePage(pageNo: any) {
    let no = pageNo - 1
    let list = arrSplit(userList, no, 3)
    setpageNo(no)
    setpageList(list)
  }
  //下一页
  async function getNextPage(pageNo: any) {
    let no = pageNo + 1
    let list = arrSplit(userList, no, 3)
    setpageNo(no)
    setpageList(list)
  }
  //监听backType
  useEffect(() => {
    if (backType === '0') {
      setSingle(true)
    } else {
      setSingle(false)
    }
  }, [backType]) // eslint-disable-line react-hooks/exhaustive-deps
  //监听userList,依据当前页号重组pageList
  useEffect(() => {
    let list = [...userList]
    let pageList = arrSplit(list, pageNo, 3)
    setpageList(pageList)
  }, [userList]) // eslint-disable-line react-hooks/exhaustive-deps
  //无状态组件事件执行--触发子页面状态、账号更改,立即执行
  useEffect(() => {
    getPoolData()
    setinitApy('')
    setinitTvl('')
    localStorage.removeItem('initApy')
    localStorage.removeItem('initTvl')

    if (document.body.scrollTop || document.documentElement.scrollTop > 0) {
      window.scrollTo(0, 0)
    }
  }, [isStake, account]) // eslint-disable-line react-hooks/exhaustive-deps
  //数据定时更新请求
  useEffect(() => {
    const timer = setInterval(() => {
      getPoolData()
    }, 10000)
    ref.current = timer

    return () => {
      clearInterval(ref.current)
      localStorage.removeItem('initApy')
      localStorage.removeItem('initTvl')
    }
  }, [account]) // eslint-disable-line react-hooks/exhaustive-deps
  //首次加载初始数据(避免因为account导致页面故障)
  useEffect(() => {
    getPoolInfo()
      .then(res => {
        let newArr = [...res.lps, ...res.single]
        let tmpArr = []
        let allReward = 0
        if (!isNaN(newArr.length)) {
          for (let i = 0; i < newArr.length; i++) {
            if (Number(newArr[i].totalUsdtValue) > 0) {
              tmpArr.push(newArr[i])
            }
          }
        }

        tmpArr ? setloadStatus(1) : setloadStatus(0)
        setuserList(tmpArr)
        setallProfit(allReward)
        let totalNo = !isNaN(tmpArr.length) ? Math.ceil(tmpArr.length / 3) : 0
        settotalNo(totalNo)
      })
      .catch(err => {
        console.log('err', err)
      })
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      {isStake ? (
        <Stake />
      ) : (
        <FarmContent>
          <FarmTable className="farm-table">
            <div className="table-head">
              <div>{t('farm.MyFarm')}</div>
              <div>
                {t('farm.TotalProfit')}: <span>${allProfit ? toFixedDigit(Number(allProfit), 4) : '0.0000'}</span>
              </div>
            </div>
            <div className="table-content">
              {loadStatus === 0 ? (
                <>
                  <Dots className="loadDot">{t('farm.Loading')}</Dots>
                </>
              ) : (
                <>
                  {!isNaN(pageList.length) && pageList.length <= 0 ? (
                    <>
                      <span className="noData">{t('farm.NoData')}</span>
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
                        <th>{t('farm.FarmPool')}</th>
                        <th>{t('farm.TotalStaked')}</th>
                        <th>{t('farm.Operate')}</th>
                      </>
                    ) : (
                      <>
                        <th>{t('farm.FarmPool')}</th>
                        <th>{t('farm.Principal')}</th>
                        <th>{t('farm.APY')}</th>
                        <th>{t('farm.Profit')}</th>
                        <th>{t('farm.TotalStaked')}</th>
                        <th>{t('farm.Operate')}</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {pageList &&
                    pageList.map((item: any, index: any) => {
                      return (
                        <tr key={index}>
                          {isMobile ? (
                            <>
                              <td>
                                {!item.symbol0 ? (
                                  <img
                                    src={require(`assets/images/token-list/` +
                                      (item.symbol.trim() === 'WOKT' ? 'OKT' : item.symbol.trim()) +
                                      `.png`)}
                                    alt=""
                                  />
                                ) : (
                                  <>
                                    <img
                                      src={require(`assets/images/token-list/` +
                                        (item.symbol0.trim() === 'WOKT' ? 'OKT' : item.symbol0.trim()) +
                                        `.png`)}
                                      alt=""
                                    />
                                    <img
                                      src={require(`assets/images/token-list/` +
                                        (item.symbol1.trim() === 'WOKT' ? 'OKT' : item.symbol1.trim()) +
                                        `.png`)}
                                      alt=""
                                    />
                                  </>
                                )}
                                {item.symbol}
                              </td>
                              <td>${item.totalUsdtValue ? toFixedDigit(Number(item.totalUsdtValue), 4) : '0.0000'}</td>
                              <td>
                                <button onClick={event => getLpToken(item, !item.symbol0 ? true : false)}>
                                  <Link to={{ pathname: '/stake/' + item.pid }}>{t('farm.Stake')}</Link>
                                </button>
                              </td>
                            </>
                          ) : (
                            <>
                              <td>
                                {!item.symbol0 ? (
                                  <img
                                    src={require(`assets/images/token-list/` +
                                      (item.symbol.trim() === 'WOKT' ? 'OKT' : item.symbol.trim()) +
                                      `.png`)}
                                    alt=""
                                  />
                                ) : (
                                  <>
                                    <img
                                      src={require(`assets/images/token-list/` +
                                        (item.symbol0.trim() === 'WOKT' ? 'OKT' : item.symbol0.trim()) +
                                        `.png`)}
                                      alt=""
                                    />
                                    <img
                                      src={require(`assets/images/token-list/` +
                                        (item.symbol1.trim() === 'WOKT' ? 'OKT' : item.symbol1.trim()) +
                                        `.png`)}
                                      alt=""
                                    />
                                  </>
                                )}
                                {item.symbol}
                              </td>
                              <td>{item.stakeAmount ? toFixedDigit(Number(item.stakeAmount), 4) : '0.0000'} LP</td>
                              <td>{item.apy === null || !item.apy ? '0.0000' : toFixedDigit(Number(item.apy), 4)}%</td>
                              <td>${item.profit ? toFixedDigit(Number(item.profit), 4) : '0.0000'}</td>
                              <td>${item.totalUsdtValue ? toFixedDigit(Number(item.totalUsdtValue), 4) : '0.0000'}</td>
                              <td>
                                <button onClick={event => getLpToken(item, !item.symbol0 ? true : false)}>
                                  <Link to={{ pathname: '/stake/' + item.pid }}>{t('farm.Stake')}</Link>
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      )
                    })}
                </tbody>
              </table>
            </div>
            <div className="table-pagination">
              <img
                src={pageNo > 1 ? prevImg : disPrevImg}
                alt=""
                onClick={pageNo > 1 ? event => getPrePage(pageNo) : () => {}}
              />
              <span>
                Page {pageNo} of {totalNo}
              </span>
              <img
                src={pageNo < totalNo ? nextImg : disNextImg}
                alt=""
                onClick={pageNo < totalNo ? event => getNextPage(pageNo) : () => {}}
              />
            </div>
          </FarmTable>
          <FarmDataset className="farm-dataset">
            <div className="dataset-tabs">
              <div onClick={event => changeSingle('startx')} className={isSingle ? '' : 'active'}>
                {t('farm.WSWAP-LP')}
              </div>
              <div onClick={event => changeSingle('single')} className={isSingle ? 'active' : ''}>
                {t('farm.SingleToken')}
              </div>
            </div>
            <div className="dataset-navs">
              <div>
                {t('farm.TotalLpPool')} (
                {isSingle ? !isNaN(singleList.length) && singleList.length : !isNaN(lpList.length) && lpList.length})
              </div>
              <div onClick={getDefaultData} className={isDefault ? 'active' : ''} style={{ cursor: 'pointer' }}>
                {t('farm.Default')}
              </div>
              <div>
                APY
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
              </div>
              <div>
                TVL
                <span>
                  <span
                    className={initTvl === 'totalUsdtValueDown' ? 'active totalUsdtValueDown' : ''}
                    onClick={event => getSortData('totalUsdtValue', 1)}
                  ></span>
                  <span
                    className={initTvl === 'totalUsdtValueUp' ? 'active totalUsdtValueUp' : ''}
                    onClick={event => getSortData('totalUsdtValue', -1)}
                  ></span>
                </span>
              </div>
            </div>
            <div className="dataset-list">
              {backType ? (
                <>
                  {!isSingle
                    ? lpList &&
                      lpList.map((item: any, index: any) => {
                        return (
                          <div key={index}>
                            <h3>
                              <img
                                src={require(`assets/images/token-list/` +
                                  (item.symbol0.trim() === 'WOKT' ? 'OKT' : item.symbol0.trim()) +
                                  `.png`)}
                                alt=""
                              />
                              <img
                                src={require(`assets/images/token-list/` +
                                  (item.symbol1.trim() === 'WOKT' ? 'OKT' : item.symbol1.trim()) +
                                  `.png`)}
                                alt=""
                              />
                              {item.symbol ? item.symbol : ''}
                            </h3>
                            <p>
                              <span>APY</span>
                              <span className="apy">{item.apy === null ? '0.0000' : toFixedDigit(item.apy, 4)}%</span>
                            </p>
                            <p>
                              <span>TVL</span>
                              <span className="tvl">
                                ${item.totalUsdtValue ? toFixedDigit(Number(item.totalUsdtValue), 4) : '0.0000'}
                              </span>
                            </p>
                            <div onClick={event => getLpToken(item, false)}>
                              <Link to={{ pathname: '/stake/' + item.pid }}>{t('farm.Select')}</Link>
                            </div>
                          </div>
                        )
                      })
                    : singleList &&
                      singleList.map((item: any, index: any) => {
                        return (
                          <div key={index}>
                            <h3>
                              <img
                                src={require(`assets/images/token-list/` +
                                  (item.symbol === 'WOKT' ? 'OKT' : item.symbol) +
                                  `.png`)}
                                alt=""
                              />
                              {item.symbol ? item.symbol : ''}
                            </h3>
                            <p>
                              <span>APY</span>
                              <span>{item.apy === null ? '0.0000' : toFixedDigit(Number(item.apy), 4)}%</span>
                            </p>
                            <p>
                              <span>TVL</span>
                              <span>
                                ${item.totalUsdtValue ? toFixedDigit(Number(item.totalUsdtValue), 4) : '0.0000'}
                              </span>
                            </p>
                            <div onClick={event => getLpToken(item, true)}>
                              <Link to={{ pathname: '/stake/' + item.pid }}>{t('farm.Select')}</Link>
                            </div>
                          </div>
                        )
                      })}
                </>
              ) : (
                <>
                  {!isSingle
                    ? lpList &&
                      lpList.map((item: any, index: any) => {
                        return (
                          <div key={index}>
                            <h3>
                              <img
                                src={require(`assets/images/token-list/` +
                                  (item.symbol0.trim() === 'WOKT' ? 'OKT' : item.symbol0.trim()) +
                                  `.png`)}
                                alt=""
                              />
                              <img
                                src={require(`assets/images/token-list/` +
                                  (item.symbol1.trim() === 'WOKT' ? 'OKT' : item.symbol1.trim()) +
                                  `.png`)}
                                alt=""
                              />
                              {item.symbol ? item.symbol : ''}
                            </h3>
                            <p>
                              <span>APY</span>
                              <span className="apy">{item.apy === null ? '0.0000' : toFixedDigit(item.apy, 4)}%</span>
                            </p>
                            <p>
                              <span>TVL</span>
                              <span className="tvl">
                                ${item.totalUsdtValue ? toFixedDigit(Number(item.totalUsdtValue), 4) : '0.0000'}
                              </span>
                            </p>
                            <div onClick={event => getLpToken(item, false)}>
                              <Link to={{ pathname: '/stake/' + item.pid }}>{t('farm.Select')}</Link>
                            </div>
                          </div>
                        )
                      })
                    : singleList &&
                      singleList.map((item: any, index: any) => {
                        return (
                          <div key={index}>
                            <h3>
                              <img
                                src={require(`assets/images/token-list/` +
                                  (item.symbol === 'WOKT' ? 'OKT' : item.symbol) +
                                  `.png`)}
                                alt=""
                              />
                              {item.symbol ? item.symbol : ''}
                            </h3>
                            <p>
                              <span>APY</span>
                              <span>{item.apy === null ? '0.0000' : toFixedDigit(Number(item.apy), 4)}%</span>
                            </p>
                            <p>
                              <span>TVL</span>
                              <span>
                                ${item.totalUsdtValue ? toFixedDigit(Number(item.totalUsdtValue), 4) : '0.0000'}
                              </span>
                            </p>
                            <div onClick={event => getLpToken(item, true)}>
                              <Link to={{ pathname: '/stake/' + item.pid }}>{t('farm.Select')}</Link>
                            </div>
                          </div>
                        )
                      })}
                </>
              )}
            </div>
          </FarmDataset>
        </FarmContent>
      )}
    </>
  )
}
