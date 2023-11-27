import styled from 'styled-components'
import poolBgImg from 'assets/images/ok-swap/bg_pool.png'
import withdrawBgImg from 'assets/images/ok-swap/bg_withdraw.png'
import minPoolBgImg from 'assets/images/ok-swap/min_bg_pool.png'
import minWithdrawBgImg from 'assets/images/ok-swap/min_bg_withdraw.png'

export const TradContent = styled.div`
  width: 1200px;
  margin: 110px auto 0px;
  position: relative;
  color: #fff;
  font-size: 16px;

  ${({ theme }) => theme.mediaWidth.upToSmall`
        width:100%;
        margin:20px 0px;
        font-size:12px;
    `};
`
export const TradFunc = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: 585px;
    height: 120px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-indent: 25px;
    font-size: 14px;
    line-height: 32px;
    button {
      cursor: pointer;
      outline: none;
      border: none;
      width: 80px;
      height: 26px;
      background: #ffffff;
      border-radius: 13px;
      color: #2d60e0;
      margin-left: 25px;
      &:hover {
        opacity: 0.85;
      }
      &.disable {
        background: #5f6a86;
        opacity: 1;
        color: #8992a9;
      }
    }
    span {
      font-size: 26px;
    }
    &.func-pool {
      span {
        color: #2cf3ff;
      }
      background: url(${poolBgImg}) no-repeat;
    }
    &.func-withdraw {
      span {
        color: #46ffaa;
      }
      background: url(${withdrawBgImg}) no-repeat;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top:35px;
        flex-wrap:wrap;
        &>div{
            width:100%;
            height:80px;
            font-size:12px;
            margin-bottom:12px;
            span{
                font-size:20px;
            }
            &.func-pool{
                background:url(${minPoolBgImg}) no-repeat;
            }
            &.func-withdraw{
                background:url(${minWithdrawBgImg}) no-repeat;
            }
        }
    `};
`
export const TradTable = styled.div`
  .table-content {
    min-height: 200px;
    position: relative;
    background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
    border-radius: 10px;
    margin-top: 30px;
    padding: 0px 30px;
    span.loadDot,
    span.noData {
      position: absolute;
      font-size: 28px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 40px;
    }
    table {
      font-size: 14px;
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      img {
        width: 30px;
        height: 30px;
        &:nth-child(2n) {
          margin-left: -8px;
        }
      }
      thead {
        tr {
          height: 80px;
          border-bottom: 1px solid #2f384c;
          th {
            font-weight: normal;
            text-align: left;
            &:first-of-type {
              text-indent: 5px;
            }
            span {
              position: relative;
              margin-left: 5px;
              span {
                display: inline-block;
                width: 0;
                height: 0;
                position: absolute;
                left: 0px;
                cursor: pointer;
                &:first-of-type {
                  top: 0px;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;
                  border-bottom: 8px solid #fff;
                  &.active {
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-bottom: 8px solid #2d60e0;
                  }
                }
                &:last-of-type {
                  bottom: -2px;
                  border-left: 6px solid transparent;
                  border-right: 6px solid transparent;
                  border-top: 8px solid #fff;
                  &.active {
                    border-left: 6px solid transparent;
                    border-right: 6px solid transparent;
                    border-top: 8px solid #2d60e0;
                  }
                }
              }
            }
          }
        }
      }
      tbody {
        tr {
          height: 52px;
          &:not(:last-of-type) {
            border-bottom: 1px solid #2f384c;
          }
          td {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-wrap: break-word;
            &:first-of-type {
              display: flex;
              height: 52px;
              align-items: center;
              text-indent: 5px;
            }
            & > div {
              &:first-of-type {
                width: 75px;
              }
            }
          }
        }
      }
      th,
      td {
        &.lp-swap {
          width: 180px;
        }
        &.apy {
          width: 218px;
        }
        &.all-reward {
          width: 145px;
        }
        &.total-quantity {
          width: 145px;
        }
        &.pool-quantity {
          width: 145px;
        }
        &.person-quantity {
          width: 145px;
        }
        &.person-reward {
          width: 145px;
        }
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        .table-content{
            margin-top:0px;
            padding:0px 12px;
            table{
                font-size:12px;
                th,td{
                    &:not(:first-of-type){
                        text-align:center !important;
                    }
                    width:auto !important;
                }
                img{
                    width:20px;
                    height:20px;
                    &:nth-child(2n){
                        margin-left:-8px;
                    }
                }
                tbody{
                    tr{
                        td{
                            &>div{
                                &:first-of-type{
                                    width:auto;
                                    margin-right:5px;
                                }
                            }
                        }
                    }
                }
            }
        }
    `};
`
