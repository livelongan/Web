import { useContext } from 'react'

import { StoreContext } from './store-context'
import type { RootStore } from './root-store'

export const useStores = (): RootStore => {
  return useContext(StoreContext)
}
