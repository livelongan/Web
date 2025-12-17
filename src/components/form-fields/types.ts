import { RuleProps } from '../form'

export type BaseFieldProps = Partial<RuleProps> & {
    id?: string
    formId: string
    name: string
    label: string

    error?: string
    required?: boolean

    readOnly?: boolean
    disabled?: boolean
    hint?: string
}
