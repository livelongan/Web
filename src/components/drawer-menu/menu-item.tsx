import { DrawerItem, DrawerItemProps } from '@progress/kendo-react-layout'
import {
    chevronDownIcon,
    chevronUpIcon,
    fileTxtIcon,
    folderIcon,
    folderOpenIcon,
} from '@progress/kendo-svg-icons'
import { styled } from 'styled-components'
import { MenuItemProps } from './types'
import { observer } from 'mobx-react-lite'
import { useStores } from '../../stores'
import { MENU_ITEM_HEIGHT } from '../../constants'
import { useNavigate } from 'react-router-dom'
import { useCallback, useMemo } from 'react'
import { Badge, BadgeContainer } from '@progress/kendo-react-indicators'
import { IconButton } from '../button'
import { SvgIcon } from '@progress/kendo-react-common'
import { Typography } from '../typography'

const PADDING = 16

const TextRoot = styled(Typography)`
    flex: 1;
    overflow: hidden;
`
const GroupMenu = styled.ul`
    width: 100%;
    height: 0;
    overflow: hidden;
    box-sizing: border-box;
    position: relative;
    transition: ${({ theme }) => `height ${theme.duration.shorter} ${theme.easing.easeInOut}`};
    &::before {
        content: '';
        bottom: 1px;
        top: 1px;
        right: 2px;
        left: 2px;
        position: absolute;
        outline-width: 2px;
        outline-style: dashed;
        outline-color: transparent;
        pointer-events: none;
    }
    & .k-drawer-item:hover + .k-drawer-items::before {
        outline-color: var(--kendo-color-primary);
    }
`
const MenuDrawerItem = styled(DrawerItem)`
    height: ${MENU_ITEM_HEIGHT}px;
    padding-top: 0;
    padding-bottom: 0;
    display: flex;
    align-items: center;
    padding-left: ${PADDING}px;
    padding-right: ${PADDING}px;
    min-width: 0;

    &:hover + .k-drawer-items::before {
        outline-color: var(--kendo-color-primary);
    }
    &.k-selected {
        background-color: unset;
        color: inherit;
        box-shadow: inset 4px 0 0 var(--kendo-color-primary);
    }
`

export const SubMenuItem = observer((props: DrawerItemProps) => {
    const menuItem = props as MenuItemProps
    const navigate = useNavigate()
    const { baseStore } = useStores()
    const { text, path, items = [], expanded, component, svgIcon, parentId, ...others } = menuItem

    const isGroup = useMemo(() => items.length > 0, [items.length])
    const menuIcon = useMemo(() => {
        if (!isGroup) {
            return fileTxtIcon
        }
        return expanded ? folderOpenIcon : folderIcon
    }, [expanded, isGroup])

    const handleSelect = (data: MenuItemProps) => {
        const { path } = data ?? {}

        if (path && !isGroup) {
            navigate(path)
        } else if (isGroup) {
            baseStore.toggleMenuExpandedId(props.id)
        }
    }

    return (
        <MenuDrawerItem
            {...others}
            selected={baseStore.menu.route?.id === others.id}
            title={text}
            onSelect={() => {
                handleSelect(props as MenuItemProps)
            }}
        >
            <SvgIcon
                icon={svgIcon ?? menuIcon}
                style={{ color: isGroup ? '#dba400' : 'inherit' }}
            />

            <TextRoot>{text}</TextRoot>

            {isGroup && baseStore.menu.width > 140 && (
                <BadgeContainer>
                    <Badge size={'small'} rounded={'full'}>
                        {items.length}
                    </Badge>
                </BadgeContainer>
            )}
            {isGroup && (
                <IconButton
                    svgIcon={!expanded ? chevronDownIcon : chevronUpIcon}
                    label={`${text} Chevron`}
                    fillMode={'clear'}
                />
            )}
            {/* {isGroup && <SvgIcon icon={!expanded ? chevronDownIcon : chevronUpIcon} />} */}
        </MenuDrawerItem>
    )
})

export const MenuItem = observer((props: DrawerItemProps) => {
    const menuItem = props as MenuItemProps
    const { baseStore } = useStores()
    const { items = [] } = menuItem
    const expanded = baseStore.menu.expandIds.includes(props.id)

    const getHeight = useCallback(
        (data: MenuItemProps, children: MenuItemProps[] = []) => {
            const { items = [] } = data
            children.push(data)
            if (items.length > 0 && baseStore.menu.expandIds.includes(data.id)) {
                items.forEach((it) => {
                    getHeight(it, children)
                })
            }
            return (children.length - 1) * MENU_ITEM_HEIGHT
        },
        [baseStore.menu.expandIds],
    )

    return items.length === 0 ? (
        <SubMenuItem {...props} />
    ) : (
        <>
            <SubMenuItem {...props} expanded={expanded} />
            <GroupMenu
                className={'k-drawer-items group'}
                style={{
                    height: expanded ? `${getHeight(menuItem)}px` : 0,
                }}
            >
                {items.map((it) => (
                    <MenuItem {...it} key={it.id} />
                ))}
            </GroupMenu>
        </>
    )
})
