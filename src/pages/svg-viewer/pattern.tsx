import { observer } from 'mobx-react-lite'
import { PageLayout, SVG } from '../../components'
import { useEffect, useState } from 'react'
import { useSVGRenderer } from './svg-renderer'
import { SVGICON } from './paths'

const pageName = 'svg-pattern'

export const SvgPattern = observer(() => {
    const [dependence] = useState({
        appended: false,
    })
    const { addSVGPattern } = useSVGRenderer({ id: 'svg' })

    useEffect(() => {
        if (!dependence.appended) {
            dependence.appended = true
            addSVGPattern({
                ele: SVGICON.flower1,
                stroke: '#1f2d3a',
                fill: '#fab280',
                scale: 4,
            })
        }
    }, [addSVGPattern, dependence])

    return (
        <PageLayout id={pageName}>
            <SVG id={'svg'}>
                <defs />
                <rect x="0" y="0" width="100%" height="100%" fill="url(#flower1)" />
            </SVG>
        </PageLayout>
    )
})
