import { SnapshotOut, types, IAnyModelType } from 'mobx-state-tree'
import { PaletteMode, ThemePalette } from '../../theme'

export const $Type = types.frozen<string | null | undefined>()

export type DateTimeType = Date | string | null | undefined
export const DateTimeModel = types.frozen<DateTimeType>()

const RecordVersionModel = types.model('RecordVersionModel', {
    $type: $Type,
    $value: types.string,
})
export const RecordVersion = types.union(
    RecordVersionModel,
    types.string,
    types.null,
    types.undefined,
)
export type RecordVersionType = SnapshotOut<typeof RecordVersionModel> | string | null | undefined

export const LoadingModel = types.model('LoadingModel', {
    fetch: types.maybe(types.boolean),
    save: types.maybe(types.boolean),
    delete: types.maybe(types.boolean),
    detail: types.maybe(types.boolean),
    export: types.maybe(types.boolean),
})
export type LoadingType = SnapshotOut<typeof LoadingModel>

export const MappingModel = types.model('MappingModel', {
    code: types.string,
    description: types.string,
})
export type MappingType = SnapshotOut<typeof MappingModel>
export const ModifyModal = types.model('ModifyModal', {
    createdBy: types.maybe(types.string),
    creationTimestamp: DateTimeModel,
    lastUpdatedBy: types.maybe(types.string),
    lastUpdatedTimestamp: DateTimeModel,
})
export type ModifyType = SnapshotOut<typeof BaseModel>

export const BaseModel = types.model('BaseSourcesModel', {
    // [DATA_ITEM_KEY]: types.string,
    sid: types.number,
})
export const BaseGridModel = types.model('BaseGridModel', {
    $type: $Type,
    totalRecordCount: types.number,
    pageNo: types.number,
    pageSize: types.number,
})

export const BaseSourcesModel = types.model('BaseSourcesModel', {
    $type: $Type,
    totalRecordCount: types.number,
    pageNo: types.number,
    pageSize: types.number,
    items: types.array(types.frozen<IAnyModelType>()),
})

export type BaseSourcesType = SnapshotOut<typeof BaseSourcesModel>

export function createSourceModel(name: string, itemModel: IAnyModelType) {
    return BaseSourcesModel.named(name).props({
        items: types.array(itemModel),
    })
}

export const ResponseApiModal = types.model('ResponseApiModal', {
    $type: $Type,
    messages: types.maybeNull(types.string),
    errorType: types.maybe(types.string),
    stackTrace: types.maybe(types.string),
    innerExceptionMessage: types.maybe(types.union(types.string, types.null)),
    innerExceptionStackTrace: types.maybe(types.union(types.string, types.null)),
})
export type ResponseApiType = SnapshotOut<typeof ResponseApiModal>

export const DeleteOneParameterModel = types.model('DeleteOneParameterModel', {
    sid: types.number,
    recordVersion: RecordVersion,
})
export type DeleteOneParameterType = SnapshotOut<typeof DeleteOneParameterModel>

export const DeleteParameterModel = types.model('DeleteParameterModel', {
    deleteList: types.array(DeleteOneParameterModel),
})
export type DeleteParameterType = SnapshotOut<typeof DeleteParameterModel>

export const FilterParameterModel = types.model('FilterParameterModel', {
    poPropertyName: types.string,
    comparisonType: types.string,
    value: types.union(types.string, types.boolean, types.number, types.null),
})
export type FilterParameterType = SnapshotOut<typeof FilterParameterModel>

export const SortParameterModel = types.model('SortParameterModel', {
    poPropertyName: types.string,
    sortType: types.string,
})
export type SortParameterType = SnapshotOut<typeof SortParameterModel>

export const ColumnParameterModel = types.model('ColumnParameterModel', {
    poPropertyName: types.string,
    displayType: types.string,
})
export type ColumnParameterType = SnapshotOut<typeof ColumnParameterModel>

export const FetchParameterModel = types.model('FetchParameterModel', {
    filterList: types.array(FilterParameterModel),
    sortList: types.array(SortParameterModel),
    columnDisplayList: types.array(ColumnParameterModel),
    noPaging: types.boolean,
    getItemCountOnly: types.boolean,
    pageNo: types.number,
    recordsPerPage: types.number,
})

export const InitParameterModel = FetchParameterModel.named('FetchParameterModel').props({
    cached: types.maybe(types.boolean),
})
export type FetchParameterType = SnapshotOut<typeof FetchParameterModel>

export const ExportParameterModel = types.model('ExportParameterModel', {
    getAllRequestJson: FetchParameterModel,
    requestType: types.string,
    displayColumns: types.array(types.string),
})
export type ExportParameterType = SnapshotOut<typeof ExportParameterModel>

export const ThemePaletteModel = types.model('ThemePaletteModel').props({
    mode: types.frozen<PaletteMode>(),
    value: types.frozen<ThemePalette>(),
})
export type ThemePaletteType = SnapshotOut<typeof ThemePaletteModel>
