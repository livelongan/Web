import { Box, styled } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { CSSProperties } from 'react'

type LoadingTextProps = {
  className?: string
  text?: string
  sx?: CSSProperties
  fontSize?: number
  duration?: number
  color?: string
  stroke?: string
  fill?: string
}

const SvgRoot = styled('svg')`
  font-family: cursive, sans-serif;
  @keyframes stroke {
    0% {
      fill: rgba(161, 107, 204, 0);
      stroke: currentColor;
      stroke-dashoffset: 25%;
      stroke-dasharray: 0 50%;
      stroke-width: 1;
    }
    70% {
      fill: rgba(161, 107, 204, 0);
      stroke: currentColor;
    }
    80% {
      fill: rgba(161, 107, 204, 0);
      stroke: currentColor;
      stroke-width: 2;
    }
    100% {
      fill: inherit;
      stroke: currentColor;
      stroke-dashoffset: -25%;
      stroke-dasharray: 50% 0;
      stroke-width: 0;
    }
  }
`

export const LoadingText = observer(
  ({
    text = 'Loading',
    className,
    sx,
    fontSize = 31,
    duration = 5,
    color,
    stroke,
    fill = 'green',
  }: LoadingTextProps) => {
    return (
      <Box className={'loading-text'} sx={{ display: 'inline-block' }}>
        <SvgRoot
          className={className}
          style={{
            ...sx,
            color: stroke,
            fill,
            fontSize: `${fontSize}px`,
            width: `${text.length * 0.75}em`,
            height: '1.4em',
          }}
        >
          <text
            x='50%'
            y='50%'
            dy='.35em'
            textAnchor='middle'
            // text-anchor="middle"
            style={{
              animation: `stroke ${duration}s infinite alternate`,
              strokeWidth: 1,
              stroke: color ?? stroke,
              fontSize: 'inherit',
              userSelect: 'none',
            }}
          >
            {text}
          </text>
        </SvgRoot>
      </Box>
    )
  },
)
