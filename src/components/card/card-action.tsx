import { CardActionArea, Stack, Card, type CardProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { type ReactNode } from 'react'
import { TextSmall, TitleLevel3 } from '../typography'
import { CardWrapper } from './card-wrapper'

type CardActionProps = CardProps & {
  selected?: boolean
  hiddenTitle?: boolean
  title?: string | ReactNode
  secondaryTitle?: string | ReactNode
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
}

export const CardAction = observer(
  ({
    title,
    secondaryTitle,
    hiddenTitle,
    selected,
    children,
    className = '',
    onClick,
    ...others
  }: CardActionProps) => {
    return (
      <Card
        className={`card-action ${className} ${selected ? 'Mui-selected' : undefined}`.trim()}
        {...others}
      >
        <CardActionArea
          onClick={onClick}
          className={selected ? 'Mui-selected' : undefined}
        >
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
        </CardActionArea>
      </Card>
    )
  },
)
