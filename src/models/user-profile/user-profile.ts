import { SnapshotOut, types } from 'mobx-state-tree'

export const UserProfileModel = types.model('UserProfileModel').props({
    userName: types.string,
})

export type UserProfileType = SnapshotOut<typeof UserProfileModel>
