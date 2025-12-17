import { DrawerItemProps } from '@progress/kendo-react-layout'
import { SVGIcon } from '@progress/kendo-svg-icons'
import { ReactNode } from 'react'

export type RouteItemProps = DrawerItemProps & {
    path?: string
    access?: boolean
    hidden?: boolean
    separator?: boolean
    component?: ReactNode
    expanded?: boolean
    items?: RouteItemProps[]
}

export type MenuItemProps = Omit<RouteItemProps, 'items'> & {
    id: string
    path: string
    text: string
    parentId?: string
    items?: MenuItemProps[]
    svgIcon?: SVGIcon
}
