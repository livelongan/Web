import { FormControlLabel, Radio, type RadioProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { FieldProps } from './type'
import { useFormField } from './use-form-field'

export type FieldRadioProps = Omit<RadioProps, 'name'> &
  FieldProps & { label?: string }

export const FieldRadio = observer(
  ({ name, note, formStore, label, value, ...others }: FieldRadioProps) => {
    const fieldValue = formStore?.getValue(name) ?? ''
    const { helperTip } = useFormField({ note })

    return (
      <div className='MuiFormControl-root field-radio'>
        <FormControlLabel
          label={label}
          control={
            <Radio
              {...others}
              value={value}
              name={name}
              checked={fieldValue === value}
            />
          }
        />
        {helperTip}
      </div>
    )
  },
)
