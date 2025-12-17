import { observer } from 'mobx-react-lite'
import { Loading, PageLayout, Tab, TabItem } from '../../components'
import { useState } from 'react'
import { TabStripSelectEventArguments } from '@progress/kendo-react-layout'
import { Gradient } from './gradient'
import { Stripes } from './stripes'
import { Palette } from './palette'
import { Typographies } from './typographies'

const pageName = 'css-viewer'
export const CssViewer = observer(() => {
    const [selected, setSelected] = useState<number>(0)

    const handleSelect = (event: TabStripSelectEventArguments) => {
        setSelected(event.selected)
    }
    return (
        <PageLayout id={pageName}>
            <Tab selected={selected} onSelect={handleSelect}>
                <TabItem title="Loading">
                    <Loading />
                </TabItem>
                <TabItem title="Typographies">
                    <Typographies />
                </TabItem>
                <TabItem title="Palette">
                    <Palette />
                </TabItem>
                <TabItem title="Gradient">
                    <Gradient />
                </TabItem>
                <TabItem title="Stripes">
                    <Stripes />
                </TabItem>
            </Tab>
        </PageLayout>
    )
})
