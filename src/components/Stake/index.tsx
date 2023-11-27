import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useActiveWeb3React } from '../../hooks'
import { getLpContract } from '../../utils/index'
import { useTranslation } from 'react-i18next'
import BigNumber from 'bignumber.js'
import { Text } from 'rebass'
import { TransactionResponse } from '@ethersproject/providers'
import { dividedBy } from 'helpers/util'
import closeImg from 'assets/images/ok-swap/close.png'
import { useTransactionAdder, useIsTransactionPending } from '../../state/transactions/hooks'
import { CustomLightSpinner } from '../../theme/components'
import Circle from '../../assets/images/blue-loader.svg'
import { toFixedNumber, toFixedDigit } from 'utils/numFormat'
import { StakeContent, StakeList, MaskModal, CommonModal } from './styled'

export default function Stake() {
  const { t } = useTranslation()
  const isSingle = localStorage.getItem('isSingle') //判断是不是单币池数据
  const locale: any = localStorage.getItem('lpData') //接收父组件传值
  const lpData = JSON.parse(locale) //格式化父组件传值
  const [allowance, setallowance] = useState<number>(0) //获取授权余额
  const [balance, setbalance] = useState<number>(0) //获取用户余额
  const [stakeAmount, setstakeAmount] = useState<number>(0) //获取质押金额
  const [earnAmount, setearnAmount] = useState<number>(0) //获取已赚取奖励
  const [isDeposit, setDeposit] = useState<boolean>(false) //判断是不是质押行为
  const [isWithdraw, setWithdraw] = useState<boolean>(false) //判断是不是提取行为
  const [inputAmount, setinputAmount] = useState<any>('') //获取输入框值
  const [txHash, settxHash] = useState<string | null>(null) //获取交易hash
  const { account, chainId, library } = useActiveWeb3React()
  const pendingStatus = useIsTransactionPending(txHash ?? undefined) //获取交易状态
  const addTransaction = useTransactionAdder() //监听交易状态
  const abiJson = require('../../config/abi.json') //获取合约ABI
  const lpPoolAddress = require('config/json/address.json').WSwapPool //获取lp流动矿池合约地址

  //获取授权余额
  async function onAllow() {
    if (!chainId || !library || !account) return
    const router = getLpContract(lpData.lpAddresses, abiJson.lpAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.allowance
    args = [account, lpPoolAddress]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then(res => {
        let amount = res
        if (isSingle === 'true') {
          let decimal = lpData.decimal
          setallowance(toFixedNumber(Number(dividedBy(amount.toString(), Math.pow(10, decimal)))))
        } else {
          setallowance(toFixedNumber(Number(dividedBy(amount.toString(), Math.pow(10, 18)))))
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //获取用户余额
  async function onBalance() {
    if (!chainId || !library || !account) return
    const router = getLpContract(lpData.lpAddresses, abiJson.lpAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.balanceOf
    args = [account]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then(res => {
        let amount = res
        if (isSingle === 'true') {
          let decimal = lpData.decimal
          setbalance(toFixedNumber(Number(dividedBy(amount.toString(), Math.pow(10, decimal)))))
        } else {
          setbalance(toFixedNumber(Number(dividedBy(amount.toString(), Math.pow(10, 18)))))
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //获取用户个人信息
  async function onUserInfo() {
    if (!chainId || !library || !account) return
    const router = getLpContract(lpPoolAddress, abiJson.lpPoolAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.userInfo
    args = [lpData.pid, account]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        let amount = res['amount']
        if (isSingle === 'true') {
          let decimal = lpData.decimal
          setstakeAmount(toFixedNumber(Number(dividedBy(amount.toString(), Math.pow(10, decimal)))))
        } else {
          setstakeAmount(toFixedNumber(Number(dividedBy(amount.toString(), Math.pow(10, 18)))))
        }
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //获取待领取奖励
  async function onPending() {
    setWithdraw(false)
    if (!chainId || !library || !account) return
    const router = getLpContract(lpPoolAddress, abiJson.lpPoolAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.pending
    args = [lpData.pid, account]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: any) => {
        setearnAmount(toFixedNumber(Number(dividedBy(res[0].toString(), Math.pow(10, 18)))))
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //授权
  async function onApprove() {
    if (!chainId || !library || !account) return

    const approveAmount = '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff'
    const router = getLpContract(lpData.lpAddresses, abiJson.lpAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.approve
    args = [lpPoolAddress, approveAmount]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then((res: TransactionResponse) => {
        addTransaction(res, {
          summary: t('stake.ApproveSuccess')
        })
        settxHash(res.hash)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //提现
  async function onWithdraw(funcName: any, amount: any) {
    setWithdraw(false)
    if (!chainId || !library || !account) return
    let decimals = 18
    if (isSingle === 'true') {
      decimals = lpData.decimal
    }
    const precision = new BigNumber(10).pow(decimals)
    let withdrawAmount =
      funcName === 'withdraw' ? '0x' + new BigNumber(`${precision.multipliedBy(amount)}`).toString(16) : '0'
    withdrawAmount = withdrawAmount.split('.')[0]
    const router = getLpContract(lpPoolAddress, abiJson.lpPoolAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.withdraw
    args = [lpData.pid, withdrawAmount]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then(res => {
        addTransaction(res, {
          summary: t('stake.WithdrawSuccess')
        })
        settxHash(res.hash)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //存入
  async function onDeposit(amount: any) {
    setDeposit(false)
    if (!chainId || !library || !account) return
    let decimals = 18
    if (isSingle === 'true') {
      decimals = lpData.decimal
    }
    const precision = new BigNumber(10).pow(decimals)
    let stakeAmount = '0x' + new BigNumber(`${precision.multipliedBy(amount)}`).toString(16)
    stakeAmount = stakeAmount.split('.')[0]

    const router = getLpContract(lpPoolAddress, abiJson.lpPoolAbi, chainId, library, account)
    let method: (...args: any) => Promise<TransactionResponse>,
      args: Array<string | string[] | number>,
      value: BigNumber | null

    method = router.deposit
    args = [lpData.pid, stakeAmount]
    value = null

    await method(...args, {
      ...(value ? { value } : {})
    })
      .then(res => {
        addTransaction(res, {
          summary: t('stake.DepositSuccess')
        })
        settxHash(res.hash)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
  //关闭模态框
  async function closeModal() {
    setDeposit(false)
    setWithdraw(false)
    setinputAmount('')
    settxHash(null)
  }
  //获取最大值
  async function getMax() {
    if (isWithdraw) {
      setinputAmount(stakeAmount)
    }
    if (isDeposit) {
      setinputAmount(balance)
    }
  }
  //获取输入框值
  async function getInputValue(event: any) {
    setinputAmount(event.target.value)
  }
  //无状态组件事件执行
  useEffect(() => {
    onAllow()
    onBalance()
    onUserInfo()
    onPending()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  //无状态组件事件执行
  useEffect(() => {
    onAllow()
    onBalance()
    onUserInfo()
    onPending()
    setinputAmount('')
  }, [pendingStatus]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <>
      <StakeContent>
        <StakeList className="stake-list">
          <div>
            <p>
              <img alt="XT" src={require(`assets/images/token-list/XT.png`)} />
            </p>
            <p className="amount">{earnAmount ? toFixedDigit(earnAmount, 8) : '0.00000000'}</p>
            <p>XT {t('stake.Earned')}</p>
            <div>
              <div
                className={earnAmount > 0 ? 'withdrawRewardBtn' : 'withdrawRewardBtn disable'}
                onClick={
                  earnAmount > 0
                    ? event => {
                        onWithdraw('withdrawReward', '0')
                      }
                    : event => {}
                }
              >
                {t('stake.WithdrawReward')}
              </div>
            </div>
          </div>
          <div>
            <p>
              {isSingle === 'true' ? (
                <img
                  src={require(`assets/images/token-list/` +
                    (lpData.symbol === 'WOKT' ? 'OKT' : lpData.symbol) +
                    `.png`)}
                  alt=""
                />
              ) : (
                <>
                  <img
                    src={require(`assets/images/token-list/` +
                      (lpData.symbol0.trim() === 'WOKT' ? 'OKT' : lpData.symbol0.trim()) +
                      `.png`)}
                    alt=""
                  />
                  <img
                    src={require(`assets/images/token-list/` +
                      (lpData.symbol1.trim() === 'WOKT' ? 'OKT' : lpData.symbol1.trim()) +
                      `.png`)}
                    alt=""
                  />
                </>
              )}
            </p>
            <p className="amount">{stakeAmount ? toFixedDigit(stakeAmount, 8) : '0.00000000'}</p>
            <p>
              {lpData.symbol}
              {isSingle === 'true' ? '' : '-LP'} {t('stake.Staked')}
            </p>
            <div>
              <div
                onClick={
                  allowance > 0
                    ? () => {
                        setDeposit(true)
                      }
                    : onApprove
                }
              >
                {allowance > 0 ? t('stake.Deposit') : t('stake.Approve')}
              </div>
              <div
                className={stakeAmount > 0 ? 'withdrawBtn' : 'withdrawBtn disable'}
                onClick={
                  stakeAmount > 0
                    ? () => {
                        setWithdraw(true)
                      }
                    : () => {}
                }
              >
                {t('stake.Withdraw')}
              </div>
            </div>
          </div>
        </StakeList>
        <div className="stake-btn">
          <Link
            to={{
              pathname: isSingle === 'true' ? '/swap' : '/add/' + lpData.token0addr + '/' + lpData.token1addr,
              search: isSingle === 'true' ? '?outputCurrency=' + lpData.lpAddresses : ''
            }}
          >
            {t('stake.GET')} {lpData.symbol}
            {isSingle === 'true' ? '' : '-LP'}
          </Link>
        </div>
        <div className="stake-back">
          <Link to={{ pathname: '/farm', search: '?type=' + (isSingle === 'true' ? 0 : 1) }}>{t('stake.Back')}</Link>
        </div>
        {isDeposit || isWithdraw ? (
          <>
            <MaskModal />
            <CommonModal>
              <img className="close-btn" src={closeImg} alt="" title="close" onClick={closeModal} />
              <div className="modal-title">
                {isDeposit ? t('stake.Deposit') : isWithdraw ? t('stake.Withdraw') : ''} {lpData.symbol}{' '}
                {isSingle === 'true' ? '' : 'LP'}
              </div>
              <div className="modal-form">
                <input
                  value={inputAmount}
                  onChange={getInputValue}
                  type="text"
                  name=""
                  className=""
                  id=""
                  placeholder="0.00"
                />
                <button onClick={getMax}>{t('Max')}</button>
              </div>
              <div className="modal-buttons">
                <button className="cancle" onClick={closeModal}>
                  {t('Cancle')}
                </button>
                <button
                  className={inputAmount > 0 ? 'confirm' : 'confirm disable'}
                  onClick={
                    inputAmount > 0
                      ? isDeposit
                        ? event => onDeposit(inputAmount)
                        : isWithdraw
                        ? event => onWithdraw('withdraw', inputAmount)
                        : () => {}
                      : () => {}
                  }
                >
                  {t('Confirm')}
                </button>
              </div>
            </CommonModal>
          </>
        ) : (
          <></>
        )}
        {pendingStatus ? (
          <>
            <MaskModal />
            <CommonModal>
              <img className="close-btn" src={closeImg} alt="" title="close" onClick={closeModal} />
              <div className="modal-title">
                {isDeposit ? 'Deposit' : isWithdraw ? 'Withdraw' : ''} {lpData.symbol} {isSingle === 'true' ? '' : 'LP'}
              </div>
              <div className="pending-circle">
                <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
                <Text fontWeight={500} fontSize={20} color={'white'}>
                  Waiting For Confirmation
                </Text>
              </div>
            </CommonModal>
          </>
        ) : (
          <></>
        )}
      </StakeContent>
    </>
  )
}
