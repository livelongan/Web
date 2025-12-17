import { useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Snackbar, NotificationGroupHandle, ErrorBoundary } from './components'
import { RootStoreProvider, InitRootStore, useStores } from './stores'
import { RootRouter } from './routers'
import { ThemeOptions, ThemeProvider } from './theme'
import './app.css'
// import { _resetGlobalState, observable, autorun, configure } from 'mobx'

// configure({ disableErrorBoundaries: true })

// test('Throw if age is negative', () => {
//     expect(() => {
//         const age = observable.box(10)
//         autorun(() => {
//             if (age.get() < 0) throw new Error('Age should not be negative')
//         })
//         age.set(-1)
//     }).toThrow('Age should not be negative')
// })

// afterEach(() => {
//     _resetGlobalState()
// })

export const App = observer(() => {
    const notificationRef = useRef<NotificationGroupHandle>(null)
    const { baseStore } = useStores()

    return (
        <ErrorBoundary>
            <ThemeProvider
                theme={{
                    ...ThemeOptions,
                    mode: baseStore.theme.mode,
                    type: baseStore.theme.value.id,
                    color: baseStore.theme.value.color,
                    palette: baseStore.theme.value.palette,
                }}
            >
                <RootStoreProvider value={InitRootStore}>
                    <RootRouter />
                    <Snackbar ref={notificationRef} />
                </RootStoreProvider>
            </ThemeProvider>
        </ErrorBoundary>
    )
})
