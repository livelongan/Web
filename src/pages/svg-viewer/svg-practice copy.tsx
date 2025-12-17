import { observer } from 'mobx-react-lite'
import { PageLayout, SVG } from '../../components'
const pageName = 'svg-practice'
export const SvgPractice = observer(() => {
    return (
        <PageLayout id={pageName}>
            <SVG>
                <symbol id="symbol" width="100" height="120" viewBox="0 0 100 120">
                    {/* 5,10 0.8,9.5 5,9.8 0.5,7.5 5,9.6 0.5 6.5 */}
                    <g stroke="none" strokeWidth={1}>
                        <path d="" />
                    </g>
                </symbol>
                <use href="#symbol" />
            </SVG>
        </PageLayout>
    )
})
