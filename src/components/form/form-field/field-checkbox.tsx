import { Checkbox, FormControlLabel, type CheckboxProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { FieldProps } from './type'
import { useFormField } from './use-form-field'

export type FieldCheckboxProps = Omit<CheckboxProps, 'name'> &
  FieldProps & { label?: string }

export const FieldCheckbox = observer(
  ({ name, note, formStore, label, ...others }: FieldCheckboxProps) => {
    const value = formStore?.getValue(name) ?? ''
    const { helperTip } = useFormField({ note })

    return (
      <div className='MuiFormControl-root field-checkbox'>
        <FormControlLabel
          label={label}
          control={
            <Checkbox {...others} checked={Boolean(value)} name={name} />
          }
        />
        {helperTip}
      </div>
    )
  },
)
