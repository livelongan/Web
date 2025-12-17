import { createContext } from 'react'

import type { RootStore } from './root-store'
import { InitRootStore } from './init-stores'

export const StoreContext = createContext<RootStore>(InitRootStore)

export const RootStoreProvider = StoreContext.Provider
