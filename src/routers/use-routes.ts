import { useCallback, useEffect, useState } from 'react'
import { MenuItemProps, RouteItemProps } from '../components'
import { RouterMenus } from './router-menus'

type RoutersHookProps = {
    menus: MenuItemProps[]
    routers: MenuItemProps[]
    findMenu: (path: string) => MenuItemProps | null
    findRoute: (path: string) => MenuItemProps | undefined
    findMenuById: (id: string) => MenuItemProps | null
    findRoutePaths: (path: string) => MenuItemProps[]
    findMenuDescendants: (path: string) => MenuItemProps[]
    groupIds: string[]
}

type MenuTreeReturn = {
    menus: MenuItemProps[]
    routers: MenuItemProps[]
    groupIds: string[]
}

type MenuTreeParam = {
    routeMenus: MenuItemProps[] | RouteItemProps[]
    routers?: MenuItemProps[]
    parent?: { id: string; path: string }
    groupIds?: string[]
}

export const useRoutes = (): RoutersHookProps => {
    const [routersSources, setRoutersSources] = useState<MenuItemProps[]>([])
    const [menusSources, setMenusSources] = useState<MenuItemProps[]>([])
    const [groupIds, setGroupIds] = useState<string[]>([])

    const generateMenuTree = useCallback(
        ({
            routeMenus = [],
            routers = [],
            parent,
            groupIds = [],
        }: MenuTreeParam): MenuTreeReturn => {
            const menus: MenuItemProps[] = []
            routeMenus.map((it, index) => {
                const parentId = parent ? `${parent.id}` : ''
                const id = `${parentId}${!parent ? 'menu' : ''}-${index + 1}`
                const data = {
                    ...it,
                    id,
                    path: `${parent ? parent.path : ''}${it.path ?? ''}`,
                    text: it.text ?? '',
                    parentId: parent ? parentId : undefined,
                    expanded: it.expanded ?? true,
                } as MenuItemProps
                if (!it.separator) {
                    if (!it.items || it.items.length === 0) {
                        routers.push(data)
                        if (!it.hidden) {
                            menus.push({
                                ...data,
                            })
                        }
                    } else {
                        const submenus = generateMenuTree({
                            routeMenus: it.items,
                            routers,
                            parent: {
                                id,
                                path: data.path,
                            },
                            groupIds,
                        })
                        menus.push({
                            ...data,
                            items: submenus.menus,
                        })
                        if (data.expanded) {
                            groupIds?.push(data.id)
                        }
                    }
                } else {
                    menus.push({ ...data })
                }
            })
            return { menus, routers, groupIds }
        },
        [],
    )

    const findRoute = useCallback(
        (path: string) => {
            return routersSources.find((it) => it.path.toLowerCase() === path.toLowerCase())
        },
        [routersSources],
    )

    const findNodeByPath = useCallback(
        (path: string, menus: MenuItemProps[] = []): MenuItemProps | null => {
            for (const node of menus) {
                if (node.path.toLowerCase() === path.toLowerCase()) {
                    return node
                } else if ((node.items ?? []).length > 0) {
                    const found = findNodeByPath(path, node.items)
                    if (found) {
                        return found
                    }
                }
            }
            return null
        },
        [],
    )

    const findMenu = useCallback(
        (path: string) => {
            return findNodeByPath(path, menusSources)
        },
        [findNodeByPath, menusSources],
    )

    const findNodeById = useCallback(
        (id: string, menus: MenuItemProps[] = []): MenuItemProps | null => {
            for (const node of menus) {
                if (node.id === id) {
                    return node
                } else if ((node.items ?? []).length > 0) {
                    const found = findNodeById(id, node.items)
                    if (found) {
                        return found
                    }
                }
            }
            return null
        },
        [],
    )
    const findMenuById = useCallback(
        (id: string) => {
            return findNodeById(id, menusSources)
        },
        [findNodeById, menusSources],
    )

    const findRouteTree = useCallback(
        (
            path: string,
            routes: MenuItemProps[] = [],
            paths: MenuItemProps[] = [],
        ): MenuItemProps[] | undefined => {
            for (const it of routes) {
                const items = [...paths, it]
                if (`${it.path}`.toLowerCase() === path.toLowerCase()) {
                    return items
                } else if ((it.items ?? []).length > 0) {
                    const found = findRouteTree(path, it.items, items)
                    if (found) {
                        return found
                    }
                }
            }
            return undefined
        },
        [],
    )

    const findRoutePaths = useCallback(
        (path: string): MenuItemProps[] => {
            return findRouteTree(path, menusSources) ?? []
        },
        [findRouteTree, menusSources],
    )

    const getDescendants = useCallback(
        (node: MenuItemProps, descendants: MenuItemProps[] = []): MenuItemProps[] => {
            if (node.items) {
                for (const child of node.items) {
                    descendants.push(child)
                    getDescendants(child, descendants)
                }
            }
            return descendants
        },
        [],
    )

    const findMenuDescendants = useCallback(
        (path: string): MenuItemProps[] => {
            const route = findMenu(path)
            console.log(route)
            if (route) {
                return getDescendants(route).filter((it) => (it.items ?? []).length === 0)
            } else {
                return []
            }
        },
        [findMenu, getDescendants],
    )

    useEffect(() => {
        const { menus, routers, groupIds } = generateMenuTree({
            routeMenus: RouterMenus,
        })
        setGroupIds(groupIds)
        setMenusSources(menus)
        setRoutersSources(routers)
    }, [generateMenuTree])

    return {
        groupIds,
        findMenu,
        findRoute,
        findMenuById,
        findRoutePaths,
        findMenuDescendants,
        menus: menusSources,
        routers: routersSources,
    }
}
