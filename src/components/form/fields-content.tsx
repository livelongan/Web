import {
    forwardRef,
    memo,
    PropsWithChildren,
    useCallback,
    useEffect,
    useImperativeHandle,
    useMemo,
    useRef,
    useState,
} from 'react'
import { styled } from 'styled-components'
import { GridLayoutColumnProps, GridLayoutProps } from '@progress/kendo-react-layout'
import {
    FIELD_MIN_WIDTH,
    GAP,
    FIELD_MAX_COLUMN,
    FIELD_LAYOUT_FLAG,
    FIELD_GAP,
} from '../../constants'
import { useStores } from '../../stores'
import { getElementBounding, getGridLayout } from '../../utils'
import { autorun } from 'mobx'
import { Navigation } from '@progress/kendo-react-common'
import { FieldLayout } from './field-layout'

const PADDING = GAP.large

const Root = styled.div`
    overflow: hidden;
    overflow-y: overlay;
    flex: 1;
    padding: ${PADDING / 2}px;
    padding-left: ${PADDING}px;
    margin-right: ${PADDING / 2}px;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, ${FIELD_MIN_WIDTH}px);
`

export type FieldsContentHandler = {
    getMaxSpan: () => number
}
type FieldsContentProps = PropsWithChildren<GridLayoutProps>

export const FieldsContent = memo(
    forwardRef<FieldsContentHandler, FieldsContentProps>((props, ref) => {
        const { children, className, ...others } = props
        const { baseStore } = useStores()
        const [width, setWidth] = useState<number>()
        const [cols, setCols] = useState<GridLayoutColumnProps[]>()
        const [maxSpan, setMaxSpan] = useState<number>(FIELD_MAX_COLUMN)
        const rootRef = useRef<HTMLDivElement>(null)

        const handleArrowNext = useCallback(
            (target: HTMLElement, nav: Navigation, ev: React.KeyboardEvent<HTMLElement>) => {
                ev.preventDefault()
                nav.focusNext(target)
                if (rootRef.current) {
                    const position = getElementBounding(rootRef.current, target)
                    rootRef.current.scrollTo({ top: position.top })
                }
            },
            [],
        )
        const handleArrowPrevious = useCallback(
            (target: HTMLElement, nav: Navigation, ev: React.KeyboardEvent<HTMLElement>) => {
                ev.preventDefault()
                nav.focusPrevious(target)
                if (rootRef.current) {
                    const position = getElementBounding(rootRef.current, target)
                    rootRef.current.scrollTo({ top: position.top })
                }
            },
            [],
        )

        const navigation = useMemo(
            () =>
                new Navigation({
                    root: rootRef,
                    selectors: ['.k-input-inner'],
                    keyboardEvents: {
                        keydown: {
                            ['ArrowLeft']: handleArrowPrevious,
                            ['ArrowRight']: handleArrowNext,
                        },
                    },
                    tabIndex: 0,
                }),
            [handleArrowNext, handleArrowPrevious],
        )
        const resize = useCallback(() => {
            if (width) {
                const layout = getGridLayout(width)
                if (layout) {
                    setCols(layout.cols)
                    setMaxSpan(layout.max)
                }
            }
        }, [width])

        useEffect(() => {
            resize()
        }, [resize, width])

        useEffect(() => {
            const disposer = autorun(() => {
                const element = rootRef.current
                if (element && baseStore.modal.resizing !== undefined) {
                    setWidth(element.clientWidth)
                }
            })

            return () => {
                disposer()
            }
        }, [baseStore.modal.resizing])

        useEffect(() => {
            const disposer = autorun(() => {
                const element = rootRef.current
                if (element && baseStore.modal.staging !== undefined) {
                    setWidth(element.clientWidth)
                    resize()
                }
            })

            return () => {
                disposer()
            }
        }, [baseStore.modal.staging, resize])

        useEffect(() => {
            const element = rootRef.current
            if (element) {
                let width = document.body.clientWidth
                const modal = element.closest('.k-window')

                const modalId = modal?.getAttribute('id')
                if (modalId) {
                    const modalProps = baseStore.findModal(modalId)
                    if (modalProps) {
                        width = (width * modalProps.widthRatio) / 100
                    }
                }
                setWidth(width)
            }
        }, [baseStore])

        useEffect(() => {
            window.onresize = () => {
                const element = rootRef.current
                if (element) {
                    setWidth(element.clientWidth)
                    resize()
                }
            }
            return () => {
                window.onresize = null
            }
        }, [resize])

        useImperativeHandle(ref, () => {
            return {
                getMaxSpan: () => {
                    return maxSpan
                },
            }
        }, [maxSpan])

        return (
            <Root
                ref={rootRef}
                className="scroll-panel"
                onKeyDown={navigation.triggerKeyboardEvent.bind(navigation)}
            >
                <FieldLayout
                    {...others}
                    cols={cols}
                    className={`${FIELD_LAYOUT_FLAG} ${className ?? ''}`.trim()}
                    gap={{ cols: FIELD_GAP, rows: 0 }}
                >
                    {children}
                </FieldLayout>
            </Root>
        )
    }),
)
