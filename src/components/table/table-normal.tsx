import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell, { type TableCellProps } from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableRow from '@mui/material/TableRow'
import Checkbox from '@mui/material/Checkbox'
import { observer } from 'mobx-react-lite'
import { TableHeader, type TableHeaderProps } from './table-header'
import { useMemo, useState, useRef, useEffect } from 'react'
import { TablePaging } from './table-paging'
import EditNoteIcon from '@mui/icons-material/EditNote'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import LaunchIcon from '@mui/icons-material/Launch'
import { ButtonBaseIcon } from '../buttons'
import { Box } from '@mui/material'
import DoneIcon from '@mui/icons-material/Done'
import TextField from '@mui/material/TextField'

type Order = 'asc' | 'desc' | 'none'

const descendingComparator = <T,>(
  after: T,
  before: T,
  orderBy: keyof T,
): number => {
  if (before[orderBy] < after[orderBy]) {
    return -1
  }
  if (before[orderBy] > after[orderBy]) {
    return 1
  }
  return 0
}

const getComparator = <T,>(
  order: Order,
  orderBy: keyof T,
): ((after: T, before: T) => number) => {
  if (order === 'none') {
    return () => 0
  }
  return order === 'desc'
    ? (after, before) => descendingComparator(after, before, orderBy)
    : (after, before) => -descendingComparator(after, before, orderBy)
}

export type CellProps<T> = TableCellProps & {
  field: keyof T
  label?: string
  editable?: boolean
}

type TableNormalProps<T> = {
  rows: T[]
  cells: CellProps<T>[]
  title?: string
  dataKey: keyof T
  pageSize?: number
  operations?: TableHeaderProps<T>['operations']
  onRowClick?: (row: T) => void
  onAddRow?: () => T
  onRowUpdate?: (row: T, field: keyof T, value: any) => void
  onSave?: (row: T) => void
}

export const TableNormal = observer(
  <T extends Record<string, any>>({
    rows,
    cells,
    title = 'Table',
    dataKey,
    pageSize = 10,
    operations = ['edit', 'delete', 'view'],
    onRowClick,
    onAddRow,
    onRowUpdate,
    onSave,
  }: TableNormalProps<T>) => {
    const [order, setOrder] = useState<Order>('none')
    const [orderBy, setOrderBy] = useState<keyof T>(cells[0]?.field || dataKey)
    const [selected, setSelected] = useState<T[]>([])
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(pageSize)
    const [editingRow, setEditingRow] = useState<T | null>(null)
    const [editingValues, setEditingValues] = useState<Partial<T>>({})
    const [isNewRow, setIsNewRow] = useState(false)
    const [localRows, setLocalRows] = useState<T[]>([])
    const tableRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      setLocalRows([...rows])
    }, [rows])

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          editingRow &&
          tableRef.current &&
          !tableRef.current.contains(event.target as Node)
        ) {
          if (isNewRow) {
            // Remove the new row if editing is canceled
            setLocalRows((prev) => prev.filter((row) => row !== editingRow))
          }
          setEditingRow(null)
          setEditingValues({})
          setIsNewRow(false)
        }
      }

      document.addEventListener('mousedown', handleClickOutside)
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [editingRow, isNewRow])

    const handleSort: TableHeaderProps<T>['onSort'] = (_, property) => {
      if (order === 'none' || orderBy !== property) {
        setOrder('asc')
        setOrderBy(property)
      } else {
        setOrder((prevOrder) => {
          if (prevOrder === 'asc') {
            return 'desc'
          }
          return 'none'
        })
      }
    }

    const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        setSelected([...localRows])
        return
      }
      setSelected([])
    }

    const handleReset = () => {
      setOrder('none')
      setOrderBy(cells[0]?.field || dataKey)
      setSelected([])
      setPage(0)
      setEditingRow(null)
      setEditingValues({})
      setIsNewRow(false)
      setLocalRows([...rows])
    }

    const handleSaveAll = () => {}

    const toggleRowSelection = (row: T) => {
      const selectedIndex = selected.findIndex(
        (item) => item[dataKey] === row[dataKey],
      )
      let newSelected: T[] = []
      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, row)
      } else {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1),
        )
      }
      setSelected(newSelected)
    }

    const handleCheckboxClick = (event: React.MouseEvent<unknown>, row: T) => {
      event.stopPropagation()
      toggleRowSelection(row)
    }

    const handleRowClick = (event: React.MouseEvent<unknown>, row: T) => {
      if (
        (event.target as HTMLElement).closest(
          '.MuiCheckbox-root, .MuiButtonBase-root',
        )
      ) {
        return
      }

      if (!editingRow) {
        toggleRowSelection(row)
        return
      }

      if (editingRow && editingRow[dataKey] === row[dataKey]) {
        return
      }

      if (editingRow) {
        setEditingRow(row)
        setEditingValues({})
        setIsNewRow(false)
        return
      }

      if (onRowClick) {
        onRowClick(row)
      }
    }

    const handleAddRow = () => {
      if (onAddRow) {
        const newRow = onAddRow()
        setLocalRows((prev) => [newRow, ...prev])
        setEditingRow(newRow)
        setEditingValues({})
        setIsNewRow(true)
        setPage(0)
      }
    }

    const handleEdit = (event: React.MouseEvent<unknown>, row: T) => {
      event.stopPropagation()
      setEditingRow(row)
      setEditingValues({})
      setIsNewRow(false)
    }

    const handleSave = (event: React.MouseEvent<unknown>, row: T) => {
      event.stopPropagation()
      const updatedRow = { ...row, ...editingValues }
      if (onSave) {
        onSave(updatedRow)
      }

      if (onRowUpdate && !isNewRow) {
        Object.keys(editingValues).forEach((field) => {
          onRowUpdate(
            updatedRow,
            field as keyof T,
            editingValues[field as keyof T],
          )
        })
      }

      setEditingRow(null)
      setEditingValues({})
      setIsNewRow(false)
    }

    const handleFieldChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      field: keyof T,
    ) => {
      const value = event.target.value
      setEditingValues((prev) => ({
        ...prev,
        [field]: value,
      }))
    }

    const visibleRows = useMemo(() => {
      let sortedRows = [...localRows]

      if (order !== 'none') {
        sortedRows.sort(getComparator(order, orderBy))
      }

      return sortedRows.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      )
    }, [order, orderBy, page, rowsPerPage, localRows])

    const isSelected = (row: T) =>
      selected.some((item) => item[dataKey] === row[dataKey])

    return (
      <Box className='table-normal' sx={{ width: '100%' }} ref={tableRef}>
        <TablePaging
          page={page}
          count={localRows.length}
          rowsPerPage={rowsPerPage}
          selectCount={selected.length}
          onReset={handleReset}
          onAdd={handleAddRow}
          onSaveAll={handleSaveAll}
          onChange={(page) => setPage(page)}
          onChangeRowsPage={(rows) => {
            setRowsPerPage(rows)
          }}
        />
        <TableContainer>
          <Table aria-labelledby={title} size={'small'}>
            <TableHeader
              cells={cells}
              selected={selected.length}
              order={order === 'none' ? undefined : order}
              orderBy={order === 'none' ? undefined : orderBy}
              onSelectAll={handleSelectAll}
              onSort={handleSort}
              rowCount={localRows.length}
              operations={operations}
            />
            <TableBody>
              {visibleRows.map((row, index) => {
                const checked = isSelected(row)
                const isEditing =
                  editingRow && editingRow[dataKey] === row[dataKey]

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleRowClick(event, row)}
                    role='checkbox'
                    aria-checked={checked}
                    tabIndex={-1}
                    key={String(row[dataKey])}
                    selected={checked}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        color='primary'
                        checked={checked}
                        onClick={(event) => handleCheckboxClick(event, row)}
                        slotProps={{
                          input: {
                            'aria-labelledby': `table-checkbox-${index}`,
                          },
                        }}
                      />
                    </TableCell>
                    {operations !== null && operations.length > 0 && (
                      <TableCell
                        sx={{ width: `${operations.length * 35}px` }}
                        padding='none'
                      >
                        <Box
                          className={'table-operations'}
                          sx={{ width: `${operations.length * 35}px` }}
                        >
                          {operations.includes('view') && (
                            <ButtonBaseIcon title='View'>
                              <LaunchIcon />
                            </ButtonBaseIcon>
                          )}
                          {operations.includes('delete') && (
                            <ButtonBaseIcon title='Delete'>
                              <DeleteOutlineIcon />
                            </ButtonBaseIcon>
                          )}
                          {isEditing ? (
                            <ButtonBaseIcon
                              title='Save'
                              onClick={(event) => handleSave(event, row)}
                            >
                              <DoneIcon />
                            </ButtonBaseIcon>
                          ) : operations.includes('edit') ? (
                            <ButtonBaseIcon
                              title='Edit'
                              onClick={(event) => handleEdit(event, row)}
                            >
                              <EditNoteIcon />
                            </ButtonBaseIcon>
                          ) : null}
                        </Box>
                      </TableCell>
                    )}
                    {cells.map((cell) => (
                      <TableCell
                        key={String(cell.field)}
                        align={cell.align || 'left'}
                        width={200}
                        {...cell}
                      >
                        {isEditing && cell.editable ? (
                          <TextField
                            value={
                              editingValues[cell.field] !== undefined
                                ? editingValues[cell.field]
                                : row[cell.field] || ''
                            }
                            onChange={(
                              event: React.ChangeEvent<HTMLInputElement>,
                            ) => handleFieldChange(event, cell.field)}
                            autoFocus={
                              cell.field ===
                              cells.find((c) => c.editable)?.field
                            }
                            variant='standard'
                            fullWidth
                            sx={{
                              '& .MuiInputBase-root': {
                                height: '100%',
                                alignItems: 'center',
                              },
                            }}
                          />
                        ) : (
                          (row[cell.field] as React.ReactNode)
                        )}
                      </TableCell>
                    ))}
                    <TableCell />
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    )
  },
)
