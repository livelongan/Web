import { observable, action, makeAutoObservable } from 'mobx'

export type FormValue = string | number | boolean | Date | null

export default class FormDataStore<T extends Record<string, FormValue>> {
  private datas = observable.map<keyof T, T[keyof T]>()

  private initialDatas: T

  constructor(initialValues: T) {
    this.initialDatas = { ...initialValues }
    makeAutoObservable(this)
    this.reset()
  }

  reset = action(() => {
    this.datas.clear()
    ;(Object.entries(this.initialDatas) as [keyof T, T[keyof T]][]).forEach(
      ([fieldName, value]) => {
        this.datas.set(fieldName, value)
      },
    )
  })

  emptyField = action(<K extends keyof T>(fieldName: K) => {
    const currentValue = this.datas.get(fieldName)

    if (currentValue === undefined) return

    let emptyValue: T[K]

    switch (typeof currentValue) {
      case 'string':
        emptyValue = '' as T[K]
        break
      case 'number':
        emptyValue = null as T[K]
        break
      case 'boolean':
        emptyValue = false as T[K]
        break
      default:
        emptyValue = (
          currentValue instanceof Date ? null : currentValue
        ) as T[K]
    }

    this.datas.set(fieldName, emptyValue)
  })

  empty = action(() => {
    this.datas.forEach((_, key) => {
      this.emptyField(key)
    })
  })

  setField = action(<K extends keyof T>(fieldName: K, value: T[K]) => {
    if (value === null || value === undefined) {
      this.datas.delete(fieldName)
    } else {
      this.datas.set(fieldName, value)
    }
  })

  getField = <K extends keyof T>(fieldName: K): T[K] | undefined => {
    return this.datas.get(fieldName) as T[K]
  }

  getAll = (): Partial<T> => {
    const result: Partial<T> = {}
    this.datas.forEach((value, key) => {
      result[key as keyof T] = value as T[keyof T]
    })
    return result
  }

  setDatas = action((datas: Partial<T>) => {
    ;(Object.entries(datas) as [keyof T, T[keyof T]][]).forEach(
      ([fieldName, value]) => {
        this.setField(fieldName, value)
      },
    )
  })
}
