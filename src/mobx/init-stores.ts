import { RootStoreModel, type RootStore } from './root-store'
import { InitBaseStore } from './init'

type InitStoreHookProps = {
  rootStore: RootStore
}

export const InitRootStore = RootStoreModel.create({
  baseStore: InitBaseStore,
})

export const useInitStore = (): InitStoreHookProps => {
  return { rootStore: InitRootStore }
}
