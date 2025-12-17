import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { TabStrip, TabStripProps } from '@progress/kendo-react-layout'

const Root = styled(TabStrip)`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`

type IProps = PropsWithChildren<
    TabStripProps & {
        id?: string
    }
>
export const Tab = observer<IProps>(({ id, className = '', children, ...others }) => {
    return (
        <Root id={id} animation={false} {...others} className={`tab ${className}`.trim()}>
            {children}
        </Root>
    )
})
