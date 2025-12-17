import { Box, Stack, Divider, styled } from '@mui/material'
import { observer } from 'mobx-react-lite'

const Root = styled(Box)`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  .MuiStack-root {
    position: absolute;
    width: 100%;
    height: 100%;
    justify-content: space-evenly;
  }
`
export const GridLine = observer(() => {
  const counts = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]
  return (
    <Root>
      <Stack gap={0}>
        {counts.map((count) => (
          <Divider
            key={count}
            sx={{
              borderColor: count !== 8 ? 'var(--border-color)' : '#ff3f3f',
            }}
          />
        ))}
      </Stack>
      <Stack gap={0} flexDirection={'row'}>
        {counts.map((count) => (
          <Divider
            key={count}
            orientation='vertical'
            sx={{
              borderColor: count !== 8 ? 'var(--border-color)' : '#ff3f3f',
            }}
          />
        ))}
      </Stack>
    </Root>
  )
})
