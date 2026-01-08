import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { FieldBase, type FieldBaseProps } from './field-base'

type FieldDigitalProps = FieldBaseProps & {}

export const FieldDigital = observer(
  ({ className = '', formStore, name, ...others }: FieldDigitalProps) => {
    useEffect(() => {
      formStore?.setValueType(name, 'digital')
    })

    return (
      <FieldBase
        name={name}
        formStore={formStore}
        autoComplete='off'
        type='number'
        className={`field-digital ${className}`.trim()}
        {...others}
      />
    )
  },
)
