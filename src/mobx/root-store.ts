import {
  types,
  getRoot,
  type IAnyStateTreeNode,
  type Instance,
  type SnapshotOut,
} from 'mobx-state-tree'
import { BaseStoreModel } from './stores/base'

export const RootStoreModel = types.model('RootStoreModel').props({
  baseStore: BaseStoreModel,
})

export type RootStore = Instance<typeof RootStoreModel>

export type RootStoreType = SnapshotOut<typeof RootStoreModel>

export const getRootStore = (target: IAnyStateTreeNode) => {
  return getRoot(target) as RootStore
}
