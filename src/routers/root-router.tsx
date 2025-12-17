import { observer } from 'mobx-react-lite'
import { BrowserRouter } from 'react-router-dom'
import { env } from '../utils'
import { Container } from '../components'
import { MainRouter } from './main-router'

export const RootRouter = observer(() => {
    return (
        <BrowserRouter
            future={{
                ['v7_startTransition']: true,
                ['v7_relativeSplatPath']: true,
            }}
            basename={env.basePath}
        >
            <Container>
                <MainRouter />
            </Container>
        </BrowserRouter>
    )
})
