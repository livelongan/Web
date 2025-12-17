import { BaseFieldProps } from './types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { BaseField, useBaseField } from './base-field'
import {
    AutoCompleteWithoutContext,
    ComboBox,
    ComboBoxBlurEvent,
    ComboBoxChangeEvent,
    ComboBoxFilterChangeEvent,
    ComboBoxFocusEvent,
    ComboBoxPageChangeEvent,
    ComboBoxProps,
} from '@progress/kendo-react-dropdowns'
import { filterBy } from '@progress/kendo-data-query'
import {
    MAPPING_PAGE_SIZE,
    MAPPING_ITEM_KEY,
    MAPPING_TEXT_FIELD,
    POPUP_ANIMATE,
    ROUNDED,
} from '../../constants'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

export type FormDropdownProps = BaseFieldProps &
    Omit<ComboBoxProps, 'data' | 'value' | 'dataItemKey'> & {
        data: KeyValue<any>[]
        dataItemKey?: string
    }

export const FormDropdown = observer((props: FormDropdownProps) => {
    const ref = useRef<AutoCompleteWithoutContext>(null)
    const { formId, name, label, data, dataItemKey = MAPPING_ITEM_KEY, ...others } = props

    const { formStore } = useStores()
    const values = formStore.formValues(formId)
    const errors = formStore.formErrors(formId)
    const value = formStore.valueGetter(formId, name)
    const rule = formStore.getFieldRule(formId, name)

    const { id } = useBaseField(props)
    const [error, setError] = useState<string>()
    const [checked, setChecked] = useState<any>(value)
    const dataRef = useRef(data.slice())

    const [state, setState] = useState({
        skip: 0,
        total: data.length,
        subsetData: data.slice(0, MAPPING_PAGE_SIZE),
    })

    const handlePageChange = useCallback(
        (event: ComboBoxPageChangeEvent) => {
            const skip = event.page.skip
            const take = event.page.take
            setState({
                ...state,
                subsetData: dataRef.current.slice(skip, skip + take),
                skip: skip,
            })
        },
        [state],
    )

    const handleFilterChange = useCallback(
        (event: ComboBoxFilterChangeEvent) => {
            dataRef.current = filterBy(data.slice(), event.filter)
            const subsetData = dataRef.current.slice(0, MAPPING_PAGE_SIZE)
            setState({
                subsetData,
                skip: 0,
                total: dataRef.current.length,
            })
        },
        [data],
    )

    const findSelected = useCallback(
        (sid: any) => {
            return data.find((it) => {
                return it[dataItemKey] === sid
            })
        },
        [data, dataItemKey],
    )

    const handleInitValue = useCallback(
        (value: any) => {
            if (value) {
                let sid = value
                if (value && typeof value === 'object') {
                    sid = value[dataItemKey]
                }
                const selected = findSelected(sid)
                setChecked(selected)
            } else {
                setChecked(null)
            }
        },
        [dataItemKey, findSelected],
    )

    useEffect(() => {
        handleInitValue(values[name])
    }, [handleInitValue, name, values])

    useEffect(() => {
        handleInitValue(value)
    }, [handleInitValue, value])

    useEffect(() => {
        setError(errors[name])
    }, [errors, name])

    return (
        <BaseField {...props} required={rule?.required} error={error}>
            <ComboBox
                filterable
                textField={MAPPING_TEXT_FIELD}
                rounded={ROUNDED}
                id={id}
                {...others}
                name={name}
                ref={ref}
                value={checked}
                valid={!error}
                required={rule?.required}
                data={state.subsetData}
                dataItemKey={dataItemKey}
                virtual={{
                    total: state.total,
                    skip: state.skip,
                    pageSize: MAPPING_PAGE_SIZE,
                }}
                popupSettings={{
                    animate: POPUP_ANIMATE,
                }}
                onFilterChange={handleFilterChange}
                onPageChange={handlePageChange}
                onChange={(event: ComboBoxChangeEvent) => {
                    const value = event.value
                    setChecked(value)
                    formStore.valueSetter(formId, name, value)

                    if (props.onChange) {
                        props.onChange(event)
                    }
                }}
                onFocus={(event: ComboBoxFocusEvent) => {
                    formStore.setFieldTouched(formId, name, true)
                    const value = event.target.value
                    formStore.fieldValidator(formId, name, value)

                    if (props.onFocus) {
                        props.onFocus(event)
                    }
                }}
                onBlur={(event: ComboBoxBlurEvent) => {
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
