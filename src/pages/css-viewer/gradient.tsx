import { observer } from 'mobx-react-lite'
import { PageLayout } from '../../components'
import { styled } from 'styled-components'
import './styles.css'

const Root = styled.div`
    display: flex;
    gap: 20px;
    flex-flow: wrap;
    width: 100%;
    height: 100%;
`
const Square = styled.div`
    width: 150px;
    height: 150px;
`

export const Gradient = observer(() => {
    return (
        <PageLayout>
            <Root>
                {[
                    'madras',
                    'cloud',
                    'tartan',
                    'weave',
                    'weave-square',
                    'cross-dots',
                    'arrows',
                    'zip',
                    'argyle',
                    'brady',
                    'xian',
                    'shippo',
                    'stripes',
                    'brick',
                    'carbon',
                    'blue-print',
                    'honey',
                ].map((it) => (
                    <Square className={it} key={it} />
                ))}
            </Root>
        </PageLayout>
    )
})
