import { observer } from 'mobx-react-lite'
import {
  ButtonContained,
  FieldCheckbox,
  FieldDigital,
  FieldNumber,
  FieldRadio,
  FieldSelect,
  FieldString,
  FieldSwitch,
  FieldTextarea,
  LayoutForm,
  useFormStore,
  type FormElementProps,
} from '../../components'
import { useState } from 'react'

type BookProps = {
  title: string
  name: string
  remark: string
  count?: number
  refrenance?: string
  isPubilished?: boolean
  gender?: 'man' | 'female' | ''
}

export const ParagraphPage = observer(() => {
  const [loading, setLoading] = useState(false)

  const formStore = useFormStore<BookProps>({
    data: {
      title: 'title',
      name: 'name',
      remark: 'remark',
      count: 12,
      refrenance: '001',
      isPubilished: false,
      gender: 'man',
    },
    rule: {
      title: { required: true, minLength: 3, maxLength: 10 },
      name: { required: true },
      count: { required: true, min: 20, max: 100 },
      remark: { required: true },
      gender: { required: true },
    },
  })

  const handleSubmit: FormElementProps['onSubmit'] = () => {
    setLoading(true)
    // get value
    console.log('Submit Form', formStore.getValues())
    setTimeout(() => {
      setLoading(false)
    }, 1000)
  }

  const handleChange: FormElementProps['onChange'] = (field, value) => {
    console.log(field, value, formStore.getValues())
    // if (field === 'title') {
    //   // set value
    //   formStore.setValue('name', 'name')
    // }
  }

  return (
    <LayoutForm
      id='paragraph'
      formStore={formStore}
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      <FieldString label='Title' name='title' formStore={formStore} />
      <FieldString label='Name' name='name' formStore={formStore} />
      <FieldNumber
        label='Count'
        name={'count'}
        formStore={formStore}
        note='Number value between 20 and 100'
      />
      <FieldDigital
        label='No.'
        name={'refrenance'}
        formStore={formStore}
        note='Digital only field'
      />
      <FieldTextarea
        label='Remark'
        name='remark'
        minRows={2}
        formStore={formStore}
      />
      <FieldRadio
        label={'Man'}
        name={'gender'}
        value={'man'}
        formStore={formStore}
      />
      <FieldRadio
        label={'Female'}
        name={'gender'}
        value={'female'}
        formStore={formStore}
      />
      <FieldSelect
        name={'gender'}
        label={'Gender'}
        sources={[
          { label: 'Man', key: 'man' },
          { label: 'Female', key: 'female' },
        ]}
        note='Select your gender'
        formStore={formStore}
      />
      <FieldCheckbox
        label={'Published'}
        name={'isPubilished'}
        formStore={formStore}
      />
      <FieldSwitch
        label={'Published'}
        name={'isPubilished'}
        formStore={formStore}
      />
      <ButtonContained type='submit' loading={loading}>
        Submit
      </ButtonContained>
    </LayoutForm>
  )
})
