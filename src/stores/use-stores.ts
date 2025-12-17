import { useContext } from 'react'

import { RootStore } from './root-store'
import { StoreContext } from './store-provider'

export const useStores = (): RootStore => {
    return useContext(StoreContext)
}
