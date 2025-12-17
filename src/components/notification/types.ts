import { DialogProps } from '@progress/kendo-react-dialogs'
import { ReactNode } from 'react'

export type NotificationProps = {
    title?: string
    closable?: boolean
    message?: JSX.Element | string
    type: 'success' | 'error' | 'warning' | 'info'
    error?: {
        url?: string
        title?: string
        message?: string
    }
}
export type NotificationDto = NotificationProps & {
    id: string
}

export type OpenDialogProps = DialogProps & {
    content: string | ReactNode
}

export type OpenDialogDto = OpenDialogProps & {
    id: string
}

export type NotificationGroupHandle = {
    notification(message: NotificationProps): void
    openDialog(item: OpenDialogProps): void
}
