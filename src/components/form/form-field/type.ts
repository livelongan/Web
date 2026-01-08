import type { ReactNode } from 'react'
import type { FormStoreHook } from '../use-form-store/use-form-store'

export type FieldProps = {
  name: string
  formStore?: FormStoreHook<any>
  note?: string | string[] | ReactNode
  onClear?: () => void
}
