import { observer } from 'mobx-react-lite'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Authorization, NotFound } from '../pages'
import { useRoutes } from './use-routes'
import { Suspense, useEffect } from 'react'
import { useStores } from '../stores'
import { Loading } from '../components'
import { RouteLoading } from './route-loading'

export const MainRouter = observer(() => {
    const location = useLocation()
    const navigate = useNavigate()
    const { routers, findRoute, findRoutePaths } = useRoutes()
    const { baseStore } = useStores()

    useEffect(() => {
        if (location && routers.length > 0) {
            const pathname = location?.pathname ?? '/'
            const route = findRoute(pathname)
            const paths = findRoutePaths(pathname)

            if (route) {
                baseStore.setMenuRoutePaths(paths)
                baseStore.setMenuRoute(route)
            } else {
                navigate('/404', { replace: true })
            }
        }
    }, [baseStore, findRoute, findRoutePaths, location, navigate, routers.length])

    return (
        <Suspense fallback={<Loading />}>
            <Routes>
                {routers.map((it) => {
                    if (it.component && it.path) {
                        return <Route key={it.id} path={it.path} element={it.component} />
                    } else {
                        return null
                    }
                })}
                <Route key="authorization" path="/401" element={<Authorization />} />
                <Route key="notFound" path="/404" element={<NotFound />} />
                <Route key="routeLoading" path="*" element={<RouteLoading />} />
            </Routes>
        </Suspense>
    )
})
