import { useMediaQuery, useTheme } from '@mui/material'

export const useScreenQuery = () => {
  const theme = useTheme()

  const isPhone = useMediaQuery(theme.breakpoints.down('sm'))

  const isPad = useMediaQuery(theme.breakpoints.between('sm', 'lg'))

  const isDesktop = useMediaQuery(theme.breakpoints.up('lg'))

  const isMiddle = useMediaQuery(theme.breakpoints.up('md'))

  const viewHeight = window.innerHeight ?? document.documentElement.clientHeight

  const viewWidth = window.innerHeight ?? document.documentElement.clientHeight

  return {
    isPhone,
    isPad,
    isDesktop,
    isMiddle,

    viewWidth,
    viewHeight,

    pagePaddingX: isPad ? 50 : 18,
    pagePaddingY: isPad ? 20 : 18,
  }
}
