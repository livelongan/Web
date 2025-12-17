/* eslint-disable react/destructuring-assignment */
import { BaseFieldProps } from './types'
import { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { BaseField, useBaseField } from './base-field'
import {
    ComboBoxBlurEvent,
    ComboBoxChangeEvent,
    ComboBoxFilterChangeEvent,
    ComboBoxFocusEvent,
    ComboBoxPageChangeEvent,
    ListItemProps,
    MultiColumnComboBox,
    MultiColumnComboBoxHandle,
    MultiColumnComboBoxProps,
} from '@progress/kendo-react-dropdowns'
import { filterBy } from '@progress/kendo-data-query'
import {
    MAPPING_PAGE_SIZE,
    MAPPING_ITEM_KEY,
    POPUP_ANIMATE,
    SELECTION_WIDTH,
    MAPPING_FILTER_FIELD,
    ROUNDED,
} from '../../constants'
import { Checkbox, CheckboxChangeEvent } from '@progress/kendo-react-inputs'
import { GridTableColumnProps } from '../grid-table'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'

export type DropdownColumnProps = Pick<
    GridTableColumnProps,
    'field' | 'title' | 'width' | 'type' | 'disappear' | 'align' | 'filter'
>

export type FormGridDropdownProps = BaseFieldProps &
    Omit<MultiColumnComboBoxProps, 'data' | 'value' | 'dataItemKey' | 'columns'> & {
        data: KeyValue<any>[]
        dataItemKey?: string
        columns: DropdownColumnProps[]
    }

export const FormGridDropdown = observer((props: FormGridDropdownProps) => {
    const { formStore } = useStores()
    const { formId, name, label, columns, data, dataItemKey = MAPPING_ITEM_KEY, ...others } = props
    const values = formStore.formValues(formId)
    const errors = formStore.formErrors(formId)
    const value = formStore.valueGetter(formId, name)
    const rule = formStore.getFieldRule(formId, name)

    const { id } = useBaseField(props)
    const [error, setError] = useState<string>()
    const [checked, setChecked] = useState<any>()
    const [dependence] = useState({ source: false })
    const [sources, setSources] = useState<KeyValue<any>[]>([])

    const dataRef = useRef(sources.slice())
    const [state, setState] = useState({
        skip: 0,
        total: sources.length,
        subsetData: sources.slice(0, MAPPING_PAGE_SIZE),
    })
    const ref = useRef<MultiColumnComboBoxHandle>(null)

    const realColumns = useMemo(() => {
        const data = [...columns]
        const has = columns.find((it) => it.field === dataItemKey)
        if (!has) {
            data.unshift({
                field: dataItemKey,
                width: SELECTION_WIDTH,
                title: '',
            })
        } else {
            has.width = SELECTION_WIDTH
            has.title = ''
        }

        return data
    }, [columns, dataItemKey])

    const columnData = useMemo(() => {
        return realColumns.map((it) => {
            return { ...it, header: it.title }
        })
    }, [realColumns])
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
            dataRef.current = filterBy(sources.slice(), event.filter)
            const subsetData = dataRef.current.slice(0, MAPPING_PAGE_SIZE)
            setState({
                subsetData,
                skip: 0,
                total: dataRef.current.length,
            })
        },
        [sources],
    )
    const handleCheckbox = useCallback(
        (event: CheckboxChangeEvent, row: any) => {
            event.syntheticEvent.stopPropagation()
            if (!checked || checked[dataItemKey] !== row[dataItemKey]) {
                setChecked(row)
            } else {
                setChecked(null)
            }
        },
        [checked, dataItemKey],
    )

    const itemRender = (
        li: React.ReactElement<HTMLLIElement, string | React.JSXElementConstructor<any>>,
        props: ListItemProps,
    ) => {
        const children = realColumns.map((col, index) => {
            const sid = props.dataItem[dataItemKey] as string | number
            return (
                <span className="k-table-td" style={{ width: col.width }} key={`key_${index}`}>
                    {col.field === dataItemKey ? (
                        <Checkbox
                            value={checked ? checked[dataItemKey] === sid : false}
                            onChange={(event) => handleCheckbox(event, props.dataItem)}
                        />
                    ) : (
                        props.dataItem[col.field]
                    )}
                </span>
            )
        })

        return cloneElement(li, { ...li.props }, children)
    }

    const findSelected = useCallback(
        (sid: any) => {
            return sources.find((it) => {
                return it[dataItemKey] === sid
            })
        },
        [dataItemKey, sources],
    )

    const handleInitValue = useCallback(
        (value: any) => {
            if (value && dependence.source) {
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
        [dataItemKey, dependence.source, findSelected],
    )

    useEffect(() => {
        if (data.length > 0 && !dependence.source) {
            const filterFields = columns.filter((it) => it.filter).map((it) => it.field)
            // const filterTitles = columns.filter((it) => it.filter).map((it) => it.field)
            const temp = data.map((it) => {
                return {
                    ...it,
                    [MAPPING_FILTER_FIELD]: filterFields
                        .map((field) => {
                            return it[field]
                        })
                        .join('/'),
                }
            })
            setSources(temp)
            dependence.source = true
            dataRef.current = temp.slice()
            setState({
                skip: 0,
                total: temp.length,
                subsetData: temp.slice(0, MAPPING_PAGE_SIZE),
            })
        }
    }, [columns, data, dependence])

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
            <MultiColumnComboBox
                filterable
                rounded={ROUNDED}
                id={id}
                {...others}
                columns={columnData}
                name={name}
                ref={ref}
                value={checked}
                valid={!error}
                required={rule?.required}
                data={state.subsetData}
                dataItemKey={dataItemKey}
                textField={MAPPING_FILTER_FIELD}
                itemRender={itemRender}
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
