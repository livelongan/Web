import { observer } from 'mobx-react-lite'
import { PageLayout, SVG } from '../../components'
import { useEffect, useRef, useState } from 'react'
import { styled } from 'styled-components'
import { StackLayoutHandle } from '@progress/kendo-react-layout'
import { getPinkHSLColor, getRandomRange } from '../../utils'
type SvgItem = {
    id: string

    scale: number
    rotate: number

    type: 'circle' | 'rect'
    x: number
    y: number
    r?: number
    width?: number
    height?: number
    fill?: string
    stroke?: string
}
const pageName = 'temp'
const Root = styled(PageLayout)`
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .picture {
        opacity: 0.3;
        width: 100%;
        height: 100%;
        position: absolute;
        background-repeat: no-repeat;
        background-position-x: -385px;
        background-position-y: -202px;
    }
`
export const Temp = observer(() => {
    const [hoverId, setHoverId] = useState<string | null>(null)
    const pageRef = useRef<StackLayoutHandle>(null)
    const [viewBox, setViewBox] = useState('0 0 100 100')
    const [scale, setScale] = useState(1)
    const [items, setItems] = useState<SvgItem[]>([])
    const [symbolMap] = useState<Map<string, Element>>(new Map())

    const draggingRef = useRef(false)
    const dragOffsetRef = useRef({ x: 0, y: 0 })
    const activeIdRef = useRef<string | null>(null)

    const panRef = useRef(false)
    const panStartRef = useRef({ x: 0, y: 0 })
    const viewBoxStartRef = useRef({ x: 0, y: 0 })

    useEffect(() => {
        const wrapper = pageRef.current?.element
        const rect = wrapper?.getBoundingClientRect()
        if (!rect || items.length > 0) {
            return
        }
        const width = rect.width
        const height = rect.height
        const data: SvgItem[] = []
        for (let index = 0; index < 100; index++) {
            data.push({
                id: `${index + 1}`,
                scale: getRandomRange(3, 15),
                rotate: getRandomRange(0, 360),
                fill: getPinkHSLColor(),

                type: 'circle',
                x: getRandomRange(100, width - 60),
                y: getRandomRange(100, height - 60),
                r: 20,
            })
        }
        setItems(data)
    }, [items.length, pageRef])

    useEffect(() => {
        if (items.length === 0) {
            return
        }
        const wrapper = pageRef.current?.element
        if (!wrapper) return

        const elements = wrapper.querySelectorAll('[href="#symbol"]')
        elements.forEach((el) => {
            const id = el.getAttribute('id')
            if (id) {
                symbolMap.set(id, el)
            }
        })
    }, [items.length, pageRef, symbolMap])

    useEffect(() => {
        const wrapper = pageRef.current?.element
        if (!wrapper) return

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault()
            let newScale = scale - e.deltaY * 0.001
            newScale = Math.max(0.2, Math.min(newScale, 5)) // 限制缩放范围
            setScale(newScale)
        }
        wrapper.addEventListener('wheel', handleWheel, { passive: false })
        return () => {
            wrapper.removeEventListener('wheel', handleWheel)
        }
    }, [scale])

    useEffect(() => {
        const wrapper = pageRef.current?.element
        const rect = wrapper?.getBoundingClientRect()

        const width = rect?.width ?? 800
        const height = rect?.height ?? 600
        const widthSize = width / scale // 缩放后的大小
        const heightSize = height / scale // 缩放后的大小

        setViewBox(
            `${(width - widthSize) / 2} ${(height - heightSize) / 2} ${widthSize} ${heightSize}`,
        )
    }, [scale])

    useEffect(() => {
        const svg = document.getElementById('svg')
        if (!svg) return

        const handleMouseDown = (e: MouseEvent) => {
            const pt = (svg as any).createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            const cursor = pt.matrixTransform((svg as any).getScreenCTM().inverse())
            for (const item of items) {
                const rect = symbolMap.get(item.id)?.getBoundingClientRect()

                if (
                    cursor.x >= item.x &&
                    cursor.x <= item.x + (rect?.width ?? 50) &&
                    cursor.y >= item.y &&
                    cursor.y <= item.y + (rect?.height ?? 50)
                ) {
                    draggingRef.current = true
                    dragOffsetRef.current = { x: cursor.x - item.x, y: cursor.y - item.y }
                    activeIdRef.current = item.id
                    return
                }
            }
        }
        const handleMouseMove = (e: MouseEvent) => {
            if (!draggingRef.current || !activeIdRef.current) return
            const pt = (svg as any).createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            const cursor = pt.matrixTransform((svg as any).getScreenCTM().inverse())
            setItems((prev) =>
                prev.map((item) =>
                    item.id === activeIdRef.current
                        ? {
                              ...item,
                              x: cursor.x - dragOffsetRef.current.x,
                              y: cursor.y - dragOffsetRef.current.y,
                          }
                        : item,
                ),
            )
        }
        const handleMouseUp = () => {
            draggingRef.current = false
            activeIdRef.current = null
        }

        svg.addEventListener('mousedown', handleMouseDown)
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
        return () => {
            svg.removeEventListener('mousedown', handleMouseDown)
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
        }
    }, [items, symbolMap])

    useEffect(() => {
        const svg = document.getElementById('svg')
        if (!svg) return

        const handlePanDown = (e: MouseEvent) => {
            // 判断是否点在空白处（没有点中任何 use 元素）
            const pt = (svg as any).createSVGPoint()
            pt.x = e.clientX
            pt.y = e.clientY
            const cursor = pt.matrixTransform((svg as any).getScreenCTM().inverse())
            // 检查是否点中元素
            const hit = items.some((item) => {
                const x = item.x
                const y = item.y
                const w = 50 + item.scale * 7
                const h = 50 + item.scale * 9
                return cursor.x >= x && cursor.x <= x + w && cursor.y >= y && cursor.y <= y + h
            })
            if (!hit) {
                panRef.current = true
                panStartRef.current = { x: e.clientX, y: e.clientY }
                // 解析当前 viewBox
                const [vx, vy, vw, vh] = viewBox.split(' ').map(Number)
                viewBoxStartRef.current = { x: vx, y: vy }
            }
        }
        const handlePanMove = (e: MouseEvent) => {
            if (!panRef.current) return
            const dx = (e.clientX - panStartRef.current.x) / scale
            const dy = (e.clientY - panStartRef.current.y) / scale
            const [vx, vy, vw, vh] = viewBox.split(' ').map(Number)
            setViewBox(
                `${viewBoxStartRef.current.x - dx} ${viewBoxStartRef.current.y - dy} ${vw} ${vh}`,
            )
        }
        const handlePanUp = () => {
            panRef.current = false
        }

        svg.addEventListener('mousedown', handlePanDown)
        window.addEventListener('mousemove', handlePanMove)
        window.addEventListener('mouseup', handlePanUp)
        return () => {
            svg.removeEventListener('mousedown', handlePanDown)
            window.removeEventListener('mousemove', handlePanMove)
            window.removeEventListener('mouseup', handlePanUp)
        }
    }, [viewBox, items, scale])

    return (
        <Root id={pageName} direction="row" ref={pageRef}>
            <SVG
                id="svg"
                viewBox={viewBox}
                style={{
                    border: '1px solid black',
                    width: '100%',
                    height: '100%',
                    display: 'block',
                }}
            >
                <symbol id="symbol" width="140" height="180" viewBox="0 0 30 50">
                    {[0, 72, 144, 216, 288].map((it) => (
                        <g key={`${it}`} transform={`rotate(${it}, 8, 16)`}>
                            <path d="M 8,16 S 0,8 6,4 t 1,1 2,-1 S16,8 8,16z" />
                            <g fill="yellow" stroke="yellow" strokeWidth={0.2}>
                                <circle cx="8" cy="16" r="1" />
                                <circle cx="8" cy="11" r="0.2" />
                                <path d="M 8,16 l0 -5z" fill="none" stroke="yellow" />
                            </g>
                        </g>
                    ))}
                </symbol>
                {items.map((it) => (
                    <use
                        href="#symbol"
                        id={it.id}
                        key={`${it.id}`}
                        x={it.x}
                        y={it.y}
                        width={50 + it.scale * 7}
                        height={50 + it.scale * 9}
                        fill={it.fill}
                        transform={`rotate(${it.rotate}, ${it.x + (50 + it.scale * 7) / 2}, ${it.y + (50 + it.scale * 9) / 2})`}
                        style={{
                            cursor: hoverId === it.id ? 'pointer' : 'default',
                        }}
                        stroke={hoverId === it.id ? 'pink' : 'none'}
                        strokeWidth={hoverId === it.id ? 1 : 0}
                        onMouseEnter={() => setHoverId(it.id)}
                        onMouseLeave={() => setHoverId(null)}
                    />
                ))}
            </SVG>
        </Root>
    )
})
