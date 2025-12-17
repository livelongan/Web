import 'styled-components'
import { Theme } from './theme'
declare global {
    declare module 'styled-components' {
        export interface DefaultTheme extends Theme {
            mode?: string
        }
    }
    interface KeyValue<ValueType> {
        [name: string]: ValueType
    }
    type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

    type ApiInformation = {
        type: 'query' | 'create' | 'update' | 'delete' | 'export' | 'other'
        notify?: boolean
        successMessage?: string
    } | null
}

export {}
