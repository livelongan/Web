import { Box, Stack, SwipeableDrawer } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { AppHeader } from './app-header'

import { useScreenQuery } from '../../../hooks'
import { Navigation } from './navigation'
import { useStores } from '../../../mobx/use-stores'
import { useState } from 'react'

export const AppMenu = observer(() => {
  const { baseStore } = useStores()
  const { isDesktop } = useScreenQuery()
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const [containerReady, setContainerReady] = useState(false)

  const setContainerRef = (node: HTMLDivElement) => {
    if (node) {
      setContainerEl(node)
      setContainerReady(true)
    }
  }

  return isDesktop ? (
    <Navigation />
  ) : (
    <Box className='drawer-menu' ref={setContainerRef}>
      <SwipeableDrawer
        open={!isDesktop && baseStore.openMenu && containerReady}
        onClose={() => baseStore.setOpenMenu(false)}
        onOpen={() => baseStore.setOpenMenu(true)}
        container={containerEl}
      >
        <Stack
          className='drawer-menu'
          gap={0}
          sx={{
            height: '100%',
            flexFlow: 'column',
            ['.app-menu']: { borderRight: 'none' },
          }}
        >
          <AppHeader inNavigation />
          <Navigation />
        </Stack>
      </SwipeableDrawer>
    </Box>
  )
})
