import 'react'

type BaseProps = {
    x?: number | string
    y?: number | string
    fill?: string
    stroke?: string
    strokeWidth?: number | string
    transform?: string
    systemLanguage?: string
    requiredExtensions?: string
}

declare module 'react' {
    interface SVGRectProps extends AriaAttributes, DOMAttributes, BaseProps {
        width?: number | string
        height?: number | string
        rx?: number | string
        ry?: number | string
    }
    interface SVGCircleProps extends BaseProps {
        pathLength?: number
        cx?: number | string
        cy?: number | string
        r?: number | string
    }
    interface SVGLineProps extends BaseProps {
        pathLength?: number
        x1?: number | string
        x2?: number | string
        y1?: number | string
        y2?: number | string
    }
    interface SVGTextProps extends BaseProps {
        dx?: number | string
        dy?: number | string
        lengthAdjust?: number | string
    }
    interface SVGPathProps extends BaseProps {
        pathLength?: number
        d: string
    }
}

export {}
