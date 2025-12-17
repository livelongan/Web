import {
    Window as KendoModal,
    WindowActionsEvent,
    WindowMoveEvent,
    WindowProps,
    WindowWithoutContext,
} from '@progress/kendo-react-dialogs'
import { observer } from 'mobx-react-lite'
import {
    memo,
    PropsWithChildren,
    useCallback,
    useEffect,
    useId,
    useMemo,
    useRef,
    useState,
} from 'react'
import { styled } from 'styled-components'
import { MODAL_SUFFIX, MODAL_WIDTH } from '../../constants'
import { useStores } from '../../stores'
import { DialogModalCss } from '../../theme'
import { getId } from '../../utils'
import { Button } from '@progress/kendo-react-buttons'
import { iconFullscreen, iconFullscreenExit } from '../icons'

export type ModalState = {
    stage: 'DEFAULT' | 'FULLSCREEN' | 'MINIMIZED' | string
    isDragging: boolean
    top: number
    left: number
    width: number
    height: number
    focused: boolean
    zIndex: number
}

export type StoreModalProps = {
    id: string
    modal: ModalState & {
        widthRatio: number
        heightRatio: number
        initialWidth?: number
        initialHeight?: number
        initialLeft?: number
        initialTop?: number
    }
}

export type ModalProps = PropsWithChildren<
    Partial<WindowProps> & {
        page?: string
        widthRatio?: number
        heightRatio?: number
        open?: boolean
        onClose?: () => void
    }
>

const ModalRoot = styled(KendoModal)`
    ${DialogModalCss}
`
const TOP_RATIO = 18
const OFFSET = {
    top: 50,
    left: 150,
}

export const Modal = observer<ModalProps>(
    ({
        page,
        open = true,
        widthRatio = 60,
        heightRatio = 68,
        stage,
        onClose,
        children,
        ...others
    }) => {
        const uniqueId = useId()
        const [dependence] = useState({ loaded: false })
        const id = getId(MODAL_SUFFIX, page ?? uniqueId)
        const { baseStore } = useStores()
        const modalRef = useRef<WindowWithoutContext>(null)
        const [left, setLeft] = useState<number>(
            (document.body.clientWidth - (widthRatio * document.body.clientWidth) / 100) / 2,
        )
        const [top, setTop] = useState<number>()
        const [modalStage, setModalStage] = useState<string | undefined>(
            stage,
        ) /*DEFAULT MINIMIZED FULLSCREEN*/
        const initial = useMemo(() => {
            const width = document.body.clientWidth
            const height = document.body.clientHeight
            const ratioWidth = (widthRatio * width) / 100
            const ratioHeight = (heightRatio * height) / 100
            const yHeight = (height - ratioHeight) / 2
            const maxTop = (TOP_RATIO / 100) * height

            return {
                width: ratioWidth,
                height: ratioHeight,
                top: yHeight > maxTop ? maxTop : yHeight,
                left: (width - ratioWidth) / 2,
            }
        }, [heightRatio, widthRatio])

        const unmount = useCallback(() => {
            if (dependence.loaded) {
                baseStore.delModal(id)
            }
        }, [baseStore, dependence, id])

        const handleClose = () => {
            unmount()
            if (onClose) {
                onClose()
            }
            setLeft(initial.left)
            setTop(initial.top)
        }

        const handleResize = (event: WindowMoveEvent) => {
            const modal = baseStore.findModal(id)
            if (modal) {
                baseStore.addModal(id, {
                    ...modal,
                    width: event.width,
                    height: event.height,
                    top: event.top,
                    left: event.left,
                })
            }
        }

        const handleMove = (event: WindowMoveEvent) => {
            if (event.left > document.body.clientWidth - OFFSET.left) {
                setLeft(document.body.clientWidth - OFFSET.left)
            } else {
                setLeft(event.left)
            }

            if (event.top > document.body.clientHeight - OFFSET.top) {
                setTop(document.body.clientHeight - OFFSET.top)
            } else {
                setTop(event.top)
            }
        }

        const handleStage = (event: WindowActionsEvent) => {
            setModalStage(event.state)
            baseStore.changeModalStage()
        }

        useEffect(() => {
            return () => {
                unmount()
            }
        }, [unmount])

        useEffect(() => {
            if (open) {
                dependence.loaded = true
            }
        }, [dependence, open])

        useEffect(() => {
            const modal = modalRef.current
            if (open && modal) {
                baseStore.addModal(id, {
                    ...modal.state,
                    widthRatio,
                    heightRatio,
                    initialWidth: modal.props.initialHeight,
                    initialHeight: modal.props.initialHeight,
                    initialTop: modal.props.initialTop,
                    initialLeft: modal.props.initialLeft,
                })
            }
        }, [baseStore, heightRatio, id, open, widthRatio])

        const MaxButton = memo(
            (props: { stage: string | undefined; onClick: (event: React.MouseEvent) => void }) => {
                return (
                    <Button
                        themeColor={'base'}
                        fillMode={'flat'}
                        svgIcon={iconFullscreen}
                        onMouseDown={(event) => {
                            props.onClick(event)
                        }}
                    />
                )
            },
        )
        const MinButton = memo(
            (props: { stage: string | undefined; onClick: (event: React.MouseEvent) => void }) => {
                return (
                    <Button
                        themeColor={'base'}
                        fillMode={'flat'}
                        svgIcon={iconFullscreenExit}
                        onMouseDown={(event) => {
                            props.onClick(event)
                        }}
                    />
                )
            },
        )

        return open ? (
            <ModalRoot
                id={id}
                initialWidth={initial.width}
                initialHeight={initial.height}
                initialTop={initial.top}
                initialLeft={initial.left}
                minWidth={MODAL_WIDTH}
                top={top}
                left={left}
                {...others}
                stage={modalStage}
                ref={modalRef}
                onClose={handleClose}
                onResize={handleResize}
                onMove={handleMove}
                onStageChange={handleStage}
                minimizeButton={() => null}
                maximizeButton={MaxButton}
                restoreButton={MinButton}
            >
                {children}
            </ModalRoot>
        ) : null
    },
)
