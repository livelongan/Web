import { TextBox, TextBoxProps } from '@progress/kendo-react-inputs'
import { BaseFieldProps } from './types'
import { useEffect, useState } from 'react'
import { BaseField, useBaseField } from './base-field'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'
import { ROUNDED } from '../../constants'

export type FormTextProps = BaseFieldProps & TextBoxProps

export const FormText = observer((props: FormTextProps) => {
    const { formId, name, label, ...others } = props
    const { id } = useBaseField(props)
    const { formStore } = useStores()

    const values = formStore.formValues(formId)
    const errors = formStore.formErrors(formId)
    const value = formStore.valueGetter(formId, name)
    const rule = formStore.getFieldRule(formId, name)

    const [error, setError] = useState<string>()
    const [checked, setChecked] = useState<string | number>('')

    useEffect(() => {
        let value = values[name]
        if (value === undefined || value === null) {
            value = ''
        }
        setChecked(value)
    }, [name, values])

    useEffect(() => {
        if (value === undefined || value === null) {
            setChecked('')
        } else {
            setChecked(value)
        }
    }, [value])

    useEffect(() => {
        setError(errors[name] ?? '')
    }, [errors, name])

    return (
        <BaseField {...props} required={rule?.required} error={error}>
            <TextBox
                title={`${checked}`}
                rounded={ROUNDED}
                id={id}
                {...others}
                name={name}
                required={rule?.required}
                value={checked}
                valid={!error}
                onChange={(event) => {
                    const value = event.value
                    setChecked(value as string)
                    formStore.valueSetter(formId, name, value)

                    if (props.onChange) {
                        props.onChange(event)
                    }
                }}
                onFocus={(event) => {
                    formStore.setFieldTouched(formId, name, true)
                    const value = event.target.value
                    formStore.fieldValidator(formId, name, value)
                    if (props.onFocus) {
                        props.onFocus(event)
                    }
                }}
                onBlur={(event) => {
                    formStore.setFieldVisited(formId, name, true)
                    const value = event.target.value
                    formStore.fieldValidator(formId, name, value)
                    if (props.onFocus) {
                        props.onFocus(event)
                    }
                }}
            />
        </BaseField>
    )
})
