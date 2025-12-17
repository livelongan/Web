import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { GAP } from '../../constants'

const Root = styled('div')`
    display: flex;
    gap: ${GAP.large}px;
    margin-bottom: ${GAP.middle}px;
`

export type ButtonGroupProps = PropsWithChildren<object>

export const ButtonLayout = observer<ButtonGroupProps>(({ children }) => {
    return <Root className="button-layout">{children}</Root>
})
