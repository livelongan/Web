import { useCallback } from 'react'
import { SVG_NAMESPACES } from '../../constants'

export type SVGElementProps = {
    id: string
    content: string
    viewBox: string
    scale?: number
}

type SVGRendererProps = {
    id: string
}

type PatternProps = {
    ele: SVGElementProps
    fill?: string
    stroke?: string
    strokeWidth?: number
    scale?: number
    bg?: string
}

export const useSVGRenderer = ({ id }: SVGRendererProps) => {
    const createPattern = useCallback((props: PatternProps) => {
        const { ele, bg, fill = 'none', stroke, strokeWidth = 1, scale = 1 } = props
        const pattern = document.createElementNS(SVG_NAMESPACES, 'pattern')
        const geometry = document.createElementNS(SVG_NAMESPACES, 'g')
        pattern.setAttribute('id', ele.id)
        pattern.setAttribute('patternUnits', 'userSpaceOnUse')

        geometry.setAttribute('stroke-linecap', 'round')
        geometry.setAttribute('stroke-linejoin', 'round')
        geometry.setAttribute('stroke-width', `${strokeWidth}`)
        geometry.setAttribute('stroke', stroke ?? '#fad73d')
        geometry.setAttribute('fill', fill)

        geometry.innerHTML = ele.content
        const splits = ele.viewBox.split(' ')
        if (splits.length === 4) {
            const viewX = Number(splits[2])
            const viewY = Number(splits[3])
            pattern.setAttribute('width', `${viewX * scale}`)
            pattern.setAttribute('height', `${viewY * scale}`)
            pattern.setAttribute('viewBox', `${splits[0]} ${splits[1]} ${viewX} ${viewY}`)
        }
        if (bg) {
            const rect = document.createElementNS(SVG_NAMESPACES, 'rect')
            rect.setAttribute('width', '100%')
            rect.setAttribute('height', '100%')
            rect.setAttribute('fill', bg)
            rect.setAttribute('stroke', 'none')
            pattern.append(rect)
        }
        pattern.appendChild(geometry)
        return pattern
    }, [])

    const addSVGPattern = useCallback(
        (ele: PatternProps) => {
            const svg = document.getElementById(id)
            if (svg) {
                let defs = svg.querySelector('defs')
                if (!defs) {
                    defs = document.createElementNS(SVG_NAMESPACES, 'defs')
                    svg.appendChild(defs)
                }
                const pattern = createPattern(ele)
                defs.appendChild(pattern)
            }
        },
        [createPattern, id],
    )

    return {
        addSVGPattern,
    }
}
