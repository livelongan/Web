import { Typography, type TypographyProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'

type TitleLevel1Props = PropsWithChildren<TypographyProps>

export const TitleLevel1 = observer(
  ({ className = '', children, ...others }: TitleLevel1Props) => {
    return (
      <Typography
        className={`title-level-1 ${className}`.trim()}
        variant='h1'
        component='h1'
        {...others}
      >
        {children}
      </Typography>
    )
  },
)
