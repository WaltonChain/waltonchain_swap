import styled from 'styled-components'

export const BridgeContent = styled.div`
  color: #f1f1f1;
  font-size: 14px;
  position: relative;
  max-width: 1200px;
  display: flex;
  margin: 35px auto 0px;
  justify-content: center;
  width: 100%;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    flex-direction:column;
  `}
`
export const BridgeSwap = styled.div`
  width: 380px;
  height: 660px;
  background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
  border-radius: 10px;
  padding: 0px 30px 30px;

  div.swap-head {
    height: 75px;
    line-height: 75px;
    font-size: 18px;
  }
  div.swap-form {
    & > div {
      margin-bottom: 12px;
      span {
        display: inline-block;
        margin-top: 10px;
        b {
          margin: 0px 5px;
          display: inline-block;
          color: #2cf3ff;
        }
      }
      div,
      input {
        width: 100%;
        height: 46px;
        background: #2d3648;
        border-radius: 10px;
        color: #fff;
        border: none;
        outline: none;
      }
      &.transfer {
        text-align: center;
        img {
          cursor: pointer;
        }
      }
      &.balance,
      &.fee {
        background: transparent;
        img {
          margin-right: 10px;
        }
        display: flex;
        justify-content: space-between;
        &.balance {
          margin-bottom: 24px;
        }
        &.fee {
          color: #2cf3ff;
        }
      }
      div {
        display: flex;
        align-items: center;
        position: relative;
        cursor: pointer;
        padding: 0px 10px 0px 12px;
        img.token-select {
          width: 13px;
          height: 9px;
          position: absolute;
          top: 50%;
          right: 10px;
          transform: translateY(-50%);
        }
        button {
          cursor: pointer;
          outline: none;
          border: none;
          background: transparent;
          color: #fff;
          border: 1px solid;
          border-radius: 10px;
          padding: 2px;
          font-size: 12px;
          width: 60px;
        }
      }
      input {
        font-size: 20px;
        padding-right: 10px;
      }
      label {
        display: inline-block;
        margin-bottom: 10px;
        & + div {
          position: relative;
        }
      }
      ul {
        position: absolute;
        width: 100%;
        border-radius: 5px;
        background: rgb(45, 54, 72);
        list-style-type: none;
        padding: 0px;
        top: 38px;
        left: 0px;
        z-index: 1;
        li {
          cursor: pointer;
          height: 35px;
          display: flex;
          align-items: center;
          padding-left: 12px;
          &:first-of-type {
            border-radius: 5px 5px 0px 0px;
          }
          &:last-of-type {
            border-radius: 0px 0px 5px 5px;
          }
          &:hover {
            background: rgb(33, 41, 57);
          }
        }
        &.token-ul {
          li {
            border-radius: inherit;
          }
        }
      }
    }
  }
  div.swap-btnGroup {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 30px;
    button {
      cursor: pointer;
      width: 140px;
      height: 46px;
      font-size: 16px;
      font-weight: bold;
      line-height: 46px;
      border-radius: 10px;
      color: #fff;
      outline: none;
      border: none;
      background: #2d60e0;
      &.approve {
        &.active {
          background: transparent;
          color: ${({ theme }) => theme.green1};
          border: 1px solid ${({ theme }) => theme.green1};
        }
      }
      &.carry,
      &.approve {
        &.disable {
          background: #5f6a86;
        }
      }
      ${({ theme }) => theme.mediaWidth.upToSmall`
        width:130px;
      `}
    }
    img {
      width: 9px;
      height: 13px;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
    width:100%;
  `}
`
export const BridgeDetail = styled.div`
  margin-left: 30px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin:30px 0px 0px;
  `}
`
export const DetailSchedule = styled.div`
  width: 340px;
  min-height: 79px;
  background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
  border-radius: 10px;
  div.schedule-head {
    padding: 0px 0px 0px 30px;
    cursor: pointer;
    height: 79px;
    line-height: 79px;
    position: relative;
    b {
      font-size: 18px;
    }
    & > img {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  div.schedule-content {
    padding: 25px 30px 0px;
    min-height: 468px;
    & > div {
      &:nth-of-type(2) {
        text-align: center;
        margin: 25px 0px;
        img {
          cursor: pointer;
        }
      }
      &.content-exchange {
        padding-bottom: 45px;
      }
      div.desc,
      div.progress-status {
        margin-bottom: 20px;
        &.desc {
          span {
            display: inline-block;
            margin-top: 12px;
          }
        }
        &.progress-status {
          & > div {
            display: flex;
            justify-content: space-between;
            &.status-bar {
              margin-top: 10px;
              height: 4px;
              background: #f2f4f8;
              border-radius: 10px;
              & > div {
                width: auto;
                background: #2cf3ff;
                border-radius: 10px;
              }
            }
          }
          span.rate {
            color: #2cf3ff;
          }
        }
      }
      img {
        margin-right: 10px;
      }
    }
  }
`
export const DetailRecord = styled.div`
  width: 340px;
  min-height: 83px;
  margin-top: 30px;
  background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
  border-radius: 10px;
  div.record-head {
    cursor: pointer;
    padding: 0px 0px 0px 30px;
    height: 83px;
    line-height: 83px;
    position: relative;
    span {
      img.record-search {
        margin-right: 12px;
      }
      b {
        font-size: 18px;
      }
    }
    & > img {
      position: absolute;
      right: 30px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  div.record-detail {
    padding: 30px 45px 0px 30px;
    height: 468px;
    background: #2d3648;
    position: relative;
    border-radius: 0px 0px 10px 10px;
    &::after {
      content: '';
      position: absolute;
      height: 100%;
      width: 0.52px;
      background: #181f2d;
      right: 30px;
      top: 0px;
    }
    & > div {
      &.transaction,
      &.status {
        & > div {
          height: 18px;
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          align-items: center;
        }
      }
      &.transaction {
        margin-top: 38px;
      }
      &.relation {
        margin-top: 35px;
        & > div {
          &.relation-from,
          &.relation-to {
            & > div {
              &:first-of-type {
                height: 20px;
                line-height: 20px;
                margin-bottom: 12px;
              }
              &:last-of-type {
                height: 18px;
                margin-top: 8px;
                line-height: 18px;
              }
              &:nth-of-type(2) {
                & > div {
                  &:first-of-type {
                    display: flex;
                    justify-content: space-between;
                    span:last-of-type {
                      color: #2cf3ff;
                    }
                  }
                  &:last-of-type {
                    margin-top: 10px;
                    border-radius: 10px;
                    height: 4px;
                    & > div {
                      width: 100%;
                      height: 100%;
                      background: #2cf3ff;
                      border-radius: 10px;
                    }
                  }
                }
              }
            }
            .from-status {
              background: #f2f4f8;
            }
          }
          &:nth-of-type(2) {
            text-align: center;
            margin: 15px 0px;
          }
        }
      }
      &.expand {
        cursor: pointer;
        position: absolute;
        right: 0px;
        top: 0px;
        height: 100%;
        width: 30px;
        img {
          position: absolute;
          left: 50%;
          transform: translate(-50%, -50%);
          top: 50%;
        }
      }
    }
  }
  div.record-content {
    max-height: 468px;
    overflow-y: auto;
    scrollbar-width: thin;
    scrollbar-color: #2d3648 transparent;
    &::-webkit-scrollbar {
      width: 15px;
      height: 10px;
    }

    &::-webkit-scrollbar-track {
      border-radius: 0px 0px 10px 0px;
      background: #48566a;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #2d60e0;
    }
    & > div {
      cursor: pointer;
      padding: 0px 45px 0px 30px;
      display: flex;
      height: 117px;
      flex-direction: column;
      justify-content: center;
      font-size: 12px;
      position: relative;
      &:hover {
        background: #2d3648;
      }
      &::after {
        content: '';
        position: absolute;
        height: 100%;
        width: 0.52px;
        background: #181f2d;
        right: 30px;
        top: 0px;
      }
      & > div {
        display: flex;
        align-items: center;
        justify-content: space-between;
        &.status,
        &.quantity {
          height: 18px;
          margin: 15px 0px;
          img {
            margin-right: 8px;
          }
        }
        &.relation {
          height: 25px;
          img {
            margin-right: 8px;
          }
        }
        &.expand {
          position: absolute;
          right: 0px;
          top: 0px;
          height: 100%;
          width: 30px;
          img {
            position: absolute;
            left: 50%;
            transform: translate(-50%, -50%);
            top: 50%;
          }
        }
      }
    }
  }
`
