import { CardContent, type CardContentProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { type ReactNode } from 'react'
type CardWrapperProps = CardContentProps & {
  title?: string | ReactNode
  secondaryTitle?: string | ReactNode
}

export const CardWrapper = observer(
  ({ sx, children, ...others }: CardWrapperProps) => {
    return (
      <CardContent sx={{ flex: 1, ...sx }} {...others}>
        {children}
      </CardContent>
    )
  },
)
