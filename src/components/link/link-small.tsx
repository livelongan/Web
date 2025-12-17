import { Link, type LinkProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'

type LinkSmallProps = PropsWithChildren<LinkProps>

export const LinkSmall = observer(
  ({ className = '', children, ...others }: LinkSmallProps) => {
    return (
      <Link className={`link-small ${className}`.trim()} {...others}>
        {children}
      </Link>
    )
  },
)
