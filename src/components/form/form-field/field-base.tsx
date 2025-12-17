import { TextField, type TextFieldProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { FieldProps } from './type'
import Clear from '@mui/icons-material/Clear'
import { ButtonBaseIcon } from '../../buttons'
import { TextNormal, TextSmall } from '../../typography'
import { useEffect, useMemo, useState } from 'react'
export type FieldBaseProps = Omit<TextFieldProps, 'name'> & FieldProps & {}

export const FieldBase = observer(
  ({
    name,
    note,
    dataStore,
    errorStore,
    slotProps,
    onClear,
    ...others
  }: FieldBaseProps) => {
    const value = dataStore?.getField(name) ?? ''
    const [controlValue, setControlValue] = useState<any>(value)
    const helperTip = useMemo(() => {
      if (!note) {
        return null
      } else if (note instanceof Array) {
        return note.map((it) => <TextNormal>{it}</TextNormal>)
      } else if (typeof note === 'string') {
        return <TextNormal>{note}</TextNormal>
      }
      return note
    }, [note])

    useEffect(() => {
      setControlValue(value)
    }, [value])

    return (
      <TextField
        name={name}
        value={controlValue}
        variant='filled'
        error={errorStore ? !!errorStore.getError(name) : undefined}
        helperText={
          <>
            {errorStore ? errorStore.getError(name) : undefined}
            {others.multiline && (
              <TextSmall className='words-count' sx={{ textAlign: 'right' }}>
                {value.length > 0 ? `${value.length} words` : ''}
              </TextSmall>
            )}
            {helperTip}
          </>
        }
        slotProps={{
          input: {
            endAdornment: (
              <ButtonBaseIcon
                onClick={() => {
                  dataStore?.setField(name, '')
                  if (onClear) {
                    onClear()
                  }
                }}
              >
                <Clear />
              </ButtonBaseIcon>
            ),
          },
          ...slotProps,
        }}
        {...others}
      />
    )
  },
)
