import { observable, action, makeAutoObservable } from 'mobx'
import type { FormValue } from './form-data-store'
import type FormErrorStore from './form-error-store'

export interface FormRule<T extends FormValue> {
  required?: boolean
  pattern?: RegExp
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  message?: string
  validate?: (value: T) => boolean | string | Promise<boolean | string>
  priority?: number // 优先级，数值越小优先级越高
}
export default class FormRuleStore<T extends Record<string, FormValue>> {
  private rules = observable.map<keyof T, FormRule<any> | FormRule<any>[]>()
  private initialRules: Partial<
    Record<keyof T, FormRule<any> | FormRule<any>[]>
  > = {}

  constructor(
    initialValues: Partial<
      Record<keyof T, FormRule<any> | FormRule<any>[]>
    > = {},
  ) {
    makeAutoObservable(this)
    this.initialRules = { ...initialValues }
    this.initialize(initialValues)
  }

  private initialize = action(
    (
      initialValues: Partial<Record<keyof T, FormRule<any> | FormRule<any>[]>>,
    ) => {
      Object.entries(initialValues).forEach(([fieldName, rules]) => {
        if (rules == null) return
        // normalize single rule or array into array when delegating to setRules
        this.setRules(
          fieldName as keyof T,
          // cast to allow union overload; setRules will normalize internally
          rules as FormRule<any> | FormRule<any>[],
        )
      })
    },
  )

  private sortRules = (rules: FormRule<any>[]): FormRule<any>[] => {
    return [...rules].sort((a, b) => {
      /* 如果a是required而b不是，a优先级更高*/
      if (a.required && !b.required) {
        return -1
      }
      /* 如果b是required而a不是，b优先级更高*/
      if (!a.required && b.required) {
        return 1
      }
      /* 如果都是或都不是required，则按priority排序 */
      return (a.priority || 100) - (b.priority || 100)
    })
  }

  addRule = action(<K extends keyof T>(fieldName: K, rule: FormRule<T[K]>) => {
    const existing = this.rules.get(fieldName)
    const fieldRules: FormRule<any>[] = existing
      ? Array.isArray(existing)
        ? existing.slice()
        : [existing]
      : []
    fieldRules.push(rule as FormRule<any>)
    this.rules.set(fieldName, this.sortRules(fieldRules))
  })

  setRules = action(
    <K extends keyof T>(
      fieldName: K,
      rules: FormRule<T[K]> | FormRule<T[K]>[],
    ) => {
      const list = Array.isArray(rules) ? rules : [rules]
      this.rules.set(fieldName, this.sortRules(list as FormRule<any>[]))
    },
  )

  getRules = <K extends keyof T>(fieldName: K): FormRule<T[K]>[] => {
    const v = this.rules.get(fieldName)
    if (!v) return []
    return (Array.isArray(v) ? v : [v]) as FormRule<T[K]>[]
  }

  getValidateField = (): string[] => {
    return [...this.rules.keys()].map((key) => String(key))
  }

  clearRules = action(<K extends keyof T>(fieldName: K) => {
    this.rules.delete(fieldName)
  })

  validate = async <K extends keyof T>(
    fieldName: K,
    value: T[K],
  ): Promise<string | undefined> => {
    const rules = this.getRules(fieldName)
    for (const rule of rules) {
      const error = await this.validateRule(rule, value)
      if (error) return error
    }
    return undefined
  }

  private async validateRule<K extends keyof T>(
    rule: FormRule<T[K]>,
    value: T[K],
  ): Promise<string | undefined> {
    if (
      rule.required &&
      (value === undefined || value === null || value === '')
    ) {
      return rule.message || 'Required field'
    }

    if (typeof value === 'string') {
      if (rule.pattern && !rule.pattern.test(value)) {
        return rule.message || 'Invalid format'
      }

      if (rule.minLength !== undefined && value.length < rule.minLength) {
        return rule.message || `Minimum length is ${rule.minLength}`
      }

      if (rule.maxLength !== undefined && value.length > rule.maxLength) {
        return rule.message || `Maximum length is ${rule.maxLength}`
      }
    }

    if (typeof value === 'number') {
      if (rule.min !== undefined && value < rule.min) {
        return rule.message || `Minimum value is ${rule.min}`
      }

      if (rule.max !== undefined && value > rule.max) {
        return rule.message || `Maximum value is ${rule.max}`
      }
    }

    if (rule.validate) {
      const result = await rule.validate(value)
      if (result !== true) {
        return typeof result === 'string'
          ? result
          : rule.message || 'Validation failed'
      }
    }
    return undefined
  }

  validateAll = async (
    values: Partial<T>,
    errorStore?: FormErrorStore<T>,
  ): Promise<Partial<Record<keyof T, string>>> => {
    const errors: Partial<Record<keyof T, string>> = {}
    await Promise.all(
      (Object.entries(values) as [keyof T, T[keyof T]][]).map(
        async ([fieldName, value]) => {
          const error = await this.validate(fieldName, value)
          if (error) {
            errors[fieldName] = error
            errorStore?.setError(fieldName, error)
          }
        },
      ),
    )
    return errors
  }

  reset = action(() => {
    this.rules.clear()
    this.initialize(this.initialRules)
  })
}
