import { cast, getSnapshot, SnapshotOut, types } from 'mobx-state-tree'
import {
    BaseSourcesModel,
    ColumnParameterType,
    FetchParameterModel,
    FilterParameterType,
    LoadingModel,
    SortParameterType,
} from '../../models'
import { InitParameter, InitSource } from '../../stores-init'
import { evolution, isSameJson } from '../../utils'
import { DATA_ITEM_KEY, EXPANDED_FIELD, KEY_PREFIX, SELECTED_FIELD } from '../../constants'
import { GridTableColumnProps, GridTableProps } from '../../components'
import { State } from '@progress/kendo-data-query'

export const BaseGridStoreModel = types
    .model('BaseGridStoreModel')
    .props({
        loading: LoadingModel,
        source: BaseSourcesModel /* will be replace */,
        gridState: types.frozen<State>(),
        columns: types.array(types.frozen<GridTableColumnProps>()),

        fetchParameter: FetchParameterModel,
        initParameter: types.maybe(FetchParameterModel),

        isRetainParameter: types.optional(types.boolean, false),
    })
    .views((self) => ({
        get gridSources(): GridTableProps['data'] {
            const items = getSnapshot(self.source.items).map((it, index) => ({
                ...it,
                [DATA_ITEM_KEY]: `${KEY_PREFIX}_${index + 1}`,
                [SELECTED_FIELD]: false,
                [EXPANDED_FIELD]: false,
            }))
            const state = { ...self.gridState, skip: undefined, take: undefined }
            return evolution({
                data: items,
                state,
            })
        },
        get total() {
            return self.source.totalRecordCount
        },
        get filter() {
            return getSnapshot(self.fetchParameter.filterList)
        },
        get sort() {
            return getSnapshot(self.fetchParameter.sortList)
        },
        get column() {
            return getSnapshot(self.fetchParameter.columnDisplayList)
        },
        get pageNo() {
            return self.fetchParameter.pageNo
        },
        get pageSize() {
            return self.fetchParameter.recordsPerPage
        },
        get isCountOnly() {
            return self.fetchParameter.getItemCountOnly
        },
        get isPaging() {
            return self.fetchParameter.noPaging
        },
        get gridStateChanged() {
            const fetch = self.fetchParameter
            const init = self.initParameter
            if (init) {
                return (
                    !isSameJson(fetch.sortList, init.sortList) ||
                    !isSameJson(fetch.filterList, init.filterList) ||
                    fetch.pageNo !== init.pageNo ||
                    fetch.noPaging !== init.noPaging ||
                    fetch.recordsPerPage !== init.recordsPerPage
                )
            } else {
                return true
            }
        },
        get initState() {
            return {
                source: { ...InitSource },
                fetchParameter: { ...InitParameter },
                loading: {},
            }
        },
    }))
    .actions((self) => ({
        reset() {
            self.loading = LoadingModel.create({})
            self.gridState = { sort: self.gridState.sort, filter: self.gridState.filter }
            self.columns = cast([])
            self.source.items = cast([])

            if (!self.isRetainParameter) {
                /* un retain and will reset */
                self.gridState = {}
                self.source.pageNo = InitSource.pageNo
                self.source.pageSize = InitSource.pageSize
                self.fetchParameter = FetchParameterModel.create({ ...InitParameter })
            }
        },
        setGridState(state: State) {
            self.gridState = { ...state }
        },
        resetParameter() {
            self.source.pageNo = InitSource.pageNo
            self.source.pageSize = InitSource.pageSize
            self.fetchParameter = FetchParameterModel.create({
                ...self.initState.fetchParameter,
            })
        },
        setInitParameter() {
            if (!self.initParameter) {
                const fetch = self.fetchParameter
                self.initParameter = FetchParameterModel.create({
                    sortList: getSnapshot(fetch.sortList),
                    filterList: getSnapshot(fetch.filterList),
                    columnDisplayList: getSnapshot(fetch.columnDisplayList),
                    pageNo: fetch.pageNo,
                    recordsPerPage: fetch.recordsPerPage,
                    noPaging: fetch.noPaging,
                    getItemCountOnly: fetch.getItemCountOnly,
                })
            }
        },
        setLoading(prop: { key: string; value: boolean | undefined }) {
            const { key, value } = prop
            switch (key) {
                case 'fetch':
                    self.loading.fetch = value
                    break
                case 'detail':
                    self.loading.detail = value
                    break
                case 'delete':
                    self.loading.delete = value
                    break
                case 'export':
                    self.loading.export = value
                    break
                case 'save':
                    self.loading.save = value
                    break
            }
        },
        setFilter(list: FilterParameterType[]) {
            self.fetchParameter.filterList = cast(list)
        },
        setSort(list: SortParameterType[]) {
            self.fetchParameter.sortList = cast(list)
        },
        setColumn(list: ColumnParameterType[]) {
            self.fetchParameter.columnDisplayList = cast(list)
        },
        setPageSize(size: number) {
            self.fetchParameter.recordsPerPage = size
        },
        setPageNo(pageNo: number) {
            self.fetchParameter.pageNo = pageNo
        },
        setDisabledPaging() {
            self.fetchParameter.noPaging = true
        },
    }))

export type BaseGridStoreType = SnapshotOut<typeof BaseGridStoreModel>
