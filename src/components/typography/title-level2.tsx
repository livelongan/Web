import { Typography, type TypographyProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'
import Numbers from '@mui/icons-material/Numbers'

type TitleLevel2Props = PropsWithChildren<TypographyProps> & {
  displayIcon?: boolean
}

export const TitleLevel2 = observer(
  ({ className = '', children, displayIcon, ...others }: TitleLevel2Props) => {
    return (
      <Typography
        className={`title-level-2 ${className}`.trim()}
        variant='h2'
        component='h2'
        {...others}
      >
        {displayIcon && <Numbers />}
        {children}
      </Typography>
    )
  },
)
