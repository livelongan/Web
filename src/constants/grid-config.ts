import { GridSelectableSettings, GridSortSettings } from '@progress/kendo-react-grid'
import { State } from '@progress/kendo-data-query'
import { PagerProps } from '@progress/kendo-react-data-tools'
export const FILTER_FIELD_SUFFIX = 'Label'

export const DATA_ITEM_KEY = '_virtualId'
export const KEY_PREFIX = 'row'

export const SELECTED_FIELD = 'selected_field'
export const EXPANDED_FIELD = 'expanded_field'
export const ACTION_FIELD = 'action_field'

export const ROW_HEIGHT = 24
export const DEFAULT_FIELD_WIDTH = 150
export const ACTION_WIDTH = 80

export const RECORD_PRE_PAGE = 50
export const RECORD_VIRTUAL_PAGE = 50

export const STATE: State = {
    skip: 0,
    take: RECORD_PRE_PAGE,
    sort: undefined,
    filter: undefined,
    group: undefined,
}

export const PAGE_SETTING: PagerProps = {
    info: true,
    buttonCount: 6,
    type: 'input',
    previousNext: true,
    pageSizes: [20, 30, 40, 50, 100, 200, 300, 500, 1000, 10000],
    total: 0,
    skip: 0,
    take: 0,
}

export const SELECTABLE: GridSelectableSettings = {
    mode: 'multiple',
    enabled: true,
    drag: true,
    cell: false,
}

export const SORT_MAPPING: KeyValue<string> = {
    asc: 'A',
    desc: 'D',
}

export const SORT_SETTINGS: GridSortSettings = {
    mode: 'multiple',
    allowUnsort: true,
}
