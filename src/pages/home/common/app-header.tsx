import { AppBar, Stack, Toolbar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { HEADER_CLASS, HEADER_HEIGHT } from '../../../config/constant'
import { useScreenQuery } from '../../../hooks'
import { ButtonBaseIcon, TitleLevel3 } from '../../../components'
import { env } from '../../../env'
import { useStores } from '../../../mobx/use-stores'
import MenuOpen from '@mui/icons-material/MenuOpen'
import MenuClose from '@mui/icons-material/Menu'
import LightMode from '@mui/icons-material/LightMode'
import ColorLensIcon from '@mui/icons-material/ColorLens'
import DarkMode from '@mui/icons-material/DarkMode'

type AppHeaderProps = {
  inNavigation?: boolean
}
export const AppHeader = observer(({ inNavigation }: AppHeaderProps) => {
  const { baseStore } = useStores()
  const { pagePaddingX } = useScreenQuery()

  return (
    <AppBar
      color='default'
      className={HEADER_CLASS}
      position='sticky'
      sx={{
        top: 0,
        height: `${HEADER_HEIGHT}px`,
        justifyContent: 'center',
        px: `${!inNavigation ? pagePaddingX : 18}px`,
        WebkitPosition: 'sticky',
        backgroundColor: 'var(--background-header)',
      }}
    >
      <Toolbar variant='dense' sx={{ gap: '8px', alignItems: 'center' }}>
        <Stack flex={1} flexDirection='row' alignItems={'center'}>
          <ButtonBaseIcon
            title='Toggle Menu'
            onClick={() => baseStore.setOpenMenu(!baseStore.openMenu)}
          >
            {baseStore.openMenu ? <MenuOpen /> : <MenuClose />}
          </ButtonBaseIcon>
          <TitleLevel3>{env.projectName}</TitleLevel3>

          {!inNavigation && <TitleLevel3>{'route.title'}</TitleLevel3>}
        </Stack>
        <ButtonBaseIcon
          title='Setting Palette'
          onClick={() => baseStore.setOpenPalette(!baseStore.openPalette)}
        >
          <ColorLensIcon />
        </ButtonBaseIcon>
        <ButtonBaseIcon
          title='Theme Mode'
          onClick={() => {
            baseStore.setThemeMode(
              baseStore.themeMode === 'light' ? 'dark' : 'light',
            )
          }}
        >
          {baseStore.themeMode !== 'light' ? <LightMode /> : <DarkMode />}
        </ButtonBaseIcon>
      </Toolbar>
    </AppBar>
  )
})
