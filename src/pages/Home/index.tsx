import React, { useState, useEffect, useRef } from 'react'
import brandImg from 'assets/images/ok-swap/brand.png'
import guideImg from 'assets/images/ok-swap/guide.png'
import documentImg from 'assets/images/ok-swap/document.png'
import developImg from 'assets/images/ok-swap/develop.png'
import { useTranslation } from 'react-i18next'
import { getHomeInfo } from 'helpers/api'
import { toFixedDigit, numFormat } from 'utils/numFormat'
import DEFAULT_TOKEN_LIST from '@uniswap/default-token-list'
import { HomeContainer, HomeHeader, HomeDataset, HomeFooter } from './styled'

export default function Home() {
  const { t } = useTranslation()
  const [homeData, sethomeData] = useState<any>({
    poolTvl: 0,
    xtPrice: 0,
    deflationRate: 0,
    mingingOutput: 0,
    swap: {
      totalAmount: 0,
      totalCount: 0,
      lstDayAmount: 0
    },
    liquidity: {
      totalAmount: 0,
      lstDayAmount: 0
    },
    farm: {
      totalAmount: 0,
      depositCount: 0,
      lstDayAmount: 0
    },
    tradeMing: {
      totalAmount: 0,
      lstDayAmount: 0
    }
  })
  const inteNum = DEFAULT_TOKEN_LIST.tokens.length
  const ref: any = useRef()

  async function getHomeData() {
    let data = await getHomeInfo()
    sethomeData(data)
  }
  //无状态组件事件执行
  useEffect(() => {
    getHomeData()
    const timer = setInterval(() => {
      getHomeData()
    }, 10000)
    ref.current = timer

    return () => {
      clearInterval(ref.current)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <HomeContainer>
        <HomeHeader className="home-header">
          <p>
            {t('home.audit')}
            <a href="https://wswap.cool/docs/SmartContract_Audit.pdf" target="_blank" rel="noopener noreferrer">
              <img src={brandImg} alt="" />
            </a>
          </p>
        </HomeHeader>
        <HomeDataset className="home-dataset">
          <div className="dataset-market">
            <div>
              <div>
                {t('home.currentTvl')}(USDT)<span>{numFormat(toFixedDigit(homeData.poolTvl, 4))}</span>
              </div>
              <div>
                <div>
                  <p>{t('home.currentPrice')}</p>
                  <p className="price market-data">${numFormat(toFixedDigit(homeData.xtPrice, 4))}</p>
                </div>
                <div>
                  <p>{t('home.pendReward')}</p>
                  <p className="reward  market-data">${numFormat(toFixedDigit(homeData.mingingOutput, 4))}</p>
                </div>
                <div>
                  <p>{t('home.deflaRate')}</p>
                  <p className="rate  market-data">${numFormat(toFixedDigit(homeData.deflationRate, 4))}</p>
                </div>
              </div>
            </div>
            <div>
              <div>
                <p>{t('home.allVolume')}</p>
                <h3>${numFormat(toFixedDigit(homeData.swap.totalAmount, 4))}</h3>
              </div>
              <div>
                <p>{t('home.liquidityProvider')}</p>
                <h3>{numFormat(homeData.farm.depositCount)}</h3>
              </div>
              <div>
                <p>{t('home.tradTime')}</p>
                <h3>{numFormat(homeData.swap.totalCount)}</h3>
              </div>
              <div>
                <p>{t('home.partner')}</p>
                <h3>{numFormat(inteNum)}+</h3>
              </div>
            </div>
          </div>
          <div className="dataset-func">
            <div>
              <h3>{t('home.farm')}</h3>
              <p>
                {t('home.dayVolume')}
                <br />
                <span className="platVolume">${numFormat(toFixedDigit(homeData.farm.lstDayAmount, 4))}</span>
              </p>
              <p>
                {t('home.cumuVolume')}
                <br />
                <span className="cumuVolume">${numFormat(toFixedDigit(homeData.farm.totalAmount, 4))}</span>
              </p>
            </div>
            <div>
              <h3>{t('home.swap')}</h3>
              <p>
                {t('home.dayVolume')}
                <br />
                <span className="platVolume">${numFormat(toFixedDigit(homeData.swap.lstDayAmount, 4))}</span>
              </p>
              <p>
                {t('home.cumuVolume')}
                <br />
                <span className="cumuVolume">${numFormat(toFixedDigit(homeData.swap.totalAmount, 4))}</span>
              </p>
            </div>
            <div>
              <h3>{t('home.liquidity')}</h3>
              <p>
                {t('home.dayVolume')}
                <br />
                <span className="platVolume">${numFormat(toFixedDigit(homeData.liquidity.lstDayAmount, 4))}</span>
              </p>
              <p>
                {t('home.cumuVolume')}
                <br />
                <span className="cumuVolume">${numFormat(toFixedDigit(homeData.liquidity.totalAmount, 4))}</span>
              </p>
            </div>
            <div>
              <h3>{t('home.trad')}</h3>
              <p>
                {t('home.dayVolume')}
                <br />
                <span className="platVolume">${numFormat(toFixedDigit(homeData.tradeMing.lstDayAmount, 4))}</span>
              </p>
              <p>
                {t('home.cumuVolume')}
                <br />
                <span className="cumuVolume">${numFormat(toFixedDigit(homeData.tradeMing.totalAmount, 4))}</span>
              </p>
            </div>
          </div>
        </HomeDataset>
        <HomeFooter className="home-footer">
          <div className="document">
            <p>
              <img src={documentImg} alt="" />
            </p>
            <h3>{t('home.document')}</h3>
            <p>{t('home.documentText')}</p>
          </div>
          <div className="guide">
            <p>
              <img src={guideImg} alt="" />
            </p>
            <h3>{t('home.guide')}</h3>
            <p>{t('home.guideText')}</p>
          </div>
          <div className="develop">
            <p>
              <img src={developImg} alt="" />
            </p>
            <h3>{t('home.develop')}</h3>
            <p>{t('home.developText')}</p>
          </div>
        </HomeFooter>
      </HomeContainer>
    </>
  )
}
