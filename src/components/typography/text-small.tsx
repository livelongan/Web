import { Typography, type TypographyProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'

type TextSmallProps = PropsWithChildren<TypographyProps> & {}
export const TextSmall = observer(
  ({ className = '', children, sx, ...others }: TextSmallProps) => {
    return (
      <Typography
        className={`text-small ${className}`.trim()}
        variant='body2'
        component={'span'}
        sx={{
          [':hover']: {
            color: 'var(--border-color-primary)',
          },
          ...sx,
        }}
        {...others}
      >
        {children}
      </Typography>
    )
  },
)
