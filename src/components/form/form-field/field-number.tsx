import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import { FieldBase, type FieldBaseProps } from './field-base'

type FieldNumberProps = FieldBaseProps & {}

export const FieldNumber = observer(
  ({ className = '', ...others }: FieldNumberProps) => {
    const [numberValue, setNumberValue] = useState<number | string>()
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value
      if (/^-?\d*\.?\d*$/.test(newValue)) {
        setNumberValue(newValue)
      }
    }

    return (
      <FieldBase
        onInput={handleChange}
        autoComplete='off'
        className={`field-number ${className}`.trim()}
        defaultValue={numberValue}
        {...others}
      />
    )
  },
)
