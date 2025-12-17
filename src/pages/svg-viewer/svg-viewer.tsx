import { observer } from 'mobx-react-lite'
import { PageLayout, Tab, TabItem } from '../../components'
import { useState } from 'react'
import { Curve } from './draw'
import { TabStripSelectEventArguments } from '@progress/kendo-react-layout'
import { CherryBlossom } from './cherry-blossom'
import { SvgPattern } from './pattern'
import { SvgPractice } from './svg-practice'
import { BezierCurve } from './bezier-curve'
import { Painting } from './painting'
import { Temp } from './temp'

const pageName = 'svg-viewer'
export const SvgViewer = observer(() => {
    const [selected, setSelected] = useState<number>(0)

    const handleSelect = (event: TabStripSelectEventArguments) => {
        setSelected(event.selected)
    }

    return (
        <PageLayout id={pageName}>
            <Tab selected={selected} onSelect={handleSelect}>
                <TabItem title="Temp">
                    <Temp />
                </TabItem>
                <TabItem title="Code">
                    <SvgPractice />
                </TabItem>
                <TabItem title="Painting">
                    <Painting />
                </TabItem>
                <TabItem title="Bézier curve">
                    <BezierCurve />
                </TabItem>
                <TabItem title="Practice">
                    <Curve />
                </TabItem>
                <TabItem title="Cherry Blossom">
                    <CherryBlossom />
                </TabItem>
                <TabItem title="Svg Pattern">
                    <SvgPattern />
                </TabItem>
            </Tab>
        </PageLayout>
    )
})
