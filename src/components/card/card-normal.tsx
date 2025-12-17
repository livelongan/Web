import { Stack, Card, type CardProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { type ReactNode } from 'react'
import { TextSmall, TitleLevel3 } from '../typography'
import { CardWrapper } from './card-wrapper'

type CardNormalProps = CardProps & {
  hiddenTitle?: boolean
  title?: string | ReactNode
  secondaryTitle?: string | ReactNode
}

export const CardNormal = observer(
  ({
    title,
    secondaryTitle,
    hiddenTitle,
    children,
    className = '',
    ...others
  }: CardNormalProps) => {
    return (
      <Card className={`card-action ${className}`.trim()} {...others}>
        <CardWrapper>
          {!hiddenTitle && (
            <Stack
              className='card-title'
              flexDirection={'row'}
              alignItems={'center'}
            >
              {typeof title !== 'object' ? (
                <TitleLevel3 sx={{ flex: 1 }}>{title}</TitleLevel3>
              ) : (
                title
              )}
              {typeof secondaryTitle !== 'object' ? (
                <TextSmall>{secondaryTitle}</TextSmall>
              ) : (
                title
              )}
            </Stack>
          )}
          {children}
        </CardWrapper>
      </Card>
    )
  },
)
