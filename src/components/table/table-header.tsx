import Box from '@mui/material/Box'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Checkbox from '@mui/material/Checkbox'
import { visuallyHidden } from '@mui/utils'
import type { CellProps } from './table-normal'

export type TableHeaderProps<T> = {
  cells: CellProps<T>[]
  selected: number
  order?: 'asc' | 'desc' | 'none'
  orderBy?: keyof T
  onSelectAll: (event: React.ChangeEvent<HTMLInputElement>) => void
  onSort: (event: React.MouseEvent<unknown>, property: keyof T) => void
  rowCount: number
  operations?: Array<'edit' | 'delete' | 'view'> | null
}

export function TableHeader<T>(props: TableHeaderProps<T>) {
  const {
    cells,
    order,
    orderBy,
    selected,
    rowCount,
    operations = [],
    onSort,
    onSelectAll,
  } = props

  const handleSorting = (property: keyof T) => (event: React.MouseEvent) => {
    onSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={selected > 0 && selected < rowCount}
            checked={rowCount > 0 && selected === rowCount}
            onChange={onSelectAll}
            slotProps={{
              input: {
                'aria-label': 'select all desserts',
              },
            }}
          />
        </TableCell>
        {operations !== null && operations.length > 0 && (
          <TableCell
            align='center'
            sx={{ width: `${operations.length * 35}px` }}
          >
            Operate
          </TableCell>
        )}
        {cells.map((cell) => (
          <TableCell
            key={String(cell.field)}
            sortDirection={
              orderBy === cell.field && order !== 'none' ? order : false
            }
            {...cell}
          >
            <TableSortLabel
              active={orderBy === cell.field && order !== 'none'}
              direction={
                orderBy === cell.field
                  ? order === 'none'
                    ? 'asc'
                    : order
                  : 'asc'
              }
              onClick={handleSorting(cell.field)}
            >
              {cell.title || String(cell.field)}
              {orderBy === cell.field && order !== 'none' ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell />
      </TableRow>
    </TableHead>
  )
}
