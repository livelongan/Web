import { observer } from 'mobx-react-lite'
import {
  ButtonContained,
  FieldNumber,
  FieldString,
  FieldTextarea,
  LayoutForm,
  type FormElementProps,
} from '../../components'
import { useEffect, useRef, useState } from 'react'
import FormErrorStore from '../../components/form/form-error-store'
import FormRuleStore from '../../components/form/form-rule-store'
import FormDataStore from '../../components/form/form-data-store'

type BookProps = {
  title: string
  remark: string
  count?: number
  gender?: string
}

const RULE = {
  title: [{ required: true }, { minLength: 3 }],
}

export const ParagraphPage = observer(() => {
  const ref = useRef<HTMLFormElement | null>(null)
  const [data] = useState(
    () =>
      new FormDataStore<BookProps>({ title: '', remark: '', gender: 'girl' }),
  )
  const [error] = useState(() => new FormErrorStore<BookProps>())
  const [rule] = useState(() => new FormRuleStore<BookProps>(RULE))
  const [loading, setLoading] = useState(false)

  const handleSubmit: FormElementProps['onSubmit'] = () => {
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  useEffect(() => {
    if (ref.current) {
    }
  }, [ref])

  return (
    <LayoutForm
      ref={ref}
      dataStore={data}
      ruleStore={rule}
      errorStore={error}
      onSubmit={handleSubmit}
    >
      <FieldString
        label='Title'
        name='title'
        required
        dataStore={data}
        errorStore={error}
      />
      <FieldNumber
        label='Count'
        name={'count'}
        dataStore={data}
        errorStore={error}
      />
      <FieldTextarea
        label='Remark'
        name='remark'
        dataStore={data}
        errorStore={error}
      />
      <ButtonContained type='submit' loading={loading}>
        Submit
      </ButtonContained>
    </LayoutForm>
  )
})
