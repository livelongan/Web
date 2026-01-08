import { observer } from 'mobx-react-lite'
import { FieldBase, type FieldBaseProps } from './field-base'

type FieldTextareaProps = FieldBaseProps & {}

export const FieldTextarea = observer(
  ({
    className = '',
    minRows,
    maxRows,
    rows,
    ...others
  }: FieldTextareaProps) => {
    return (
      <FieldBase
        className={`field-textarea ${className}`.trim()}
        multiline
        minRows={!rows ? 3 : minRows}
        maxRows={!rows ? Infinity : maxRows}
        rows={rows}
        {...others}
      />
    )
  },
)
