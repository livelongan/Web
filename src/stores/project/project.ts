import { cast, flow, SnapshotOut } from 'mobx-state-tree'
import { ProjectSourceType, ProjectSourceModel, ProjectType } from '../../models'
import { BaseGridStoreModel } from '../base-grid'
import { fetchProjectApi } from '../../stores-api'
import { sleep } from '../../utils'

export const ProjectStoreModel = BaseGridStoreModel.named('ProjectStoreModel')
    .props({
        source: ProjectSourceModel,
    })
    .views(() => ({}))
    .actions((self) => ({
        fetch: flow(function* (): Generator<
            Promise<ProjectSourceType | null | NodeJS.Timeout>,
            ProjectSourceType | null,
            ProjectSourceType | null
        > {
            self.loading.fetch = true
            const params = self.fetchParameter
            const response = yield fetchProjectApi(params)
            //M Data
            yield sleep(1000)

            const sources: any[] = []
            for (let index = 0; index < self.pageSize; index++) {
                const obj: ProjectType = {
                    sid: index + self.pageNo,
                    projectID: `ID_${self.pageNo}_${index}`,
                    projectDesc: `Desc_${self.pageNo}_${index}`,
                    projectDetail: `Detail_${self.pageNo}_${index}`,
                    peopleNumber: 0,
                    expenditure: 0,
                    isSendEmail: false,
                    projectStartDate: new Date(),
                    projectEndDate: new Date(),
                    projectStatus: null,
                    projectStatus2: null,
                }
                sources.push(obj)
            }

            self.source.totalRecordCount = 10000
            self.source.items = cast(sources)

            self.loading.fetch = false
            return response ?? null
        }),
        detail: flow(function* (): Generator<
            Promise<ProjectSourceType | null>,
            ProjectSourceType | null,
            ProjectSourceType | null
        > {
            self.loading.detail = true
            const params = self.fetchParameter
            const response = yield fetchProjectApi(params)
            if (response) {
                self.source = ProjectSourceModel.create(response)
            }
            self.loading.detail = false
            return response ?? null
        }),
        create: flow(function* (): Generator<
            Promise<ProjectSourceType | null>,
            ProjectSourceType | null,
            ProjectSourceType | null
        > {
            self.loading.save = true
            const params = self.fetchParameter
            const response = yield fetchProjectApi(params)
            if (response) {
                self.source = ProjectSourceModel.create(response)
            }
            self.loading.save = false
            return response ?? null
        }),
        update: flow(function* (): Generator<
            Promise<ProjectSourceType | null>,
            ProjectSourceType | null,
            ProjectSourceType | null
        > {
            self.loading.save = true
            const params = self.fetchParameter
            const response = yield fetchProjectApi(params)
            if (response) {
                self.source = ProjectSourceModel.create(response)
            }
            self.loading.save = false
            return response ?? null
        }),
        delete: flow(function* (): Generator<
            Promise<ProjectSourceType | null>,
            ProjectSourceType | null,
            ProjectSourceType | null
        > {
            self.loading.delete = true
            const params = self.fetchParameter
            const response = yield fetchProjectApi(params)
            if (response) {
                self.source = ProjectSourceModel.create(response)
            }
            self.loading.delete = false
            return response ?? null
        }),
    }))

export type ProjectStoreType = SnapshotOut<typeof ProjectStoreModel>
