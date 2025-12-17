import { observer } from 'mobx-react-lite'
import { BaseButton } from './base-button'
import type { BaseButtonProps } from './types'

type ButtonContainedProps = BaseButtonProps

export const ButtonContained = observer(
  ({ className = '', children, ...others }: ButtonContainedProps) => {
    return (
      <BaseButton
        className={`button-contained ${className}`.trim()}
        variant='contained'
        {...others}
      >
        {children}
      </BaseButton>
    )
  },
)
