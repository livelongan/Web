import {
  MenuItem,
  TextField,
  InputAdornment,
  Paper,
  Popper,
  ClickAwayListener,
  type TextFieldProps,
  Box,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useMemo, useState, useEffect, useRef, useCallback } from 'react'
import { TextNormal } from '../../typography'
import { Close, ExpandMore } from '@mui/icons-material' // 将 ArrowDropDown 替换为 ExpandMore
import type { FieldProps } from './type'
import { ButtonBaseIcon } from '../../buttons'
import { useFormField } from './use-form-field'

type FieldSelectOptions = {
  [key: string]: string | number | boolean
}

type FieldSelectProps = Omit<TextFieldProps, 'name'> &
  FieldProps & {
    sources?: FieldSelectOptions[] | Array<string | number | boolean>
    dataKey?: string
    dataLabel?: string
  }
type OptionMapType = Map<string, FieldSelectOptions | string | number | boolean>

export const FieldSelect = observer(
  ({
    className = '',
    name,
    sources = [],
    formStore,
    dataKey = 'key',
    dataLabel = 'label',
    slotProps,
    note,
    ...others
  }: FieldSelectProps) => {
    const { helperTip } = useFormField({ note })
    const [inputValue, setInputValue] = useState('')
    const [filteredOptions, setFilteredOptions] = useState<
      FieldSelectOptions[]
    >([])
    const anchorRef = useRef<HTMLDivElement>(null)
    const [depandence] = useState({
      cacheSources: null as FieldSelectOptions[] | null,
    })
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState('')
    const [options, setOptions] = useState<FieldSelectOptions[]>([])
    const [mateSources] = useState<OptionMapType>(new Map())

    const selectedValue = formStore?.getValue(name)
    const selectedLabel = useMemo(() => {
      const findOption = options.find(
        (opt) => String(opt.realKey) === String(selectedValue),
      )
      if (selectedValue && findOption) {
        return findOption[dataLabel] ?? ''
      }
    }, [dataLabel, options, selectedValue])

    const isSelected = (option: FieldSelectOptions) => {
      return selectedValue && String(option.realKey) === String(selectedValue)
    }

    const handleClear = (event: React.MouseEvent | React.FormEvent) => {
      setInputValue('')
      setFilteredOptions(options)
      formStore?.setValue(name, '', event)
      setOpen(true)
    }

    const handleSelect = (
      value: FieldSelectOptions,
      event: React.MouseEvent | React.FormEvent,
    ) => {
      const mate = mateSources.get(String(value[dataKey]))
      if (typeof mate === 'object') {
        formStore?.setValue(name, mate[dataKey], event)
      } else {
        formStore?.setValue(name, mate, event)
      }
      setOpen(false)
      setInputValue('')
    }

    const handleInput = useCallback(
      (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
        if (!open) {
          setOpen(true)
        }
      },
      [open],
    )

    useEffect(() => {
      //initial options
      if (
        JSON.stringify(options) !== JSON.stringify(depandence.cacheSources) ||
        !depandence.cacheSources
      ) {
        const data = sources.map((it, index) => {
          let key = ''
          if (typeof it === 'object') {
            key = `${it[dataKey]}_${index + 1}`
            mateSources.set(key, it as FieldSelectOptions)
            return {
              [dataKey]: `${it[dataKey]}_${index + 1}`,
              [dataLabel]: it[dataLabel],
              realKey: it[dataKey],
            }
          } else {
            key = `${it}_${index + 1}`
            mateSources.set(key, it)
            return {
              [dataKey]: `${it}_${index + 1}`,
              [dataLabel]: it,
              realKey: it,
            }
          }
        }) as FieldSelectOptions[]
        depandence.cacheSources = [...data]
        setOptions(data)
      }
    }, [dataKey, dataLabel, depandence, mateSources, options, sources])

    useEffect(() => {
      //filter options
      if (inputValue.trim() === '') {
        setFilteredOptions(options)
      } else {
        setFilteredOptions(
          options.filter((option) =>
            String(option[dataLabel])
              .toLowerCase()
              .includes(inputValue.toLowerCase()),
          ),
        )
      }
    }, [inputValue, options, dataLabel])

    useEffect(() => {
      setValue(`${open ? inputValue : (selectedLabel ?? '')}`)
    }, [open, inputValue, selectedLabel])

    return (
      <ClickAwayListener
        onClickAway={() => {
          setOpen(false)
        }}
      >
        <Box ref={anchorRef}>
          <TextField
            className={`field-select ${className}`.trim()}
            value={value}
            onChange={handleInput}
            onFocus={() => {
              setOpen(true)
            }}
            required={formStore?.hasRequired(name)}
            type='select'
            placeholder={`${selectedLabel ?? ''}`}
            error={!!formStore?.getError(name)}
            helperText={
              <>
                {formStore?.getError(name)}
                {helperTip}
              </>
            }
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    {value ? (
                      <ButtonBaseIcon size='small' onClick={handleClear}>
                        <Close fontSize='small' />
                      </ButtonBaseIcon>
                    ) : (
                      <ButtonBaseIcon size='small'>
                        <ExpandMore />
                      </ButtonBaseIcon>
                    )}
                  </InputAdornment>
                ),
              },
              ...slotProps,
            }}
            {...others}
          />
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement='bottom-start'
            style={{
              width: anchorRef.current?.clientWidth,
              zIndex: 1300,
            }}
          >
            <Paper
              sx={{ padding: '8px 0', maxHeight: '240px', overflow: 'auto' }}
              elevation={3}
            >
              {filteredOptions.length === 0 ? (
                <MenuItem disabled>No options</MenuItem>
              ) : (
                filteredOptions.map((option) => (
                  <MenuItem
                    key={String(option[dataKey])}
                    selected={isSelected(option)}
                    onClick={(event) => {
                      handleSelect(option, event)
                    }}
                  >
                    <TextNormal>{String(option[dataLabel])}</TextNormal>
                  </MenuItem>
                ))
              )}
            </Paper>
          </Popper>
        </Box>
      </ClickAwayListener>
    )
  },
)
