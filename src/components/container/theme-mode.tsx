import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'
import { notification } from '../notification'
import { iconDark, iconLight } from '../icons'
import { useCallback } from 'react'
import { styled } from 'styled-components'
import { DarkTheme, LightTheme } from '../../theme'
import { IconButton } from '../button'

const Root = styled(IconButton)`
    .k-icon {
        color: rgba(255, 210, 23, 1);
    }
    .k-svg-icon {
        width: 20px;
        height: 20px;
    }
    svg {
        shape-rendering: initial;
        width: 20px !important;
        height: 20px !important;
    }
`
export const ThemeMode = observer(() => {
    const { baseStore } = useStores()

    const handleTheme = useCallback(() => {
        const theme = baseStore.theme.mode === 'dark' ? 'light' : 'dark'
        const palette = (theme === 'light' ? LightTheme : DarkTheme).find((it) => {
            return baseStore.theme.value.id === it.id
        })
        baseStore.setThemeMode(theme)
        if (palette) {
            baseStore.setThemeType(palette)
        }
        notification({
            type: 'info',
            message: `Theme now change to ${theme}.`,
        })
    }, [baseStore])

    return (
        <Root
            svgIcon={baseStore.theme.mode === 'light' ? iconLight : iconDark}
            fillMode={'clear'}
            title={'Toggle theme mode'}
            onClick={handleTheme}
        />
    )
})
