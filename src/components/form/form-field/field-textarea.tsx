import { observer } from 'mobx-react-lite'
import { FieldBase, type FieldBaseProps } from './field-base'

type FieldTextareaProps = FieldBaseProps & {}

export const FieldTextarea = observer(
  ({ className = '', ...others }: FieldTextareaProps) => {
    return (
      <FieldBase
        className={`field-textarea ${className}`.trim()}
        multiline
        minRows={18}
        maxRows={Infinity}
        {...others}
      />
    )
  },
)
