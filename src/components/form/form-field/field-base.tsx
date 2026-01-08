import { TextField, type TextFieldProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { FieldProps } from './type'
import Clear from '@mui/icons-material/Clear'
import { ButtonBaseIcon } from '../../buttons'
import { TextSmall } from '../../typography'
import { useEffect, useState } from 'react'
import { useFormField } from './use-form-field'

export type FieldBaseProps = Omit<TextFieldProps, 'name'> & FieldProps & {}

export const FieldBase = observer(
  ({
    name,
    note,
    formStore,
    slotProps,
    onClear,
    ...others
  }: FieldBaseProps) => {
    const value = formStore?.getValue(name) ?? ''
    const [controlValue, setControlValue] = useState<any>(value)
    const { helperTip } = useFormField({ note })

    useEffect(() => {
      setControlValue(value)
    }, [value])

    return (
      <TextField
        name={name}
        value={controlValue}
        error={!!formStore?.getError(name)}
        required={formStore?.hasRequired(name)}
        helperText={
          <>
            {formStore?.getError(name)}
            {others.multiline && (
              <TextSmall className='words-count' sx={{ textAlign: 'left' }}>
                {value.length > 0 ? `${value.length} words` : ''}
              </TextSmall>
            )}
            {helperTip}
          </>
        }
        slotProps={{
          input: {
            endAdornment: others.disabled ? undefined : (
              <ButtonBaseIcon
                onClick={(event) => {
                  if (others.disabled) {
                    return
                  }
                  formStore?.setValue(name, '', event)
                  if (onClear) {
                    onClear()
                  }
                }}
              >
                <Clear />
              </ButtonBaseIcon>
            ),
          },
          htmlInput: {
            maxLength: formStore?.getMaxLength(name),
            minLength: formStore?.getMinLength(name),
            max: formStore?.getMax(name),
            min: formStore?.getMin(name),
          },
          ...slotProps,
        }}
        {...others}
      />
    )
  },
)
