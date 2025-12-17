import { styled } from 'styled-components'
import { Error, ErrorProps } from '@progress/kendo-react-labels'

export type FieldErrorProps = Partial<ErrorProps> & {
    id: string
    text?: string | null
}

const Root = styled(Error)``

export const FieldError = (props: FieldErrorProps) => {
    const { text } = props

    return (text && <Root {...props}>{text}</Root>) || null
}
