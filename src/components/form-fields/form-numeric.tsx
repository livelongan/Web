import { observer } from 'mobx-react-lite'
import { NumericTextBox, NumericTextBoxProps } from '@progress/kendo-react-inputs'
import { BaseFieldProps } from './types'
import { BaseField, useBaseField } from './base-field'
import { useEffect, useState } from 'react'
import { NumberFormatOptions } from '@progress/kendo-intl'
import { useStores } from '../../stores'
import { ROUNDED } from '../../constants'

export type FormNumericProps = BaseFieldProps &
    NumericTextBoxProps & {
        decimal?: number
        format?: string | NumberFormatOptions
    }

export const FormNumeric = observer((props: FormNumericProps) => {
    const { formId, name, format, decimal = 0, label, ...others } = props
    const { id } = useBaseField(props)
    const { formStore } = useStores()

    const values = formStore.formValues(formId)
    const errors = formStore.formErrors(formId)
    const value = formStore.valueGetter(formId, name)
    const rule = formStore.getFieldRule(formId, name)

    const [error, setError] = useState<string>()
    const [checked, setChecked] = useState<number | undefined>(value)

    useEffect(() => {
        let value = values[name]
        if (value === undefined) {
            value = null
        }
        setChecked(value)
    }, [name, values])

    useEffect(() => {
        setError(errors[name])
    }, [errors, name])

    return (
        <BaseField {...props} required={rule?.required} error={error}>
            <NumericTextBox
                title={`${checked?.toFixed(decimal)}`}
                rounded={ROUNDED}
                id={id}
                step={Math.pow(0.1, decimal)}
                {...others}
                name={name}
                format={format ?? `n${decimal}`}
                value={checked}
                valid={!error}
                spinners
                onChange={(event) => {
                    const value = event.value
                    setChecked(value as number)
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
