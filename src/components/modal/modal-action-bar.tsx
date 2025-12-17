import { WindowActionsBar } from '@progress/kendo-react-dialogs'
import { PropsWithChildren } from 'react'

export const ModalActionBar = ({ children }: PropsWithChildren) => {
    return <WindowActionsBar layout="end">{children}</WindowActionsBar>
}
