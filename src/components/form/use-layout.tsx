import {
    forwardRef,
    PropsWithChildren,
    useCallback,
    useEffect,
    useImperativeHandle,
    useRef,
    useState,
} from 'react'
import { styled } from 'styled-components'
import {
    GridLayout,
    GridLayoutColumnProps,
    GridLayoutHandle,
    GridLayoutProps,
} from '@progress/kendo-react-layout'
import {
    FIELD_MIN_WIDTH,
    GAP,
    FIELD_MAX_COLUMN,
    FIELD_LAYOUT_FLAG,
    FIELD_GAP,
} from '../../constants'
import { useStores } from '../../stores'
import { getGridLayout } from '../../utils'
import { autorun } from 'mobx'

const PADDING = GAP.large

const Root = styled(GridLayout)`
    flex: 1;
    padding: ${PADDING / 2}px;
    padding-left: ${PADDING}px;
    margin-right: ${PADDING / 2}px;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, ${FIELD_MIN_WIDTH}px);
`

type FieldLayoutHandler = {
    getMaxSpan: () => number
}
type FieldLayoutProps = PropsWithChildren<GridLayoutProps>

export const FieldLayout = forwardRef<FieldLayoutHandler, FieldLayoutProps>((props, ref) => {
    const { children, className, ...others } = props
    const { baseStore } = useStores()
    const [width, setWidth] = useState<number>()
    const [cols, setCols] = useState<GridLayoutColumnProps[]>()
    const [maxSpan, setMaxSpan] = useState<number>(FIELD_MAX_COLUMN)
    const layoutRef: React.RefObject<GridLayoutHandle> = useRef(null)

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
            const element = layoutRef.current?.element
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
            const element = layoutRef.current?.element
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
        const element = layoutRef.current?.element
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

    useImperativeHandle(ref, () => {
        return {
            getMaxSpan: () => {
                return maxSpan
            },
        }
    }, [maxSpan])

    return (
        <Root
            {...others}
            cols={cols}
            className={`${FIELD_LAYOUT_FLAG} ${className ?? ''}`.trim()}
            gap={{ cols: FIELD_GAP, rows: 0 }}
            ref={layoutRef}
        >
            {children}
        </Root>
    )
})
