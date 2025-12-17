import {
    CompositeFilterDescriptor,
    DataResult,
    SortDescriptor,
    State,
    toDataSourceRequest,
    toODataString,
} from '@progress/kendo-data-query'

import {
    Grid,
    GridColumn,
    GridProps,
    GridColumnProps,
    GridDataStateChangeEvent,
    GridHeaderSelectionChangeEvent,
    GridSelectionChangeEvent,
    GridPageChangeEvent,
    GridHandle,
} from '@progress/kendo-react-grid'
import {
    forwardRef,
    useImperativeHandle,
    useCallback,
    useEffect,
    useMemo,
    useState,
    memo,
    useRef,
} from 'react'
import { styled } from 'styled-components'
import { GridPager } from './grid-pager'
import {
    DATA_ITEM_KEY,
    KEY_PREFIX,
    PAGE_SETTING,
    RECORD_VIRTUAL_PAGE,
    ROW_HEIGHT,
    SELECTABLE,
    SELECTED_FIELD,
    SORT_SETTINGS,
    STATE,
    DATE_FORMATE,
    DEFAULT_FIELD_WIDTH,
    ACTION_WIDTH,
    ACTION_FIELD,
    SELECTION_WIDTH,
} from '../../constants'
import { getSelectedState, PageChangeEvent } from '@progress/kendo-react-data-tools'
import { filterIcon } from '@progress/kendo-svg-icons'
import { getter } from '@progress/kendo-react-common'
import { Loading } from '../loading'
import { CheckboxFilter, FilterMenu } from './menus'
import { SortParameterType } from '../../models'
import { fieldHaveFilter, getSortParameter } from '../../utils'
import { useTooltip } from '../tooltip'
// import { FilterMenu } from './menus'

const Root = styled.div`
    overflow: hidden;
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
    min-width: 0;
    width: 100%;
    .selection {
        padding-left: 4px;
        padding-right: 4px;
    }
    .k-grid,
    .k-grid-table-wrap {
        height: unset !important;
        min-height: 0;
        flex: 1;
    }
    .k-grid-norecords {
        position: absolute;
        padding-left: 15px;
        box-sizing: border-box;
    }
    .has-filter .k-grid-header-menu {
        opacity: 1;
        color: var(--kendo-color-primary);
    }
    .k-grid-header-menu {
        opacity: 0.5;
    }
`

export type SelectedState = {
    [id: string]: boolean | number[]
}

export type GridTableHandle = {
    changeSort: (data?: SortDescriptor[]) => void
    changeFilter: (data?: CompositeFilterDescriptor) => void
}

export type GridTableColumnProps = Omit<GridColumnProps, 'width'> & {
    field: string
    title: string
    width?: number
    filter?: 'text' | 'numeric' | 'boolean' | 'date'
    decimal?: number
    align?: 'left' | 'right' | 'center'
    type?: 'text' | 'numeric' | 'boolean' | 'date' | 'mapping'
    disappear?: boolean
}

type GridPageState = {
    pageSize: number
    pageNo: number
    total: number
}

export type GridTableProps = Omit<GridProps, 'data' | 'onPageChange' | 'onDataStateChange'> & {
    data: DataResult['data']
    columns: GridTableColumnProps[]
    loading?: boolean
    gridState?: State
    pageState: GridPageState
    disabledSelection?: boolean
    disabledStretch?: boolean
    onPageChange?: (event: PageChangeEvent) => void
    onDataStateChange?: (
        sort: SortParameterType[],
        state: State,
        modify: { sort: boolean; filter: boolean },
        event: GridDataStateChangeEvent,
    ) => void
}

export const GridTable = memo(
    forwardRef<GridTableHandle, GridTableProps>((props, ref) => {
        const {
            data,
            loading,
            columns,
            dataItemKey = DATA_ITEM_KEY,
            gridState = STATE,
            pageable = PAGE_SETTING,
            selectable = SELECTABLE,
            sortable = SORT_SETTINGS,
            selectedField = SELECTED_FIELD,
            rowHeight = ROW_HEIGHT,
            className = '',
            pageState,
            disabledSelection = false,
            disabledStretch = false,
            onPageChange,
            onDataStateChange,
            ...others
        } = props ?? {}
        const idGetter = getter(dataItemKey)
        const [sourcesMapping] = useState(new Map())
        const { content, setContent, setTargetElement, TooltipAdapter } = useTooltip()

        const gridRef = useRef<GridHandle>(null)
        const wrapRef = useRef<HTMLDivElement | null>(null)
        const [wrapperWidth, setWrapperWidth] = useState(0)

        const [skip, setSkip] = useState(gridState.skip)
        const [take, setTake] = useState(gridState.take)
        const [sort, setSort] = useState(gridState.sort)
        const [filter, setFilter] = useState(gridState.filter)
        const [filterString, setFilterString] = useState('')
        const [sortString, setSortString] = useState('')
        const [selectedState, setSelectedState] = useState<SelectedState>({})

        const sources = useMemo(() => {
            return data.slice(skip, (skip ?? 0) + (take ?? 0))
        }, [data, skip, take])

        const scrollable = useMemo(() => {
            return data.length < RECORD_VIRTUAL_PAGE ? undefined : 'virtual'
        }, [data])

        const changeSort: GridTableHandle['changeSort'] = useCallback((data) => {
            setSort(data)
        }, [])
        const changeFilter: GridTableHandle['changeFilter'] = useCallback((data) => {
            setFilter(data)
        }, [])

        const handlePageChange = useCallback(
            (event: PageChangeEvent) => {
                if (onPageChange) {
                    onPageChange(event)
                }
            },
            [onPageChange],
        )

        const handleDataStateChange = useCallback(
            (event: GridDataStateChangeEvent) => {
                setSort(event.dataState.sort)
                setFilter(event.dataState.filter)
                setSkip(0)
                const request = toDataSourceRequest(event.dataState)
                const sorts = getSortParameter(request.sort)
                const filterStr = toODataString({ filter: event.dataState.filter })
                const sortStr = toODataString({ sort: event.dataState.sort })
                const modify = {
                    filter: filterStr !== filterString,
                    sort: sortStr !== sortString,
                }

                setFilterString(filterStr)
                setSortString(sortStr)
                if (onDataStateChange) {
                    onDataStateChange(sorts, event.dataState, modify, event)
                }
            },
            [filterString, onDataStateChange, sortString],
        )

        const pageChange = useCallback((event: GridPageChangeEvent) => {
            setSkip(event.page.skip)
            setTake(event.page.take)
        }, [])

        const changeMapping = useCallback(
            (state: SelectedState) => {
                for (const id in state) {
                    const mapping = sourcesMapping.get(`${id}`)
                    if (mapping) {
                        mapping[SELECTED_FIELD] = state[id]
                    }
                }
            },
            [sourcesMapping],
        )

        const handleSelectionChange = useCallback(
            (event: GridSelectionChangeEvent) => {
                const state = { ...selectedState }
                const selected = getSelectedState({
                    event,
                    selectedState: {},
                    dataItemKey: DATA_ITEM_KEY,
                })
                const ids = Object.keys(selected)
                if (ids.length === 1) {
                    /* toggle checked */
                    ids.forEach((id) => {
                        if (state[id] === selected[id]) {
                            state[id] = !selected[id]
                        } else {
                            state[id] = selected[id]
                        }
                    })
                } else {
                    ids.forEach((id) => {
                        state[id] = selected[id]
                    })
                }
                setSelectedState(state)
                changeMapping(state)
            },
            [selectedState, changeMapping],
        )

        const handleHeaderSelectionChange = useCallback(
            (event: GridHeaderSelectionChangeEvent) => {
                const checkboxElement: any = event.syntheticEvent.target
                const checked = checkboxElement.checked
                const selected: SelectedState = {}
                console.log(checked)
                event.dataItems.forEach((item) => {
                    const sid = idGetter(item) as string
                    selected[sid] = checked
                })
                console.log(selected)
                setSelectedState(selected)
                changeMapping(selected)
            },
            [idGetter, changeMapping],
        )

        const headerSelected = useMemo(
            () => sources.findIndex((item) => !selectedState[item[dataItemKey]]) === -1,
            [dataItemKey, sources, selectedState],
        )

        const refreshMappings = useCallback(() => {
            setSelectedState({})
            sourcesMapping.clear()
            data.map((it, index) => {
                if (!it[dataItemKey]) {
                    // eslint-disable-next-line no-param-reassign
                    it[dataItemKey] = `${KEY_PREFIX}_${index + 1}`
                }
                sourcesMapping.set(`${it[dataItemKey]}`, it)
                return it
            })
        }, [data, dataItemKey, sourcesMapping])

        const getHeaderClassName = useCallback(
            (column: GridTableColumnProps): string | undefined => {
                let headClass = column.headerClassName ?? ''
                const isFilter = fieldHaveFilter(filter, column.field)

                if (isFilter) {
                    headClass += ' has-filter'
                }
                return headClass
            },
            [filter],
        )

        const calculateWidth = useCallback(() => {
            if (disabledStretch) {
                return {}
            }
            const widths: KeyValue<number> = {}
            const action = columns.find((it) => it.field === ACTION_FIELD)
            const actionWidth = action ? (action.width ?? ACTION_WIDTH) : 0
            const presetWidths = columns.reduce(
                (sum, it) => sum + (it.width ?? DEFAULT_FIELD_WIDTH),
                -actionWidth,
            )

            let restWidth = wrapperWidth - actionWidth - 20

            if (!disabledSelection) {
                restWidth = restWidth - SELECTION_WIDTH
            }
            const gridWidth = restWidth

            restWidth = restWidth - presetWidths

            if (!disabledStretch && restWidth > 0) {
                const fieldWidth = columns
                    .map((it) => {
                        const current = it.width ?? DEFAULT_FIELD_WIDTH
                        const width =
                            current + Number(((current / presetWidths) * restWidth).toFixed(0))
                        if (it.field !== ACTION_FIELD) {
                            widths[it.field] = width
                        }
                        return width
                    })
                    .reduce((sum, width) => sum + width, -actionWidth)

                const lastedWidth = Number((gridWidth - fieldWidth).toFixed(0))

                if (lastedWidth > 0) {
                    const keys = Object.keys(widths)
                    if (keys.length > 0) {
                        const last = widths[keys[keys.length - 1]]
                        widths[keys[keys.length - 1]] = lastedWidth + last
                    }
                }
            }
            return widths
        }, [columns, disabledSelection, disabledStretch, wrapperWidth])

        const generateColumn = useCallback(
            (col: GridTableColumnProps, widths: KeyValue<number> = {}): GridTableColumnProps => {
                const {
                    filterable = true,
                    type = 'text',
                    decimal = 0,
                    width = DEFAULT_FIELD_WIDTH,
                } = col
                let format = undefined
                let align: GridTableColumnProps['align'] = 'left'
                let filter = undefined
                if (type === 'numeric') {
                    format = `{0:${decimal}}`
                    align = 'right'
                } else if (type === 'date') {
                    format = `{0:${DATE_FORMATE}}`
                    align = 'center'
                }
                if (filterable) {
                    filter =
                        type === 'mapping' ? undefined : (type as GridTableColumnProps['filter'])
                }

                return {
                    filter,
                    format,
                    align,
                    ...col,
                    width: widths[col.field] ? widths[col.field] : width,
                    filterable:
                        col.field !== SELECTED_FIELD && col.field !== 'ACTION' ? filterable : false,
                } as GridTableColumnProps
            },
            [],
        )

        const getColumns = useCallback(() => {
            const data: GridTableColumnProps[] = []
            const widths = calculateWidth()
            columns.forEach((it) => {
                if (!it.disappear) {
                    data.push(generateColumn(it, widths))
                }
            })
            return data
        }, [calculateWidth, columns, generateColumn])

        useEffect(() => {
            if (wrapRef.current) {
                setWrapperWidth(wrapRef.current.clientWidth)
            }
        }, [])

        useEffect(() => {
            refreshMappings()
        }, [data, refreshMappings])

        useImperativeHandle(ref, () => {
            return {
                changeSort,
                changeFilter,
            } as GridTableHandle
        }, [changeFilter, changeSort])

        const Selection = useMemo(
            () => (
                <GridColumn
                    filterable={false}
                    field={SELECTED_FIELD}
                    width={SELECTION_WIDTH}
                    className="selection"
                    headerClassName="selection"
                    locked={true}
                    headerSelectionValue={headerSelected}
                    resizable={false}
                    reorderable={false}
                />
            ),
            [headerSelected],
        )
        const Columns = useMemo(() => {
            const cols = getColumns()
            return cols.map((it, index) => {
                const even = index % 2 !== 0
                return (
                    <GridColumn
                        key={it.field}
                        columnMenu={
                            even ? (props) => <CheckboxFilter {...props} data={data} /> : FilterMenu
                        }
                        {...it}
                        headerClassName={getHeaderClassName(it)}
                    />
                )
            })
        }, [getColumns, getHeaderClassName, data])

        return (
            <Root
                title={content}
                className="grid-table-wrapper"
                ref={wrapRef}
                onMouseOver={(event) => {
                    const target = event.target as HTMLTableCellElement
                    if (target.closest('.k-table-td') || target.closest('.k-table-th')) {
                        setContent(target.innerText)
                        setTargetElement(target)
                    }
                }}
                onMouseOut={(event) => {
                    const target = event.target as HTMLTableCellElement
                    setContent('')
                    setTargetElement(target)
                }}
            >
                <Grid
                    size={'small'}
                    resizable
                    reorderable
                    navigatable
                    columnVirtualization
                    {...others}
                    ref={gridRef}
                    fixedScroll={false}
                    pageSize={RECORD_VIRTUAL_PAGE}
                    scrollable={scrollable}
                    rowHeight={rowHeight}
                    data={sources}
                    total={pageState.pageSize}
                    sort={sort}
                    filter={filter}
                    dataItemKey={dataItemKey}
                    selectable={selectable}
                    sortable={sortable}
                    selectedField={selectedField}
                    columnMenuIcon={filterIcon}
                    onPageChange={pageChange}
                    onDataStateChange={handleDataStateChange}
                    onSelectionChange={handleSelectionChange}
                    onHeaderSelectionChange={handleHeaderSelectionChange}
                >
                    {!disabledSelection && Selection}
                    {Columns}
                </Grid>
                {loading && <Loading />}
                <GridPager
                    mode={'row'}
                    selection={sources.filter((item) => !!selectedState[item[dataItemKey]]).length}
                    {...PAGE_SETTING}
                    total={pageState.total}
                    skip={pageState.pageSize * ((pageState.pageNo ?? 1) - 1)}
                    take={pageState.pageSize}
                    onPageChange={handlePageChange}
                />
                {TooltipAdapter}
            </Root>
        )
    }),
)
