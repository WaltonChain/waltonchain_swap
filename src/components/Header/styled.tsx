import styled from 'styled-components'
import { Text } from 'rebass'
import { NavLink } from 'react-router-dom'
import { darken } from 'polished'
import { ExternalLink } from '../../theme'
import { YellowCard } from '../Card'
import Row, { RowFixed } from '../Row'
import swapImg from 'assets/images/ok-swap/swap.png'
import swapActiveImg from 'assets/images/ok-swap/swap_active.png'
import poolImg from 'assets/images/ok-swap/pool.png'
import poolActiveImg from 'assets/images/ok-swap/pool_active.png'
import tradImg from 'assets/images/ok-swap/trad.png'
import tradActiveImg from 'assets/images/ok-swap/trad_active.png'
import farmImg from 'assets/images/ok-swap/farm.png'
import farmActiveImg from 'assets/images/ok-swap/farm_active.png'
import marketImg from 'assets/images/ok-swap/market.png'
import marketActiveImg from 'assets/images/ok-swap/market_active.png'

export const HeaderFrame = styled.div`
  display: grid;
  grid-template-columns: 1fr 120px;
  align-items: center;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  width: 100%;
  top: 0;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 2;
  background: #070a10;
`
// ${({ theme }) => theme.mediaWidth.upToMedium`
// grid-template-columns: 1fr;
// padding: 0 1rem;
// width: calc(100%);
// position: relative;
// `};

// ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//     padding: 0.5rem 1rem;
// `}

export const HeaderControls = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-self: flex-end;
`
// ${({ theme }) => theme.mediaWidth.upToMedium`
//     flex-direction: row;
//     justify-content: space-between;
//     justify-self: center;
//     width: 100%;
//     max-width: 960px;
//     padding: 1rem;
//     position: fixed;
//     bottom: 0px;
//     left: 0px;
//     width: 100%;
//     z-index: 99;
//     height: 72px;
//     border-radius: 12px 12px 0 0;
//     background-color: ${({ theme }) => theme.bg1};
//   `};

export const HeaderElement = styled.div`
  display: flex;
  align-items: center;

  /* addresses safari's lack of support for "gap" */
  & > *:not(:first-child) {
    margin-left: 8px;
    background: transparent;
  }
`
// ${({ theme }) => theme.mediaWidth.upToMedium`
//    flex-direction: row-reverse;
//     align-items: center;
//   `};

export const HeaderElementWrap = styled.div`
  display: flex;
  align-items: center;
  & > div {
    margin: 0px;
  }
  ${({ theme }) => theme.mediaWidth.upToMedium`
    background:#1C2230;
    border-radius:4px;
    margin-left:8px;
  `}
`
export const HeaderRow = styled(RowFixed)``
// ${({ theme }) => theme.mediaWidth.upToMedium`
//    width: 100%;
//   `};

export const HeaderLinks = styled(Row)`
  justify-content: center;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    position:fixed;
    bottom:0px;
    left:0px;
    height:50px;
    background:#070A10;
    justify-content: space-evenly;
    div{
      height:100%;
      text-align:center;
      a{
        margin:0px;
        display:inline-block;
        text-align:center;
        line-height:80px;
        width:100%;
        height:100%;
        font-size:12px;
        transform:scale(0.85);
        &::after{
          width:0px !important;
        }
      }
    }
  `};
`
export const AccountElement = styled.div<{ active: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${({ theme, active }) => (!active ? theme.bg1 : '#2D3038 !important')};
  border-radius: 20px;
  white-space: nowrap;
  width: 100%;
  cursor: pointer;

  :focus {
    border: 1px solid blue;
  }
`
export const UNIAmount = styled(AccountElement)`
  color: white;
  padding: 4px 8px;
  height: 36px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.bg3};
  background: radial-gradient(174.47% 188.91% at 1.84% 0%, #ff007a 0%, #2172e5 100%), #edeef2;
`
export const UNIWrapper = styled.span`
  width: fit-content;
  position: relative;
  cursor: pointer;

  :hover {
    opacity: 0.8;
  }

  :active {
    opacity: 0.9;
  }
`
export const HideSmall = styled.span`
  position: relative;
  img {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
  ul {
    position: absolute;
    width: 100%;
    background: #1c2230;
    color: #fff;
    border-radius: 10px;
    padding: 0px;
    list-style-type: none;
    li {
      cursor: pointer;
      height: 30px;
      text-align: center;
      line-height: 30px;
      &:first-of-type {
        border-radius: 10px 10px 0px 0px;
      }
      &:last-of-type {
        border-radius: 0px 0px 10px 10px;
      }
      &:hover {
        background: #2d3038;
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
      display: none;
  `};
`
// ${({ theme }) => theme.mediaWidth.upToSmall`
//     display: none;
//   `};

export const NetworkCard = styled(YellowCard)`
  width: 100px;
  font-size: 14px;
  text-align: center;
  line-height: 40px;
  height: 40px;
  background: #1c2230;
  border-radius: 20px;
  padding: 0px;
  cursor: pointer;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    border-radius:4px;
    line-height:34px;
    height:34px;
    font-size:12px;
    width:auto;
    padding:0px 8px;
  `}
`
// ${({ theme }) => theme.mediaWidth.upToSmall`
//     margin: 0;
//     margin-right: 0.5rem;
//     width: initial;
//     overflow: hidden;
//     text-overflow: ellipsis;
//     flex-shrink: 1;
//   `};

export const BalanceText = styled(Text)`
  ${({ theme }) => theme.mediaWidth.upToExtraSmall`
    display: none;
  `};
`

export const Title = styled.a`
  display: flex;
  align-items: center;
  pointer-events: auto;
  justify-self: flex-start;
  margin-right: 12px;

  :hover {
    cursor: pointer;
  }
`
// ${({ theme }) => theme.mediaWidth.upToSmall`
//     justify-self: center;
//   `};

export const UniIcon = styled.div`
  transition: transform 0.3s ease;
  :hover {
    transform: rotate(-5deg);
  }
`
export const activeClassName = 'ACTIVE'
export const StyledNavLink = styled(NavLink).attrs({
  activeClassName
})`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: #738194;
  font-size: 14px;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  &.swap-tab {
    background: url(${swapImg}) no-repeat center 5px;
  }
  &.pool-tab {
    background: url(${poolImg}) no-repeat center 5px;
  }
  &.farm-tab {
    background: url(${farmImg}) no-repeat center 5px;
  }
  &.trad-tab {
    background: url(${tradImg}) no-repeat center 5px;
  }

  &.${activeClassName} {
    border-radius: 12px;
    color: ${({ theme }) => theme.white};

    position: relative;
    &.swap-tab {
      background: url(${swapActiveImg}) no-repeat center 5px;
    }
    &.pool-tab {
      background: url(${poolActiveImg}) no-repeat center 5px;
    }
    &.farm-tab {
      background: url(${farmActiveImg}) no-repeat center 5px;
    }
    &.trad-tab {
      background: url(${tradActiveImg}) no-repeat center 5px;
    }
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 2px;
      background: #2d60e0;
      bottom: -24px;
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.white)};
  }
`
export const StyledExternalLink = styled(ExternalLink).attrs({
  activeClassName
})<{ isActive?: boolean }>`
  ${({ theme }) => theme.flexRowNoWrap}
  align-items: left;
  border-radius: 3rem;
  outline: none;
  cursor: pointer;
  text-decoration: none;
  color: #738194;
  font-size: 14px;
  width: fit-content;
  margin: 0 12px;
  font-weight: 500;
  &.market-tab {
    background: url(${marketImg}) no-repeat center 5px;
  }

  &.${activeClassName} {
    border-radius: 12px;
    font-weight: 600;
    color: ${({ theme }) => theme.white};
    &.market-tab {
      background: url(${marketActiveImg}) no-repeat center 5px;
    }
  }

  :hover,
  :focus {
    color: ${({ theme }) => darken(0.1, theme.white)};
  }
`
// ${({ theme }) => theme.mediaWidth.upToExtraSmall`
//       display: none;
// `}

export const StyledMenuButton = styled.button`
  position: relative;
  width: 100%;
  height: 100%;
  border: none;
  background-color: transparent;
  margin: 0;
  padding: 0;
  height: 35px;
  background-color: ${({ theme }) => theme.bg3};
  margin-left: 8px;
  padding: 0.15rem 0.5rem;
  border-radius: 0.5rem;

  :hover,
  :focus {
    cursor: pointer;
    outline: none;
    background-color: ${({ theme }) => theme.bg4};
  }

  svg {
    margin-top: 2px;
  }
  > * {
    stroke: ${({ theme }) => theme.text1};
  }
`
