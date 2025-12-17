import { DATE_FORMATE, MAPPING_ITEM_KEY, VALIDATION } from '../../constants'
import { getId } from '../../utils'
import { RuleProps, FormRule, FormValueType, FormMode } from './types'
import { formatDate } from '@progress/kendo-intl'
export const validateField = (value: any, rule?: RuleProps) => {
    if (!rule) {
        return ''
    }
    let errors = ''
    if (rule.required && (value === undefined || value === null)) {
        return VALIDATION.required
    }
    const type = typeof value
    switch (type) {
        case 'string':
            if (rule.required && !value) {
                errors = VALIDATION.required
            } else if (rule.pattern && !rule.pattern?.test(value)) {
                errors = rule.message ?? `Validation failed in ${rule.pattern}`
            } else if (rule.max !== undefined && rule.min !== undefined) {
                if (value.length > rule.max || value.length < rule.min) {
                    errors = `Value length must >= ${rule.min}, and <= ${rule.max}`
                }
            } else if (rule.max && value.length < rule.max) {
                errors = `Value length must <= ${rule.max}`
            } else if (rule.min && value.length < rule.min) {
                errors = `Value length must >= ${rule.min}`
            }
            break
        case 'number':
            if (rule.required && value !== 0 && !value) {
                errors = VALIDATION.required
            } else if (rule.max !== undefined && rule.min !== undefined) {
                if (value > rule.max || value < rule.min) {
                    errors = `Value must >= ${rule.min}, and <= ${rule.max}`
                }
            } else if (rule.max && value < rule.max) {
                errors = `Value must <= ${rule.max}`
            } else if (rule.min && value < rule.min) {
                errors = `Value must >= ${rule.min}`
            }
            break
        case 'object':
            if (rule.required && !value) {
                errors = VALIDATION.required
            }
            break
    }

    return errors
}
export const validator = (rules: FormRule | undefined, values: KeyValue<any>) => {
    if (!rules) {
        return undefined
    }
    const valid: KeyValue<string> = {}
    Object.keys(values).map((field) => {
        const rule = rules[field]
        if (rule) {
            valid[field] = validateField(values[field], rule)
        }
    })
    return Object.keys(valid).length > 0 ? valid : undefined
}

export const ifMappingChange = (
    changed: FormValueType,
    value: FormValueType,
    dataItemKey = MAPPING_ITEM_KEY,
) => {
    let isChange = false
    if (value && changed && typeof changed === 'object' && typeof value === 'object') {
        isChange = changed[dataItemKey] !== value[dataItemKey]
    } else if (value && typeof changed !== 'object' && typeof value === 'object') {
        isChange = changed !== value[dataItemKey]
    } else if (value && typeof changed === 'object' && typeof value !== 'object') {
        isChange = changed[dataItemKey] !== value
    } else {
        isChange = changed !== value
    }
    return isChange
}
export const ifValueChanged = (
    changed: string | number | Date | object | boolean,
    value: string | number | Date | object | boolean,
    rule?: RuleProps,
) => {
    const type = rule?.type ?? 'text'
    if (type === 'text' || type === 'numeric' || type === 'boolean') {
        return changed !== value
    } else if (type === 'date') {
        const date1 = changed as unknown as Date
        const date2 = value as unknown as Date
        return (
            formatDate(date1, rule?.format ?? DATE_FORMATE) ===
            formatDate(date2, rule?.format ?? DATE_FORMATE)
        )
    } else if (type === 'mapping') {
        return ifMappingChange(changed, value, rule?.dataItemKey ?? MAPPING_ITEM_KEY)
    }
    return false
}

export const ifChanged = (
    changed: KeyValue<string | number | Date | object | boolean>,
    value: KeyValue<string | number | Date | object | boolean>,
    rules: FormRule = {},
) => {
    return Object.keys(changed).some((key) => {
        return ifValueChanged(changed[key], value[key], rules[key])
    })
}
export const getFieldId = (mode: FormMode, name: string, page?: string) => {
    return getId(`${mode}-field-${name}`, page)
}
