import styled from 'styled-components'

export const HomeContainer = styled.div`
  width: 1200px;
  height: auto;
  color: #f1f1f1;
  font-size: 16px;
  position: relative;
  margin: 30px auto 0px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        width:100%;
        margin:20px 0px;
        font-size:12px;
    `};
`
export const HomeHeader = styled.div`
  text-align: center;
  h1,
  h3,
  p {
    margin: 0px;
  }
  h1 {
    font-size: 32px;
    span {
      color: #2cf3ff;
    }
    margin-bottom: 20px;
  }
  h3 {
    font-weight: normal;
    font-size: 16px;
    margin-bottom: 38px;
  }
  p {
    font-size: 20px;
    img {
      width: 151px;
      height: 40px;
      vertical-align: middle;
      margin-left: 25px;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        h1{
            font-size: 16px;
            margin-bottom: 10px;
            height: auto;
            line-height: inherit;
        }
        h3,p{
            font-size: 12px;
            margin-bottom: 18px;
            height: auto;
            line-height: inherit;
        }
    `};
`
export const HomeDataset = styled.div`
  margin-top: 65px;
  div.dataset-market {
    display: flex;
    & > div {
      height: 180px;
      border-radius: 10px;
      &:first-of-type {
        display: flex;
        flex-direction: column;
        padding: 35px 35px 0px;
        background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
        width: 740px;
        & > div {
          &:first-of-type {
            font-size: 32px;
            span {
              color: #46ffaa;
              margin-left: 12px;
            }
          }
          &:last-of-type {
            margin-top: 32px;
            display: flex;
            p {
              font-size: 14px;
              margin: 0px;
              &.market-data {
                margin-top: 10px;
                font-size: 20px;
                font-weight: bold;
              }
              &.price {
                color: #2cf3ff;
              }
              &.reward {
                color: #fff15b;
              }
              &.rate {
                color: #d863ff;
              }
            }
            & > div {
              position:relative &:not(:first-of-type) {
                text-indent: 32px;
              }
              &:first-of-type {
                width: 125px;
              }
              &:nth-of-type(2) {
                width: 245px;
              }
              &:not(:last-of-type) {
                &::after {
                  content: '';
                  position: absolute;
                  width: 1px;
                  height: 36px;
                  background: #2f384c;
                  right: 0px;
                  top: 50%;
                  transform: translateY(-50%);
                }
              }
            }
          }
        }
      }
      &:last-of-type {
        background: #2d60e0;
        width: 440px;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        margin-left: 20px;
        padding: 0px 30px;
        h3,
        p {
          margin: 0px;
        }
        h3 {
          font-size: 20px;
        }
        p {
          font-size: 14px;
          margin-bottom: 10px;
        }
        & > div {
          width: 50%;
          &:nth-child(2n) {
            text-indent: 30px;
            &::after {
              content: '';
              position: absolute;
              width: 1px;
              height: 36px;
              background: #4979f2;
              top: 50%;
              transform: translateY(-50%);
              left: 0px;
            }
          }
          position: relative;
        }
      }
    }
  }
  div.dataset-func {
    display: flex;
    height: 240px;
    background: #2d3648;
    border-radius: 10px;
    margin-top: 20px;
    padding: 35px 0px 0px;
    & > div {
      width: 25%;
      padding-left: 80px;
      position: relative;
      &:not(:last-of-type) {
        &::after {
          content: '';
          position: absolute;
          width: 1px;
          height: 165px;
          background: #454f63;
          top: 0px;
          right: 0px;
        }
      }
      h3,
      p {
        margin: 0px;
      }
      h3 {
        font-size: 20px;
        margin-bottom: 38px;
      }
      p {
        line-height: 25px;
        font-size: 14px;
        span {
          font-size: 16px;
          &.platVolume {
            color: #2cf3ff;
          }
          &.cumuVolume {
            color: #46ffaa;
          }
        }
        &:last-of-type {
          margin-top: 10px;
        }
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top:25px;
        div.dataset-market{
            flex-direction:column;
            &>div{
                &:first-of-type{
                    width:100%;
                    padding:0px 12px;
                    &>div{
                        &:first-of-type{
                            height: 68px;
                            font-size: 12px;
                            display: flex;
                            line-height:26px;
                            align-items: center;
                            flex-direction: column;
                            justify-content: center;
                            border-bottom: 1px solid #454F63;
                            span{
                                font-size:20px;
                            }
                        }
                        &:last-of-type{
                            flex-wrap:wrap;
                            margin-top:12px;
                            p{
                                font-size:12px;
                                &.market-data{
                                    font-size:16px;
                                    margin-top:4px;
                                }
                            }
                            &>div{
                                text-indent:0px !important;
                                width:50% !important;
                                margin-bottom:10px;
                                &::after{
                                    width:0px !important;
                                }
                            }
                        }
                    }
                }
                &:last-of-type{
                    margin: 12px 0px 0px;
                    width: 100%;
                    padding: 14px 12px 0px;
                    h3{
                        font-size:16px;
                    }
                    p{
                        font-size:12px;
                        margin-bottom:5px;
                    }
                }
            }
        }
        div.dataset-func{
            flex-wrap:wrap;
            padding: 14px 12px;
            height: auto;
            &>div{
                width:50%;
                padding:0px;
                &::after{
                    width:0px !important;
                }
                &:first-of-type,&:nth-of-type(2){
                    margin-bottom:30px;
                }
                h3{
                    font-size:16px;
                    margin-bottom:16px;
                }
                p{
                    line-height:20px;
                    font-size:12px;
                    span{
                        font-size:12px;
                    }
                }
            }
        }
    `}
`
export const HomeFooter = styled.div`
  display: flex;
  font-size: 14px;
  margin: 125px 0px 100px;
  & > div {
    flex: 1;
    text-align: center;
    p,
    h3 {
      margin: 0px;
    }
    h3 {
      font-size: 20px;
      margin: 30px 0px 16px;
    }
    p {
      line-height: 20px;
    }
    &.document {
      img {
        width: 56px;
        height: 52px;
      }
    }
    &.guide {
      img {
        width: 46px;
        height: 52px;
      }
    }
    &.develop {
      img {
        width: 51px;
        height: 52px;
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin:45px 0px 0px;
        &>div{
            h3{
                font-size:12px !important;
                margin:0px !important;
            }
            p{
                line-height:inherit !important;
                font-size:12px;
                transform:scale(0.65);
            }
            &:first-of-type{
                p{
                    &:last-of-type{
                        margin-top:-5px;
                    }
                }
            }
        }
    `}
`
