import React, { useState, useEffect, useRef } from 'react'
import checkDownImg from 'assets/images/ok-swap/check_down.png'
import checkUpImg from 'assets/images/ok-swap/check_up.png'
import checkLeftImg from 'assets/images/ok-swap/check_left.png'
import logoHECOImg from 'assets/images/bridge-token/logo_heco.png'
import logoBSCImg from 'assets/images/bridge-token/logo_bsc.png'
import logoOKBImg from 'assets/images/bridge-token/logo_okb.png'
import USDTMAXImg from 'assets/images/bridge-token/USDT_MAX.png'
import USDTMINImg from 'assets/images/bridge-token/USDT_MIN.png'
import flipLeftImg from 'assets/images/ok-swap/flip_left.png'
import flipRightImg from 'assets/images/ok-swap/flip_right.png'
import recordSearchImg from 'assets/images/ok-swap/record_search.png'
import toImg from 'assets/images//ok-swap/to.png'
import completeImg from 'assets/images/ok-swap/complete.png'
import pendingImg from 'assets/images/ok-swap/pending.png'
import failureImg from 'assets/images/ok-swap/failure.png'
import relateImg from 'assets/images/ok-swap/relate.png'
import expandImg from 'assets/images/ok-swap/expand.png'
import HECOImg from 'assets/images/bridge-token/HECO.png'
import BSCImg from 'assets/images/bridge-token/BSC.png'
import OKBImg from 'assets/images/bridge-token/OKB.png'
import { useActiveWeb3React } from '../../hooks'
import BigNumber from 'bignumber.js'
import { getLpContract } from '../../utils/index'
import { TransactionResponse } from '@ethersproject/providers'
import { toFixedNumber, formatHash } from 'utils/numFormat'
import { switchTimeFormat } from 'utils/dateFormat'
import { dividedBy } from 'helpers/util'
import { useTransactionAdder, useIsTransactionPending } from '../../state/transactions/hooks'
import { useCurrency } from '../../hooks/Tokens'
import { toFixedDigit } from '../../utils/numFormat'
import { useCurrencyBalance } from '../../state/wallet/hooks'
import { BridgeContent, BridgeSwap, BridgeDetail, DetailSchedule, DetailRecord } from './styled'
import { useModalOpen, useToggleModal } from '../../state/application/hooks'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { ApplicationModal } from '../../state/application/actions'
import { getBridgeRecord } from '../../helpers/api'
import { useTranslation } from 'react-i18next'

export default function Bridge() {
  const { t } = useTranslation()
  const addTransaction = useTransactionAdder() //监听交易状态
  const originalNode = useRef<HTMLDivElement>() //original下拉节点
  const tokenNode = useRef<HTMLDivElement>() //token下拉节点
  const exchangeNode = useRef<HTMLDivElement>() //exchange下拉节点
  const originalOpen = useModalOpen(ApplicationModal.ORIGINAL_POP) //original下拉列表
  const tokenOpen = useModalOpen(ApplicationModal.TOKEN_POP) //token下拉列表
  const exchangeOpen = useModalOpen(ApplicationModal.EXCHANGE_POP) //exchange下拉列表
  const originalToggle = useToggleModal(ApplicationModal.ORIGINAL_POP) //original列表切换
  const tokenToggle = useToggleModal(ApplicationModal.TOKEN_POP) //token列表切换
  const exchangeToggle = useToggleModal(ApplicationModal.EXCHANGE_POP) //exchange列表切换
  useOnClickOutside(originalNode, originalOpen ? originalToggle : undefined) //控制original列表关闭
  useOnClickOutside(tokenNode, tokenOpen ? tokenToggle : undefined) //控制token列表关闭
  useOnClickOutside(exchangeNode, exchangeOpen ? exchangeToggle : undefined) //控制exchange列表关闭
  const { account, chainId, library } = useActiveWeb3React() //获取钱包信息
  const tokenDecimal = chainId === 65 ? 10 : chainId === 97 ? 18 : chainId === 256 ? 6 : 0 //获取token精度
  const abiJson = require('../../config/abi.json') //获取合约ABI
  const ref: any = useRef() //定时监听对象
  const [showSchedule, setshowSchedule] = useState<any>(true) //显、隐Schedule
  const [showDetail, setshowDetail] = useState<any>(false) //显、隐Record详情
  const [allowBalance, setallowBalance] = useState<number>(0) //获取授权余额
  const [tokenAmount, settokenAmount] = useState<any>('') //获取token余额
  const [toChainId, settoChainId] = useState<number>(0) //获取toChainId
  const [fromChainId, setfromChainId] = useState<any>(0) //获取fromChainId
  const [fee, setfee] = useState<any>(0) //获取token手续费
  const [minLimit, setminLimit] = useState<any>(0) //获取t最小输入限制金额
  const [recordList, setrecordList] = useState<any>([]) //获取record列表数据
  const [txHash, settxHash] = useState<string | null>(null) //获取交易hash
  const pendingStatus = useIsTransactionPending(txHash ?? undefined) //获取交易状态
  const [currentRecord, setcurrentRecord] = useState<any>({}) //获取选中记录项
  const [secondTx, setsecondTx] = useState<any>({}) //获取当前交易第二条记录
  const changeList = require('config/json/bridgeConfig').bridgeToken //支持exchange列表
  const bridgeAddress =
    chainId === 65
      ? '0xadE8b092afdA09B4e26B8EB1E1ae9bEc9377CB36'
      : chainId === 97
      ? '0xE63cBE0886808db9B8502915935a3F5d0b233A31'
      : chainId === 256
      ? '0xaeAC88B2469050466D14AcD438D1Acba744ef81A'
      : '' //获取bridge合约地址
  const tokenAddress =
    chainId === 65
      ? '0xe579156f9dEcc4134B5E3A30a24Ac46BB8B01281'
      : chainId === 97
      ? '0xCB0282FD4A9F4B4Deb1673f760c016A3a8D98866'
      : chainId === 256
      ? '0x04F535663110A392A6504839BEeD34E019FdB4E0'
      : '' //获取token地址
  const currency = useCurrency(tokenAddress) //获取当前token对象
  const balance = useCurrencyBalance(account ?? undefined, currency ?? undefined)?.toExact() //获取当前token钱包余额
  const [exchangeList, setexchangeList] = useState<any>([...changeList]) //exchange列表数据
  const [originalList, setoriginalList] = useState<any>([...changeList]) //original列表数据

  //关闭schedule
  async function closeSchedule() {
    if (!showSchedule) {
      setshowSchedule(true)
    } else {
      setshowSchedule(false)
      setshowDetail(false)
    }
  }
  //打开schedule
  async function openSchedule() {
    setshowSchedule(true)
    setshowDetail(false)
  }
  //打开record详情
  async function openDetail(record: any) {
    setshowDetail(true)
    setcurrentRecord(record)
  }
  //切换网络链
  async function poolRpc(rpcData: any) {
    if (library && library.provider.isMetaMask && library.provider.request) {
      library.provider
        .request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x' + rpcData.chainId?.toString(16),
              chainName: rpcData.chainName,
              nativeCurrency: {
                symbol: rpcData.nativeCurrency.symbol,
                name: rpcData.nativeCurrency.name,
                decimals: 18
              },
              rpcUrls: [rpcData.rpcUrls],
              blockExplorerUrls: [rpcData.blockExplorerUrls]
            }
          ]
        })
        .then(res => {
          originalToggle()
        })
        .catch(err => {
          console.log('err', err)
        })
    }
  }
  //获取合约最小限制
  async function onMinFee() {
    if (!chainId || !library || !account) return
    const router = getLpContract(bridgeAddress, abiJson.bridgeAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.tokenInfo
    args = [tokenAddress]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        let fee = dividedBy(res['fixFee'].toString(), Math.pow(10, tokenDecimal))
        let minLimit = dividedBy(res['transMinLimit'].toString(), Math.pow(10, tokenDecimal))
        setfee(fee)
        setminLimit(minLimit)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //获取合约授权余额
  async function onAllow() {
    if (!chainId || !library || !account) return
    // setallowBalance(0)
    const router = getLpContract(tokenAddress, abiJson.lpAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.allowance
    args = [account, bridgeAddress]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then(res => {
        let allowBalance = toFixedNumber(Number(dividedBy(res.toString(), Math.pow(10, tokenDecimal))))
        setallowBalance(allowBalance)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //合约授权
  async function onApprove() {
    if (!chainId || !library || !account) return
    const approveAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const router = getLpContract(tokenAddress, abiJson.lpAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.approve
    args = [bridgeAddress, approveAmount]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        addTransaction(res, {
          summary:
            'Approve ' +
            (chainId === 65 ? 'OKLINK' : chainId === 97 ? 'BSC' : chainId === 256 ? 'HECO' : '') +
            ' Bridge'
        })
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //合约交易
  async function onTransfer(amount: any) {
    if (!chainId || !library || !account) return
    const precision = new BigNumber(10).pow(tokenDecimal)
    let transferAmount = '0x' + new BigNumber(`${precision.multipliedBy(amount)}`).toString(16)
    transferAmount = transferAmount.split('.')[0]
    const router = getLpContract(bridgeAddress, abiJson.bridgeAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.transferIn
    args = [tokenAddress, transferAmount, toChainId, account]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        addTransaction(res, {
          summary:
            'Transfer ' +
            amount +
            'USDT for ' +
            (chainId === 65 ? 'OKLINK' : chainId === 97 ? 'BSC' : chainId === 256 ? 'HECO' : '') +
            'Bridge'
        })
        settokenAmount('')
        settxHash(res.hash)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //获取Token
  async function getToken() {}
  //获取输入框值
  async function getTokenValue(event: any) {
    if (balance) {
      settokenAmount(event.target.value)
    }
  }
  //获取最大值
  async function getMax() {
    balance ? settokenAmount(toFixedDigit(balance, 2)) : settokenAmount('0.00')
  }
  //获取最新记录列表
  async function getNewestRecord() {
    let recordData = (await getBridgeRecord(account)).data
    if (recordData) {
      setrecordList(recordData)
    }
  }
  //监听recordList,获取第二条交易信息
  useEffect(() => {
    let tmpData = recordList.filter((item: any) => item.fromTxId === txHash)
    setsecondTx(tmpData)
  }, [recordList]) // eslint-disable-line react-hooks/exhaustive-deps
  //监听chainId,修改tokenAddress
  useEffect(() => {
    setfromChainId(chainId)
    let tmpList = changeList.filter((item: any) => item.chainId !== chainId)
    let currentToken = changeList.filter((item: any) => item.chainId === chainId)
    setexchangeList(tmpList)
    settoChainId(tmpList[0].chainId)
    if (currentToken.length > 0) {
      onAllow()
      onMinFee()
    }
  }, [chainId]) // eslint-disable-line react-hooks/exhaustive-deps
  //监听fromChainId,修改toChainId
  useEffect(() => {
    let tmpList = changeList.filter((item: any) => item.chainId !== fromChainId)
    let supportRpc = changeList.filter((item: any) => item.chainId === fromChainId)
    setexchangeList(tmpList)
    setoriginalList([...changeList])
    settoChainId(tmpList[0].chainId)
    if (supportRpc.length <= 0) {
      setexchangeList([])
      setoriginalList([])
      settoChainId(0)
    }
  }, [fromChainId]) // eslint-disable-line react-hooks/exhaustive-deps
  //监听pendingStatus,刷新recordList
  useEffect(() => {
    onAllow()
    onMinFee()
    getNewestRecord()
  }, [pendingStatus]) // eslint-disable-line react-hooks/exhaustive-deps
  //加载获取授权余额
  useEffect(() => {
    onAllow()
    onMinFee()
    getNewestRecord()

    const timer = setInterval(() => {
      getNewestRecord()
    }, 10000)
    ref.current = timer
    return () => {
      clearInterval(ref.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <BridgeContent className="bridge-content">
        <BridgeSwap className="bridge-swap">
          <div className="swap-head">
            <b>{t('Bridge.Bridging')}</b>
          </div>
          <div className="swap-form">
            <div ref={originalNode as any}>
              <label>{t('Bridge.Original')}</label>
              <div onClick={originalToggle}>
                <img
                  src={
                    fromChainId === 97
                      ? logoBSCImg
                      : fromChainId === 65
                      ? logoOKBImg
                      : fromChainId === 256
                      ? logoHECOImg
                      : ''
                  }
                  alt=""
                />
                <img className="token-select" src={checkDownImg} alt="" />
                {originalOpen && (
                  <ul className="original-ul">
                    {originalList.map((item: any, index: any) => {
                      return (
                        <li
                          key={index}
                          onClick={event => {
                            poolRpc(item)
                          }}
                        >
                          <img src={item.logoUrl} alt="" />
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
            <div ref={tokenNode as any}>
              <label>{t('Bridge.Token')}</label>
              <div onClick={tokenToggle}>
                <img src={exchangeList.length > 0 ? USDTMAXImg : ''} alt="" />
                <img className="token-select" src={checkDownImg} alt="" />
                {exchangeList.length > 0 ? (
                  tokenOpen && (
                    <ul className="token-ul">
                      <li onClick={getToken}>
                        <img src={USDTMAXImg} alt="" />
                      </li>
                    </ul>
                  )
                ) : (
                  <></>
                )}
              </div>
            </div>
            <div>
              <label>{t('Bridge.Input')}</label>
              <div>
                <input type="text" placeholder="0.00" value={tokenAmount} onChange={getTokenValue} />
                <button onClick={getMax}>{t('Bridge.MAX')}</button>
              </div>
              <span>
                {t('Bridge.MinLimit')}
                <b>{minLimit}</b>USDT
              </span>
            </div>
            <div className="transfer">
              <img src={toImg} alt="" />
            </div>
            <div ref={exchangeNode as any}>
              <label>{t('Bridge.Exchange')}</label>
              <div onClick={exchangeToggle}>
                <img
                  src={
                    toChainId === 97 ? logoBSCImg : toChainId === 65 ? logoOKBImg : toChainId === 256 ? logoHECOImg : ''
                  }
                  alt=""
                />
                <img className="token-select" src={checkDownImg} alt="" />
                {exchangeOpen && (
                  <ul className="exchange-ul">
                    {exchangeList.map((item: any, index: any) => {
                      return (
                        <li
                          key={index}
                          onClick={event => {
                            settoChainId(item.chainId)
                          }}
                        >
                          <img src={item.logoUrl} alt="" />
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            </div>
            <div className="balance">
              <span>
                <img src={USDTMINImg} alt="" />
                {balance ? toFixedDigit(balance, 2) : '0.00'} USDT
              </span>
            </div>
            <div className="fee">
              <span>{t('Bridge.HandlingFee')}</span>
              <span>{fee}%</span>
            </div>
          </div>
          <div className="swap-btnGroup">
            <button
              className={
                exchangeList.length > 0 ? (allowBalance > 0 ? 'approve active' : 'approve') : 'approve disable'
              }
              onClick={exchangeList.length > 0 ? (allowBalance > 0 ? () => {} : onApprove) : () => {}}
            >
              {t('Bridge.Approve')}
            </button>
            <img src={checkLeftImg} alt="" />
            <button
              className={allowBalance > 0 ? (tokenAmount >= minLimit ? 'carry' : 'carry disable') : 'carry disable'}
              onClick={
                allowBalance > 0
                  ? tokenAmount >= minLimit
                    ? event => {
                        onTransfer(tokenAmount)
                      }
                    : () => {}
                  : () => {}
              }
            >
              {t('Bridge.CarriedOut')}
            </button>
          </div>
        </BridgeSwap>
        {allowBalance > 0 ? (
          <BridgeDetail className="bridge-detail">
            <DetailSchedule className="detail-schedule">
              <div className="schedule-head" onClick={openSchedule}>
                <b>{t('Bridge.Schedule')}</b>
                {!showSchedule ? <img src={checkDownImg} alt="" /> : <></>}
              </div>
              {showSchedule ? (
                txHash ? (
                  <div className="schedule-content">
                    <div className="content-original">
                      <div className="desc">
                        <img
                          src={
                            fromChainId === 97
                              ? logoBSCImg
                              : fromChainId === 65
                              ? logoOKBImg
                              : fromChainId === 256
                              ? logoHECOImg
                              : ''
                          }
                          alt=""
                        />
                        <br />
                        <span>{t('Bridge.TransactionProceeding')}</span>
                      </div>
                      <div className="progress-status">
                        <div>
                          <span>
                            <img src={flipRightImg} alt="" />
                            <b>{t('Bridge.Send')}</b>
                          </span>
                          <span className="rate">
                            {txHash && pendingStatus ? '50' : txHash && !pendingStatus ? '100' : '0'}%
                          </span>
                        </div>
                        <div className="status-bar">
                          <div
                            style={
                              txHash && pendingStatus
                                ? { width: '50%' }
                                : txHash && !pendingStatus
                                ? { width: '100%' }
                                : { width: '0%' }
                            }
                          ></div>
                        </div>
                      </div>
                      <div className="hashDesc">Hash: {txHash ? formatHash(txHash) : t('Bridge.Loading')}</div>
                    </div>
                    <div>
                      <img src={toImg} alt="" />
                    </div>
                    <div className="content-exchange">
                      <div className="desc">
                        <img
                          src={
                            toChainId === 97
                              ? logoBSCImg
                              : toChainId === 65
                              ? logoOKBImg
                              : toChainId === 256
                              ? logoHECOImg
                              : ''
                          }
                          alt=""
                        />
                        <br />
                        <span>{t('Bridge.TransactionProceeding')}</span>
                      </div>
                      <div className="progress-status">
                        <div>
                          <span>
                            <img src={flipLeftImg} alt="" />
                            <b>{t('Bridge.Receive')}</b>
                          </span>
                          <span className="rate">
                            {txHash && secondTx[0]
                              ? secondTx[0].orderStatus === 'SUCCESS'
                                ? '100'
                                : secondTx[0].orderStatus === 'IN_PROGRESS' || secondTx[0].orderStatus === 'INIT'
                                ? '50'
                                : secondTx[0].orderStatus === 'FAILURE'
                                ? '0'
                                : '0'
                              : txHash && !secondTx[0]
                              ? '0'
                              : '0'}
                            %
                          </span>
                        </div>
                        <div className="status-bar">
                          <div
                            style={
                              txHash && secondTx[0]
                                ? secondTx[0].orderStatus === 'SUCCESS'
                                  ? { width: '100%' }
                                  : secondTx[0].orderStatus === 'IN_PROGRESS' || secondTx[0].orderStatus === 'INIT'
                                  ? { width: '50%' }
                                  : secondTx[0].orderStatus === 'FAILURE'
                                  ? { width: '0%' }
                                  : { width: '0%' }
                                : txHash && !secondTx[0]
                                ? { width: '0%' }
                                : { width: '0%' }
                            }
                          ></div>
                        </div>
                      </div>
                      <div className="hashDesc">
                        Hash:{' '}
                        {txHash && secondTx[0]
                          ? secondTx[0].orderStatus === 'SUCCESS'
                            ? formatHash(secondTx[0].toTxId)
                            : t('Bridge.Loading')
                          : txHash && !secondTx[0]
                          ? t('Bridge.Loading')
                          : t('Bridge.Loading')}
                      </div>
                    </div>
                  </div>
                ) : (
                  <></>
                )
              ) : (
                <></>
              )}
            </DetailSchedule>
            <DetailRecord className="detail-record">
              <div className="record-head" onClick={closeSchedule}>
                <span>
                  <img className="record-search" src={recordSearchImg} alt="" />
                  <b>{t('Bridge.CrossRecord')}</b>
                </span>
                <img src={checkUpImg} alt="" />
              </div>
              {!showSchedule && showDetail ? (
                <div className="record-detail">
                  <div className="status">
                    <div>
                      <span>
                        {currentRecord.orderStatus === 'SUCCESS'
                          ? switchTimeFormat(currentRecord.finishTime)
                          : t('Bridge.Loading')}
                      </span>
                      <span>
                        <img
                          src={
                            currentRecord.orderStatus === 'SUCCESS'
                              ? completeImg
                              : currentRecord.orderStatus === 'FAILURE'
                              ? failureImg
                              : currentRecord.orderStatus === 'IN_PROGRESS' || currentRecord.orderStatus === 'INIT'
                              ? pendingImg
                              : ''
                          }
                          alt=""
                        />{' '}
                        {currentRecord.orderStatus === 'SUCCESS'
                          ? t('Bridge.Completed')
                          : currentRecord.orderStatus === 'FAILURE'
                          ? t('Bridge.Failed')
                          : currentRecord.orderStatus === 'IN_PROGRESS' || currentRecord.orderStatus === 'INIT'
                          ? t('Bridge.Pending')
                          : ''}
                      </span>
                    </div>
                  </div>
                  <div className="relation">
                    <div className="relation-from">
                      <div>
                        <img
                          src={
                            currentRecord.fromChainId === '65'
                              ? logoOKBImg
                              : currentRecord.fromChainId === '97'
                              ? logoBSCImg
                              : currentRecord.fromChainId === '256'
                              ? logoHECOImg
                              : ''
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <div>
                          <span>
                            <img src={flipRightImg} alt="" /> <b>{t('Bridge.Send')}</b>
                          </span>
                          <span>100%</span>
                        </div>
                        <div className="from-status">
                          <div></div>
                        </div>
                      </div>
                      <div>Hash: {formatHash(currentRecord.fromTxId)}</div>
                    </div>
                    <div>
                      <img src={toImg} alt="" />
                    </div>
                    <div className="relation-to">
                      <div>
                        <img
                          src={
                            currentRecord.toChainId === '65'
                              ? logoOKBImg
                              : currentRecord.toChainId === '97'
                              ? logoBSCImg
                              : currentRecord.toChainId === '256'
                              ? logoHECOImg
                              : ''
                          }
                          alt=""
                        />
                      </div>
                      <div>
                        <div>
                          <span>
                            <img src={flipLeftImg} alt="" /> <b>{t('Bridge.Receive')}</b>
                          </span>
                          <span>
                            {currentRecord.orderStatus === 'SUCCESS'
                              ? '100'
                              : currentRecord.orderStatus === 'FAILURE'
                              ? '0'
                              : currentRecord.orderStatus === 'IN_PROGRESS' || currentRecord.orderStatus === 'INIT'
                              ? '50'
                              : '0'}
                            %
                          </span>
                        </div>
                        <div className="from-status">
                          <div
                            style={
                              currentRecord.orderStatus === 'SUCCESS'
                                ? { width: '100%' }
                                : currentRecord.orderStatus === 'FAILURE'
                                ? { width: '0%' }
                                : currentRecord.orderStatus === 'IN_PROGRESS' || currentRecord.orderStatus === 'INIT'
                                ? { width: '50%' }
                                : { width: '0%' }
                            }
                          ></div>
                        </div>
                      </div>
                      <div>
                        Hash:{' '}
                        {currentRecord.orderStatus === 'SUCCESS'
                          ? formatHash(currentRecord.toTxId)
                          : t('Bridge.Loading')}
                      </div>
                    </div>
                  </div>
                  <div className="transaction">
                    <div>
                      <span>{t('Bridge.Assets')}</span>
                      <span>
                        <img src={USDTMINImg} alt="" /> USDT
                      </span>
                    </div>
                    <div>
                      <span>{t('Bridge.Quantity')}</span>
                      <span>{currentRecord.inAmount} USDT</span>
                    </div>
                    <div>
                      <span>{t('Bridge.HandlingFee')}</span>
                      <span>{currentRecord.feeAmount} USDT</span>
                    </div>
                  </div>
                  <div
                    className="expand"
                    onClick={() => {
                      setshowDetail(false)
                    }}
                  >
                    <img src={expandImg} alt="" />
                  </div>
                </div>
              ) : !showSchedule && !showDetail ? (
                <div className="record-content">
                  {recordList.map((item: any, index: any) => {
                    return (
                      <div key={index}>
                        <div className="status">
                          <span>
                            {item.orderStatus === 'SUCCESS' ? switchTimeFormat(item.finishTime) : 'loading...'}
                          </span>
                          <span>
                            <img
                              src={
                                item.orderStatus === 'SUCCESS'
                                  ? completeImg
                                  : item.orderStatus === 'FAILURE'
                                  ? failureImg
                                  : item.orderStatus === 'IN_PROGRESS' || item.orderStatus === 'INIT'
                                  ? pendingImg
                                  : ''
                              }
                              alt=""
                            />{' '}
                            {item.orderStatus === 'SUCCESS'
                              ? t('Bridge.Completed')
                              : item.orderStatus === 'FAILURE'
                              ? t('Bridge.Failed')
                              : item.orderStatus === 'IN_PROGRESS' || item.orderStatus === 'INIT'
                              ? t('Bridge.Pending')
                              : ''}
                          </span>
                        </div>
                        <div className="relation">
                          <span>
                            <img
                              src={
                                item.fromChainId === '65'
                                  ? OKBImg
                                  : item.fromChainId === '97'
                                  ? BSCImg
                                  : item.fromChainId === '256'
                                  ? HECOImg
                                  : ''
                              }
                              alt=""
                            />
                            {item.fromChainId === '65'
                              ? 'OKLINK'
                              : item.fromChainId === '97'
                              ? 'BSC'
                              : item.fromChainId === '256'
                              ? 'HECO'
                              : ''}
                          </span>
                          <img src={relateImg} alt="" />
                          <span>
                            <img
                              src={
                                item.toChainId === '65'
                                  ? OKBImg
                                  : item.toChainId === '97'
                                  ? BSCImg
                                  : item.toChainId === '256'
                                  ? HECOImg
                                  : ''
                              }
                              alt=""
                            />
                            {item.toChainId === '65'
                              ? 'OKLINK'
                              : item.toChainId === '97'
                              ? 'BSC'
                              : item.toChainId === '256'
                              ? 'HECO'
                              : ''}
                          </span>
                        </div>
                        <div className="quantity">
                          <span>{t('Bridge.Quantity')}</span>
                          <span>{item.inAmount} USDT</span>
                        </div>
                        <div
                          className="expand"
                          onClick={() => {
                            openDetail(item)
                          }}
                        >
                          <img src={expandImg} alt="" />
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <></>
              )}
            </DetailRecord>
          </BridgeDetail>
        ) : (
          <></>
        )}
      </BridgeContent>
    </>
  )
}
