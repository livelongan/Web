import { useMemo } from 'react'
import { TextSmall } from '../..'

type FormFieldProps = {
  note?: React.ReactNode | string[]
}
export const useFormField = ({ note }: FormFieldProps) => {
  const helperTip = useMemo(() => {
    if (!note) {
      return null
    } else if (note instanceof Array) {
      return note.map((it) => <TextSmall>{it}</TextSmall>)
    } else if (typeof note === 'string') {
      return <TextSmall>{note}</TextSmall>
    }
  }, [note])

  return { helperTip }
}
