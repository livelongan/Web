import { Stack, type StackProps } from '@mui/material'
import { observer } from 'mobx-react-lite'

type LayoutPageProps = StackProps & {}

export const LayoutPage = observer(
  ({ children, className = '', sx, ...others }: LayoutPageProps) => {
    return (
      <Stack
        className={`layout-page ${className}`.trim()}
        sx={{ minHeight: '100%', ...sx }}
        {...others}
      >
        {children}
      </Stack>
    )
  },
)
