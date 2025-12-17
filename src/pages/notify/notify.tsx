import { observer } from 'mobx-react-lite'
import { NotificationGroup } from '@progress/kendo-react-notification'
import { Message, PageLayout } from '../../components'

const position = {
    topLeft: { top: 0, left: 0, alignItems: 'flex-start' },
    topCenter: { top: 200, left: '50%', transform: 'translateX(-50%)' },
    topRight: { top: 0, right: 0, alignItems: 'flex-end' },
    bottomLeft: { bottom: 0, left: 0, alignItems: 'flex-start' },
    bottomCenter: { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
    bottomRight: { bottom: 0, right: 0, alignItems: 'flex-end' },
}

export const Notify = observer(() => {
    const content = <span>Your data has been saved.</span>
    const notifications = [
        <Message key="success" type={{ style: 'success', icon: true }} closable>
            {content}
        </Message>,
        <Message key="info" type={{ style: 'info', icon: true }} closable>
            {content}
        </Message>,
        <Message key="error" type={{ style: 'error', icon: true }} closable>
            {content}
        </Message>,
        <Message key="warning" type={{ style: 'warning', icon: true }} closable>
            {content}
        </Message>,
    ]

    return (
        <PageLayout>
            <NotificationGroup style={position.topCenter}>{notifications}</NotificationGroup>
        </PageLayout>
    )
})
