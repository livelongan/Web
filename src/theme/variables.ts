import { darkPalette } from './theme-dark'

export const getVariables = (palette: typeof darkPalette) =>
  ({
    '--color-contrast': palette.contrast,
    '--background-header': palette.background.header,
    '--background-primary': palette.background.default,
    '--background-secondary': palette.background.paper,

    '--text-title': palette.text.title,
    '--text-primary': palette.text.primary,
    '--text-secondary': palette.text.secondary,

    '--primary-color': palette.primary.main,
    '--secondary-color': palette.secondary.main,
    '--tertiary-color': palette.tertiary.main,

    '--error-color': palette.error.main,
    '--warning-color': palette.warning.main,
    '--info-color': palette.info.main,
    '--success-color': palette.success.main,

    '--border-color': palette.divider,
    '--border-color-primary': palette.dividerPrimary,
    '--background-footer': palette.background.footer,

    // '--font-family': 'Open Sans, Roboto, Helvetica Neue, Arial, sans-serif',
    '--font-family': `Open Sans, Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"`,
    '--line-height': 1.8,
    '--font-size': '1.6rem',
    '--font-size-sm': '1.4rem',
    '--font-size-l1': '3rem',
    '--font-size-l2': '2.4rem',
    '--font-size-l3': '1.6rem',

    '--box-shadow': `0 0 0 1px var(--border-color) inset`,
    '--box-shadow-1': `0 4px 6px var(--border-color), 0 4px 16px var(--border-color)`,
    '--box-shadow-2': `0 10px 12px var(--border-color), 0 4px 16px var(--border-color)`,
    '--box-shadow-top': `0 -1px 0px var(--border-color)`,
    '--box-shadow-right': `1px 0px 0px var(--border-color)`,
    '--box-shadow-bottom': `0 1px 0px var(--border-color)`,
    '--box-shadow-left': `-1px 0px 0px var(--border-color)`,

    '--overlap-shadows': `4px 4px 0px color-mix(in srgb, var(--text-primary) 10%, var(--background-secondary)),
              7px 7px 0px color-mix(in srgb, var(--text-secondary) 10%, var(--background-secondary))`,
  }) as {
    [property: string]: string | number
  }
