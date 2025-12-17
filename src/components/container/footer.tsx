import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'

import { styled } from 'styled-components'

const Root = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--kendo-color-base);
    height: 24px;
    color: var(--kendo-color-on-app-surface);
    font-size: 12px;
`

type IProps = PropsWithChildren<object>

export const Footer = observer<IProps>(() => {
    return <Root>react | typescript | mobx-state-tree</Root>
})
