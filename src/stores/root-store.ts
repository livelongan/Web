import { types, getRoot, SnapshotOut, IAnyStateTreeNode, Instance } from 'mobx-state-tree'

import { BaseStoreModel } from './base'
import { FormStoreModel } from './form'
import { ProjectStoreModel } from './project'
import { UserProfileStoreModel } from './user-profile'

export const RootStoreModel = types.model('RootStoreModel').props({
    baseStore: BaseStoreModel,
    formStore: FormStoreModel,
    userProfileStore: UserProfileStoreModel,

    projectStore: ProjectStoreModel,
})

export type RootStore = Instance<typeof RootStoreModel>

export type RootStoreType = SnapshotOut<typeof RootStoreModel>

export const getRootStore = (target: IAnyStateTreeNode) => {
    return getRoot(target) as RootStore
}
