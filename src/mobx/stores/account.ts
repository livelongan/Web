import { types } from 'mobx-state-tree'
import type { SnapshotOut } from 'mobx-state-tree'

export const AccountStoreModel = types
  .model('AccountStoreModel')
  .props({
    sources: types.array(types.frozen<any>()),
  })
  .views(() => ({}))
  .actions(() => ({}))

export type AccountStoreType = SnapshotOut<typeof AccountStoreModel>
