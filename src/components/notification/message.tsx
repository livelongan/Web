import { observer } from 'mobx-react-lite'
import { PropsWithChildren, useMemo } from 'react'
import { styled } from 'styled-components'
import { Notification, NotificationProps } from '@progress/kendo-react-notification'
import { SvgIcon } from '@progress/kendo-react-common'
import { iconSuccess, iconMessage, iconError, iconWarning } from '../icons'

const Root = styled(Notification)`
    .k-notification-content {
        display: flex;
        align-items: center;
    }
    .message-icon {
        width: 24px;
        height: 24px;
        align-items: normal;
        margin-right: 8px;
        align-self: baseline;
    }
`

type IProps = PropsWithChildren<NotificationProps>
export const Message = observer<IProps>(({ children, type = {}, ...others }) => {
    const style = type?.style ?? 'none'
    const svgIcon = useMemo(() => {
        if (style === 'info') {
            return iconMessage
        } else if (style === 'success') {
            return iconSuccess
        } else if (style === 'error') {
            return iconError
        } else if (style === 'warning') {
            return iconWarning
        }
        return null
    }, [style])
    return (
        <Root closable {...others} type={{ style, icon: false }}>
            {svgIcon && <SvgIcon className="message-icon" icon={svgIcon} />}
            <div>{children}</div>
        </Root>
    )
})
