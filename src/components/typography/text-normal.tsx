import { Typography, type TypographyProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'

type TextNormalProps = PropsWithChildren<TypographyProps>

export const TextNormal = observer(
  ({ className = '', children, ...others }: TextNormalProps) => {
    return (
      <Typography
        className={`text-normal ${className}`.trim()}
        variant='body1'
        component={'span'}
        {...others}
      >
        {children}
      </Typography>
    )
  },
)
