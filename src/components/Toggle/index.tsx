import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const ToggleElement = styled.span<{ isActive?: boolean; isOnSwitch?: boolean }>`
  display: inline-block;
  font-size: 14px !important;
  width: 50px;
  height: 100%;
  padding: 0.25rem 0.5rem;
  border-radius: 20px;
  background: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? '#2D60E0' : '#2D60E0') : '#5F6A86')};
  color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.white : theme.white) : theme.white)};
  font-size: 1rem;
  font-weight: 400;

  padding: 0.35rem 0.6rem;
  border-radius: 20px;
  background: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? '#2D60E0' : '#2D60E0') : '#5F6A86')};
  color: ${({ theme, isActive, isOnSwitch }) => (isActive ? (isOnSwitch ? theme.white : theme.white) : theme.white)};
  font-size: 1rem;
  font-weight: ${({ isOnSwitch }) => (isOnSwitch ? '500' : '400')};
  :hover {
    user-select: ${({ isOnSwitch }) => (isOnSwitch ? 'none' : 'initial')};
  }
`

const StyledToggle = styled.button<{ isActive?: boolean; activeElement?: boolean }>`
  border-radius: 20px;
  border: none;
  background: #5f6a86;
  display: flex;
  width: fit-content;
  cursor: pointer;
  outline: none;
  padding: 0;
  height: 32px;
`

export interface ToggleProps {
  id?: string
  name?: string
  isActive: boolean
  toggle: () => void
}

export default function Toggle({ id, name, isActive, toggle }: ToggleProps) {
  const { t } = useTranslation()
  return (
    <StyledToggle id={id} isActive={isActive} onClick={toggle}>
      <ToggleElement isActive={isActive} isOnSwitch={true}>
        {name === 'language' ? 'EN' : t('Toggle.ON')}
      </ToggleElement>
      <ToggleElement isActive={!isActive} isOnSwitch={false}>
        {name === 'language' ? '中文' : t('Toggle.OFF')}
      </ToggleElement>
    </StyledToggle>
  )
}
