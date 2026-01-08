import { AppBar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { FOOTER_CLASS } from '../../../config/constant'
import { useScreenQuery } from '../../../hooks'
import { TextSmall } from '../../../components'
import dayjs from 'dayjs'

export const AppFooter = observer(() => {
  const { pagePaddingX, isPad, isPhone, isDesktop } = useScreenQuery()

  return (
    <AppBar
      color='secondary'
      className={FOOTER_CLASS}
      // position="sticky"
      position='static'
      component={'footer'}
      sx={{
        top: 'auto',
        bottom: 0,
        height: '24px',
        justifyContent: 'center',
        px: `${pagePaddingX}px`,
        WebkitPosition: 'sticky',
        boxShadow: 'none',
        backgroundColor: 'var(--background-footer)',
        display: 'flex',
        flexDirection: 'row',
        gap: '1rem',
      }}
    >
      <TextSmall>
        {isPhone ? 'Phone' : ''}
        {isPad ? 'Pad' : ''}
        {isDesktop ? 'Desktop' : ''}
      </TextSmall>
      <TextSmall>{new Date().getFullYear()} © APP - 4.0.0</TextSmall>
      <TextSmall>{dayjs().format('HH:mm')}</TextSmall>
    </AppBar>
  )
})
