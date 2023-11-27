import React from 'react'
import styled from 'styled-components'
import { RowBetween } from '../Row'
import { TYPE } from '../../theme'
import { useTranslation } from 'react-i18next'
import { isMobile } from 'react-device-detect'
import { StyledNavLink } from '../../components/Header/styled'

const StyledSwapHeader = styled.div`
  padding: 12px 1rem 0px 1.5rem;
  width: 100%;
  max-width: 420px;
  color: ${({ theme }) => theme.white};
  ${({ theme }) => theme.mediaWidth.upToSmall`
    display:flex;
    &>div{
      justify-content:center;
      width:80px;
      height:42px;
      position:relative;
      a.ACTIVE{
        &::after{
          content:'';
          position:absolute;
          width:80px;
          height:2px;
          border-radius:10px;
          background:#2D60E0;
          bottom:-10px;
          left:50%;
          transform:translateX(-50%);
        }
      }
    }
  `}
`

export default function SwapHeader() {
  const { t } = useTranslation()

  return (
    <StyledSwapHeader>
      {isMobile ? (
        <>
          <RowBetween>
            <StyledNavLink id={`swap-nav-link`} to={'/swap'}>
              {t('header.swap')}
            </StyledNavLink>
          </RowBetween>
          <RowBetween>
            <StyledNavLink id={`swap-nav-link`} to={'/bridge'}>
              {t('header.bridge')}
            </StyledNavLink>
          </RowBetween>
        </>
      ) : (
        <RowBetween>
          <TYPE.black fontWeight={500} color={'white'}>
            {t('SwapHeader.Swap')}
          </TYPE.black>
        </RowBetween>
      )}
    </StyledSwapHeader>
  )
}
