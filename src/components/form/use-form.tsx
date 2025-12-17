import { Form, FormClassComponent, FormProps } from '@progress/kendo-react-form'
import { memo, PropsWithChildren, useId, useMemo, useRef } from 'react'
import { FORM_SUFFIX } from '../../constants'
import { getId } from '../../utils'
import { FormRule } from './types'

type IProps = PropsWithChildren & {
    page?: string
    defaultValue: FormProps['initialValues']
}

type FormWrapperProps = PropsWithChildren & {
    render: FormProps['render']
    rules?: FormRule
    onSubmit?: FormProps['onSubmit']
}

const validator = (rules: FormRule | undefined, values: KeyValue<any>) => {
    if (!rules) {
        return undefined
    }
    const valid: KeyValue<string> = {}
    Object.keys(values).map((field) => {
        const rule = rules[field]
        if (rule) {
            const value = values[field]
            const type = typeof value
            switch (type) {
                case 'string':
                    if (rule.required && !value) {
                        valid[field] = 'Required field'
                    } else if (rule.pattern && !rule.pattern.test(value)) {
                        valid[field] = rule.message ?? `Validation failed in ${rule.pattern}`
                    } else if (rule.max !== undefined && rule.min !== undefined) {
                        if (value.length > rule.max || value.length < rule.min) {
                            valid[field] = `Max length must >= ${rule.min}, and <= ${rule.max}`
                        }
                    } else if (rule.max && value.length < rule.max) {
                        valid[field] = `Max length must <= ${rule.max}`
                    } else if (rule.min && value.length < rule.min) {
                        valid[field] = `Min length must >= ${rule.min}`
                    }
                    break
                case 'number':
                    if (rule.required && value !== 0 && !value) {
                        valid[field] = 'Required field'
                    } else if (rule.max !== undefined && rule.min !== undefined) {
                        if (value > rule.max || value < rule.min) {
                            valid[field] = `Max value must >= ${rule.min}, and <= ${rule.max}`
                        }
                    } else if (rule.max && value < rule.max) {
                        valid[field] = `Max value must <= ${rule.max}`
                    } else if (rule.min && value < rule.min) {
                        valid[field] = `Min value must >= ${rule.min}`
                    }
                    break
                case 'object':
                    if (rule.required && !value) {
                        valid[field] = 'Required field'
                    }
                    break
            }
        }
    })
    return Object.keys(valid).length > 0 ? valid : undefined
}

export const useForm = ({ page, defaultValue }: IProps) => {
    const id = useId()
    const uniqueId = useMemo(() => (page ? getId(FORM_SUFFIX, page) : id), [id, page])
    const formRef = useRef<FormClassComponent>()

    const FormContext = memo(({ render, rules, onSubmit }: FormWrapperProps) => {
        return (
            <Form
                id={uniqueId}
                ref={formRef}
                validator={validator.bind(null, rules)}
                onSubmit={(data) => {
                    if (onSubmit) {
                        onSubmit(data)
                    }
                }}
                initialValues={defaultValue}
                render={render}
            />
        )
    })

    return {
        id: uniqueId,
        form: formRef.current,
        validator,
        FormContext,
    }
}
