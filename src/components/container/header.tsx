import {
    AppBar,
    AppBarSection,
    AppBarSpacer,
    Breadcrumb,
    BreadcrumbHandle,
    BreadcrumbLinkKeyDownEvent,
    BreadcrumbLinkMouseEvent,
    DataModel,
} from '@progress/kendo-react-layout'
import { observer } from 'mobx-react-lite'
import {
    LegacyRef,
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react'
import { GAP, MENU_ICON_HEIGHT, MENU_MIN_WIDTH, MENU_WIDTH, POPUP_ANIMATE } from '../../constants'
import { useStores } from '../../stores'
import { HeaderIcon } from './header-icon'
import { ThemeMode } from './theme-mode'
import { styled } from 'styled-components'
import { getSnapshot } from 'mobx-state-tree'
import { useNavigate } from 'react-router-dom'
import { useRoutes } from '../../routers'
import { SvgIcon } from '@progress/kendo-react-common'
import { homeIcon } from '@progress/kendo-svg-icons'
import { Popup } from '@progress/kendo-react-popup'
import { MenuItemProps } from '../drawer-menu'
import { ThemeType } from './theme-palette'
import { Typography } from '../typography'

const Root = styled(AppBar)`
    padding: 0;
    padding-right: ${GAP.middle}px;
    background-color: var(--color-theme);
    font-weight: 500;
    border-bottom: 1px solid var(--color-theme-border);
`
const NavRoot = styled.div`
    display: flex;
    flex-direction: column;
`
const NavText = styled.div`
    color: var(--kendo-color-on-app-surface);
    padding: ${GAP.normal}px;
    border-left: 4px solid transparent;
    &:hover {
        cursor: pointer;
        background-color: var(--kendo-color-base-hover);
    }
    &.active {
        border-left-color: var(--kendo-color-primary);
    }
`
const HOME_ID = 'home'
type IProps = PropsWithChildren<object>

export const Header = observer<IProps>(() => {
    const navigate = useNavigate()
    const { baseStore } = useStores()
    const { findMenuById, findMenuDescendants } = useRoutes()
    const [breadcrumbs, setBreadcrumbs] = useState<DataModel[]>([])
    const [openPopup, setOpenPopup] = useState<boolean>(false)
    const [popupMenu, setPopupMenu] = useState<MenuItemProps>()

    const [contexts, setContexts] = useState<MenuItemProps[]>([])
    const navRef: LegacyRef<BreadcrumbHandle | null> = useRef(null)
    const anchor = useRef<HTMLElement | null>()

    const currentPath = useMemo(() => {
        return baseStore.menu.route?.path
    }, [baseStore.menu.route])

    const handleBreadcrumbChange = useCallback(
        (id: string) => {
            const itemIndex: number = breadcrumbs.findIndex((curValue) => curValue.id === id)
            if (itemIndex !== breadcrumbs.length - 1) {
                if (id !== HOME_ID) {
                    const route = findMenuById(id)
                    if (route) {
                        const { items = [] } = route
                        if (items.length === 0) {
                            navigate(route.path)
                            const paths: DataModel[] = breadcrumbs.slice(0, itemIndex + 1)
                            setBreadcrumbs(paths)
                        } else {
                            const ele = navRef.current?.element?.querySelector(`[id="${id}"]`)
                            anchor.current = ele as HTMLElement
                            setContexts(findMenuDescendants(route.path))
                            setOpenPopup(!openPopup)
                        }
                    }
                } else if (currentPath !== '/') {
                    navigate('/')
                }
            }
        },
        [breadcrumbs, currentPath, findMenuById, findMenuDescendants, navigate, openPopup],
    )

    const handleItemSelect = useCallback(
        (event: BreadcrumbLinkMouseEvent) => {
            handleBreadcrumbChange(`${event.id}`)
        },
        [handleBreadcrumbChange],
    )

    const handleKeyDown = useCallback(
        (event: BreadcrumbLinkKeyDownEvent) => {
            if (event.nativeEvent.keyCode === 13) {
                handleBreadcrumbChange(`${event.id}`)
            }
        },
        [handleBreadcrumbChange],
    )

    const handleCollapseMenu = useCallback(() => {
        const collapse = !baseStore.menu.collapse
        baseStore.setMenuCollapse(collapse)
        if (collapse) {
            baseStore.setMenuWidth(MENU_WIDTH)
        } else {
            baseStore.setMenuWidth(MENU_MIN_WIDTH)
        }
    }, [baseStore])

    const handleRouteChange = useCallback(() => {
        const paths: DataModel[] = getSnapshot(baseStore.menu.routePaths).map((it) => ({
            id: it.id,
            text: it.text,
        }))

        paths.unshift({
            id: HOME_ID,
            text: 'Home',
            icon: <SvgIcon icon={homeIcon} />,
        })

        setBreadcrumbs(paths)
    }, [baseStore.menu.routePaths])

    const handlePopupMenu = useCallback(
        (menu: MenuItemProps) => {
            if (!popupMenu || popupMenu.id === menu.id) {
                setOpenPopup(false)
            }
            setPopupMenu(menu)
            if (menu.path !== currentPath) {
                navigate(menu.path)
            }
        },
        [currentPath, navigate, popupMenu],
    )

    useEffect(() => {
        handleRouteChange()
    }, [baseStore.menu.route, handleRouteChange])

    return (
        <Root positionMode={'static'} style={{ height: MENU_ICON_HEIGHT }}>
            <AppBarSection>
                <HeaderIcon
                    width={MENU_MIN_WIDTH}
                    height={MENU_ICON_HEIGHT}
                    onClick={handleCollapseMenu}
                />
            </AppBarSection>
            <AppBarSection>
                <Typography fontWeight="bold" fontSize="xlarge" style={{ marginTop: '-2px' }}>
                    Mobx
                </Typography>
            </AppBarSection>
            <AppBarSection>
                <Breadcrumb
                    ref={navRef}
                    size="small"
                    data={breadcrumbs}
                    onItemSelect={handleItemSelect}
                    onKeyDown={handleKeyDown}
                />
            </AppBarSection>
            <AppBarSpacer style={{ flex: 1 }} />

            <AppBarSection>
                <ThemeType />
            </AppBarSection>

            <AppBarSection>
                <ThemeMode />
            </AppBarSection>
            <Popup
                anchor={anchor.current}
                show={openPopup}
                popupClass={'popup-content'}
                style={{
                    width: 'fit-content',
                    height: 'fit-content',
                }}
                onMouseDownOutside={() => {
                    if (!popupMenu) {
                        setOpenPopup(false)
                    }
                    setPopupMenu(undefined)
                }}
                animate={POPUP_ANIMATE}
            >
                <NavRoot>
                    {contexts.map((it) => (
                        <NavText
                            key={it.id}
                            className={
                                currentPath?.toLowerCase() === it.path.toLowerCase() ? 'active' : ''
                            }
                            onMouseDown={() => {
                                handlePopupMenu(it)
                            }}
                        >
                            <Typography>{it.path}</Typography>
                        </NavText>
                    ))}
                </NavRoot>
            </Popup>
        </Root>
    )
})
