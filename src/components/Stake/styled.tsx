import styled from 'styled-components'

export const StakeContent = styled.div`
  color: #f1f1f1;
  font-size: 14px;
  position: relative;
  max-width: 1200px;
  margin: 110px auto 0px;
  width: 100%;

  div.stake-btn,
  div.stake-back {
    text-align: center;
    width: 260px;
    height: 50px;
    line-height: 50px;
    border-radius: 10px;
    margin: 82px auto 0px;
    background: #2d60e0;
    cursor: pointer;
    a {
      width: 100%;
      display: inline-block;
      color: #fff;
      text-decoration: none;
    }
    &:hover {
      opacity: 0.8;
    }
  }
  div.stake-back {
    margin: 30px auto 0px;
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        width:100%;
        margin:20px 0px;
        font-size:12px;
        div.stake-btn{
            margin-top:30px;
        }
    `};
`
export const StakeList = styled.div`
  display: flex;
  justify-content: center;
  & > div {
    width: 320px;
    height: 360px;
    background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
    border-radius: 10px;
    padding: 30px;
    p {
      display: flex;
      justify-content: center;
      margin: 0px;
      img {
        width: 50px;
        height: 50px;
        margin: 45px 0px 40px;
        &:nth-child(2n) {
          margin-left: -12px;
        }
      }
      &.amount {
        margin-bottom: 12px;
      }
    }
    & > div {
      display: flex;
      div {
        cursor: pointer;
        flex: 1;
        height: 50px;
        line-height: 50px;
        background: #2d60e0;
        border-radius: 10px;
        text-align: center;
        margin-top: 70px;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    &:last-of-type {
      margin-left: 58px;
      & > div {
        & > div {
          &:first-of-type {
            margin-right: 20px;
          }
        }
      }
    }
    div.withdrawRewardBtn,
    div.withdrawBtn {
      &.disable {
        color: #8992a9;
        background: #5f6a86;
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        margin-top:35px;
        flex-direction:column;
        &>div{
            width:100%;
            margin:12px 0px !important;
        }
    `}
`
export const CommonModal = styled.div`
  position: absolute;
  width: 460px;
  height: 300px;
  background: linear-gradient(90deg, #232a3b 0%, #161e2b 100%);
  border-radius: 10px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 22px 30px 30px;
  z-index: 999992;

  input,
  button {
    outline: none;
    border: none;
    background: transparent;
    font-size: 14px;
    height: 50px;
    line-height: 50px;
    color: #fff;
  }
  img.close-btn {
    width: 20px;
    height: 20px;
    position: absolute;
    right: 30px;
    top: 25px;
    cursor: pointer;
  }
  div.pending-circle {
    text-align: center;
    margin-top: 65px;
    div {
      margin-top: 56px;
    }
  }
  .modal-title {
    font-size: 20px;
  }
  .modal-form {
    width: 100%;
    height: 70px;
    background: #2d3648;
    border-radius: 10px;
    margin-top: 45px;
    padding: 15px;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      height: 100%;
      font-size: 30px;
      color: #fff;
    }
    button {
      min-width: 60px;
      height: 21px;
      line-height: 18px;
      border: 1px solid #ffffff;
      border-radius: 10px;
      text-align: center;
      cursor: pointer;
    }
  }
  .modal-buttons {
    margin-top: 62px;
    display: flex;
    button {
      cursor: pointer;
      width: 260px;
      background: #2d60e0;
      border-radius: 10px;
      text-align: center;
      &.cancle {
        background: #5f6a86;
        color: #8992a9;
        margin-right: 20px;
        &:hover {
          color: #fff;
        }
      }
      &.confirm {
        &.disable {
          background: #5f6a86;
          color: #8992a9;
        }
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        width:90%;
        position:fixed;
    `}
`
export const MaskModal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 999991;
`
