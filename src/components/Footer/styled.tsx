import styled from 'styled-components'

export const FooterContent = styled.div`
  width: 1200px;
  height: 100%;
  color: #f1f1f1;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0px auto;
  ${({ theme }) => theme.mediaWidth.upToSmall`
        flex-direction: column-reverse;
    `}
`
export const ToolCopy = styled.div`
  display: flex;
  align-items: center;
  div.tool {
    margin-right: 25px;
    cursor: pointer;
    width: 100px;
    height: 40px;
    line-height: 40px;
    background: #1c2230;
    border-radius: 20px;
    text-align: center;
    img {
      vertical-align: middle;
      margin-left: 10px;
      transform: rotate(180deg);
    }
    position: relative;
    ul {
      padding: 0px;
      position: absolute;
      list-style: none;
      width: 100%;
      background: #112f62;
      bottom: 30px;
      left: 0px;
      z-index: 1;
      border-radius: 10px;
      li {
        width: 100%;
        display: flex;
        height: 25px;
        align-items: center;
        justify-content: center;
        a {
          text-decoration: none;
          color: #f1f1f1;
        }
        &:hover {
          background: #194799;
        }
        &:first-of-type {
          border-radius: 10px 10px 0px 0px;
        }
        &:last-of-type {
          border-radius: 0px 0px 10px 10px;
        }
      }
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`
        font-size:12px;
        transform:scale(0.85);
    `}
`
export const ContactLinks = styled.div`
  a {
    img {
      width: 30px;
      height: 30px;
    }
    &:not(:last-of-type) {
      margin-right: 48px;
    }
  }
  ${({ theme }) => theme.mediaWidth.upToSmall`{
        margin-bottom:18px;
    `}
`
