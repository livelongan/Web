import { SnapshotOut, types } from 'mobx-state-tree'
import { BaseModel, BaseSourcesModel, DateTimeModel, MappingModel } from '../common'

export const ProjectModel = BaseModel.named('ProjectModel').props({
    projectID: types.string,
    projectDesc: types.string,
    projectDetail: types.string,
    peopleNumber: types.number,
    expenditure: types.number,
    isSendEmail: types.maybeNull(types.boolean),
    projectStartDate: DateTimeModel,
    projectEndDate: DateTimeModel,
    projectStatus: types.maybeNull(MappingModel),
    projectStatus2: types.maybeNull(MappingModel),
})

export type ProjectType = SnapshotOut<typeof ProjectModel>

export const ProjectSourceModel = BaseSourcesModel.named('ProjectSourceModel').props({
    items: types.array(ProjectModel),
})

export type ProjectSourceType = SnapshotOut<typeof ProjectSourceModel>
