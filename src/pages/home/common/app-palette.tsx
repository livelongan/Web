import { Box, Input, Stack, SwipeableDrawer } from '@mui/material'
import { observer } from 'mobx-react-lite'

import { useStores } from '../../../mobx/use-stores'
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
} from 'react'
import { LayoutPage, TextNormal } from '../../../components'
import { darkPalette } from '../../../theme/theme-dark'
import { lightPalette } from '../../../theme/theme-light'
import { getVariables } from '../../../theme/variables'
import { COLOR_KEYS } from './config'
import { useScreenQuery } from '../../../hooks'
import { HEADER_HEIGHT } from '../../../config'
export const AppPalette = observer(() => {
  const { baseStore } = useStores()
  const { isPhone } = useScreenQuery()
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const [containerReady, setContainerReady] = useState(false)

  const setContainerRef = (node: HTMLDivElement) => {
    if (node) {
      setContainerEl(node)
      setContainerReady(true)
    }
  }
  const palette = baseStore.themeMode === 'light' ? lightPalette : darkPalette

  const [variables, setVariables] = useState<{
    [property: string]: string
  }>({})

  const setRootCssVariables = (vars: { [property: string]: string }) => {
    const root = document.documentElement
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value as string)
    })
  }
  const generatePalette = useCallback(
    (key: string, value: string) => {
      const data = { ...palette }
      if (key === '--background-primary') {
        data.background.default = value
      } else if (key === '--background-secondary') {
        data.background.paper = value
      } else if (key === '--background-header') {
        data.background.header = value
      } else if (key === '--background-footer') {
        data.background.footer = value
      } else if (key === '--text-title') {
        data.text.title = value
      } else if (key === '--text-primary') {
        data.text.primary = value
      } else if (key === '--text-secondary') {
        data.text.secondary = value
      } else if (key === '--primary-color') {
        data.primary.main = value
      } else if (key === '--secondary-color') {
        data.secondary.main = value
      } else if (key === '--tertiary-color') {
        data.tertiary.main = value
      } else if (key === '--error-color') {
        data.error.main = value
      } else if (key === '--warning-color') {
        data.warning.main = value
      } else if (key === '--info-color') {
        data.info.main = value
      } else if (key === '--success-color') {
        data.success.main = value
      } else if (key === '--border-color') {
        data.divider = value
      } else if (key === '--border-color-primary') {
        data.dividerPrimary = value
      }
      // eslint-disable-next-line no-console
      console.log(data)
    },
    [palette],
  )

  const handleChange = useCallback(
    (key: string, event: ChangeEvent<HTMLInputElement>) => {
      const changes = { ...variables, [key]: event.target.value }
      generatePalette(key, event.target.value)
      setRootCssVariables(changes)
      setVariables(changes)
    },
    [generatePalette, variables],
  )
  useEffect(() => {
    const variables = getVariables(palette)
    const data: {
      [property: string]: string
    } = {}
    Object.keys(variables).forEach((it) => {
      if (COLOR_KEYS.includes(it)) {
        data[it] = variables[it] as string
      }
    })
    setVariables(data)
  }, [palette])

  const Layout = useMemo(
    () => (
      <LayoutPage
        className={`app-palette ${!baseStore.openPalette ? 'collapse' : ''}`}
        gap={'12px'}
        sx={{
          padding: '12px 12px 12px 0',
          position: 'sticky',
          borderLeft: '1px solid var(--border-color)',
          overflow: 'hidden',
          overflowY: 'auto',
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          top: !isPhone ? `${HEADER_HEIGHT}px` : 0,
          maxHeight: '100vh',
          height: '100vh',
          '&.collapse': {
            display: 'none',
            borderLeft: 'none',
          },
          '.MuiInput-root': {
            ['&:before']: { borderBottomWidth: 0 },
            ['&:after']: { borderBottomWidth: 0 },
          },
          '.MuiInput-input': {
            width: '24px',
            height: '24px',
            padding: '2px',
          },
        }}
      >
        {Object.entries(variables).map(([key, value]) => (
          <Stack flexDirection={'row'} key={key}>
            <TextNormal sx={{ width: '200px', textAlign: 'right' }}>
              {key}
            </TextNormal>
            <Input
              type='color'
              value={value}
              onChange={handleChange.bind(null, key)}
            />
          </Stack>
        ))}
      </LayoutPage>
    ),
    [baseStore.openPalette, handleChange, isPhone, variables],
  )

  return !isPhone ? (
    Layout
  ) : (
    <Box ref={setContainerRef}>
      <SwipeableDrawer
        anchor='right'
        open={baseStore.openPalette && containerReady}
        onClose={() => baseStore.setOpenPalette(false)}
        onOpen={() => baseStore.setOpenPalette(true)}
        container={containerEl}
      >
        {Layout}
      </SwipeableDrawer>
    </Box>
  )
})
