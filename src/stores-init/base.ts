import { MENU_COLLAPSE, MENU_MIN_WIDTH, MENU_WIDTH } from '../constants'
import { BaseStoreType } from '../stores'
import { InitTheme } from '../theme'

export const InitBaseStore: BaseStoreType = {
    notifications: [],

    theme: InitTheme,
    modal: {
        data: [],
        resizing: undefined,
        staging: undefined,
    },
    menu: {
        width: MENU_COLLAPSE ? MENU_WIDTH : MENU_MIN_WIDTH,
        dragging: false,
        collapse: MENU_COLLAPSE,
        expandIds: [],
        route: undefined,
        routePaths: [],
    },
}
