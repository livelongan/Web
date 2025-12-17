import { Typography, type TypographyProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'

type TitleLevel3Props = PropsWithChildren<TypographyProps>

export const TitleLevel3 = observer(
  ({ className = '', children, ...others }: TitleLevel3Props) => {
    return (
      <Typography
        className={`title-level-3 ${className}`.trim()}
        variant='h3'
        component='h3'
        {...others}
      >
        {children}
      </Typography>
    )
  },
)
