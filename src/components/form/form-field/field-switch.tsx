import {
  Switch,
  FormControlLabel,
  type SwitchProps,
  styled,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { FieldProps } from './type'
import { useFormField } from './use-form-field'

export type FieldSwitchProps = Omit<SwitchProps, 'name'> &
  FieldProps & { label?: string }
const SwitchStyled = styled(Switch)(({ theme }) => ({
  width: 37,
  height: 22,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#65C466',
        opacity: 1,
        border: 0,
        ...theme.applyStyles('dark', {
          backgroundColor: '#2ECA45',
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color: theme.palette.grey[100],
      ...theme.applyStyles('dark', {
        color: theme.palette.grey[600],
      }),
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: 0.7,
      ...theme.applyStyles('dark', {
        opacity: 0.3,
      }),
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 18,
    height: 18,
  },
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
}))

export const FieldSwitch = observer(
  ({ name, note, formStore, label, ...others }: FieldSwitchProps) => {
    const value = formStore?.getValue(name) ?? ''
    const { helperTip } = useFormField({ note })

    return (
      <div className='MuiFormControl-root field-switch'>
        <FormControlLabel
          sx={{ gap: '8px', marginLeft: 0 }}
          label={label}
          control={
            <SwitchStyled
              {...others}
              focusVisibleClassName='.Mui-focusVisible'
              checked={Boolean(value)}
              name={name}
            />
          }
        />
        {helperTip}
      </div>
    )
  },
)
