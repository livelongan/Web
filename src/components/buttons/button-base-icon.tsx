import { IconButton, type IconButtonProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import { useState } from 'react'

export type ButtonBaseIconProps = PropsWithChildren<
  IconButtonProps & {
    disableFrequently?: boolean
    frequency?: number
  }
>

export const ButtonBaseIcon = observer(
  ({
    children,
    sx,
    disableFrequently = false,
    frequency = 500,
    ...others
  }: ButtonBaseIconProps) => {
    const [lastTime, setLastTime] = useState(0)
    const [isFrequently, setIsFrequently] = useState(false)

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (isFrequently) return

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
      <IconButton
        aria-label={others.title}
        sx={{
          ...sx,
        }}
        {...others}
        onClick={handleClick}
        disabled={isFrequently || others.disabled}
      >
        {children}
      </IconButton>
    )
  },
)
