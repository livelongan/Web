import { Box, Stack, styled, type StackProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'

type LoadingProps = PropsWithChildren<StackProps>

const Root = styled(Stack)`
  --loading-size: 28px;
  --border-size: 2px;
  .ring-loader {
    width: var(--loading-size);
    height: var(--loading-size);
    border-radius: 50%;
    display: inline-block;
    border-top: var(--border-size) solid var(--primary-color);
    border-right: var(--border-size) solid transparent;
    animation: rotation 1s linear infinite;
  }

  .ring-loader::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: var(--loading-size);
    height: var(--loading-size);
    border-radius: 50%;
    border-bottom: var(--border-size) solid var(--secondary-color);
    border-left: var(--border-size) solid transparent;
  }

  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

export const LoadingIcon = observer(
  ({ className = '', sx, children, ...others }: LoadingProps) => {
    return (
      <Root
        className={`loading ${className}`.trim()}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          background: 'var(--background-secondary)',
          position: 'relative',
          width: '100%',
          height: '50px',
          ...sx,
        }}
        {...others}
      >
        <Box className={'ring-loader'} />
        {children}
      </Root>
    )
  },
)
