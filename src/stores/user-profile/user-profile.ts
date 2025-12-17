import { cast, SnapshotOut, types } from 'mobx-state-tree'

export const UserProfileStoreModel = types
    .model('UserProfileStoreModel')
    .props({
        access: types.array(types.string),
    })
    .views((self) => ({}))
    .actions((self) => ({
        setAccess(access: string[]) {
            self.access = cast(access)
        },
    }))
export type UserProfileStoreType = SnapshotOut<typeof UserProfileStoreModel>
