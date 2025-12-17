import {
    CSSProperties,
    FormEvent,
    FormEventHandler,
    LegacyRef,
    PropsWithChildren,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import { FIELD_MIN_WIDTH, FORM_SUFFIX } from '../../constants'
import { getId } from '../../utils'
import { FormMode, FormRule, FormValueType } from './types'
import { useStores } from '../../stores'
import { ifValueChanged, validateField, validator } from './fn'
import { observer } from 'mobx-react-lite'
import { styled } from 'styled-components'

type ValuesType = KeyValue<FormValueType>
type FormContextHookProps = PropsWithChildren & {
    mode: FormMode
    data: ValuesType

    formId?: string
    page?: string
    rules?: FormRule
}

type FormProps = {
    id: string
    fieldWidth?: number
    onReset?: () => void

    onChange?: FormEventHandler<HTMLFormElement>
    onSubmit?: FormEventHandler<HTMLFormElement>
}
export type FormContextProps = {
    formId: string
    fieldWidth?: number
    style?: CSSProperties | undefined
    onReset?: () => void

    onChange?: (values: ValuesType) => void
    onSubmit?: (data: {
        values: ValuesType
        isErrors: boolean
        isModified: boolean
        event: FormEvent<HTMLFormElement>
    }) => void
    onSubmitError?: (data: {
        values: ValuesType
        errors: KeyValue<string | undefined>
        isModified: boolean
        event: FormEvent<HTMLFormElement>
    }) => void
}
const FormRoot = styled.form<FormProps>`
    .form-field {
        width: ${(props) => (!props['fieldWidth'] ? 'auto' : `${props['fieldWidth']}px`)};
        min-width: ${(props) => (!props['fieldWidth'] ? FIELD_MIN_WIDTH : props['fieldWidth'])}px;
    }
`
export const FormContext = observer(
    ({ children, onChange, style, ...others }: PropsWithChildren<FormContextProps>) => {
        const { formId, fieldWidth, onReset, onSubmit, onSubmitError } = others
        const { formStore } = useStores()
        const rootRef: LegacyRef<HTMLFormElement> = useRef(null)
        const [dependence] = useState({ onChange: onChange })

        const values = formStore.formValues(formId)
        const hasModified = formStore.hasModified(formId)
        const hasErrors = formStore.hasErrors(formId)

        const handleChange = useCallback(() => {
            if (dependence.onChange && hasModified && !hasErrors) {
                dependence.onChange({ ...values })
            }
        }, [hasErrors, hasModified, dependence, values])

        useEffect(() => {
            handleChange()
        }, [values, handleChange])

        return (
            <FormRoot
                id={formId}
                fieldWidth={fieldWidth}
                style={{ height: '100%', ...style }}
                onReset={() => {
                    formStore.reset(formId)
                    if (onReset) {
                        onReset()
                    }
                }}
                onSubmit={(event) => {
                    event.preventDefault()
                    const hasError = formStore.hasErrors(formId)

                    if (hasError) {
                        const formFields = rootRef.current?.querySelectorAll(`[data-field]`) ?? []
                        if (formFields.length === 1) {
                            const root = formFields[1] as HTMLDivElement
                            const attr = `${root.dataset.field}`
                            if (formStore.getFieldError(formId, attr)) {
                                const input = root.querySelector(
                                    '.k-input-inner',
                                ) as HTMLInputElement
                                if (input) {
                                    input.focus()
                                }
                            }
                        }
                        console.log('Submit error', {
                            values: formStore.formValues(formId),
                            errors: formStore.formErrors(formId),
                            isModified: formStore.hasModified(formId),
                            event,
                        })
                        if (onSubmitError) {
                            onSubmitError({
                                values: formStore.formValues(formId),
                                errors: formStore.formErrors(formId),
                                isModified: formStore.hasModified(formId),
                                event,
                            })
                        }
                    }

                    if (onSubmit && !hasError) {
                        onSubmit({
                            values: formStore.formValues(formId),
                            event,
                            isErrors: hasError,
                            isModified: formStore.hasModified(formId),
                        })
                    }
                }}
            >
                {children}
            </FormRoot>
        )
    },
)

export const useFormContext = ({ page, mode, rules = {}, data = {} }: FormContextHookProps) => {
    const id = useId()
    const { formStore } = useStores()
    const [dependence] = useState({
        loaded: false,
    })
    const formId = useMemo(() => (page ? getId(FORM_SUFFIX, page) : id), [id, page])

    const valueSetter = useCallback(
        (field: string, val: FormValueType) => {
            formStore.valueSetter(formId, field, val)
        },
        [formStore, formId],
    )
    const valueGetter = useCallback(
        (field: string) => {
            return formStore.valueGetter(formId, field)
        },
        [formStore, formId],
    )

    const resetForm = useCallback(() => {
        formStore.reset(formId)
    }, [formStore, formId])

    useEffect(() => {
        if (!dependence.loaded) {
            dependence.loaded = true
            formStore.addForm({
                id: formId,
                page,
                mode,
                defaultRule: { ...rules },
                rules: { ...rules },
                defaultValue: { ...data },
                values: { ...data },
                modified: {},
                visited: {},
                touched: {},
                errors: {},
            })
        }
    }, [data, dependence, formStore, mode, page, rules, formId])

    return {
        id: formId,

        valueGetter,
        valueSetter,
        formStore: formStore,
        ruleSetter: (field: string, value: FormValueType) => {
            formStore.setFieldRule(formId, field, value)
        },
        fieldValidator: (field: string, value: FormValueType) => {
            formStore.fieldValidator(formId, field, value)
        },
        reset: resetForm,

        validator,
        validateField,
        ifValueChanged,
    }
}
