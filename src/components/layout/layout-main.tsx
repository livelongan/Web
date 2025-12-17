import { Stack, type StackProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useScreenQuery } from '../../hooks'
import { OUTLET_CONTENT_CLASS } from '../../config'

type LayoutPageProps = StackProps & {}

export const LayoutMain = observer(
  ({ children, className = '', ...others }: LayoutPageProps) => {
    const { pagePaddingX, pagePaddingY } = useScreenQuery()
    return (
      <Stack
        width={'100%'}
        component={'main'}
        gap={0}
        sx={{
          minHeight: 'calc(100% - 25px)',
          padding: `${pagePaddingY}px ${pagePaddingX}px`,
        }}
        className={`${OUTLET_CONTENT_CLASS} ${className}`.trim()}
        {...others}
      >
        {children}
      </Stack>
    )
  },
)
