import { Button, type ButtonProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'
import BlockIcon from '@mui/icons-material/Block'

type BaseButtonProps = PropsWithChildren<
  ButtonProps & {
    disableFrequently?: boolean
    frequency?: number
  }
>

export const BaseButton = observer(
  ({
    children,
    startIcon,
    disableFrequently = false,
    frequency = 500,
    ...others
  }: BaseButtonProps) => {
    const [lastTime, setLastTime] = useState(0)
    const [isFrequently, setIsFrequently] = useState(false)
    const title = others.title || (typeof children === 'string' ? children : '')

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isFrequently || others.disabled) return

      const now = Date.now()

      if (disableFrequently && now - lastTime < frequency) {
        return
      }

      setLastTime(now)

      if (disableFrequently) {
        setIsFrequently(true)
        setTimeout(() => {
          setIsFrequently(false)
        }, frequency)
      }

      if (others.onClick) {
        others.onClick(e)
      }
    }

    return (
      <Button
        aria-label={title}
        loadingPosition='start'
        formNoValidate
        startIcon={
          others.disabled || isFrequently ? (
            <BlockIcon sx={{ color: 'var(--error-color)' }} />
          ) : (
            startIcon
          )
        }
        {...others}
        onClick={handleClick}
        disabled={isFrequently || others.disabled}
      >
        {children}
      </Button>
    )
  },
)
