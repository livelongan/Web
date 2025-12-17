import TablePagination from '@mui/material/TablePagination'
import { observer } from 'mobx-react-lite'
import { Stack } from '@mui/material'
import { ButtonBaseIcon } from '../buttons'
import { TextNormal } from '../typography'
import Refresh from '@mui/icons-material/Refresh'
import DoneAll from '@mui/icons-material/DoneAll'
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd'
import { useEffect, useMemo, useState } from 'react'
import { useScreenQuery } from '../../hooks'
import DeleteSweepOutlinedIcon from '@mui/icons-material/DeleteSweepOutlined'

type Props = {
  page: number
  count: number
  selectCount: number
  rowsPerPage?: number
  onChange?: (page: number) => void
  onChangeRowsPage?: (page: number) => void
  onDelete?: () => void
  onReset?: () => void
  onSaveAll?: () => void
  onAdd?: () => void
  hasChange?: boolean
}
const PAGE_OPRIONS = [200, 300, 500]
export const TablePaging = observer(
  ({
    page,
    count,
    selectCount,
    rowsPerPage = 5,
    onChange,
    onDelete,
    onReset,
    onSaveAll,
    onAdd,
    hasChange,
    onChangeRowsPage,
  }: Props) => {
    const { isPhone } = useScreenQuery()
    const [currentPage, setCurrentPage] = useState(0)

    const rowsPerPageOptions = useMemo(() => {
      if (!PAGE_OPRIONS.includes(rowsPerPage)) {
        PAGE_OPRIONS.unshift(rowsPerPage)
      }
      return PAGE_OPRIONS
    }, [rowsPerPage])

    const handleDelete = () => {
      if (onDelete) {
        onDelete()
      }
    }

    const handleChange = (_: unknown, newPage: number) => {
      setCurrentPage(newPage)
      if (onChange) {
        onChange(newPage)
      }
    }

    const handleChangeRowsPage = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      if (onChangeRowsPage) {
        onChangeRowsPage(parseInt(event.target.value, 10))
      }
      setCurrentPage(0)
      if (onChange) {
        onChange(0)
      }
    }

    useEffect(() => {
      setCurrentPage(page)
    }, [page])

    return (
      <Stack
        gap={0}
        className='table-paging'
        flexDirection={!isPhone ? 'row' : 'column'}
        alignItems={'center'}
        padding={'0 8px'}
        sx={{
          boxShadow: 'var(--box-shadow-bottom)',
        }}
      >
        <Stack gap={0} flex={1} flexDirection={'row'} alignItems={'center'}>
          {onReset && (
            <ButtonBaseIcon disableFrequently title='Refresh' onClick={onReset}>
              <Refresh />
            </ButtonBaseIcon>
          )}
          {onSaveAll && (
            <ButtonBaseIcon
              disableFrequently
              title='Save All'
              onClick={onSaveAll}
              disabled={hasChange}
            >
              <DoneAll />
            </ButtonBaseIcon>
          )}
          {onDelete && (
            <ButtonBaseIcon
              title='Delete'
              disabled={selectCount === 0}
              onClick={() => handleDelete()}
            >
              <DeleteSweepOutlinedIcon />
            </ButtonBaseIcon>
          )}
          {onAdd && (
            <ButtonBaseIcon disableFrequently title='Add' onClick={onAdd}>
              <PlaylistAddIcon />
            </ButtonBaseIcon>
          )}
          {selectCount > 0 && <TextNormal>{selectCount} selected</TextNormal>}
        </Stack>

        <TablePagination
          count={count}
          component='div'
          page={currentPage}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={rowsPerPageOptions}
          onPageChange={handleChange}
          onRowsPerPageChange={handleChangeRowsPage}
        />
      </Stack>
    )
  },
)
