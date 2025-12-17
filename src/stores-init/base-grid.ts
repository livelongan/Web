import { RECORD_PRE_PAGE, COMPARISON } from '../constants'
import { BaseSourcesType, FetchParameterType, FilterParameterType } from '../models'
import { BaseGridStoreType } from '../stores'

export const InitSource: BaseSourcesType = {
    $type: undefined,
    pageNo: 1,
    pageSize: RECORD_PRE_PAGE,
    totalRecordCount: 0,
    items: [],
}

export const InitSidFilter: FilterParameterType = {
    poPropertyName: 'sid',
    comparisonType: COMPARISON.numeric.eq,
    value: -1,
}

export const InitParameter: FetchParameterType = {
    filterList: [],
    sortList: [],
    columnDisplayList: [],
    noPaging: false,
    getItemCountOnly: false,
    pageNo: 1,
    recordsPerPage: RECORD_PRE_PAGE,
}

export const InitBaseGridStore: BaseGridStoreType = {
    loading: {
        fetch: undefined,
        save: undefined,
        detail: undefined,
        delete: undefined,
        export: undefined,
    },
    source: {
        ...InitSource,
    },
    gridState: {},
    columns: [],
    fetchParameter: { ...InitParameter },
    initParameter: undefined,

    isRetainParameter: true,
}
