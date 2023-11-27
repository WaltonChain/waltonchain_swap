import React, { ReactNode, useMemo } from 'react'
import { BLOCKED_ADDRESSES } from '../../constants'
import { useActiveWeb3React } from '../../hooks'
import { useTranslation } from 'react-i18next'

export default function Blocklist({ children }: { children: ReactNode }) {
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()
  const blocked: boolean = useMemo(() => Boolean(account && BLOCKED_ADDRESSES.indexOf(account) !== -1), [account])
  if (blocked) {
    return <div>{t('Blocklist.BlockedAddress')}</div>
  }
  return <>{children}</>
}
