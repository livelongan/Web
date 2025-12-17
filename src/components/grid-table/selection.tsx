import { GridColumn } from '@progress/kendo-react-grid'
import { memo } from 'react'
import { SELECTED_FIELD } from '../../constants'

type IProps = {
    field?: string
}

export const Selection = memo(({ field = SELECTED_FIELD }: IProps) => (
    <GridColumn
        filterable={false}
        field={field}
        width={28}
        className="selection"
        headerClassName="selection"
    />
))
