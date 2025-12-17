import { observer } from 'mobx-react-lite'
import { BaseButton } from './base-button'
import type { BaseButtonProps } from './types'

type ButtonOutlinedProps = BaseButtonProps

export const ButtonOutlined = observer(
  ({ className = '', children, ...others }: ButtonOutlinedProps) => {
    return (
      <BaseButton
        className={`button-outlined ${className}`.trim()}
        variant='outlined'
        {...others}
      >
        {children}
      </BaseButton>
    )
  },
)
