import { Border, CommonColor, Elevation } from './common'
import { Theme, PaletteOptions } from './types'
import {
    GoldenOrchidColor,
    GoldenOrchidPalette,
    NavyMagentaColor,
    NavyMagentaPalette,
    YellowBlueColor,
    YellowBluePalette,
    PinkGreyColor,
    PinkGreyPalette,
    BatoColor,
    BatoPalette,
    VioletColor,
    VioletPalette,
    YellowRedColor,
    YellowRedPalette,
} from './light-theme'

import {
    GoldenOrchidDarkColor,
    GoldenOrchidDarkPalette,
    NavyMagentaDarkColor,
    NavyMagentaDarkPalette,
    YellowBlueDarkColor,
    YellowBlueDarkPalette,
    BatoDarkColor,
    BatoDarkPalette,
    PinkGreyDarkColor,
    PinkGreyDarkPalette,
    VioletDarkColor,
    VioletDarkPalette,
    YellowRedDarkColor,
    YellowRedDarkPalette,
} from './dark-theme'

import { ThemePaletteType } from '../models'

export type ThemePalette = {
    id: string
    name: string
    color: string
    palette: PaletteOptions
}

export const LightTheme: ThemePalette[] = [
    {
        id: 'Violet',
        name: 'Violet',
        color: VioletColor,
        palette: VioletPalette,
    },
    {
        id: 'YellowRed',
        name: 'Yellow Red',
        color: YellowRedColor,
        palette: YellowRedPalette,
    },
    {
        id: 'Bato',
        name: 'Bato',
        color: BatoColor,
        palette: BatoPalette,
    },
    {
        id: 'PinkGrey',
        name: 'Pink Grey',
        color: PinkGreyColor,
        palette: PinkGreyPalette,
    },
    {
        id: 'YellowBlue',
        name: 'Yellow Blue',
        color: YellowBlueColor,
        palette: YellowBluePalette,
    },
    {
        id: 'GoldenOrchid',
        name: 'Golden Orchid',
        color: GoldenOrchidColor,
        palette: GoldenOrchidPalette,
    },
    {
        id: 'NavyMagenta',
        name: 'Navy Magenta',
        color: NavyMagentaColor,
        palette: NavyMagentaPalette,
    },
]

export const DarkTheme: ThemePalette[] = [
    {
        id: 'Violet',
        name: 'Violet',
        color: VioletDarkColor,
        palette: VioletDarkPalette,
    },
    {
        id: 'YellowRed',
        name: 'Yellow Red',
        color: YellowRedDarkColor,
        palette: YellowRedDarkPalette,
    },
    {
        id: 'Bato',
        name: 'Bato',
        color: BatoDarkColor,
        palette: BatoDarkPalette,
    },
    {
        id: 'PinkGrey',
        name: 'Pink Grey',
        color: PinkGreyDarkColor,
        palette: PinkGreyDarkPalette,
    },
    {
        id: 'YellowBlue',
        name: 'Yellow Blue',
        color: YellowBlueDarkColor,
        palette: YellowBlueDarkPalette,
    },
    {
        id: 'GoldenOrchid',
        name: 'Golden Orchid',
        color: GoldenOrchidDarkColor,
        palette: GoldenOrchidDarkPalette,
    },
    {
        id: 'NavyMagenta',
        name: 'Navy Magenta',
        color: NavyMagentaDarkColor,
        palette: NavyMagentaDarkPalette,
    },
]
const Mode = 'light'
export const InitTheme: ThemePaletteType = {
    mode: Mode,
    value: Mode === 'light' ? LightTheme[0] : DarkTheme[0],
}

export const ThemeOptions: Theme = {
    mode: InitTheme.mode,
    type: InitTheme.value.id,
    palette: InitTheme.value.palette,
    color: InitTheme.value.color,
    spacing: (ratio = 0) => ratio * 8,
    easing: {
        // This is the most common easing curve.
        easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
        // Objects enter the screen at full velocity from off-screen and
        // slowly decelerate to a resting point.
        easeOut: 'cubic-bezier(0.0, 0, 0.2, 1)',
        // Objects leave the screen at full velocity. They do not decelerate when off-screen.
        easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
        // The sharp curve is used by objects that may return to the screen at any time.
        sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    },
    duration: {
        shortest: '150ms',
        shorter: '200ms',
        short: '250ms',
        // most basic recommended timing
        standard: '300ms',
        // this is to be used in complex animations
        complex: '375ms',
        // recommended when something is entering screen
        enteringScreen: '225ms',
        // recommended when something is leaving screen
        leavingScreen: '195ms',
    },
    zIndex: {
        mobileStepper: 1000,
        speedDial: 1050,
        appBar: 1100,
        drawer: 1200,
        modal: 1300,
        snackbar: 1400,
        tooltip: 1500,
        fab: 1050,
        handler: 999999,
    },
}

export const ThemeCss = `
    ${Elevation}
    ${Border}
    ${CommonColor}
`
