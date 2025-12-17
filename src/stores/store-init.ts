import { useEffect, useState } from 'react'

import { RootStore, RootStoreModel } from './root-store'
import {
    InitBaseStore,
    InitFormStore,
    InitProjectStore,
    InitUserProfileStore,
} from '../stores-init'

type InitStoreHookProps = {
    rootStore: RootStore
}

export const InitRootStore = RootStoreModel.create({
    baseStore: InitBaseStore,
    formStore: InitFormStore,
    userProfileStore: InitUserProfileStore,
    projectStore: InitProjectStore,
})

const initial = (): InitStoreHookProps => {
    return { rootStore: InitRootStore }
}

export const useInitStore = () => {
    const [initResult, setInitResult] = useState<InitStoreHookProps | undefined>()

    useEffect(() => {
        const { rootStore } = initial()
        setInitResult({ rootStore })
    }, [])

    return initResult
}
