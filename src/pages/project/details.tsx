import { FormProps } from '@progress/kendo-react-form'
import {
    ModalActionBar,
    FormLayout,
    FieldControl,
    BaseButton,
    FormMode,
    FormRule,
    FormDropdown,
    FieldLayoutHandler,
    FieldsContent,
    FormText,
    FormNumeric,
    FormGridDropdown,
    DropdownColumnProps,
    useFormContext,
    FormContext,
} from '../../components'
import { memo, useEffect, useRef, useState } from 'react'
import { ProjectType } from '../../models'
import { PATTERN } from '../../constants'
import { autorun } from 'mobx'

type IProps = {
    page: string
    mode: FormMode
    data: ProjectType
    onSubmit: (data: ProjectType) => void
    onCancel: () => void
}
const RULES: FormRule = {
    projectStatus: {
        required: true,
    },
    projectStatus2: {
        required: true,
    },
    projectID: {
        max: 10,
        min: 3,
        pattern: PATTERN.integer,
        message: 'Only accept numeric value',
    },
    expenditure: {
        required: true,
    },
    peopleNumber: {
        max: 10,
        min: 3,
    },
}
const StatusData: any[] = []

for (let index = 0; index < 300; index++) {
    StatusData.push({
        code: `Code${index + 1}`,
        description: `Description${index + 1}`,
        index: index + 1,
        counted: index + 30,
    })
}

const StatusColumns: DropdownColumnProps[] = [
    { field: 'description', title: 'Description', filter: 'text', width: 180 },
    { field: 'index', title: 'Index', type: 'numeric', filter: 'text', width: 80 },
    { field: 'counted', title: 'Counted', type: 'numeric', filter: 'text', width: 80 },
]
export const FormDetails = memo(({ page, mode, data, onSubmit, onCancel }: IProps) => {
    const layoutRef = useRef<FieldLayoutHandler>(null)

    const [loading, setLoading] = useState(false)
    const [disabled, setDisabled] = useState(false)

    const handleSubmit: FormProps['onSubmit'] = (data) => {
        onSubmit(data as ProjectType)
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 1000)
    }
    const { id, formStore, ruleSetter } = useFormContext({
        page,
        rules: RULES,
        mode,
        data,
    })

    useEffect(() => {
        const disposer = autorun(() => {
            const modifies = formStore.formModified(id)
            const fields = Object.keys(modifies)
            const hasChanged = Object.keys(modifies).some((it) => !!modifies[it])
            const disabled = fields.length === 0 || !hasChanged
            setDisabled(disabled)
        })

        return () => {
            disposer()
        }
    }, [formStore, id])

    return (
        <FormContext formId={id} onSubmit={handleSubmit}>
            <FormLayout>
                <FieldsContent ref={layoutRef}>
                    <FieldControl>
                        <FormGridDropdown
                            name={'projectStatus2'}
                            label={'Project Status'}
                            columns={StatusColumns}
                            formId={id}
                            data={StatusData}
                        />
                    </FieldControl>
                    <FieldControl>
                        <FormDropdown
                            name={'projectStatus'}
                            label={'Project Status'}
                            formId={id}
                            data={StatusData}
                            onChange={() => {
                                ruleSetter('projectDesc', {
                                    required: true,
                                    max: 10,
                                    min: 3,
                                    pattern: PATTERN.integer,
                                    message: 'Only accept numeric value',
                                })
                            }}
                        />
                    </FieldControl>
                    <FieldControl colSpan={layoutRef.current?.getMaxSpan()}>
                        <FormText name={'projectID'} label={'Project ID'} formId={id} />
                    </FieldControl>
                    <FieldControl>
                        <FormText name={'projectDesc'} label={'Project Desc'} formId={id} />
                    </FieldControl>
                    <FieldControl>
                        <FormText name={'projectDetail'} label={'Project Detail'} formId={id} />
                    </FieldControl>
                    <FieldControl>
                        <FormNumeric name={'peopleNumber'} label={'People Number'} formId={id} />
                    </FieldControl>
                    <FieldControl>
                        <FormNumeric
                            decimal={3}
                            name={'expenditure'}
                            label={'Expenditure'}
                            formId={id}
                        />
                    </FieldControl>
                </FieldsContent>

                <ModalActionBar>
                    <BaseButton mode="submit" loading={loading} disabled={disabled} />
                    <BaseButton mode="reset" />
                    <BaseButton mode="cancel" onClick={onCancel} />
                </ModalActionBar>
            </FormLayout>
        </FormContext>
    )
})
