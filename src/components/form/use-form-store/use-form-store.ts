import { useCallback, useRef, useState } from 'react'
import FormDataStore from './form-data-store'
import FormErrorStore from './form-error-store'
import FormRuleStore, { type FormRule } from './form-rule-store'

export type FormStoreProps<T extends Record<string, any>> = {
  data: T
  rule: Partial<Record<keyof T, FormRule<any> | FormRule<any>[]>>
}
export type FormValueType = 'string' | 'number' | 'boolean' | 'date' | 'digital'

export type FormStoreEvent = {
  change?: (
    field: string,
    value: any,
    event?: React.MouseEvent | React.FormEvent,
  ) => void
}

export type FormStoreHook<T extends Record<string, any>> = {
  ref: React.RefObject<HTMLFormElement | null>
  register: (type: keyof FormStoreEvent, listener: any) => void
  cancel: (type: keyof FormStoreEvent) => void

  visited: boolean
  setVisited: React.Dispatch<React.SetStateAction<boolean>>
  validate: (name: string, value: any) => Promise<string | null | undefined>
  validateForm: () => Promise<Partial<Record<keyof T, string>>>
  getValueType: (name: string) => string
  setValueType: (name: string, type: FormValueType) => void

  setValue: (
    name: string,
    value: any,
    event?: React.MouseEvent | React.FormEvent,
  ) => void
  getValue: (name: string) => any
  getValues: () => Partial<T>

  setError: (name: string, error: string) => void
  getError: (name: string) => string | undefined
  getErrors: () => Partial<Record<keyof T, string>>
  hasErrors: () => boolean

  hasRequired: (name: string) => boolean
  getMin: (name: string) => number | undefined
  getMinLength: (name: string) => number | undefined
  getMax: (name: string) => number | undefined
  getMaxLength: (name: string) => number | undefined
  reset: () => void
}

export const useFormStore = <T extends Record<string, any>>(
  props: FormStoreProps<T>,
): FormStoreHook<T> => {
  const [visited, setVisited] = useState(false)
  const [types, setTypes] = useState<Record<keyof T, FormValueType>>(
    {} as Record<keyof T, FormValueType>,
  )
  const formRef = useRef<HTMLFormElement | null>(null)
  const [dataStore] = useState(() => new FormDataStore<T>(props.data))
  const [errorStore] = useState(() => new FormErrorStore<T>())
  const [ruleStore] = useState(() => new FormRuleStore<T>(props.rule))
  const [events] = useState<FormStoreEvent>({})

  const register: FormStoreHook<T>['register'] = useCallback(
    (type, listener) => {
      events[type] = listener
    },
    [events],
  )

  const cancel: FormStoreHook<T>['cancel'] = useCallback(
    (type) => {
      events[type] = undefined
    },
    [events],
  )

  const validate = useCallback(
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

  const validateForm = useCallback(() => {
    return ruleStore.validateAll(dataStore.getAll(), errorStore)
  }, [dataStore, errorStore, ruleStore])

  const setValue: FormStoreHook<T>['setValue'] = (name, value, evt) => {
    if (dataStore.getField(name) !== value) {
      dataStore?.setField(name, value)
      if (events.change) {
        events.change(name, value, evt)
      }
      validate(name, value)
    }
  }

  const getValue = (name: string) => {
    return dataStore?.getField(name)
  }
  const getValues = () => {
    return dataStore?.getAll()
  }

  const getValueType: FormStoreHook<T>['getValueType'] = (name) => {
    return types[name] ?? 'string'
  }
  const setValueType: FormStoreHook<T>['setValueType'] = (name, type) => {
    if (types[name] === type) return
    setTypes((prev) => ({ ...prev, [name]: type }))
  }

  const setError = useCallback(
    (name: string, error: string) => {
      errorStore.setError(name, error)
    },
    [errorStore],
  )
  const getError = useCallback(
    (name: string) => {
      return errorStore.getError(name)
    },
    [errorStore],
  )
  const getErrors = useCallback(() => {
    return errorStore.getAll()
  }, [errorStore])

  const hasErrors = useCallback(() => {
    return errorStore.hasErrors()
  }, [errorStore])

  const hasRequired: FormStoreHook<T>['hasRequired'] = (name) => {
    const rule = ruleStore.getRules(name)
    if (!rule) return false
    const list = Array.isArray(rule) ? rule : [rule]
    return list.some(
      (r) =>
        Object.prototype.hasOwnProperty.call(r, 'required') &&
        r.required === true,
    )
  }

  const getRuleValue = (
    name: string,
    ruleKey: keyof FormRule<any>,
  ): number | undefined => {
    const rule = ruleStore.getRules(name)
    if (!rule) return undefined
    const list = Array.isArray(rule) ? rule : [rule]
    for (const r of list) {
      if (
        Object.prototype.hasOwnProperty.call(r, ruleKey) &&
        typeof r[ruleKey] === 'number' &&
        !Number.isNaN(r[ruleKey])
      ) {
        return r[ruleKey]
      }
    }
    return undefined
  }

  const getMin: FormStoreHook<T>['getMin'] = (name) => {
    return getRuleValue(name, 'min')
  }
  const getMax: FormStoreHook<T>['getMax'] = (name) => {
    return getRuleValue(name, 'max')
  }
  const getMinLength: FormStoreHook<T>['getMinLength'] = (name) => {
    return getRuleValue(name, 'minLength')
  }
  const getMaxLength: FormStoreHook<T>['getMaxLength'] = (name) => {
    return getRuleValue(name, 'maxLength')
  }

  const reset = useCallback(() => {
    dataStore.reset()
    errorStore.clearAll()
    ruleStore.reset()
    setVisited(false)
  }, [dataStore, errorStore, ruleStore])

  return {
    ref: formRef,
    validate,
    validateForm,
    setValueType,
    getValueType,
    setValue,
    getValue,
    getValues,
    visited,
    setVisited,
    setError,
    getError,
    getErrors,
    hasErrors,
    hasRequired,
    getMin,
    getMinLength,
    getMax,
    getMaxLength,
    reset,
    register,
    cancel,
  }
}
