import { FunctionComponent, memo, PropsWithChildren } from 'react'
import { ThemeProvider as Provider } from 'styled-components'
import { Theme } from './types'
import { ThemeCss } from './theme'
export const ThemeProvider: FunctionComponent<
    PropsWithChildren<{
        theme: Theme
    }>
> = memo(({ theme, children }) => {
    return (
        <Provider theme={theme}>
            <style>
                {`
                :root{     
                    ${ThemeCss}
                    ${theme.color} 
                }`}
            </style>
            {children}
        </Provider>
    )
})
