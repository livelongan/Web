import { observer } from 'mobx-react-lite'
import { BaseButton } from './base-button'
import type { BaseButtonProps } from './types'

type ButtonTextProps = BaseButtonProps

export const ButtonText = observer(
  ({ className = '', children, ...others }: ButtonTextProps) => {
    return (
      <BaseButton
        className={`button-text ${className}`.trim()}
        variant='text'
        {...others}
      >
        {children}
      </BaseButton>
    )
  },
)
