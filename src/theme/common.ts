import { PATTERN } from '../constants'
import { DefaultColor } from './system'
import { PaletteMode, PaletteOptions } from './types'

export const Elevation = `
    --kendo-elevation-1: 0 2px 3px rgba(0, 0, 0, 0.04), 0 4px 16px rgba(0, 0, 0, 0.12);
    --kendo-elevation-2: 0 4px 6px rgba(0, 0, 0, 0.06), 0 4px 16px rgba(0, 0, 0, 0.12);
    --kendo-elevation-3: 0 6px 8px rgba(0, 0, 0, 0.08), 0 4px 16px rgba(0, 0, 0, 0.12);
    --kendo-elevation-4: 0 8px 10px rgba(0, 0, 0, 0.12), 0 4px 16px rgba(0, 0, 0, 0.12);
    --kendo-elevation-5: 0 10px 12px rgba(0, 0, 0, 0.16), 0 4px 16px rgba(0, 0, 0, 0.12);
    --kendo-elevation-6: 0 12px 14px rgba(0, 0, 0, 0.2), 0 4px 16px rgba(0, 0, 0, 0.12);
    --kendo-elevation-7: 0 14px 16px rgba(0, 0, 0, 0.24), 0 4px 16px rgba(0, 0, 0, 0.12);
    --kendo-elevation-8: 0 16px 18px rgba(0, 0, 0, 0.28), 0 4px 16px rgba(0, 0, 0, 0.12);
    --kendo-elevation-9: 0 32px 34px rgba(0, 0, 0, 0.32), 0 4px 16px rgba(0, 0, 0, 0.12);
`
export const Font = `
    --kendo-font-family: inherit;
    --kendo-font-size: 0.875rem;
    --kendo-line-height: 1.4285714286;
    --kendo-font-weight: 400;
    --kendo-letter-spacing: ;
    --kendo-font-size-xxs: 0.5rem;
    --kendo-font-size-xs: 0.625rem;
    --kendo-font-size-sm: 0.75rem;
    --kendo-font-size-md: 0.875rem;
    --kendo-font-size-lg: 1rem;
    --kendo-font-size-xl: 1.25rem;
    --kendo-line-height-xs: 1;
    --kendo-line-height-sm: 1.25;
    --kendo-line-height-md: 1.4285714286;
    --kendo-line-height-lg: 1.5;
    --kendo-font-weight-thin: 100;
    --kendo-font-weight-extra-light: 200;
    --kendo-font-weight-light: 300;
    --kendo-font-weight-normal: 400;
    --kendo-font-weight-medium: 500;
    --kendo-font-weight-semibold: 600;
    --kendo-font-weight-bold: 700;
    --kendo-letter-spacing-tightest: -0.15px;
    --kendo-letter-spacing-tighter: -0.1px;
    --kendo-letter-spacing-tight: -0.5px;
    --kendo-letter-spacing-normal: 0px;
    --kendo-letter-spacing-wide: 0.5px;
    --kendo-letter-spacing-wider: 0.1px;
    --kendo-letter-spacing-widest: 0.15px;
    --kendo-font-family-sans: Arial, Verdana, Tahoma, Trebuchet MS, Helvetica, Impact, Gill Sans;
    --kendo-font-family-serif: Times New Roman, Georgia, Garamond, Palatino, Baskerville;
    --kendo-font-family-sans-serif: system-ui, -apple-system, Segoe UI, Roboto, Helvetica Neue, Noto Sans, Liberation Sans, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji;
    --kendo-font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, Roboto Mono, Ubuntu Mono, Lucida Console, Courier New, monospace
`
export const Border = `
    --kendo-border-radius-none: 0px;
    --kendo-border-radius-xs: 1px;
    --kendo-border-radius-sm: 0.125rem;
    --kendo-border-radius-md: 0.25rem;
    --kendo-border-radius-lg: 0.375rem;
    --kendo-border-radius-xl: 0.5rem;
    --kendo-border-radius-xxl: 0.75rem;
    --kendo-border-radius-xxxl: 1rem;
    --kendo-border-radius-full: 9999px;
`

export const CommonColor = `
    --kendo-color-success-subtle: hsl(95, 100%, 94%, 1);
    --kendo-color-success-subtle-hover: hsl(95, 100%, 92%, 1);
    --kendo-color-success-subtle-active: hsl(95, 100%, 88%, 1);
    --kendo-color-success: hsl(95, 100%, 30%, 1);
    --kendo-color-success-hover: hsl(95, 100%, 40%, 1);
    --kendo-color-success-active: hsl(95, 100%, 28%, 1);
    --kendo-color-success-emphasis: hsl(95, 100%, 35%, 1);
    --kendo-color-success-on-subtle: hsl(95, 100%, 25%, 1);
    --kendo-color-on-success: hsl(0, 0%,100%, 1);
    --kendo-color-success-on-surface: hsl(95, 100%, 20%, 1);

    --kendo-color-warning-subtle: hsl(45, 100%, 94%, 1);
    --kendo-color-warning-subtle-hover: hsl(45, 100%, 92%, 1);
    --kendo-color-warning-subtle-active: hsl(45, 100%, 88%, 1);
    --kendo-color-warning: hsl(45, 100%, 50%, 1);
    --kendo-color-warning-hover: hsl(45, 100%, 65%, 1);
    --kendo-color-warning-active: hsl(45, 100%, 45%, 1);
    --kendo-color-warning-emphasis: hsl(45, 100%, 55%, 1);
    --kendo-color-warning-on-subtle: hsl(45, 100%, 15%, 1);
    --kendo-color-on-warning: hsl(0, 0%, 12%, 1);
    --kendo-color-warning-on-surface: hsl(45, 100%, 30%, 1);

    --kendo-color-error-subtle: hsl(5, 100%, 94%, 1);
    --kendo-color-error-subtle-hover: hsl(5, 100%,92%, 1);
    --kendo-color-error-subtle-active: hsl(5, 100%,88%, 1);
    --kendo-color-error: hsl(5, 100%, 45%, 1);
    --kendo-color-error-hover: hsl(5, 100%, 65%, 1);
    --kendo-color-error-active: hsl(5, 100%, 40%, 1);
    --kendo-color-error-emphasis: hsl(5, 100%, 55%, 1);
    --kendo-color-error-on-subtle: hsl(5, 100%, 15%, 1);
    --kendo-color-on-error: hsl(0, 0%,100%, 1);
    --kendo-color-error-on-surface: hsl(5, 100%, 38%, 1);
    
    ${DefaultColor}
`
export const getColorVar = (colorStr: string) => {
    const colorVars: KeyValue<string> = {}
    colorStr
        .replace(PATTERN.enter, '')
        .replace(PATTERN.spaces, '')
        .split(';')
        .forEach((it) => {
            if (it) {
                const split = it.split(':')
                colorVars[split[0]] = split[1]
            }
        })
    return colorVars
}

const getCommonPalette = (colorStr: string) => {
    const colorVars = getColorVar(colorStr)

    const palette: PaletteOptions = {
        base: {
            main: colorVars['--kendo-color-base'],
            hover: colorVars['--kendo-color-base-hover'],
            active: colorVars['--kendo-color-base-active'],
            contrastText: colorVars['--kendo-color-on-base'],
        },
        info: {
            main: colorVars['--kendo-color-info'],
            hover: colorVars['--kendo-color-info-hover'],
            active: colorVars['--kendo-color-info-active'],
            contrastText: colorVars['--kendo-color-on-info'],
        },
        primary: {
            main: colorVars['--kendo-color-primary'],
            hover: colorVars['--kendo-color-primary-hover'],
            active: colorVars['--kendo-color-primary-active'],
            contrastText: colorVars['--kendo-color-on-primary'],
        },
        success: {
            main: colorVars['--kendo-color-success'],
            hover: colorVars['--kendo-color-success-hover'],
            active: colorVars['--kendo-color-success-active'],
            contrastText: colorVars['--kendo-color-on-success'],
        },
        warning: {
            main: colorVars['--kendo-color-warning'],
            hover: colorVars['--kendo-color-warning-hover'],
            active: colorVars['--kendo-color-warning-active'],
            contrastText: colorVars['--kendo-color-on-warning'],
        },
        error: {
            main: colorVars['--kendo-color-error'],
            hover: colorVars['--kendo-color-error-hover'],
            active: colorVars['--kendo-color-error-active'],
            contrastText: colorVars['--kendo-color-on-error'],
        },
        secondary: {
            main: colorVars['--kendo-color-secondary'],
            hover: colorVars['--kendo-color-secondary-hover'],
            active: colorVars['--kendo-color-secondary-active'],
            contrastText: colorVars['--kendo-color-on-secondary'],
        },
        tertiary: {
            main: colorVars['--kendo-color-tertiary'],
            hover: colorVars['--kendo-color-tertiary-hover'],
            active: colorVars['--kendo-color-tertiary-active'],
            contrastText: colorVars['--kendo-color-on-tertiary'],
        },
        light: {
            main: colorVars['--kendo-color-light'],
            hover: colorVars['--kendo-color-light-hover'],
            active: colorVars['--kendo-color-light-active'],
            contrastText: colorVars['--kendo-color-on-light'],
        },
        dark: {
            main: colorVars['--kendo-color-dark'],
            hover: colorVars['--kendo-color-dark-hover'],
            active: colorVars['--kendo-color-dark-active'],
            contrastText: colorVars['--kendo-color-on-dark'],
        },
        var: colorVars,
    }
    return palette
}
export const CommonPalette = getCommonPalette(CommonColor)

export const getColorStore = (colorStr: string, mode: PaletteMode = 'light') => {
    const colorVars = getColorVar(colorStr)
    const vars = { ...CommonPalette.var, ...colorVars }

    const palette: PaletteOptions = {
        ...CommonPalette,
        mode,
        primary: {
            main: vars['--kendo-color-primary'],
            hover: vars['--kendo-color-primary-hover'],
            active: vars['--kendo-color-primary-active'],
            contrastText: vars['--kendo-color-on-primary'],
        },
        base: {
            main: vars['--kendo-color-base'],
            hover: vars['--kendo-color-base-hover'],
            active: vars['--kendo-color-base-active'],
            contrastText: vars['--kendo-color-on-base'],
        },
        info: {
            main: vars['--kendo-color-info'],
            hover: vars['--kendo-color-info-hover'],
            active: vars['--kendo-color-info-active'],
            contrastText: vars['--kendo-color-on-info'],
        },
        background: {
            theme: vars['--color-theme'],
            paper: vars['--kendo-color-surface'],
        },
        var: vars,
    }
    return palette
}
