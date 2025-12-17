import { observer } from 'mobx-react-lite'
import type { BaseButtonProps } from './types'
import { ButtonBaseIcon } from './button-base-icon'

type ButtonContainedIconProps = BaseButtonProps

export const ButtonContainedIcon = observer(
  ({ className = '', children, ...others }: ButtonContainedIconProps) => {
    return (
      <ButtonBaseIcon
        className={`button-contained-icon ${className}`.trim()}
        {...others}
      >
        {children}
      </ButtonBaseIcon>
    )
  },
)
