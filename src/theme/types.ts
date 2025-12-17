/* eslint-disable @typescript-eslint/naming-convention */
export type PaletteMode = 'light' | 'dark'

export type CommonColors = {
    black: string
    white: string
}
export type TypeBackground = {
    paper: string
    theme: string
}

export type PaletteColorOptions = {
    main?: string
    hover?: string
    active?: string
    contrastText?: string
}

export type TypeAction = {
    active: string
    hover: string
    hoverOpacity: number
    selected: string
    selectedOpacity: number
    disabled: string
    disabledOpacity: number
    disabledBackground: string
    focus: string
    focusOpacity: number
    activatedOpacity: number
}

export type PaletteOptions = {
    base?: PaletteColorOptions
    info?: PaletteColorOptions
    primary?: PaletteColorOptions
    error?: PaletteColorOptions
    warning?: PaletteColorOptions
    success?: PaletteColorOptions

    tertiary?: PaletteColorOptions
    secondary?: PaletteColorOptions
    light?: PaletteColorOptions
    dark?: PaletteColorOptions

    mode?: PaletteMode
    common?: Partial<CommonColors>
    divider?: string
    action?: Partial<TypeAction>
    background?: Partial<TypeBackground>
    var: { [key: string]: string }
}

export type ZIndex = {
    mobileStepper: number
    speedDial: number
    appBar: number
    drawer: number
    modal: number
    snackbar: number
    tooltip: number
    fab: number
    handler: number
}
export type Easing = {
    easeInOut: string
    easeOut: string
    easeIn: string
    sharp: string
}

export type Duration = {
    shortest: string
    shorter: string
    short: string
    standard: string
    complex: string
    enteringScreen: string
    leavingScreen: string
}

export type Theme = {
    mode: 'light' | 'dark'
    type: string
    color: string
    palette: PaletteOptions
    // shadows?: Shadows
    spacing: (ratio: number) => number

    easing: Easing
    duration: Duration

    zIndex: ZIndex
}
