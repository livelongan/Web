import { createContext } from 'react'

import { RootStore } from './root-store'
import { InitRootStore } from './store-init'

export const StoreContext = createContext<RootStore>(InitRootStore)

export const RootStoreProvider = StoreContext.Provider
