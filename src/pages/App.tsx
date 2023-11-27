import React, { Suspense, useEffect } from 'react'
import { Route, Switch, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import GoogleAnalyticsReporter from '../components/analytics/GoogleAnalyticsReporter'
import AddressClaimModal from '../components/claim/AddressClaimModal'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Farm from './Farm'
import Polling from '../components/Header/Polling'
import URLWarning from '../components/Header/URLWarning'
import Popups from '../components/Popups'
import Web3ReactManager from '../components/Web3ReactManager'
import { ApplicationModal } from '../state/application/actions'
import { useModalOpen, useToggleModal } from '../state/application/hooks'
import DarkModeQueryParamReader from '../theme/DarkModeQueryParamReader'
import AddLiquidity from './AddLiquidity'
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity
} from './AddLiquidity/redirects'
import { RedirectToFarm, RedirectStakeToken, RedirectStakeType } from './Farm/redirects'
import Earn from './Earn'
import Manage from './Earn/Manage'
import MigrateV1 from './MigrateV1'
import MigrateV1Exchange from './MigrateV1/MigrateV1Exchange'
import RemoveV1Exchange from './MigrateV1/RemoveV1Exchange'
import Pool from './Pool'
import Trading from './Trading'
import Home from './Home'
import Bridge from './Bridge'
import PoolFinder from './PoolFinder'
import RemoveLiquidity from './RemoveLiquidity'
import { RedirectOldRemoveLiquidityPathStructure } from './RemoveLiquidity/redirects'
import Swap from './Swap'
import { RedirectPathToSwapOnly, RedirectToSwap } from './Swap/redirects'
import Vote from './Vote'
import { useTranslation } from 'react-i18next'
import VotePage from './Vote/VotePage'

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: flex-start;
  overflow-x: hidden;
  background: #0a0e17;
`

const HeaderWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  justify-content: space-between;
  background: rgb(10, 32, 86);
`
const FooterWrapper = styled.div`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  height: 78px;
  background: #070a10;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    height:auto;
    margin-bottom:120px;
    padding:0px 16px;
    background:transparent;
  `}
`

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // padding-top: 100px;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 10;
  background-color: #0a0e17;
  position: relative;
  min-height: 980px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    padding: 16px;
    padding-top: 2rem;
    min-height:auto;
  `};

  z-index: 1;
`
const BodyTitle = styled.div`
  margin-top: 100px;
  text-align: center;
  color: #f1f1f1;
  h1,
  h3 {
    font-weight: normal;
    margin: 0px;
  }
  h1 {
    font-size: 32px;
    height: 36px;
    line-height: 36px;
    margin-bottom: 30px;
  }
  h3 {
    height: 25px;
    line-height: 25px;
    font-size: 20px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
      margin-top:20px;
      h1{
          font-size: 14px;
          margin-bottom: 10px;
          height: auto;
          line-height: inherit;
      }
      h3{
          font-size:12px;
          transform:scale(0.85);
          height: auto;
          line-height: inherit;
      }
  `};
`

const Marginer = styled.div`
  margin-top: 5rem;
`

function TopLevelModals() {
  const open = useModalOpen(ApplicationModal.ADDRESS_CLAIM)
  const toggle = useToggleModal(ApplicationModal.ADDRESS_CLAIM)
  return <AddressClaimModal isOpen={open} onDismiss={toggle} />
}

export default function App() {
  const { t } = useTranslation()
  const location = useLocation()

  //监听location变化,改变页面内容
  useEffect(() => {}, [location])

  return (
    <Suspense fallback={null}>
      <Route component={GoogleAnalyticsReporter} />
      <Route component={DarkModeQueryParamReader} />
      <AppWrapper>
        <URLWarning />
        <HeaderWrapper>
          <Header />
        </HeaderWrapper>
        <BodyWrapper>
          <BodyTitle>
            <h1>{t('Title')}</h1>
            <h3>{t('SubTitle')}</h3>
          </BodyTitle>
          <Popups />
          <Polling />
          <TopLevelModals />
          <Web3ReactManager>
            <Switch>
              <Route exact strict path="/swap" component={Swap} />
              <Route exact strict path="/trad" component={Trading} />
              <Route exact strict path="/" component={Home} />
              <Route exact strict path="/bridge" component={Bridge} />
              <Route exact strict path="/farm" component={Farm} />
              <Route exact strict path="/farm/:type" component={RedirectStakeType} />
              <Route exact strict path="/stake" component={Farm} />
              <Route exact strict path="/stake" component={RedirectToFarm} />
              <Route exact path="/stake/:pid" component={RedirectStakeToken} />
              {/* <Route exact strict path="/claim" component={OpenClaimAddressModalAndRedirectToSwap} /> */}
              <Route exact strict path="/swap/:inputCurrency/:outputCurrency" component={RedirectToSwap} />
              <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
              <Route exact strict path="/find" component={PoolFinder} />
              <Route exact strict path="/pool" component={Pool} />
              <Route exact strict path="/uni" component={Earn} />
              <Route exact strict path="/vote" component={Vote} />
              <Route exact strict path="/create" component={RedirectToAddLiquidity} />
              <Route exact path="/add" component={AddLiquidity} />
              <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact path="/create" component={AddLiquidity} />
              <Route exact path="/create/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
              <Route exact path="/create/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
              <Route exact strict path="/remove/v1/:address" component={RemoveV1Exchange} />
              <Route exact strict path="/remove/:tokens" component={RedirectOldRemoveLiquidityPathStructure} />
              <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
              <Route exact strict path="/migrate/v1" component={MigrateV1} />
              <Route exact strict path="/migrate/v1/:address" component={MigrateV1Exchange} />
              <Route exact strict path="/uni/:currencyIdA/:currencyIdB" component={Manage} />
              <Route exact strict path="/vote/:id" component={VotePage} />
              <Route component={RedirectPathToSwapOnly} />
            </Switch>
          </Web3ReactManager>
          <Marginer />
        </BodyWrapper>
        <FooterWrapper>
          <Footer />
        </FooterWrapper>
      </AppWrapper>
    </Suspense>
  )
}
