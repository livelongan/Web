import { Stack, type StackProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefObject,
} from 'react'
import type FormErrorStore from './form-error-store'
import type FormRuleStore from './form-rule-store'
import { LayoutPage } from '../layout'
import type FormDataStore from './form-data-store'

export type FormElementProps = Omit<
  StackProps,
  'ref' | 'onChange' | 'onSubmit'
> & {
  ref?: RefObject<HTMLFormElement | null>
  dataStore?: FormDataStore<any>
  ruleStore?: FormRuleStore<any>
  errorStore?: FormErrorStore<any>
  onChange?: (event: React.FormEvent<HTMLFormElement>) => void
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void
}

export const LayoutForm = observer(
  ({
    dataStore,
    ruleStore,
    errorStore,
    children,
    className = '',
    onChange,
    onSubmit,
    ...others
  }: FormElementProps) => {
    const [visited, setVisited] = useState(false)
    const formRef = useRef<HTMLFormElement | null>(null)

    const validateForm = useCallback(
      async (name: string, value: any) => {
        if (ruleStore) {
          const errorText = await ruleStore.validate(name, value)
          if (errorStore) {
            errorStore.setError(name, errorText || '')
          }
          return errorText
        }
        return null
      },
      [errorStore, ruleStore],
    )

    const handleChange = (event: React.FormEvent<HTMLFormElement>) => {
      const input = event.target as HTMLInputElement
      const name = input.name
      if (name) {
        const value = input.type === 'checkbox' ? input.checked : input.value
        dataStore?.setField(name, value)
        validateForm(name, value).then((errorText) => {
          if (errorText) {
            input.classList.add('error')
            input.focus()
          } else {
            input.classList.remove('error')
          }
        })

        if (onChange) {
          onChange(event)
        }
      }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!visited && dataStore && ruleStore) {
        await ruleStore.validateAll(dataStore.getAll(), errorStore)
        setVisited(true)
      }
      if (errorStore?.hasErrors()) {
        return
      }
      if (onSubmit) {
        onSubmit(event)
      }
      return event
    }

    useLayoutEffect(() => {
      if (formRef.current) {
        others.ref && (others.ref.current = formRef.current)
      }
    }, [formRef, others.ref, visited])

    return (
      <LayoutPage>
        <Stack
          ref={formRef}
          gap={'20px'}
          component={'form'}
          className={`layout-form ${className}`.trim()}
          onInput={handleChange}
           onSubmit={handleSubmit}
          {...others}
        >
          {children}
        </Stack>
      </LayoutPage>
    )
  },
)
