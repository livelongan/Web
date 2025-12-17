import { observer } from 'mobx-react-lite'
import { FieldBase, type FieldBaseProps } from './field-base'

type FieldStringProps = FieldBaseProps & {}

export const FieldString = observer(
  ({ className = '', ...others }: FieldStringProps) => {
    return (
      <FieldBase className={`field-string ${className}`.trim()} {...others} />
    )
  },
)
