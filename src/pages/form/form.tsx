import { PageLayout } from '../../components'
import { useCallback, useEffect, useState } from 'react'
import { ProjectType } from '../../models'
// eslint-disable-next-line import/no-internal-modules
import { FormDetails } from '../project/details'
// eslint-disable-next-line import/no-internal-modules
import { InitDetails } from '../project/constant'
import { useStores } from '../../stores'
import { observer } from 'mobx-react-lite'

const pageName = 'project-form'

export const ProjectForm = observer(() => {
    const { projectStore } = useStores()
    const [dependence] = useState({ fetch: false })
    const [mounted, setMounted] = useState(false)
    const [details] = useState<ProjectType>(InitDetails)

    const handleSubmit = (data: ProjectType) => {
        console.log(data)
    }
    const handleCancel = () => {}

    const unmount = useCallback(() => {
        if (mounted) {
            projectStore.reset()
        }
    }, [mounted, projectStore])

    useEffect(() => {
        if (!dependence.fetch) {
            projectStore.fetch()
            dependence.fetch = true
        }
    }, [dependence, projectStore])

    useEffect(() => {
        setMounted(true)
        return () => {
            unmount()
        }
    }, [unmount])

    return (
        <PageLayout id={pageName}>
            <FormDetails
                page={pageName}
                mode={'edit'}
                data={details}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </PageLayout>
    )
})
