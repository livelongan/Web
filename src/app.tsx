/* eslint-disable no-console */
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { RootStoreProvider, useInitStore } from './mobx'
import { observer } from 'mobx-react-lite'
import { getTheme } from './theme'
import { RootRouter } from './router'
import { WEB_CONFIG } from './config'

let render = 0
export const App = observer(() => {
  render++
  console.log(`App rendering ${render} time`)
  console.log(WEB_CONFIG)
  const { rootStore } = useInitStore()

  return (
    <RootStoreProvider value={rootStore}>
      <ThemeProvider theme={getTheme(rootStore.baseStore.themeMode)}>
        <CssBaseline />
        <RootRouter />
      </ThemeProvider>
    </RootStoreProvider>
  )
})
