import { observer } from 'mobx-react-lite'
import { PageLayout, SVG } from '../../components'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SVG_NAMESPACES } from '../../constants'
import { styled } from 'styled-components'
import { getPinkHSLColor, getRandomRange } from '../../utils'
import { StackLayoutHandle } from '@progress/kendo-react-layout'

const pageName = 'painting'
const Root = styled(PageLayout)`
    position: relative;
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
export const Painting = observer(() => {
    const [drawing, setDrawing] = useState(false)
    const [drawingPath, setDrawingPath] = useState('')
    const [svgPath, setSvgPath] = useState<SVGPathElement | null>(null)
    const [symbols, setSymbols] = useState<JSX.Element[]>([])
    const position = useRef<{ x: number; y: number } | null>(null)
    const pageRef = useRef<StackLayoutHandle>(null)
    const symbolInterval = 50 // Interval in pixels

    const getSymbols = useCallback(
        (symbolId: string, key: number, offsetX: number, offsetY: number, angle?: number) => {
            const random = getRandomRange(0, 30)
            const scale = getRandomRange(3, 15)
            const w = 14
            const h = 14
            const width = w + scale * 2
            const height = h + scale * 2
            const fill = getPinkHSLColor()
            return (
                <use
                    key={key}
                    href={`#${symbolId}`}
                    x={offsetX}
                    y={offsetY}
                    width={width}
                    height={height}
                    fill={fill}
                    transform={`rotate(${angle ? angle : random}, ${offsetX + width / 2}, ${offsetY + height / 2})`}
                />
            )
        },
        [],
    )

    const handleMouseDown = useCallback((event: MouseEvent) => {
        const svg = document.getElementById('svg')
        if (svg) {
            setDrawing(true)
            const { offsetX, offsetY } = event
            const d = `M ${offsetX} ${offsetY}`
            const path = document.createElementNS(SVG_NAMESPACES, 'path')
            path.setAttribute('d', d)
            path.setAttribute('stroke', 'black')
            path.setAttribute('stroke-width', '1')
            path.setAttribute('fill', 'none')
            // svg.appendChild(path)
            setDrawingPath(d)
            setSvgPath(path)
            // setSymbols([])
            position.current = { x: offsetX, y: offsetY }
        }
    }, [])

    const handleMouseMove = useCallback(
        (event: MouseEvent) => {
            if (!drawing || !svgPath) {
                return
            }
            const { offsetX, offsetY } = event
            const d = `${drawingPath} L ${offsetX} ${offsetY}`
            svgPath.setAttribute('d', d)
            setDrawingPath(d)
            if (position.current) {
                const dx = offsetX - position.current.x
                const dy = offsetY - position.current.y
                const distance = Math.sqrt(dx * dx + dy * dy)

                const angle = Math.atan2(dy, dx) * (180 / Math.PI)
                if (symbols.length === 0 || distance >= symbolInterval) {
                    setSymbols((prev) => [
                        ...prev,
                        getSymbols('gui', prev.length, offsetX, offsetY, angle),
                    ])
                    position.current = { x: offsetX, y: offsetY }
                }
            }
        },
        [drawing, drawingPath, getSymbols, svgPath, symbols.length],
    )
    const handleMouseUp = useCallback(() => {
        setDrawing(false)
        setDrawingPath('')
        setSvgPath(null)
    }, [])

    useEffect(() => {
        const layout = pageRef.current?.element
        if (layout) {
            layout.addEventListener('mousedown', handleMouseDown)
            layout.addEventListener('mousemove', handleMouseMove)
            layout.addEventListener('mouseup', handleMouseUp)
            layout.addEventListener('mouseleave', handleMouseUp)
        }
        return () => {
            if (layout) {
                layout.removeEventListener('mousedown', handleMouseDown)
                layout.removeEventListener('mousemove', handleMouseMove)
                layout.removeEventListener('mouseup', handleMouseUp)
                layout.removeEventListener('mouseleave', handleMouseUp)
            }
        }
    }, [handleMouseDown, handleMouseMove, handleMouseUp])

    return (
        <Root id={pageName} direction="row" ref={pageRef}>
            <div
                className="picture"
                style={{
                    backgroundImage: 'url(/mobx/gui.png)',
                }}
            />
            <SVG
                id="svg"
                style={{ outline: '1px solid' }}
                // width="100"
                // height="100"
                // viewBox="0 0 100 100"
            >
                <filter id="blur-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="10" />
                </filter>
                <symbol
                    id="elliptical"
                    width="40"
                    height="40"
                    viewBox="0 0 100 100"
                    strokeLinecap="round"
                >
                    <g transform={`rotate(90, 50, 50)`}>
                        <ellipse
                            fill="rgba(28, 190, 180, 0.1)"
                            cx="50"
                            cy="50"
                            rx="35"
                            ry="30"
                            filter="url(#blur-filter)"
                        />
                        <ellipse
                            fill="rgba(20, 190, 180, 0.1)"
                            cx="50"
                            cy="70"
                            rx="45"
                            ry="20"
                            filter="url(#blur-filter)"
                        />
                        <g stroke="none" fill="none" strokeWidth={1}>
                            <g stroke="#000" strokeWidth={1}>
                                {[1, 4, 7, 11, 14].map((item) => (
                                    <g
                                        transform={`rotate(${5 * (item + 1)}, 50, ${90 - item})`}
                                        key={`${item}_g`}
                                    >
                                        <path
                                            d={`M 50, ${90 - item} A 10 1 0 1 1 ${5 - item * 2} ${90 - item}`}
                                        />
                                    </g>
                                ))}
                                {[1, 4, 7, 11, 14].map((item) => (
                                    <g
                                        transform={`rotate(-${5 * (item + 1)}, 50, ${90 - item})`}
                                        key={`${item}_g`}
                                    >
                                        <path
                                            d={`M 50, ${90 - item} A 10 1 0 1 0 ${95 + item * 2} ${90 - item}`}
                                        />
                                    </g>
                                ))}
                                <path d={`M 50, 90, 50, 2`} />
                            </g>
                        </g>
                    </g>
                </symbol>
                <symbol id="leaf" viewBox="0 0 100 100">
                    <g stroke="#000" fill="#000" strokeWidth={2}>
                        <path
                            d={
                                'M 20 20 C 20 40 40 70 35 60zM 20 20 C 40 20 70 45 60 30zM 38 62 C 60 40 60 35 60 33z'
                            }
                        />
                        <polygon
                            fill="rgba(0, 255, 20, 0.2)"
                            points="20 20 60 35 35 60 20 20"
                            filter="url(#blur-filter)"
                        />
                    </g>
                </symbol>
                <symbol id="song" viewBox="0 0 100 100">
                    <g stroke="black" strokeWidth="2" fill="none">
                        <path d="M 75 7 L 52 38zM 82 22 L 50 49zM 89 25 L 57 52zM 98 30 L 52 74zM 102 52 L 52 76zM 100 66 L 50 85zM 97 78 L 47 92zM 94 93 L 42 97zM 30 15 L 51 60zM 22 25 L 46 69zM 12 39 L 46 83zM 12 58 L 36 85zM 5 72 L 35 93zM 10 88 L 43 96zM 60 3 L 52 47zM 51 48 L 45 88zM 72 52 L 91 52zM 68 40 L 68 56zM 72 16 L 72 32zM 19 31 L 37 44zM 6 53 L 29 66zM 24 37 L 23 51zM 9 65 L 28 76zM 33 65 L 33 81zM 30 24 L 48 53zM 25 47 L 44 58zM 87 25 L 79 47zM 96 39 L 78 70zM 68 72 L 87 83zM 60 85 L 80 95zM 61 2 L 64 27zM 67 16 L 86 12zM 36 84 L 48 87zM 49 59 L 66 54zM 41 6 L 48 41zM 42 19 L 52 6zM 45 1 L 56 25zM 44 95 L 43 82zM 43 95 L 51 86" />
                    </g>
                </symbol>

                <symbol id="gui" viewBox="0 0 100 100" stroke="black" strokeWidth="2" fill="none">
                    <path d="M 30 1 L 34 14zM 34 13 L 45 28zM 44 28 L 60 30zM 32 2 L 55 13zM 55 14 L 59 28zM 63 31 L 77 14zM 76 15 L 96 16zM 94 15 L 100 24zM 67 33 L 88 33zM 88 33 L 100 26zM 62 52 L 81 57zM 61 44 L 82 42zM 82 43 L 96 51zM 98 52 L 98 61zM 78 58 L 95 60zM 64 57 L 73 68zM 73 69 L 73 90zM 73 92 L 65 96zM 51 60 L 52 78zM 52 79 L 60 89zM 57 89 L 66 95zM 49 59 L 32 73zM 32 73 L 17 73zM 19 59 L 17 74zM 19 58 L 39 49zM 36 49 L 56 49zM 2 47 L 23 49zM 22 50 L 45 44zM 2 42 L 19 32zM 23 32 L 41 32zM 40 32 L 48 39zM 49 34 L 49 34zM 54 51 L 46 60zM 50 36 L 51 41zM 51 36 L 55 35zM 55 35 L 54 40zM 52 40 L 55 40zM 58 33 L 58 42zM 58 36 L 61 42zM 57 41 L 62 41zM 48 42 L 52 46zM 50 43 L 57 43zM 56 41 L 53 46zM 52 46 L 55 47zM 57 44 L 57 50zM 56 45 L 63 45zM 63 45 L 60 52zM 56 48 L 62 48" />
                    <ellipse
                        fill="rgba(52,157,6,0.4)"
                        cx="50"
                        cy="50"
                        rx="30"
                        ry="30"
                        filter="url(#blur-filter)"
                    />
                    <ellipse
                        fill="#f9e10f"
                        cx="50"
                        cy="50"
                        rx="10"
                        ry="10"
                        filter="url(#blur-filter)"
                    />
                </symbol>

                <symbol id="cherry-blossom" width="140" height="180" viewBox="0 0 30 50">
                    {[0, 72, 144, 216, 288].map((it) => (
                        <g
                            stroke="none"
                            strokeWidth={0.1}
                            key={`${it}`}
                            transform={`rotate(${it}, 8, 16)`}
                        >
                            <path d="M 8,16 S 0,8 6,4 t 1,1 2,-1 S16,8 8,16z" />
                            <g fill="yellow" stroke="yellow" strokeWidth={0.2}>
                                <circle cx="8" cy="16" r="1" />
                                <circle cx="8" cy="11" r="0.2" />
                                <path d="M 8,16 l0 -5z" fill="none" stroke="yellow" />
                            </g>
                        </g>
                    ))}
                </symbol>

                <g>{symbols}</g>
            </SVG>
        </Root>
    )
})
