import { Link, type LinkProps } from '@mui/material'
import { observer } from 'mobx-react-lite'
import type { PropsWithChildren } from 'react'

type LinkNormalProps = PropsWithChildren<LinkProps>

export const LinkNormal = observer(
  ({ className = '', children, ...others }: LinkNormalProps) => {
    return (
      <Link className={`link-normal ${className}`.trim()} {...others}>
        {children}
      </Link>
    )
  },
)
