import {
    DropDownList,
    ListItemProps,
    DropDownListChangeEvent,
} from '@progress/kendo-react-dropdowns'
import { observer } from 'mobx-react-lite'
import { useCallback, cloneElement } from 'react'
import { styled } from 'styled-components'

import { useStores } from '../../stores'
import { DarkTheme, LightTheme, ThemePalette } from '../../theme'

const Root = styled(DropDownList)`
    width: 160px;
    border: none !important;
    box-shadow: none !important;
    background-color: unset !important;
    color: var(--color-theme-on-surface);
    align-items: center;
    .k-input-inner {
        padding: 0;
    }
`
const PaletteRoot = styled.span`
    display: flex;
    position: relative;
    word-break: keep-all;
    white-space: pre;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 100%;
`

const Palette = styled.span`
    width: 22px;
    height: 22px;
    border: 2px solid white;
    border-radius: 50%;
`

const PaletteText = styled.span`
    flex: 1;
    margin-left: 8px;
    font-size: xx-small;
    margin-top: 2px;
`
export const ThemeType = observer(() => {
    const { baseStore } = useStores()

    const valueRender = useCallback(
        (element: React.ReactElement<HTMLSpanElement>, value: ThemePalette) => {
            if (!value) {
                return element
            }
            const { palette } = value
            const children = (
                <PaletteRoot>
                    <Palette style={{ backgroundColor: palette.background?.paper }} />
                    <Palette
                        style={{ backgroundColor: palette.background?.theme, marginLeft: '-8px' }}
                    />
                    <Palette
                        style={{ backgroundColor: palette.primary?.main, marginLeft: '-8px' }}
                    />
                    <PaletteText>{value.name}</PaletteText>
                </PaletteRoot>
            )
            return cloneElement(element, { ...element.props }, children)
        },
        [],
    )

    const itemRender = useCallback(
        (li: React.ReactElement<HTMLLIElement>, itemProps: ListItemProps) => {
            const { palette } = itemProps.dataItem as ThemePalette
            const itemChildren = (
                <PaletteRoot>
                    <Palette style={{ backgroundColor: palette.background?.paper }} />
                    <Palette
                        style={{ backgroundColor: palette.background?.theme, marginLeft: '-8px' }}
                    />
                    <Palette
                        style={{ backgroundColor: palette.primary?.main, marginLeft: '-8px' }}
                    />
                    <PaletteText>{itemProps.dataItem.name}</PaletteText>
                </PaletteRoot>
            )

            return cloneElement(li, li.props, itemChildren)
        },
        [],
    )

    const handleChangePalette = useCallback(
        (event: DropDownListChangeEvent) => {
            baseStore.setThemeType(event.value)
        },
        [baseStore],
    )

    return (
        <Root
            data={baseStore.theme.mode !== 'dark' ? LightTheme : DarkTheme}
            dataItemKey="id"
            valueRender={valueRender}
            itemRender={itemRender}
            value={baseStore.theme.value}
            onChange={handleChangePalette}
            popupSettings={{
                className: 'palette-dropdown',
            }}
        />
    )
})
