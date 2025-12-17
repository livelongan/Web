import type { ReactNode } from 'react'
import type FormDataStore from '../form-data-store'
import type FormErrorStore from '../form-error-store'

export type FieldProps = {
  name: string
  dataStore?: FormDataStore<any>
  errorStore?: FormErrorStore<any>
  note?: string | string[] | ReactNode
  onClear?: () => void
}
