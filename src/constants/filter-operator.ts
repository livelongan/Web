import { GridFilterOperators } from '@progress/kendo-react-grid'

export const COMPARISON = {
    isnull: 'IN',
    isnotnull: 'INN',
    isempty: 'IE',
    isnotempty: 'INE',
    text: {
        eq: 'S_E',
        noteq: 'S_NE',
        contains: 'S_C',
        notcontains: 'S_NC',
        startWith: 'S_SW',
        endWith: 'S_EW',
    },

    numeric: {
        eq: 'N_E',
        noteq: 'N_NE',
        gt: 'N_GT',
        gte: 'N_GTOE',
        lt: 'N_LT',
        lte: 'N_LTOE',
    },

    datetime: {
        eq: 'DT_E',
        noteq: 'DT_NE',
        gt: 'DT_LT',
        gte: 'DT_LTOE',
        lt: 'DT_ET',
        lte: 'DT_ETOE',
    },
    mapping: {
        eq: 'CT_E',
        noteq: 'CT_NE',
    },
}
export const FILTER_OPERATOR: GridFilterOperators = {
    text: [
        { text: 'grid. filterContainsOperator', operator: 'contains' },
        { text: 'grid. filterNotContainsOperator', operator: 'doesnotcontain' },
        { text: 'grid. filterEqOperator', operator: 'eq' },
        { text: 'grid. filterNotEqOperator', operator: 'neq' },
        { text: 'grid.filterStartsWithOperator', operator: 'startswith' },
        { text: 'grid. filterEndsWithOperator', operator: 'endswith' },
        { text: 'grid. filterIsNullOperator', operator: 'isnull' },
        { text: 'grid. filterIsNotNullOperator', operator: 'isnotnull' },
        { text: 'grid. filterIsEmptyOperator', operator: 'isempty' },
        { text: 'grid. filterIsNotEmptyOperator', operator: 'isnotempty' },
    ],
    numeric: [
        { text: 'grid.filterEqOperator', operator: 'eq' },
        { text: 'grid. filterNotEqOperator', operator: 'neq' },
        { text: 'grid. filterGteOperator', operator: 'gte' },
        { text: 'grid. filterGtOperator', operator: 'gt' },
        { text: 'grid. filterLteOperator', operator: 'lte' },
        { text: 'grid. filterLtOperator', operator: 'lt' },
        { text: 'grid.filterIsNullOperator', operator: 'isnull' },
        { text: 'grid. filterIsNotNullOperator', operator: 'isnotnull' },
    ],
    datetime: [
        { text: 'grid. filterEqOperator', operator: 'eq' },
        { text: 'grid. filterNotEqOperator', operator: 'neq' },
        { text: 'grid. filterAfterOrEqualOperator', operator: 'gte' },
        { text: 'grid. filterAfterOperator', operator: 'gt' },
        { text: 'grid. filterBeforeOperator', operator: 'lt' },
        { text: 'grid. filterBeforeOrEqualOperator', operator: 'lte' },
        { text: 'grid.filterIsNullOperator', operator: 'isnull' },
        { text: 'grid. filterIsNotNullOperator', operator: 'isnotnull' },
    ],
    boolean: [{ text: 'grid. filterEqOperator', operator: 'eq' }],
}
