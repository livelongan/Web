import { Suspense, useCallback, useEffect, useMemo, useState } from 'react'
import { ROUTES } from '../config'
import type { MenuProps, RouterProps } from '../types'
import type { RouteObject } from 'react-router-dom'
import { ErrorCatcher, RootPage } from '../../pages'
import { LayoutMain, Loading, LoadingMain } from '../../components'

const lazyLoader = (route: RouterProps) => async () => {
  try {
    const module = await import(/* @vite-ignore */ `../../pages/${route.url}`)
    const Component = module[route.name] || module.default
    return {
      Component: () => {
        return (
          <LayoutMain data-id={`${route.name}`}>
            <Suspense fallback={<Loading />}>
              <Component />
            </Suspense>
          </LayoutMain>
        )
      },
    }
  } catch (error) {
    console.error(`Failed to load page for route: ${route.path}`, error)
    throw error
  }
}

type NodeProps = {
  isMenu: boolean
  parentId?: string
  parentPath?: string
}
export const useAppRouter = () => {
  const [dependence] = useState({
    initial: false,
  })
  const [menus, setMenus] = useState<MenuProps[]>([])
  const [routers, setRouters] = useState<RouterProps[]>([])

  const loader = async (route: RouterProps) => {
    const copy = { ...route }
    delete copy.children
    return { route: copy, data: null }
  }

  const browserRouter: RouteObject[] = useMemo(() => {
    const sources = [
      {
        path: '/',
        Component: RootPage,
        errorElement: <ErrorCatcher />,
        children: routers.map((it) => {
          const pageRoute: RouteObject = {
            index: it.index,
            loader: () => loader({ ...it }),
            errorElement: <ErrorCatcher />,
            lazy: lazyLoader(it),
            HydrateFallback: LoadingMain,
          }
          if (!it.index) {
            pageRoute.path = it.path
            if (it.children) {
              pageRoute.children = it.children.map((child) => ({
                path: child.path,
                loader: () => loader({ ...child }),
                errorElement: <ErrorCatcher />,
                lazy: lazyLoader(child),
                HydrateFallback: LoadingMain,
              }))
            }
          }
          return pageRoute
        }),
      },
    ]
    return sources
  }, [routers])

  const generateRouter = useCallback(
    (
      router: RouterProps,
      index: number,
      params: NodeProps,
      routerData: RouterProps[] = [],
    ) => {
      const parentId = params.parentId
      const id = `${parentId ? `${parentId}-` : ''}${index + 1}`
      let children: MenuProps[] | undefined = undefined
      if (router.children) {
        children = router.children.map((it, inx) =>
          generateRouter(
            it,
            inx,
            {
              isMenu: params.isMenu,
              parentId: id,
              parentPath: router.path,
            },
            routerData,
          ),
        )
      }
      let path = `${!router.index && params.isMenu ? '/' : ''}${router.path}`
      if (!router.index && params.isMenu && params.parentPath) {
        path = `${params.parentPath}/${router.path}`
      }
      const node: MenuProps = {
        ...router,
        id,
        path,
        children,
      }
      const childHidden = children?.filter((it) => it.showInMenu !== false)
      if (childHidden) {
        node.showInMenu = false
      } else {
        node.showInMenu = router.showInMenu !== false ? true : false
      }

      routerData.push({ ...node })
      return node
    },
    [],
  )

  const handleRouters = useCallback(
    (routes: RouterProps[]) => {
      const sources: RouterProps[] = []
      const routerData: RouterProps[] = []
      const menuData: MenuProps[] = []
      routes.forEach((route, index) => {
        menuData.push(generateRouter(route, index, { isMenu: true }, sources))
        routerData.push(
          generateRouter(route, index, { isMenu: false }, sources),
        )
      })
      console.log(menuData, routerData)
      setMenus(menuData)
      setRouters(routerData)
    },
    [generateRouter],
  )
  useEffect(() => {
    if (!dependence.initial) {
      dependence.initial = true
      handleRouters(ROUTES)
    }
  }, [dependence, handleRouters, menus])

  return {
    menus,
    routers,
    browserRouter,
  }
}
