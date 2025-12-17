import { PropsWithChildren, useRef } from 'react'
import { styled } from 'styled-components'
import { StackLayoutProps } from '@progress/kendo-react-layout'
import { FORM_LAYOUT_FLAG } from '../../constants'

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    min-height: 0;
    min-width: 0;

    .k-form-field {
        margin-top: 0;
    }
`

export const FormLayout = ({
    children,
    className,
    ...others
}: PropsWithChildren<StackLayoutProps>) => {
    const cls = `${FORM_LAYOUT_FLAG} ${className ?? ''}`.trim()
    const ref = useRef<HTMLDivElement>(null)

    return (
        <Layout {...others} className={cls} ref={ref}>
            {children}
        </Layout>
    )
}
