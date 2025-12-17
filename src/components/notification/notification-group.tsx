import { observer } from 'mobx-react-lite'
import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import {
    NotificationDto,
    NotificationGroupHandle,
    NotificationProps,
    OpenDialogDto,
    OpenDialogProps,
} from './types'
import { useStores } from '../../stores'
import { uniqueId } from 'lodash'
import { NotificationGroup } from '@progress/kendo-react-notification'
import { Expand } from '@progress/kendo-react-animation'
import { styled } from 'styled-components'
import { Dialog as KendoDialog, DialogActionsBar } from '@progress/kendo-react-dialogs'
import { BaseButton } from '../button'
import {
    GAP,
    NOTIFICATION_MAX_HEIGHT,
    NOTIFICATION_MAX_WIDTH,
    NOTIFICATION_TIME,
} from '../../constants'
import { DialogModalCss } from '../../theme'
import { Message } from './message'

const Root = styled(NotificationGroup)`
    max-width: ${NOTIFICATION_MAX_WIDTH};
    max-height: ${NOTIFICATION_MAX_HEIGHT};
    margin: 80px 30px;
`

const DialogContent = styled.div`
    line-height: 2;
    word-break: break-word;
    padding: ${GAP.large}px;
    padding-right: ${GAP.large / 2}px;
`
const Dialog = styled(KendoDialog)`
    margin-top: -50px;
    ${DialogModalCss}
    .k-dialog-content {
        overflow: hidden;
        overflow-y: overlay;
        max-height: 400px;
        min-height: 40px;
        max-width: 600px;
        min-width: 300px;
        margin-right: ${GAP.large / 2}px;
    }
`
let groupRef: React.MutableRefObject<NotificationGroupHandle> | null = null

export const Snackbar = observer(
    forwardRef<NotificationGroupHandle, object>((props, ref) => {
        const notifyRef = useRef(null)
        const errorRef = useRef(null)
        const [dialogs, setDialogs] = useState<OpenDialogDto[]>([])
        const timeout = useRef<NodeJS.Timeout>()
        const { baseStore } = useStores()

        const handleCloseNotification = (dto: NotificationDto) => {
            baseStore.delNotifications(dto.id)
        }

        const handleCloseDialog = (dto: OpenDialogDto) => {
            const data = [...dialogs]
            const has = dialogs.findIndex((it) => it.id === dto.id)
            if (has >= 0) {
                data.splice(has, 1)
            }
            setDialogs(data)
        }

        useEffect(() => {
            if (ref && notifyRef) {
                groupRef = ref as React.MutableRefObject<NotificationGroupHandle>
            }
            return () => {
                groupRef = null
            }
        }, [ref, notifyRef])

        useImperativeHandle(ref, () => {
            return {
                notification: (item: NotificationProps) => {
                    const dto = { ...item, id: uniqueId('notify') } as NotificationDto
                    baseStore.addNotifications(dto)
                    clearTimeout(timeout.current)
                    timeout.current = setTimeout(() => {
                        baseStore.delNotifications(dto.id)
                        clearTimeout(timeout.current)
                    }, NOTIFICATION_TIME)
                },
                openDialog: (item: OpenDialogProps) => {
                    const data = [...dialogs]
                    data.push({ ...item, id: `dialog-${dialogs.length + 1}` })
                    setDialogs(data)
                },
            }
        }, [baseStore, dialogs, timeout])

        return (
            <Root
                ref={errorRef}
                style={{
                    right: 0,
                    bottom: 0,
                    alignItems: 'flex-start',
                    flexWrap: 'wrap-reverse',
                    display:
                        dialogs.length > 0 || baseStore.notifications.length > 0 ? 'flex' : 'none',
                }}
            >
                <Expand className="notification-wrapper">
                    {baseStore.notifications.map((it) => (
                        <Message
                            key={it.id}
                            closable
                            onClose={() => handleCloseNotification(it)}
                            type={{ style: it.type, icon: false }}
                        >
                            {it.message}
                        </Message>
                    ))}
                </Expand>
                {dialogs.map((it) => (
                    <Dialog
                        {...it}
                        key={it.id}
                        id={it.id}
                        overlayStyle={{
                            background: 'var(--color-overlay)',
                        }}
                        onClose={() => {
                            handleCloseDialog(it)
                        }}
                    >
                        <DialogContent>{it.content}</DialogContent>
                        <DialogActionsBar layout="end">
                            <BaseButton
                                mode={'confirm'}
                                onClick={() => {
                                    handleCloseDialog(it)
                                }}
                            />
                            <BaseButton
                                mode={'cancel'}
                                onClick={() => {
                                    handleCloseDialog(it)
                                }}
                            />
                        </DialogActionsBar>
                    </Dialog>
                ))}
            </Root>
        )
    }),
)

export const notification = (dto: NotificationProps) => {
    if (groupRef?.current) {
        groupRef.current.notification({ ...dto })
    }
}

export const openDialog = (dto: OpenDialogProps) => {
    if (groupRef?.current) {
        groupRef.current.openDialog({ ...dto })
    }
}
