import { GridTableColumnProps } from '../grid-table'

export type FormMode = 'filter' | 'view' | 'add' | 'edit' | 'normal'

export type FormValueType = KeyValue<string | number | Date | object | boolean> | any

export type RuleProps = {
    type?: GridTableColumnProps['type']
    format?: string
    dataItemKey?: string

    required?: boolean
    pattern?: RegExp
    max?: number | Date
    min?: number | Date
    message?: string
}

export type FormRule = KeyValue<RuleProps>
