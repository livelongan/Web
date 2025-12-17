import { GridDetailRowProps, GridHandle } from '@progress/kendo-react-grid'
import { styled } from 'styled-components'
import { RefObject, useCallback } from 'react'
import { useInternationalization } from '@progress/kendo-react-intl'
import { GridTableColumnProps } from './grid-table'
import { ACTION_FIELD, EXPANDED_FIELD, GAP, SELECTED_FIELD } from '../../constants'
const Root = styled.section`
    display: flex;
    gap: ${GAP.normal}px;
    flex-flow: wrap;
    p {
        display: flex;
    }
    span {
        margin-left: ${GAP.normal}px;
        margin-right: ${GAP.large}px;
    }
`
type IProps = GridDetailRowProps & {
    gridRef: RefObject<GridHandle>
}

export const GridDetail = (props: IProps) => {
    const intl = useInternationalization()
    const { gridRef, dataItem } = props
    const columns = (gridRef.current?.columns ?? []) as GridTableColumnProps[]

    const getValue = useCallback(
        (it: GridTableColumnProps): string => {
            const format = `${it.format}`.replace('{0:', '').replace('}', '')
            if (it.type === 'numeric') {
                return intl.formatNumber(dataItem[`${it.field}`], format)
            } else if (it.type === 'date') {
                return intl.formatDate(dataItem[`${it.field}`], format)
            }
            return dataItem[`${it.field}`] as string
        },
        [dataItem, intl],
    )

    return columns.length > 0 ? (
        <Root>
            {columns
                .filter(
                    (it) =>
                        !it.disappear &&
                        ![SELECTED_FIELD, EXPANDED_FIELD, ACTION_FIELD].includes(it.field),
                )
                .map((it) => (
                    <p key={it.field}>
                        <strong>{it.title}</strong>
                        <span>{getValue(it)}</span>
                    </p>
                ))}
            {columns
                .filter(
                    (it) =>
                        !it.disappear &&
                        ![SELECTED_FIELD, EXPANDED_FIELD, ACTION_FIELD].includes(it.field),
                )
                .map((it) => (
                    <p key={it.field}>
                        <strong>{it.title}</strong>
                        <span>{getValue(it)}</span>
                    </p>
                ))}
        </Root>
    ) : null
}
