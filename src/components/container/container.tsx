import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { Header } from './header'
import { DrawerMenu } from '../drawer-menu'
import { styled } from 'styled-components'
import { PAGE_CONTAINER } from '../../constants'
import { Footer } from './footer'

const Root = styled('div')`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

type IProps = PropsWithChildren<object>
export const Container = observer<IProps>(({ children }) => {
    return (
        <Root id={PAGE_CONTAINER}>
            <Header />
            <DrawerMenu>{children}</DrawerMenu>
            <Footer />
        </Root>
    )
})
