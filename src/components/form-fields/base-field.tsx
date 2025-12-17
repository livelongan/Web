import { BaseFieldProps } from './types'
import { memo, PropsWithChildren } from 'react'
import { FieldError } from './field-error'
import { FieldLabel } from './field-label'
import { Hint } from '@progress/kendo-react-labels'
import { styled } from 'styled-components'
import { getFieldId } from '../form'
import { FIELD_MIN_WIDTH } from '../../constants'

type IProps = PropsWithChildren<Omit<BaseFieldProps, 'children'>>

const HintRoot = styled.div`
    overflow: hidden;
    height: 24px;
    padding: 0 2px;
    .k-form-hint,
    .k-form-error {
        margin-top: 2px;
    }
`
const Control = styled.div`
    display: flex;
    flex-direction: column-reverse;
`

const FormField = styled.div`
    min-width: ${FIELD_MIN_WIDTH}px;
`

const Readonly = styled(Hint)`
    color: var(--kendo-color-warning);
`

export const useBaseField = (props: IProps) => {
    const { name } = props
    const page = 'page'
    const mode = 'add'

    return {
        mode,
        page,
        id: props.id ?? getFieldId(mode, name, page),
    }
}

export const BaseField = memo((props: IProps) => {
    const { hint, name, label, error, required, disabled, children, readOnly } = props
    const { id, mode } = useBaseField(props)
    const readonly = mode === 'view' || readOnly

    return (
        <FormField className="form-field" data-field={name}>
            <Control className="field-control">
                {children}
                <FieldLabel
                    editorValid={!error}
                    editorId={id}
                    label={label}
                    required={required}
                    editorDisabled={disabled}
                />
            </Control>
            <HintRoot className="field-message">
                {readonly && <Readonly direction="end">{'Read Only'}</Readonly>}
                {!readonly && <FieldError id={id} text={error} />}
                {!readonly && hint && <Hint direction="end">{hint}</Hint>}
            </HintRoot>
        </FormField>
    )
})
