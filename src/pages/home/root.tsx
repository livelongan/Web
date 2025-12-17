import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { Outlet } from 'react-router-dom'
import { AppHeader, AppFooter, AppMenu } from './common'
import { PAGE_CONTENT_CLASS, ROOT_CLASS } from '../../config/constant'
import { AppPalette } from './common/app-palette'

export const RootPage = observer(() => {
  return (
    <Stack
      gap={0}
      width={'100%'}
      className={ROOT_CLASS}
      sx={{
        backgroundColor: 'var(--background-primary)',
        minHeight: '100vh',
      }}
    >
      <AppHeader />
      <Stack
        width={'100%'}
        gap={0}
        flex={1}
        className={PAGE_CONTENT_CLASS}
        flexDirection={'row'}
        sx={{
          minHeight: '100%',
          backgroundColor: 'var(--background-secondary)',
        }}
      >
        <AppMenu />
        <Stack
          width={'100%'}
          className='page'
          gap={0}
          sx={{ flex: 1, minHeight: '100%' }}
        >
          <Outlet />
          <AppFooter />
        </Stack>
        <AppPalette />
      </Stack>
    </Stack>
  )
})
