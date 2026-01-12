import { createTheme, type PaletteOptions } from '@mui/material/styles'
import type { ThemeModeType } from '../mobx/models/base'
import { lightPalette } from './theme-light'
import { darkPalette } from './theme-dark'
import { BREAKPOINTS } from './config'
import { getVariables } from './variables'

const CUBIC = 'cubic-bezier(0.4, 0, 0.2, 1)'
const htmlFontSize = 10 // px
export const getTheme = (mode: ThemeModeType) => {
  const palette = mode === 'light' ? lightPalette : darkPalette
  return createTheme({
    palette: palette as PaletteOptions,
    spacing: 1,
    breakpoints: {
      values: BREAKPOINTS,
    },
    zIndex: {
      tooltip: 1500,
      snackbar: 1400,
      modal: 1300,
      drawer: 1200,
      appBar: 1100,
      mobileStepper: 1000,
      speedDial: 1050,
      fab: 1050,
    },
    typography: {
      allVariants: {
        lineHeight: 'var(--line-height)',
      },
      fontSize: htmlFontSize * 1.6,
      htmlFontSize: htmlFontSize,
      fontFamily: 'var(--font-family)',
      h1: {
        fontSize: 'var(--font-size-l1)',
        fontWeight: 600,
        color: 'var(--text-title)',
        letterSpacing: '-0.024em',
        padding: '12px 0',
      },
      h2: {
        fontSize: 'var(--font-size-l2)',
        fontWeight: 600,
        color: 'var(--text-title)',
        letterSpacing: '-0.008em',
        padding: '12px 0',
      },
      h3: {
        fontSize: 'var(--font-size-l3)',
        fontWeight: 600,
        color: 'var(--text-title)',
        letterSpacing: '0em',
        padding: '12px 0',
      },
      body1: {
        fontSize: 'var(--font-size)',
        color: 'var(--text-primary)',
        letterSpacing: '0.008em',
      },
      body2: {
        fontSize: 'var(--font-size-sm)',
        color: 'var(--text-secondary)',
        letterSpacing: '0.01em',
      },
      button: {
        fontSize: 'var(--font-size-sm)',
        fontWeight: 400,
        textTransform: 'none',
        letterSpacing: '0.028em',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ':root': getVariables(palette),
          '.MuiTableContainer-root': {
            [`@media (max-width: ${BREAKPOINTS.lg}px)`]: {
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            },
          },
          html: {
            fontSize: `${htmlFontSize}px`,
            WebkitFontSmoothing: 'antialiased',
            MozOsxFontSmoothing: 'grayscale',
            [`@media (max-width: ${BREAKPOINTS.lg}px)`]: {
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            },
            overflowX: 'hidden',
          },
          '*': {
            boxSizing: 'border-box',
          },
          'h1, h2, h3, h4, h5, h6': {
            margin: '0 0 1rem 0',
            color: palette.text.title,
            overflowWrap: 'break-word',
            textBox: 'trim-both cap alphabetic',
          },
          span: {
            overflowWrap: 'break-word',
          },
          p: {
            overflowWrap: 'break-word',
          },
          'ul, ol': {
            margin: '0 0 1rem 0',
            paddingLeft: '1.5rem',
          },
          li: {
            marginBottom: '0.25rem',
          },
        },
      },
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          disableElevation: true,
          variant: 'contained',
          size: 'small',
        },
        styleOverrides: {
          root: {
            borderRadius: '4px',
            padding: '10px 24px',
            textTransform: 'none',
            transition: `all 0.3s ${CUBIC}`,

            cursor: 'pointer',
            '&.Mui-disabled': {
              cursor: 'not-allowed',
              opacity: 0.8,
            },
          },
          contained: {
            '&:active': {
              boxShadow: `0 0 0px 2px color-mix(in srgb, var(--primary-color) 30%, transparent)`,
            },
            '&:focus': {
              boxShadow: `0 0 0px 2px color-mix(in srgb, var(--primary-color) 30%, transparent)`,
            },
            '&.Mui-disabled': {
              color: `color-mix(in srgb, var(--primary-color) 90%, var(--background-primary))`,
            },
          },
          outlined: {
            borderColor: `color-mix(in srgb, var(--primary-color) 30%, var(--background-primary))`,
            '&:hover': {
              borderColor: 'var(--primary-color)',
            },
            '&:active': {
              boxShadow: `0 0 0px 2px color-mix(in srgb, var(--primary-color) 30%, transparent)`,
            },
            '&:focus': {
              boxShadow: `0 0 0px 2px color-mix(in srgb, var(--primary-color) 30%, transparent)`,
            },
            '&.Mui-disabled': {
              color: `color-mix(in srgb, var(--primary-color) 70%, var(--background-primary))`,
            },
          },
          text: {
            padding: '8px 16px',
            '&:hover': {
              backgroundColor:
                'color-mix(in srgb, var(--text-primary) 10%, transparent)',
            },
            '&.Mui-disabled': {
              color: `color-mix(in srgb, var(--primary-color) 70%, var(--background-primary))`,
            },
          },

          sizeSmall: {
            padding: '4px 14px',
            fontSize: '1.3rem',
            minHeight: '32px',
          },

          sizeMedium: {
            padding: '6px 24px',
            fontSize: 'var(--font-size-sm)',
            minHeight: '36px',
          },

          sizeLarge: {
            padding: '6px 24px',
            fontSize: 'var(--font-size)',
            minHeight: '42px',
          },

          startIcon: {
            marginRight: '4px',
            marginLeft: '-4px',
          },

          endIcon: {
            marginLeft: '4px',
            marginRight: '-4px',
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          disableRipple: true,
          size: 'small',
        },
        styleOverrides: {
          root: {
            borderRadius: '50%',
            padding: 0,
            width: '32px',
            height: '32px',
            fontSize: '1.8rem',

            '&:hover': {
              paddingTop: '2px',
              fontSize: '2.5rem',
            },

            '&:active': {
              boxShadow: 'var(--box-shadow-1)',
            },
            '&.Mui-disabled': {
              cursor: 'not-allowed',
              opacity: 0.6,
            },
            '.MuiSvgIcon-root': {
              fontSize: 'inherit',
            },
            '&.button-contained-icon': {
              backgroundColor: 'var(--tertiary-color)',
              '.MuiSvgIcon-root': {
                color: palette.primary.contrastText,
              },
            },
          },
        },
      },
      MuiButtonBase: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            width: 'fit-content',
            transition: `all 0.3s ${CUBIC}`,
            '&.MuiTab-root': {
              minWidth: 0,
              minHeight: '40px',
              padding: '0 16px',
            },
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            '.MuiSvgIcon-root': {
              marginRight: '8px',
            },
          },
        },
      },
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            fontSize: '1.8rem',
            color: 'var(--tertiary-color)',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            flexDirection: 'column',
            backgroundColor: 'var(--background-primary)',
            borderRadius: 0,
            outlineColor: 'var(--border-color)',
            outlineWidth: 0,
            '&:hover': {
              outlineStyle: 'solid',
              outlineWidth: '1px',
              transition: `all 250ms ${CUBIC} 0ms`,
              transform: 'translate(-4px, -4px)',
              boxShadow: `var(--overlap-shadows)`,
            },
          },
        },
      },
      MuiCardActionArea: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'unset',
            padding: '8px 16px',
            height: '100%',
            '.MuiCardActionArea-focusHighlight': {
              background: 'none',
              // border: '1px solid var(--primary-color)',
            },
            // '&:hover .MuiCardActionArea-focusHighlight, &.Mui-selected .MuiCardActionArea-focusHighlight':
            //   {
            //     opacity: 0.5,
            //   },
            '.MuiCardContent-root': {
              padding: 0,
            },
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            padding: '8px 16px',
          },
        },
      },
      MuiList: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
            gap: '2px',
          },
        },
      },
      MuiListSubheader: {
        styleOverrides: {
          root: {
            lineHeight: 'var(--line-height)',
            fontSize: '1.3rem',
            textTransform: 'uppercase',
            paddingTop: '1rem',
            position: 'static',
            '&:after': {
              content: '""',
              pointEvents: 'none',
              width: '100%',
              height: '1px',
              background: 'var(--border-color)',
              display: 'block',
              position: 'relative',
              top: '4px',
            },
          },
        },
      },
      MuiMenuItem: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            width: '100%',
            '&.Mui-selected,&.Mui-selected:hover': {
              backgroundColor: 'unset',
            },
            '&.Mui-selected:before': {
              content: '""',
              backgroundColor: 'var(--primary-color)',
              width: '3px',
              position: 'absolute',
              left: 0,
              top: '4px',
              bottom: '4px',
            },
          },
        },
      },
      MuiListItemButton: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: { borderRadius: '12px' },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundImage: 'none',
            background: 'var(--background-secondary)',
          },
        },
      },
      MuiAccordionSummary: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            minHeight: '48px',
            padding: '0 8px 0 12px',
          },
          content: {
            margin: 0,
            alignItems: 'center',
            gap: '8px',
            paddingRight: '8px',
            justifyContent: 'space-between',
          },
          expandIconWrapper: {
            '&.Mui-expanded': {
              transform: 'rotate(90deg)',
            },
          },
        },
      },
      MuiAccordionDetails: {
        styleOverrides: {
          root: {
            padding: '8px',
          },
        },
      },
      MuiStack: {
        defaultProps: {
          gap: '16px',
          direction: 'column',
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: 'filled',
        },
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'var(--border-color)',
              },
              '&:hover fieldset': {
                borderColor: 'var(--border-color-primary)',
              },
              '&.Mui-focused fieldset': {
                borderColor: 'var(--border-color-primary)',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderWidth: '1px',
              },
            },
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            '&.MuiInputBase-multiline': {
              alignItems: 'flex-start',
              '.MuiIconButton-root': {
                marginTop: '-1rem',
              },
            },
          },
        },
      },
      MuiInput: {
        styleOverrides: {
          underline: {
            '&:before': {
              borderBottomWidth: '1px',
            },
            '&:hover:not(.Mui-disabled):before': {
              borderBottomWidth: '1px',
            },
            '&:after': {
              borderBottomWidth: '1px',
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderWidth: '1px',
            },
          },
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            paddingRight: '4px',
            background: 'var(--background-primary)',
            '&:focus,&.Mui-focused,&:hover': {
              background: 'var(--background-primary)',
            },
            '&.Mui-disabled': {
              color: 'var(--text-disabled)',
              background: 'var(--background-disabled)',
            },
            '&.Mui-disabled:focus,&.Mui-disabled.Mui-focused,&.Mui-disabled:hover':
              {
                background: 'var(--background-disabled)',
              },
            '&::before, &::after': {
              borderBottomWidth: '1px',
            },
            '&:hover::before': {
              borderBottomWidth: '1px',
            },
            '&.Mui-focused::after': {
              borderBottomWidth: '1px',
            },
            '.MuiFilledInput-input': {
              paddingTop: '42px',
              paddingBottom: '14px',
              // padding: '18px 0 16px 12px',
            },
            '.MuiInputBase-inputMultiline': {
              padding: 0,
            },
          },
          multiline: {
            paddingTop: '42px',
            paddingBottom: '14px',
            // padding: '18px 0 16px 12px',
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          // shrink: {
          //   transform: 'translate(12px, 7px)', // 仅上移，不缩小
          //   fontSize: '1rem !important', // 保持字体大小
          // },
          root: {
            transform: 'translate(12px, 12px) scale(1)',
            '&.MuiInputLabel-shrink': {
              // transform: 'translate(12px, 7px) scale(1)', // 上移位置，保持大小不变
            },
            '&.Mui-disabled': {
              color: 'var(--text-disabled)',
            },
          },
          asterisk: {
            color: 'var(--error-color)',
          },
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            textBox: 'trim-both cap alphabetic',
          },
        },
      },
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            display: 'flex',
            flexDirection: 'column',
          },
        },
      },
      MuiCheckbox: {
        defaultProps: {
          disableRipple: true,
          size: 'large',
        },
        styleOverrides: {
          root: {
            padding: '0 9px',
            '.MuiSvgIcon-root': {
              width: '1.2em',
              height: '1.2em',
            },
          },
        },
      },
      MuiRadio: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            padding: '0 9px',
            '.MuiSvgIcon-root': {
              width: '1.2em',
              height: '1.2em',
            },
          },
        },
      },
      MuiSwitch: {
        defaultProps: {
          disableRipple: true,
        },
      },
      MuiPaper: {
        styleOverrides: {
          outlined: {
            border: '1px solid var(--border-color)',
          },
        },
      },
      MuiTab: {
        defaultProps: {
          disableRipple: true,
        },
        styleOverrides: {
          root: {
            '&.Mui-selected': {
              fontWeight: 600,
            },
          },
        },
      },
      MuiLink: {
        styleOverrides: {
          root: {
            '&:hover': {
              color: 'var(--primary-color)',
            },
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            '.MuiTableRow-root': {
              background: 'var(--background-primary) !important',
            },
            '.MuiTableCell-root': {
              color: 'var(--text-title)',
              fontWeight: '600',
            },
            '.MuiTableSortLabel-root:hover,.MuiTableSortLabel-root:focus': {
              color: 'var(--text-primary)',
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          root: {
            padding: '0 8px',
            height: '40px',
            color: 'var(--text-primary)',
            borderBottom: '1px solid var(--border-color)',
            '&.MuiTableCell-paddingCheckbox': {
              padding: 0,
              paddingLeft: '8px',
              width: '42px',
            },
            '&.MuiTableCell-paddingNone': {
              padding: 0,
            },
            '.MuiCheckbox-root': {
              padding: '6px',
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            '&:nth-of-type(odd),&.Mui-selected:nth-of-type(odd),&:nth-of-type(odd):hover':
              {
                backgroundColor: 'var(--background-secondary)',
              },
            '&:nth-of-type(even),&.Mui-selected:nth-of-type(even),&:nth-of-type(even):hover':
              {
                backgroundColor: 'var(--background-primary)',
              },
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root: {
            minHeight: '42px !important',
            p: {
              margin: 0,
            },
            [`@media (max-width: ${BREAKPOINTS.sm}px)`]: {
              '.MuiTablePagination-selectLabel': {
                display: 'none',
              },
            },
            '.MuiTablePagination-selectLabel,.MuiTablePagination-displayedRows':
              {
                color: 'var(--text-primary)',
              },
          },
        },
      },
    },
  })
}
