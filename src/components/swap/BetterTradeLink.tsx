import { stringify } from 'qs'
import React, { useContext, useMemo } from 'react'
import { useLocation } from 'react-router'
import { Text } from 'rebass'
import { ThemeContext } from 'styled-components'
import useParsedQueryString from '../../hooks/useParsedQueryString'
import useToggledVersion, { DEFAULT_VERSION, Version } from '../../hooks/useToggledVersion'
import { useTranslation } from 'react-i18next'
import { StyledInternalLink } from '../../theme'
import { YellowCard } from '../Card'
import { AutoColumn } from '../Column'

function VersionLinkContainer({ children }: { children: React.ReactNode }) {
  const theme = useContext(ThemeContext)

  return (
    <YellowCard style={{ marginTop: '12px', padding: '0.5rem 0.5rem' }}>
      <AutoColumn gap="sm" justify="center" style={{ alignItems: 'center', textAlign: 'center' }}>
        <Text lineHeight="145.23%;" fontSize={14} fontWeight={400} color={theme.text1}>
          {children}
        </Text>
      </AutoColumn>
    </YellowCard>
  )
}

export default function BetterTradeLink({ version }: { version: Version }) {
  const location = useLocation()
  const search = useParsedQueryString()
  const { t } = useTranslation()

  const linkDestination = useMemo(() => {
    return {
      ...location,
      search: `?${stringify({
        ...search,
        use: version !== DEFAULT_VERSION ? version : undefined
      })}`
    }
  }, [location, search, version])

  return (
    <VersionLinkContainer>
      {t('Swaper.BetterTradeLink.BetterTrade')}{' '}
      <StyledInternalLink to={linkDestination}>
        <b>Waltonchain-swap {version.toUpperCase()} ↗</b>
      </StyledInternalLink>
    </VersionLinkContainer>
  )
}

export function DefaultVersionLink() {
  const location = useLocation()
  const search = useParsedQueryString()
  const version = useToggledVersion()
  const { t } = useTranslation()

  const linkDestination = useMemo(() => {
    return {
      ...location,
      search: `?${stringify({
        ...search,
        use: DEFAULT_VERSION
      })}`
    }
  }, [location, search])

  return (
    <VersionLinkContainer>
      {t('Swaper.BetterTradeLink.Showing')} {version.toUpperCase()} {t('Swaper.BetterTradeLink.Price')}{' '}
      <StyledInternalLink to={linkDestination}>
        <b>
          {t('Swaper.BetterTradeLink.SwitchTo')} Waltonchain-swap {DEFAULT_VERSION.toUpperCase()} ↗
        </b>
      </StyledInternalLink>
    </VersionLinkContainer>
  )
}
