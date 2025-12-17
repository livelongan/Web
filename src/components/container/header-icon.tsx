import { ButtonProps } from '@progress/kendo-react-buttons'
import { observer } from 'mobx-react-lite'
import { styled } from 'styled-components'
import { iconMenuCollapsed, iconMenuExpanded } from '../icons'
import { useStores } from '../../stores'
import { IconButton } from '../button'

const Root = styled('div')`
    display: flex;
    justify-content: center;
    align-items: center;
`

type IProps = ButtonProps & {
    width?: number
    height?: number
}

export const HeaderIcon = observer<IProps>(({ width = 40, height = 40, ...others }) => {
    const { baseStore } = useStores()
    return (
        <Root
            style={{
                width,
                height,
            }}
        >
            <IconButton
                {...others}
                fillMode={'clear'}
                svgIcon={baseStore.menu.collapse ? iconMenuCollapsed : iconMenuExpanded}
                label={'Toggle collapse menu'}
                style={{
                    color: 'var(--color-theme-on-surface)',
                }}
            />
        </Root>
    )
})
