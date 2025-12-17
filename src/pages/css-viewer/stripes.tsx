import { observer } from 'mobx-react-lite'
import { PageLayout } from '../../components'
import { styled } from 'styled-components'
import './styles.css'
import { svgBackground, SVGICON } from '../svg-viewer'

const black = 'rgba(0,0,0,0.6)'
const white = 'hsl(100 100% 100% / 0.7)'
const red = 'hsl(0 100% 50% / 0.4)'
const bg = 'hsl(34 80% 88% / 0.6)'
const bg2 = 'hsl(100 100% 100% / 0.4)'
const Root = styled.div`
    display: flex;
    gap: 20px;
    flex-flow: wrap;
    width: 100%;
    height: 100%;
    background-color: ${bg};

    background-image: repeating-linear-gradient(
            135deg,
            transparent 24.5%,
            ${red} 24.5% 25.5%,
            transparent 25.5% 49.5%
        ),
        repeating-linear-gradient(
            45deg,
            transparent 0 9.75%,
            ${white} 9.75% 11%,
            transparent 11% 14%,
            ${white} 14% 15.25%,
            transparent 15.25% 25%
        ),
        repeating-linear-gradient(
            135deg,
            transparent 0 9.75%,
            ${white} 9.75% 11%,
            transparent 11% 14%,
            ${white} 14% 15.25%,
            transparent 15.25% 25%
        ),
        repeating-linear-gradient(
            45deg,
            transparent 24.5%,
            ${red} 24.5% 25.5%,
            transparent 25.5% 49.5%
        ),
        repeating-linear-gradient(0deg, ${bg2} 0 2px, transparent 2px 4px),
        repeating-linear-gradient(
            45deg,
            transparent 0 6.75%,
            ${black} 6.75% 9.75%,
            transparent 9.75% 11%,
            ${black} 11% 14%,
            transparent 14% 15.25%,
            ${black} 15.25% 18.25%,
            transparent 18.25% 25%
        ),
        repeating-linear-gradient(
            135deg,
            transparent 0 6.75%,
            ${black} 6.75% 9.75%,
            transparent 9.75% 11%,
            ${black} 11% 14%,
            transparent 14% 15.25%,
            ${black} 15.25% 18.25%,
            transparent 18.25% 25%
        ),
        ${svgBackground(SVGICON.arrowUp, 'hsl(34 42% 47.24%, 1)')};
    &:before {
        content: ' ';
        display: block;
        width: 100%;
        height: 100%;
        background-size: 20px 20px;
        background-repeat: repeat;
        background-image: ${svgBackground(SVGICON.arrowUp, 'rgba(152,88,0,0.2)')};
    }
`

export const Stripes = observer(() => {
    return (
        <PageLayout>
            <Root />
        </PageLayout>
    )
})
