import { observer } from 'mobx-react-lite'
import { useEffect, useState } from 'react'
import { FieldBase, type FieldBaseProps } from './field-base'

type FieldNumberProps = FieldBaseProps & {}

export const FieldNumber = observer(
  ({ className = '', formStore, name, ...others }: FieldNumberProps) => {
    const [numberValue, setNumberValue] = useState<number | string>()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      if (/^-?\d*\.?\d*$/.test(newValue)) {
        setNumberValue(newValue)
      }
    }

    useEffect(() => {
      formStore?.setValueType(name, 'number')
    })

    return (
      <FieldBase
        name={name}
        formStore={formStore}
        onInput={handleChange}
        autoComplete='off'
        type='number'
        className={`field-number ${className}`.trim()}
        defaultValue={numberValue}
        {...others}
      />
    )
  },
)
