import {
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  Popper,
  ClickAwayListener,
  Box,
} from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useMemo, useState, useEffect, useRef } from 'react'
import { TextNormal } from '../../typography'
import { Close, ExpandMore } from '@mui/icons-material' // 将 ArrowDropDown 替换为 ExpandMore

type FieldSelectOptions = {
  [key: string]: string | number | boolean
}

type FieldSelectProps = {
  name: string
  sources?: FieldSelectOptions[] | string[] | boolean[] | number[]
  dataKey?: string
  dataValue?: string
  dataStore?: any
  errorStore?: any
  className?: string
}

export const FieldSelect = observer(
  ({
    className = '',
    name,
    sources = [],
    dataStore,
    errorStore,
    dataKey = 'id',
    dataValue = 'label',
  }: FieldSelectProps) => {
    const [inputValue, setInputValue] = useState('')
    const [filteredOptions, setFilteredOptions] = useState<
      FieldSelectOptions[]
    >([])
    const [open, setOpen] = useState(false)
    const anchorRef = useRef<HTMLDivElement>(null)

    const options = useMemo(() => {
      return sources.map((it, index) => {
        if (typeof it === 'object') {
          return {
            [dataKey]: `${it[dataKey]}_${index + 1}`,
            [dataValue]: it[dataValue],
            origin: it,
          }
        }
        return {
          [dataKey]: `${it}_${index + 1}`,
          [dataValue]: it,
          origin: it,
        }
      }) as FieldSelectOptions[]
    }, [dataKey, dataValue, sources])

    const selectedValue = dataStore?.getField(name)
    const selectedLabel = useMemo(() => {
      if (selectedValue) {
        if (typeof selectedValue !== 'object') {
          return (
            options.find(
              (opt) => String(opt[dataValue]) === String(selectedValue),
            )?.[dataValue] || ''
          )
        }
        return (
          options.find(
            (opt) => String(opt[dataKey]) === String(selectedValue[dataKey]),
          )?.[dataValue] || ''
        )
      }
    }, [dataKey, dataValue, options, selectedValue])

    useEffect(() => {
      if (inputValue.trim() === '') {
        setFilteredOptions(options)
      } else {
        setFilteredOptions(
          options.filter((option) =>
            String(option[dataValue])
              .toLowerCase()
              .includes(inputValue.toLowerCase()),
          ),
        )
      }
    }, [inputValue, options, dataValue])

    const handleClear = () => {
      setInputValue('')
      setFilteredOptions(options)
    }

    const handleSelect = (value: FieldSelectOptions) => {
      if (dataStore) {
        dataStore.setField(name, value)
      }
      setOpen(false)
      setInputValue('')
    }
    const isSelected = (option: FieldSelectOptions) => {
      if (typeof selectedValue !== 'object') {
        return (
          selectedValue && String(option[dataValue]) === String(selectedValue)
        )
      }
      return (
        selectedValue &&
        String(option[dataKey]) === String(selectedValue[dataKey])
      )
    }
    return (
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box ref={anchorRef}>
          <TextField
            className={`field-select ${className}`.trim()}
            fullWidth
            defaultValue={open ? inputValue : selectedLabel}
            onChange={(e) => {
              setInputValue(e.target.value)
              if (!open) setOpen(true)
            }}
            onFocus={() => {
              setOpen(true)
              setInputValue('')
            }}
            placeholder={`${selectedLabel ?? ''}`}
            error={errorStore ? !!errorStore.getError(name) : undefined}
            helperText={errorStore ? errorStore.getError(name) : undefined}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position='end'>
                    {inputValue ? (
                      <IconButton size='small' onClick={handleClear}>
                        <Close fontSize='small' />
                      </IconButton>
                    ) : (
                      <ExpandMore /> // 使用 ExpandMore 图标替代 ArrowDropDown
                    )}
                  </InputAdornment>
                ),
              },
            }}
          />

          <Popper
            open={open}
            anchorEl={anchorRef.current}
            placement='bottom-start'
            style={{ width: anchorRef.current?.clientWidth, zIndex: 1300 }}
          >
            <Paper sx={{ padding: '8px 0' }} elevation={3}>
              {filteredOptions.length === 0 ? (
                <MenuItem disabled>No options</MenuItem>
              ) : (
                filteredOptions.map((option) => (
                  <MenuItem
                    key={String(option[dataKey])}
                    selected={isSelected(option)}
                    onClick={() => handleSelect(option)}
                  >
                    <TextNormal>{String(option[dataValue])}</TextNormal>
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
