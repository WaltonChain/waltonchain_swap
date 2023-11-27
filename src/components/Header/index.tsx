import { ChainId } from '@uniswap/sdk'
import React, { useState } from 'react'
import Settings from '../Settings'
import { useTranslation } from 'react-i18next'
import { useActiveWeb3React } from '../../hooks'
import { useDarkModeManager } from '../../state/user/hooks'
import { useETHBalances } from '../../state/wallet/hooks'
import { CardNoise } from '../earn/styled'
import { TYPE } from '../../theme'
import logoImg from 'assets/images/ok-swap/logo.png'
import Web3Status from '../Web3Status'
import ClaimModal from '../claim/ClaimModal'
import { useToggleSelfClaimModal, useShowClaimPopup } from '../../state/application/hooks'
import { useUserHasAvailableClaim } from '../../state/claim/hooks'
import { useUserHasSubmittedClaim } from '../../state/transactions/hooks'
import { Dots } from '../swap/styleds'
import Modal from '../Modal'
import UniBalanceContent from './UniBalanceContent'
import { isMobile } from 'react-device-detect'
import {
  HeaderFrame,
  HeaderRow,
  Title,
  UniIcon,
  HeaderLinks,
  StyledNavLink,
  StyledExternalLink,
  HeaderControls,
  HeaderElement,
  HideSmall,
  NetworkCard,
  UNIWrapper,
  UNIAmount,
  AccountElement,
  BalanceText,
  HeaderElementWrap
} from './styled'
// import Menu from '../Menu'
// import { CountUp } from 'use-count-up'
// import { Moon, Sun } from 'react-feather'
// import Logo from '../../assets/svg/logo.svg'
// import usePrevious from '../../hooks/usePrevious'
// import LogoDark from '../../assets/svg/logo_white.svg'

const NETWORK_LABELS: { [chainId in ChainId]?: string } = {
  [ChainId.MAINNET]: 'MAINNET',
  [ChainId.RINKEBY]: 'Rinkeby',
  [ChainId.ROPSTEN]: 'Ropsten',
  [ChainId.GÖRLI]: 'Görli',
  [ChainId.KOVAN]: 'Kovan',
  [ChainId.OKLINK]: 'OKTEST',
  [ChainId.HECO]: 'HECO',
  [ChainId.BSC]: 'BSC'
}

export default function Header() {
  const { account, chainId } = useActiveWeb3React()
  const { t } = useTranslation()
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? '']
  // const [isDark] = useDarkModeManager()
  const [darkMode] = useDarkModeManager()
  const toggleClaimModal = useToggleSelfClaimModal()
  const availableClaim: boolean = useUserHasAvailableClaim(account)
  const { claimTxn } = useUserHasSubmittedClaim(account ?? undefined)

  // const aggregateBalance: TokenAmount | undefined = useAggregateUniBalance()

  const [showUniBalanceModal, setShowUniBalanceModal] = useState(false)
  const showClaimPopup = useShowClaimPopup()

  // const countUpValue = aggregateBalance?.toFixed(0) ?? '0'
  // const countUpValuePrevious = usePrevious(countUpValue) ?? '0'
  return (
    <HeaderFrame>
      <ClaimModal />
      <Modal isOpen={showUniBalanceModal} onDismiss={() => setShowUniBalanceModal(false)}>
        <UniBalanceContent setShowUniBalanceModal={setShowUniBalanceModal} />
      </Modal>
      <HeaderRow>
        <Title href=".">
          <UniIcon>
            <img
              style={{ marginTop: '4px', verticalAlign: 'middle' }}
              width={'100px'}
              src={darkMode ? logoImg : logoImg}
              alt="logo"
            />
          </UniIcon>
        </Title>
        <HeaderLinks>
          {isMobile ? (
            <>
              <div>
                <StyledNavLink className="swap-tab" id={`swap-nav-link`} to={'/swap'}>
                  {t('header.swap')}
                </StyledNavLink>
              </div>
              <div>
                <StyledNavLink
                  className="pool-tab"
                  id={`pool-nav-link`}
                  to={'/pool'}
                  isActive={(match, { pathname }) =>
                    Boolean(match) ||
                    pathname.startsWith('/add') ||
                    pathname.startsWith('/remove') ||
                    pathname.startsWith('/create') ||
                    pathname.startsWith('/find')
                  }
                >
                  {t('header.pool')}
                </StyledNavLink>
              </div>
              <div>
                <StyledNavLink className="trad-tab" id={`stake-nav-link`} to={'/trad'}>
                  {t('header.trad')}
                </StyledNavLink>
              </div>
              <div>
                <StyledNavLink className="farm-tab" id={`stake-nav-link`} to={'/farm'}>
                  {t('header.farm')}
                </StyledNavLink>
              </div>
              <div>
                <StyledExternalLink className="market-tab" id={`stake-nav-link`} href={'https://info.wswap.cool/'}>
                  {t('header.market')}
                </StyledExternalLink>
              </div>
            </>
          ) : (
            <>
              <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
                {t('header.swap')}
              </StyledNavLink>
              <StyledNavLink
                id={`pool-nav-link`}
                to={'/pool'}
                isActive={(match, { pathname }) =>
                  Boolean(match) ||
                  pathname.startsWith('/add') ||
                  pathname.startsWith('/remove') ||
                  pathname.startsWith('/create') ||
                  pathname.startsWith('/find')
                }
              >
                {t('header.pool')}
              </StyledNavLink>
              <StyledNavLink id={`stake-nav-link`} to={'/trad'}>
                {t('header.trad')}
              </StyledNavLink>
              <StyledNavLink id={`stake-nav-link`} to={'/farm'}>
                {t('header.farm')}
              </StyledNavLink>
              <StyledNavLink id={`stake-nav-link`} to={'/bridge'}>
                {t('header.bridge')}
              </StyledNavLink>
              <StyledExternalLink id={`stake-nav-link`} href={'https://info.wswap.cool/'}>
                {t('header.market')}
              </StyledExternalLink>
            </>
          )}
        </HeaderLinks>
      </HeaderRow>
      <HeaderControls>
        <HeaderElement>
          <HideSmall>
            {chainId && NETWORK_LABELS[chainId] && (
              <>
                <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
              </>
            )}
          </HideSmall>
          {availableClaim && !showClaimPopup && (
            <UNIWrapper onClick={toggleClaimModal}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                <TYPE.white padding="0 2px">
                  {claimTxn && !claimTxn?.receipt ? <Dots>Claiming XT</Dots> : 'Claim XT'}
                </TYPE.white>
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )}
          {/* {!availableClaim && aggregateBalance && (
            <UNIWrapper onClick={() => setShowUniBalanceModal(true)}>
              <UNIAmount active={!!account && !availableClaim} style={{ pointerEvents: 'auto' }}>
                {account && (
                  <HideSmall>
                    <TYPE.white
                      style={{
                        paddingRight: '.4rem'
                      }}
                    >
                      <CountUp
                        key={countUpValue}
                        isCounting
                        start={parseFloat(countUpValuePrevious)}
                        end={parseFloat(countUpValue)}
                        thousandsSeparator={','}
                        duration={1}
                      />
                    </TYPE.white>
                  </HideSmall>
                )}
                UNI
              </UNIAmount>
              <CardNoise />
            </UNIWrapper>
          )} */}
          <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
            {account && userEthBalance ? (
              <BalanceText style={{ flexShrink: 0 }} color={'white'} pl="0.75rem" pr="0.5rem" fontWeight={500}>
                {userEthBalance?.toSignificant(6)}{' '}
                {chainId && NETWORK_LABELS[chainId] === 'OKTEST'
                  ? 'OKT'
                  : chainId && NETWORK_LABELS[chainId] === 'HECO'
                  ? 'HT'
                  : chainId && NETWORK_LABELS[chainId] === 'BSC'
                  ? 'BNB'
                  : 'ETH'}
              </BalanceText>
            ) : null}
            <Web3Status />
          </AccountElement>
        </HeaderElement>
        <HeaderElementWrap>
          <Settings />
          {/* <StyledMenuButton onClick={() => toggleDarkMode()}>
            {darkMode ? <Moon size={20} /> : <Sun size={20} />}
          </StyledMenuButton> */}
          {/* <Menu /> */}
        </HeaderElementWrap>
      </HeaderControls>
    </HeaderFrame>
  )
}
