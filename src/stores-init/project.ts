import { ProjectStoreType } from '../stores'
import { InitBaseGridStore, InitSource } from './base-grid'

export const InitProjectStore: ProjectStoreType = {
    ...InitBaseGridStore,
    source: {
        ...InitSource,
        items: [],
    },
}
