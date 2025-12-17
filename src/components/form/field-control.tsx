import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { GridLayoutItem, GridLayoutItemProps } from '@progress/kendo-react-layout'
import { FIELD_LAYOUT_ITEM_FLAG } from '../../constants'

const Layout = styled(GridLayoutItem)`
    grid-area: unset !important;
`

export const FieldControl = ({
    children,
    className,
    ...others
}: PropsWithChildren<GridLayoutItemProps>) => {
    const cls = `${FIELD_LAYOUT_ITEM_FLAG} ${className ?? ''}`.trim()
    return (
        <Layout {...others} className={cls}>
            {children}
        </Layout>
    )
}
