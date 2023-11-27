import { Trade, TradeType } from '@uniswap/sdk'
import React, { useContext } from 'react'
import { ThemeContext } from 'styled-components'
import { Field } from '../../state/swap/actions'
import { useUserSlippageTolerance } from '../../state/user/hooks'
import { TYPE } from '../../theme'
import { computeSlippageAdjustedAmounts, computeTradePriceBreakdown } from '../../utils/prices'
import { AutoColumn } from '../Column'
import QuestionHelper from '../QuestionHelper'
import { RowBetween, RowFixed } from '../Row'
import FormattedPriceImpact from './FormattedPriceImpact'
import SwapRoute from './SwapRoute'
import { useTranslation } from 'react-i18next'

// const InfoLink = styled(ExternalLink)`
//   width: 100%;
//   border: 1px solid ${({ theme }) => theme.bg3};
//   padding: 6px 6px;
//   border-radius: 8px;
//   text-align: center;
//   font-size: 14px;
//   color: ${({ theme }) => theme.text1};
// `

function TradeSummary({ trade, allowedSlippage }: { trade: Trade; allowedSlippage: number }) {
  const theme = useContext(ThemeContext)
  const { priceImpactWithoutFee, realizedLPFee } = computeTradePriceBreakdown(trade)
  const isExactIn = trade.tradeType === TradeType.EXACT_INPUT
  const slippageAdjustedAmounts = computeSlippageAdjustedAmounts(trade, allowedSlippage)
  const { t } = useTranslation()

  return (
    <>
      <AutoColumn>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.white}>
              {isExactIn
                ? t('Swaper.AdvancedSwapDetails.MinimumReceived')
                : t('Swaper.AdvancedSwapDetails.MaximumSold')}
            </TYPE.black>
            <QuestionHelper text={t('Swaper.AdvancedSwapDetails.UnfavorableConfirmed')} />
          </RowFixed>
          <RowFixed>
            <TYPE.black color={theme.white} fontSize={14}>
              {isExactIn
                ? `${slippageAdjustedAmounts[Field.OUTPUT]?.toSignificant(4)} ${trade.outputAmount.currency.symbol}` ??
                  '-'
                : `${slippageAdjustedAmounts[Field.INPUT]?.toSignificant(4)} ${trade.inputAmount.currency.symbol}` ??
                  '-'}
            </TYPE.black>
          </RowFixed>
        </RowBetween>
        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.white}>
              {t('Swaper.AdvancedSwapDetails.PriceImpact')}
            </TYPE.black>
            <QuestionHelper text={t('Swaper.AdvancedSwapDetails.DifferenceTrade')} />
          </RowFixed>
          <FormattedPriceImpact priceImpact={priceImpactWithoutFee} />
        </RowBetween>

        <RowBetween>
          <RowFixed>
            <TYPE.black fontSize={14} fontWeight={400} color={theme.white}>
              {t('Swaper.AdvancedSwapDetails.LiquidityFee')}
            </TYPE.black>
            <QuestionHelper text={t('Swaper.AdvancedSwapDetails.ProtocolIncentive')} />
          </RowFixed>
          <TYPE.black fontSize={14} color={theme.white}>
            {realizedLPFee ? `${realizedLPFee.toSignificant(4)} ${trade.inputAmount.currency.symbol}` : '-'}
          </TYPE.black>
        </RowBetween>
      </AutoColumn>
    </>
  )
}

export interface AdvancedSwapDetailsProps {
  trade?: Trade
}

export function AdvancedSwapDetails({ trade }: AdvancedSwapDetailsProps) {
  const theme = useContext(ThemeContext)
  const { t } = useTranslation()

  const [allowedSlippage] = useUserSlippageTolerance()

  const showRoute = Boolean(trade && trade.route.path.length > 2)

  return (
    <AutoColumn gap="0px">
      {trade && (
        <>
          <TradeSummary trade={trade} allowedSlippage={allowedSlippage} />
          {showRoute && (
            <>
              <RowBetween>
                <span style={{ display: 'flex', alignItems: 'left' }}>
                  <TYPE.black style={{ width: 'max-content' }} fontSize={14} fontWeight={400} color={theme.white}>
                    {t('Swaper.AdvancedSwapDetails.Route')}
                  </TYPE.black>
                  <QuestionHelper text={t('Swaper.AdvancedSwapDetails.BestTrade')} />
                </span>
                <SwapRoute trade={trade} />
              </RowBetween>
            </>
          )}
          {!showRoute && (
            // <AutoColumn style={{ padding: '12px 16px 0 16px' }}>
            //   <InfoLink
            //     href={'https://uniswap.info/pair/' + trade.route.pairs[0].liquidityToken.address}
            //     target="_blank"
            //   >
            //     View pair analytics ↗
            //   </InfoLink>
            // </AutoColumn>
            <></>
          )}
        </>
      )}
    </AutoColumn>
  )
}
