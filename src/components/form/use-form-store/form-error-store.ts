import { observable, action, makeAutoObservable } from 'mobx'

export default class FormErrorStore<T extends object> {
  errors = observable.map<keyof T, string>()

  constructor(initialValues: Partial<Record<keyof T, string>> = {}) {
    makeAutoObservable(this)

    Object.entries(initialValues).forEach(([fieldName, message]) => {
      this.errors.set(fieldName as keyof T, message as string)
    })
  }

  setError = action(<K extends keyof T>(fieldName: K, message: string) => {
    if (!message) {
      this.errors.delete(fieldName)
    } else {
      this.errors.set(fieldName, message)
    }
  })

  getError = <K extends keyof T>(fieldName: K): string | undefined => {
    return this.errors.get(fieldName)
  }

  clearError = action(<K extends keyof T>(fieldName: K) => {
    this.errors.delete(fieldName)
  })

  hasErrors = (): boolean => {
    return this.errors.size > 0
  }

  getAll = (): Partial<Record<keyof T, string>> => {
    const result: Partial<Record<keyof T, string>> = {}
    this.errors.forEach((value, key) => {
      result[key] = value
    })
    return result
  }

  clearAll = action(() => {
    this.errors.clear()
  })

  setErrors = action((errors: Partial<Record<keyof T, string>>) => {
    Object.entries(errors).forEach(([fieldName, message]) => {
      this.setError(fieldName as keyof T, message as string)
    })
  })
}
