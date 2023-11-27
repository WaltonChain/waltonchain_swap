import React from 'react'
import styled from 'styled-components'

export const BodyWrapper = styled.div`
  position: relative;
  max-width: 420px;
  width: 100%;
  background: linear-gradient(90deg, #232A3B 0%, #161E2B 100%);
  border-radius: 10px;
  margin-top:110px;
  ${({ theme }) => theme.mediaWidth.upToSmall`
    margin-top:35px;
  `}
`

/**
 * The styled container element that wraps the content of most pages and the tabs.
 */
export default function AppBody({ children }: { children: React.ReactNode }) {
  return <BodyWrapper>
    {children}
  </BodyWrapper>
}
