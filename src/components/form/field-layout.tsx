import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { GridLayout, GridLayoutProps } from '@progress/kendo-react-layout'
import { FIELD_MIN_WIDTH, FIELD_LAYOUT_FLAG, FIELD_GAP } from '../../constants'

const Root = styled(GridLayout)`
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, ${FIELD_MIN_WIDTH}px);
`

export type FieldLayoutHandler = {
    getMaxSpan: () => number
}
type FieldLayoutProps = PropsWithChildren<GridLayoutProps>

export const FieldLayout = (props: FieldLayoutProps) => {
    const { children, className, ...others } = props

    return (
        <Root
            {...others}
            className={`${FIELD_LAYOUT_FLAG} ${className ?? ''}`.trim()}
            gap={{ cols: FIELD_GAP, rows: 0 }}
        >
            {children}
        </Root>
    )
}
