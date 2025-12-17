import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { TabStripTab, TabStripTabProps } from '@progress/kendo-react-layout'

const Root = styled(TabStripTab)`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

type IProps = PropsWithChildren<TabStripTabProps>
export const TabItem = observer<IProps>(({ children, ...others }) => {
    return <Root {...others}>{children}</Root>
})
