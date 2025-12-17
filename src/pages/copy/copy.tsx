import { BaseButton, PageLayout } from '../../components'
import { useCallback, useEffect, useState, useTransition } from 'react'
import { useStores } from '../../stores'
import { observer } from 'mobx-react-lite'
const pageName = 'project'
export const Project = observer(() => {
    const { projectStore } = useStores()
    const [dependence] = useState({ fetch: false })
    const [mounted, setMounted] = useState(false)
    const [pending, startTransition] = useTransition()

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
            <BaseButton
                page={pageName}
                label="Error"
                disabled={pending}
                onClick={() => {
                    startTransition(() => {
                        throw new Error('Example Error: An error thrown to trigger error boundary.')
                    })
                }}
            />
        </PageLayout>
    )
})
