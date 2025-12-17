import { styled } from 'styled-components'
import { Label, LabelProps } from '@progress/kendo-react-labels'
import { Typography } from '../typography'

export type FieldLabelProps = LabelProps & {
    label?: string
    required?: boolean
}

const Root = styled(Label)`
    overflow: hidden;
    margin-bottom: 4px;
`
const RootText = styled(Typography)`
    text-overflow: ellipsis;
    margin: 0 2px;
`
const Required = styled.span`
    font-weight: normal;
    margin-left: 4px;
    color: var(--kendo-color-error);
    font-family:
        MS PGothic,
        Arial,
        Helvetica,
        sans-serif;
`
export const FieldLabel = (props: FieldLabelProps) => {
    const { label, required, className = '', ...others } = props
    return (
        <Root className={`${className}`.trim()} {...others}>
            <RootText title={label} fontWeight="bold">
                {label}
            </RootText>
            {required && <Required> *</Required>}
        </Root>
    )
}
