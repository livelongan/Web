import { Stack, type StackProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import type FormErrorStore from './use-form-store/form-error-store'
import type FormRuleStore from './use-form-store/form-rule-store'
import { LayoutPage } from '../layout'
import type FormDataStore from './use-form-store/form-data-store'
import type { FormStoreHook } from './use-form-store'

export type FormElementProps = Omit<
  StackProps,
  'ref' | 'onChange' | 'onSubmit'
> & {
  dataStore?: FormDataStore<any>
  ruleStore?: FormRuleStore<any>
  errorStore?: FormErrorStore<any>
  formStore?: FormStoreHook<any>
  onChange?: (
    field: string,
    value: any,
    event: React.FormEvent<HTMLFormElement>,
  ) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

export const LayoutForm = observer(
  ({
    formStore,
    children,
    className = '',
    onChange,
    onSubmit,
    ...others
  }: FormElementProps) => {
    const formRef = useRef<HTMLFormElement | null>(null)

    const setErrorFocus = useCallback(() => {
      const errors = formStore?.getErrors()
      const inputs = Array.from(
        formRef.current?.querySelectorAll('.MuiInputBase-input[name]') ?? [],
      ) as HTMLInputElement[]

      if (errors && inputs.length) {
        const activeElement = document.activeElement as HTMLInputElement | null
        const isFocused = inputs.find((input) => input === activeElement)
        const focusError = formStore?.getError(activeElement?.name || '')
        const firstErrorElement = inputs.find((input) => errors[input.name])
        if (!isFocused || !focusError) {
          setTimeout(() => {
            if (firstErrorElement) {
              firstErrorElement?.focus()
            }
          }, 100)
        }
      }
    }, [formStore])

    const handleChange = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        const input = event.target as HTMLInputElement
        if (input.type === 'select') {
          return
        }
        const name = input.name
        if (name) {
          let value: any =
            input.type === 'checkbox' ? input.checked : input.value
          if (formStore?.getValueType(name) === 'number') {
            value = value === '' ? null : Number(value)
          } else if (input.type === 'checkbox') {
            value = Boolean(value)
          }
          formStore?.setValue(name, value, event)
          if (onChange) {
            onChange(name, value, event)
          }
        }
      },
      [formStore, onChange],
    )

    const handleSubmit = useCallback(
      async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (formStore) {
          formStore.setVisited(true)
          await formStore.validateForm()
        }
        if (formStore?.hasErrors()) {
          setErrorFocus()
          return
        }

        if (onSubmit) {
          // submit form
          onSubmit(event)
        }
        return event
      },
      [formStore, onSubmit, setErrorFocus],
    )

    useLayoutEffect(() => {
      if (formRef.current && formStore) {
        formStore.ref.current = formRef.current
      }
    }, [formRef, formStore])

    useEffect(() => {
      if (formStore && onChange) {
        formStore.register('change', onChange as unknown as EventListener)
      }
      return () => {
        if (formStore && onChange) {
          formStore.cancel('change')
        }
      }
    }, [formStore, onChange])

    return (
      <LayoutPage>
        <Stack
          gap={'20px'}
          component={'form'}
          className={`layout-form ${className}`.trim()}
          onChange={handleChange}
          onSubmit={handleSubmit}
          {...others}
          ref={formRef}
        >
          {children}
        </Stack>
      </LayoutPage>
    )
  },
)
