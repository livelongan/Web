import { Box, type BoxProps } from '@mui/material'
import { observer } from 'mobx-react-lite'

type LayoutGridProps = BoxProps & {}

export const LayoutGrid = observer(
  ({ children, className = '', ...others }: LayoutGridProps) => {
    return (
      <Box
        className={`layout-grid ${className}`.trim()}
        gridTemplateColumns={'repeat(auto-fill, minmax(min(228px, 100%), 1fr))'}
        sx={{
          display: 'grid',
          gap: '16px',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gridAutoRows: 'min-content' /*height*/,
        }}
        {...others}
      >
        {children}
      </Box>
    )
  },
)
