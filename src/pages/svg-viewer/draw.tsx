import { observer } from 'mobx-react-lite'
import { PageLayout } from '../../components'
import { styled } from 'styled-components'
import { ListBox, ListBoxItemClickEvent } from '@progress/kendo-react-listbox'
import { SELECTED_FIELD } from '../../constants'
import { pointerIcon } from '@progress/kendo-svg-icons'
import { SvgIcon } from '@progress/kendo-react-common'
import { Canvas } from './canvas'

const Tools = styled(ListBox)`
    display: flex;
    height: 100%;
    .k-list-scroller {
        border: none;
    }
`

const pageName = 'svg-curve'

const data = [{ name: 'Add Point', svgIcon: pointerIcon, [SELECTED_FIELD]: false }]

export const Curve = observer(() => {
    const ToolItem = (props: any) => {
        const { dataItem, selected, ...others } = props
        return (
            <li {...others} key={dataItem}>
                <SvgIcon icon={dataItem.svgIcon} />
            </li>
        )
    }
    return (
        <PageLayout id={pageName} direction="row">
            <Tools
                style={{ width: 'fit-content' }}
                data={data}
                textField="name"
                selectedField={SELECTED_FIELD}
                item={ToolItem}
                onItemClick={(event: ListBoxItemClickEvent) => console.log(event)}
            />
            <Canvas />
        </PageLayout>
    )
})
