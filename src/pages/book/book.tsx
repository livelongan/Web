import { observer } from 'mobx-react-lite'
import { TableNormal } from '../../components/table'
import type { CellProps } from '../../components/table/table-normal'

type BookProps = {
  name: string
  age: number
  status: string
}

const sources: BookProps[] = [
  { name: 'Alice', age: 25, status: '01' },
  { name: 'Bob', age: 30, status: '10' },
  { name: 'Charlie', age: 20, status: '02' },
  { name: 'ACharlie', age: 50, status: '20' },
]

const cells: CellProps<BookProps>[] = [
  { field: 'name', label: 'Name', editable: true },
  { field: 'age', label: 'Age', editable: true },
  { field: 'status', label: 'Status' },
]

export const BookPage = observer(() => {
  return (
    // <TableNormal<BookProps> cells={cells} rows={sources} dataKey={'name'} />
    <TableNormal
      rows={sources}
      cells={cells}
      dataKey='name'
      onAddRow={() => ({
        name: Date.now().toString(),
        age: 0,
        status: 'new',
      })}
      onRowUpdate={(row, field, value) => {
        // Update your data store here
        console.log(
          `Updated row ${row.name}, field ${String(field)} to ${value}`,
        )
      }}
      onSave={() => {}}
    />
  )
})
