import { observer } from 'mobx-react-lite'
import { env } from '../env'
import { Suspense, useEffect, useMemo } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Loading } from '../components'
import { useAppRouter } from './hooks/use-app-router'
import { useStores } from '../mobx/use-stores'
import { useScreenQuery } from '../hooks'
export const RootRouter = observer(() => {
  const { baseStore } = useStores()
  const { isDesktop } = useScreenQuery()
  const { menus, browserRouter } = useAppRouter()

  const router = useMemo(() => {
    return createBrowserRouter(browserRouter, {
      basename: env.publicUrl,
    })
  }, [browserRouter])

  useEffect(() => {
    baseStore.setOpenMenu(isDesktop)
  }, [isDesktop, baseStore])

  if (menus.length === 0) {
    return <Loading />
  }

  return (
    <Suspense fallback={<Loading />}>
      <RouterProvider router={router} />
    </Suspense>
  )
})
