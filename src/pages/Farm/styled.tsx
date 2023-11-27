import styled from 'styled-components'
import triangleImg from 'assets/images/ok-swap/triangle.png'

export const FarmContent = styled.div`
  color: #f1f1f1;
  font-size: 14px;
  position: relative;
  max-width: 1200px;
  margin: 110px auto 0px;
  width: 100%;
  a {
    text-decoration: none;
    color: #fff;
    display: inline-block;
    width: 100%;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        width:100%;
        margin:20px 0px;
        font-size:12px;
    `};
`
export const FarmTable = styled.div`
  background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
  border-radius: 10px;
  div.table-head {
    height: 85px;
    padding: 20px 30px 0px;
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    & > div {
      &:first-of-type {
        font-size: 20px;
      }
    }
    span {
      font-size: 20px;
      color: #2cf3ff;
    }
  }
  div.table-content {
    min-height: 100px;
    position: relative;
    span.loadDot,
    span.noData {
      position: absolute;
      font-size: 28px;
      left: 50%;
      transform: translateX(-50%);
      bottom: 8px;
    }
    table {
      font-size: 14px;
      border-collapse: collapse;
      table-layout: fixed;
      width: 100%;
      img {
        width: 30px;
        height: 30px;
        vertical-align: middle;
        &:nth-child(2n) {
          margin-left: -8px;
        }
        &:last-of-type {
          margin-right: 10px;
        }
      }
      button {
        border: none;
        outline: none;
        width: 60px;
        color: #fff;
        font-size: 14px;
        cursor: pointer;
        height: 30px;
        background: #2d60e0;
        border-radius: 10px;
      }
      thead {
        tr {
          height: 30px;
          background: #2d3648;
          th {
            font-weight: normal;
            text-align: left;
            &:first-of-type {
              text-indent: 30px;
            }
          }
        }
      }
      tbody {
        tr {
          height: 60px;
          border-bottom: 1px solid #2f384c;
          td {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            word-wrap: break-word;
            &:first-of-type {
              text-indent: 30px;
            }
          }
        }
      }
    }
  }
  div.table-pagination {
    height: 65px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 15px;
      height: 15px;
      cursor: pointer;
    }
    span {
      margin: 0px 25px;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top:35px;
        div.table-head{
            font-size:12px;
            padding:0px 12px;
            align-items:center;
            span,&>div{
                &:first-of-type{
                    font-size:12px;
                }
            }
        }
        div.table-content{
            table{
                font-size:12px;
                img{
                    width:22px;
                    height:22px;
                }
                button{
                    font-size:12px;
                }
                th,td{
                    &:not(:first-of-type){
                        text-align:center !important;
                    }
                }
                thead,tbody{
                    tr{
                        th,td{
                            &:first-of-type{
                                text-indent:12px;
                            }
                        }
                    }
                }
            }
        }
    `};
`
export const FarmDataset = styled.div`
  margin-top: 30px;
  div.dataset-tabs {
    display: flex;
    font-size: 20px;
    display: flex;
    justify-content: center;
    & > div {
      width: 600px;
      cursor: pointer;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: #1c2230;
      color: #728195;
      &.active {
        background: #2d60e0;
        color: #fff;
      }
      &:first-of-type {
        border-radius: 10px 0px 0px 0px;
      }
      &:last-of-type {
        border-radius: 0px 10px 0px 0px;
      }
    }
  }
  div.dataset-navs {
    display: flex;
    height: 60px;
    align-items: center;
    justify-content: center;
    background: #123269;
    border-radius: 0px 0px 10px 10px;
    border: 1px solid #2d60e0;
    text-indent: 30px;
    & > div {
      margin-right: 15px;
      &.active {
        color: #2cf3ff;
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
              border-bottom: 8px solid #2cf3ff;
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
              border-top: 8px solid #2cf3ff;
            }
          }
        }
      }
    }
  }

  div.dataset-list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 40px;
    & > div {
      text-align: left;
      width: 380px;
      height: 320px;
      background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
      border-radius: 10px;
      padding: 18px 30px 30px;
      margin: 0px 30px 30px 0px;
      position: relative;
      h3 {
        font-size: 20px;
        font-weight: normal;
        margin: 0px 0px 60px;
        img {
          width: 50px;
          height: 50px;
          vertical-align: middle;
          margin-right: 8px;
          &:nth-child(2n) {
            margin-left: -20px;
          }
        }
      }
      p {
        font-weight: bold;
        display: flex;
        justify-content: flex-start;
        margin-bottom: 25px;
        align-items: center;
        span {
          &:first-of-type {
            margin-right: 18px;
          }
        }
      }
      div {
        margin-top: 45px;
        text-align: center;
        height: 50px;
        line-height: 50px;
        background: #2d60e0;
        border-radius: 10px;
        cursor: pointer;
        font-size: 16px;
      }
      &:nth-child(3n) {
        margin-right: 0px;
      }
      &::after {
        content: '';
        position: absolute;
        width: 56px;
        height: 56px;
        background: url(${triangleImg}) no-repeat;
        right: 0px;
        top: 0px;
      }
      span.apy {
        font-size: 16px;
        margin-left: 20px;
      }
      span.tvl {
        font-size: 16px;
        margin-left: 20px;
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top:12px;
        div.dataset-tabs{
            font-size:12px;
            &>div{
                height:48px;
                line-height:48px;
            }
        }
        div.dataset-navs{
            height:48px;
            text-indent:10px;
        }
        div.dataset-list{
            margin-top:12px;
            &>div{
                width:100%;
                margin:0px 0px 12px 0px;
            }
        }
    `}
`
