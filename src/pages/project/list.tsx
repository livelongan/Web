import {
    BaseButton,
    ButtonLayout,
    GridTable,
    GridTableColumnProps,
    GridTableHandle,
    GridTableProps,
    Modal,
    openDialog,
    PageLayout,
} from '../../components'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { FormDetails } from './details'
import { ProjectType } from '../../models'
import { InitDetails } from './constant'
import { useStores } from '../../stores'
import { observer } from 'mobx-react-lite'

const pageName = 'project'

export const Project = observer(() => {
    const gridRef = useRef<GridTableHandle>(null)
    const { projectStore } = useStores()
    const [dependence] = useState({ fetch: false })
    const [mounted, setMounted] = useState(false)
    const [open, setOpen] = useState(false)
    const [details] = useState<ProjectType>(InitDetails)

    const handleSubmit = (data: ProjectType) => {
        console.log(data)
    }
    const handleCancel = () => {
        setOpen(false)
    }

    const columns: GridTableColumnProps[] = useMemo(
        () => [
            { field: 'projectID', title: 'Project ID', type: 'text' },
            { field: 'projectDesc', title: 'Project Desc', type: 'text' },
            { field: 'projectDetail', title: 'Project Detail', type: 'text' },
            { field: 'peopleNumber', title: 'Project ID', type: 'numeric' },
            { field: 'expenditure', title: 'Expenditure', type: 'numeric' },
            { field: 'isSendEmail', title: 'Send Email', type: 'boolean' },
            { field: 'projectStartDate', title: 'Project Start Date', type: 'date' },
            { field: 'projectEndDate', title: 'Project End Date', type: 'date' },
            { field: 'projectStatus', title: 'Project Status', type: 'mapping' },
            { field: 'projectStatus2', title: 'Project Status2', type: 'mapping' },
        ],
        [],
    )

    const handlePageChange: GridTableProps['onPageChange'] = (event) => {
        projectStore.setPageNo(event.skip / event.take + 1)
        projectStore.setPageSize(event.take)
        projectStore.fetch()
    }
    const handleDataStateChange: GridTableProps['onDataStateChange'] = (sorts, state) => {
        projectStore.setSort(sorts)
        projectStore.setGridState(state)
    }
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
            <ButtonLayout>
                <BaseButton
                    page={pageName}
                    label="Open Modal"
                    onClick={() => {
                        setOpen(true)
                    }}
                />
                <BaseButton
                    page={pageName}
                    label="Open Dialog"
                    onClick={() => {
                        openDialog({
                            title: 'Dialog',
                            content: 'Are you sure you want to continue?',
                        })
                    }}
                />
            </ButtonLayout>

            <GridTable
                ref={gridRef}
                columns={columns}
                data={projectStore.gridSources}
                loading={projectStore.loading.fetch}
                pageState={{
                    pageNo: projectStore.pageNo,
                    pageSize: projectStore.pageSize,
                    total: projectStore.total,
                }}
                onPageChange={handlePageChange}
                onDataStateChange={handleDataStateChange}
            />

            <Modal
                title={'Project'}
                open={open}
                widthRatio={50}
                heightRatio={56}
                onClose={() => {
                    setOpen(!open)
                }}
            >
                <FormDetails
                    page={pageName}
                    mode={'edit'}
                    data={details}
                    onSubmit={handleSubmit}
                    onCancel={handleCancel}
                />
            </Modal>
        </PageLayout>
    )
})
