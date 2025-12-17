import {
    GridColumnMenuCheckboxFilter,
    GridColumnMenuFilter,
    GridColumnMenuProps,
} from '@progress/kendo-react-grid'
import { memo } from 'react'
import { GridTableProps } from '../grid-table'

type CheckboxFilterProps = Omit<GridColumnMenuProps, 'data'> & {
    data: GridTableProps['data']
}

export const FilterMenu = memo((props: GridColumnMenuProps) => {
    return <GridColumnMenuFilter {...props} expanded={true} />
})

export const CheckboxFilter = (props: CheckboxFilterProps) => {
    return <GridColumnMenuCheckboxFilter {...props} expanded={true} />
}
