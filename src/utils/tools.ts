import { GridLayoutColumnProps } from '@progress/kendo-react-layout'
import {
    FIELD_GAP,
    FIELD_MIN_WIDTH,
    FIELD_MAX_COLUMN,
    FILTER_FIELD_SUFFIX,
    SORT_MAPPING,
} from '../constants'
import {
    CompositeFilterDescriptor,
    process,
    State,
    toDataSourceRequest,
} from '@progress/kendo-data-query'
import { GridTableProps } from '../components'
import { FilterParameterType, SortParameterType } from '../models'

type GridProcessProps = {
    data: GridTableProps['data']
    state: State
}

export const hslToRgb = (hsl: string | { h: number; s: number; l: number; a?: number }) => {
    let color = {
        h: 0,
        s: 0,
        l: 0,
        a: 1,
    }
    let matches
    if (typeof hsl === 'object') {
        color = { ...hsl, a: hsl.a ?? 1 }
    } else if ((matches = hsl.match(/(\d+(\.\d+)?)/g))) {
        color.h = parseFloat(matches[0])
        color.s = parseFloat(matches[1]) / 100
        color.l = parseFloat(matches[2]) / 100
        color.a = matches[3] ? parseFloat(matches[3]) : 1
    }
    let red = 0,
        green = 0,
        blue = 0
    const i = Math.floor(color.h / 60)
    const f = color.h / 60 - i
    const p = color.l * (1 - color.s)
    const q = color.l * (1 - color.s * f)
    const t = color.l * (1 - color.s * (1 - f))

    switch (i % 6) {
        case 0:
            ;(red = color.l), (green = t), (blue = p)
            break
        case 1:
            ;(red = q), (green = color.l), (blue = p)
            break
        case 2:
            ;(red = p), (green = color.l), (blue = t)
            break
        case 3:
            ;(red = p), (green = q), (blue = color.l)
            break
        case 4:
            ;(red = t), (green = p), (blue = color.l)
            break
        case 5:
            ;(red = color.l), (green = p), (blue = q)
            break
    }
    const arr = [Math.round(red * 255), Math.round(green * 255), Math.round(blue * 255), color.a]
    return `rgba(${arr.toString()})`
}

export const rgbToHsl = (rgb: string | { r: number; g: number; b: number; a?: number }) => {
    let color = {
        r: 0,
        g: 0,
        b: 0,
        a: 1,
    }
    let matches
    if (typeof rgb === 'object') {
        color = { ...rgb, a: rgb.a ?? 1 }
    } else if ((matches = rgb.match(/(\d+(\.\d+)?)/g))) {
        color.r = parseFloat(matches[0])
        color.g = parseFloat(matches[1]) / 100
        color.b = parseFloat(matches[2]) / 100
        color.a = matches[3] ? parseFloat(matches[3]) : 1
    }
    const red = color.r / 255
    const green = color.g / 255
    const blue = color.b / 255
    const max = Math.max(color.r, color.g, color.b),
        min = Math.min(color.r, color.g, color.b)
    const l = max
    let h = 0,
        s = 0
    const d = max - min
    s = max === 0 ? 0 : d / max

    if (max === min) {
        h = 0 // achromatic
    } else {
        switch (max) {
            case red:
                h = (green - blue) / d + (green < blue ? 6 : 0)
                break
            case green:
                h = (blue - red) / d + 2
                break
            case blue:
                h = (red - green) / d + 4
                break
        }

        h /= 6
    }
    const arr = [Math.round(h * 360), s, l, color.a]
    return `hsl(${arr.toString()})`
}

export const hexToRgb = (hex: string) => {
    const color = hex.replace(/^#/, '')

    const bigint = parseInt(color, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255

    return `rgb(${[r, g, b].toString()})`
}

export const RGB = {
    toGray: (red: number, green: number, blue: number) => {
        const gray = Math.round((red + green + blue) / 3)
        return [gray, gray, gray]
    },
    toWhiter: (red: number, green: number, blue: number, factor = 0.1) => {
        const redVal = Math.min(255, Math.round(red + (255 - red) * factor))
        const greenVal = Math.min(255, Math.round(green + (255 - green) * factor))
        const blueVal = Math.min(255, Math.round(blue + (255 - blue) * factor))
        return [redVal, greenVal, blueVal]
    },
    toBrighter: (red: number, green: number, blue: number, factor = 0.1) => {
        const redVal = Math.min(255, Math.round(red * (1 + factor)))
        const greenVal = Math.min(255, Math.round(green * (1 + factor)))
        const blueVal = Math.min(255, Math.round(blue * (1 + factor)))
        return [redVal, greenVal, blueVal]
    },
    toDarker: (red: number, green: number, blue: number, factor = 0.1) => {
        const redVal = Math.max(0, Math.round(red * (1 - factor)))
        const greenVal = Math.max(0, Math.round(green * (1 - factor)))
        const blueVal = Math.max(0, Math.round(blue * (1 - factor)))
        return [redVal, greenVal, blueVal]
    },
}

export const copy = (text: string) => {
    return navigator.clipboard.writeText(text)
}

export const getAngle = (deltaX1: number, deltaX2: number, deltaY1: number, deltaY2: number) => {
    const dot = deltaX1 * deltaX2 + deltaY1 * deltaY2
    const det = deltaX1 * deltaY2 - deltaY1 * deltaX2
    const angle = (Math.atan2(det, dot) / Math.PI) * 180
    return Number(((angle + 360) % 360).toFixed(2))
}

export const getElementBounding = (container: Element, target: Element) => {
    const containerRect = container.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    return {
        top: targetRect.top - containerRect.top + container.scrollTop,
        left: targetRect.left - containerRect.left + container.scrollLeft,
    }
}

export const calOriginAngle = (x1: number, y1: number, x2: number, y2: number) => {
    // 计算向量的点积
    const dotProduct = x1 * x2 + y1 * y2

    // 计算向量的模
    const magnitude1 = Math.sqrt(x1 * x1 + y1 * y1)
    const magnitude2 = Math.sqrt(x2 * x2 + y2 * y2)

    //计算两个向量之间的夹角(弧度)
    const angle = Math.acos(dotProduct / (magnitude1 * magnitude2))

    //计算向量的叉积
    const crossProduct = x1 * y2 - y1 * x2

    //如果叉积为负,则角度为顺时针方向
    const clockwiseAngle = crossProduct < 0 ? angle : 2 * Math.PI - angle

    //将弧度转换为角度
    const angleInDegrees = clockwiseAngle * (180 / Math.PI)

    return angleInDegrees
}

export const getAngleBy3Point = (point1: number[], point0: number[], point2: number[]) => {
    const xa = point0[0] - point1[0]
    const xb = point2[0] - point0[0]
    const ya = point0[1] - point1[1]
    const yb = point2[1] - point0[1]
    let angle = 0
    const sqrtA = Math.sqrt(xa * xa + ya * ya)
    const sqrtB = Math.sqrt(xb * xb + yb * yb)
    if (sqrtA && sqrtB) {
        const p = xa * xb + ya * yb
        angle = Math.acos(p / (sqrtA * sqrtB))
        angle = (angle / Math.PI) * 180
        //direction 大于0 逆时针, 小于0 顺时针, 等于0 平行
        let direction = xa * yb - ya * xb
        direction = direction > 0 ? 1 : -1
        angle = 180 + direction * angle
    }
    return Number(angle.toFixed(2))
}

export const calculateAngle = (
    deltaX1: number,
    deltaX2: number,
    deltaY1: number,
    deltaY2: number,
) => {
    // 计算向量(x2-x1,y2-y1)和(x4-x3,y4-y3)
    const vector1 = { x: deltaX1, y: deltaY1 }
    const vector2 = { x: deltaX2, y: deltaY2 }

    //计算向量的点积
    const dotProduct = vector1.x * vector2.x + vector1.y * vector2.y

    //计算向量的模
    const magnitude1 = Math.sqrt(vector1.x * vector1.y + vector1.y * vector1.y)
    const magnitude2 = Math.sqrt(vector2.x * vector2.y + vector2.y * vector2.y)

    //计算两个向量之间的夹角(弧度)
    const angle = Math.acos(dotProduct / (magnitude1 * magnitude2))

    //计算向量的叉积
    const crossProduct = vector1.x * vector2.y - vector1.y * vector2.x

    //如果叉积为负,则角度为顺时针方向
    const clockwiseAngle = crossProduct < 0 ? angle : 2 * Math.PI - angle

    // 将弧度转换为角度
    return clockwiseAngle * (180 / Math.PI)
}

export const getPinkHSLColor = (opacity = 1) => {
    const hueRandom = Math.floor(Math.random() * 31) + 330 //色调在 330-360之间
    const saturationRandom = Math.floor(Math.random() * 51) + 50 //饱和度在50%-100%之间
    const lightnessRandom = Math.floor(Math.random() * 31) + 60 //亮度在70%-100%之间
    return `hsl(${hueRandom}, ${saturationRandom}%, ${lightnessRandom}%, ${opacity})`
}

export const getRandomHSLColor = (props?: {
    hue?: number
    saturation?: number
    lightness?: number
    opacity?: number
}) => {
    const { hue = 360, saturation = 100, lightness = 100, opacity = 1 } = props ?? {}
    const hueRandom = Math.floor(Math.random() * (hue + 1))
    const saturationRandom = Math.floor(Math.random() * saturation + 1)
    const lightnessRandom = Math.floor(Math.random() * (lightness + 1))
    return `hsl(${hueRandom}, ${saturationRandom}%, ${lightnessRandom}%, ${opacity})`
}

export const getRandomHSLInterval = (props?: {
    hue?: number
    saturation?: number
    lightness?: number
    opacity?: number
}) => {
    const { hue = 360, saturation = 100, lightness = 100, opacity = 1 } = props ?? {}
    const hueRandom = Math.floor(Math.random() * (hue + 1)) + (360 - hue)
    const saturationRandom = Math.floor(Math.random() * saturation + 1) + (100 - saturation)
    const lightnessRandom = Math.floor(Math.random() * (lightness + 1)) + (100 - lightness)
    return `hsl(${hueRandom}, ${saturationRandom}%, ${lightnessRandom}%, ${opacity})`
}

export const getRandomRGBColor = (props?: {
    red?: number
    green?: number
    blue?: number
    opacity?: number
}) => {
    const { red = 256, green = 256, blue = 256, opacity = 1 } = props ?? {}
    const redRandom = Math.floor(Math.random() * red)
    const greenRandom = Math.floor(Math.random() * green)
    const blueRandom = Math.floor(Math.random() * blue)
    return `rgb(${redRandom}, ${greenRandom}, ${blueRandom},  ${opacity})`
}

export const getRandomRange = (min = 0, max = 1) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

export const getRandomMultiple = (base: number, min: number, max: number) => {
    //计算最小和最大倍数
    const minMultiple = Math.ceil(min / base)
    const maxMultiple = Math.floor(max / base)

    // 生成随机倍数
    const randomMultiple = Math.floor(Math.random() * (maxMultiple - minMultiple + 1)) + minMultiple

    // 返回随机倍数乘以基数
    return randomMultiple * base
}

export const parseFilters = (expression: string): string[] => {
    if (!expression.includes('(') && !expression.includes(')')) {
        return [expression]
    }
    const regex = /\(([^)]+)\)/g
    const matches = []
    let match
    while ((match = regex.exec(expression)) !== null) {
        matches.push(match[1])
    }
    return matches
}

export const generateFilter = (expression: string | undefined = ''): FilterParameterType => {
    const splits = expression.split(`~`)
    let field = splits[0]
    if (field.endsWith(FILTER_FIELD_SUFFIX)) {
        field = field.replace(FILTER_FIELD_SUFFIX, '')
    }
    const filter: FilterParameterType = {
        poPropertyName: field,
        comparisonType: 'eq',
        value: splits[2],
    }
    return filter
}

export const getFilterParameter = (expression: string | undefined = ''): FilterParameterType[] => {
    const filters: FilterParameterType[] = []
    const data = expression.split(`~and~`)

    data.forEach((it) => {
        const splits = it.split('~or~')
        if (splits.length > 1) {
            let field = splits[0]
            if (field.endsWith(FILTER_FIELD_SUFFIX)) {
                field = field.replace(FILTER_FIELD_SUFFIX, '')
            }
            console.log(field)
            console.log(splits[1])
        } else {
            filters.push(generateFilter(it))
            //
        }
    })
    return filters
}

export const fieldHaveFilter = (
    filter: CompositeFilterDescriptor | undefined,
    field: string,
): boolean => {
    if (!filter) {
        return false
    }
    const data = `${toDataSourceRequest({ filter }).filter}`.replace(/[()]/g, '').split(`~and~`)
    return data.some((it) => {
        const splits = it.split('~')
        let key = splits.length > 0 ? splits[0] : ''
        if (key.endsWith(FILTER_FIELD_SUFFIX)) {
            key = field.replace(FILTER_FIELD_SUFFIX, '')
        }
        return key === field
    })
}

export const getSortParameter = (expression: string | undefined = ''): SortParameterType[] => {
    const sorts: SortParameterType[] = []
    const data = expression.split('~') as string[]
    data.forEach((element) => {
        const splits = element.split('-')
        if (splits.length > 1) {
            let field = splits[0]
            if (field.endsWith(FILTER_FIELD_SUFFIX)) {
                field = field.replace(FILTER_FIELD_SUFFIX, '')
            }
            const dto: SortParameterType = {
                poPropertyName: field,
                sortType: SORT_MAPPING[splits[1]],
            }
            sorts.push(dto)
        }
    })
    return sorts
}

export const evolution = ({ data, state }: GridProcessProps) => {
    const result = process(data, state)
    return result.data
}

export const sleep = (ms: number): Promise<NodeJS.Timeout> =>
    new Promise((resolve) => setTimeout(resolve, ms))

export const isSameJson = (json: object, diff: object) => {
    return JSON.stringify(json) === JSON.stringify(diff)
}

export const getId = (id: string, page = 'page') => {
    return `${page}-${id}`.replace(/\s/g, '').toLocaleLowerCase()
}

export const getGridLayout = (width: number, column = FIELD_MAX_COLUMN, min = FIELD_MIN_WIDTH) => {
    const OFFSET = 32
    const gap = FIELD_GAP
    if (width > OFFSET + gap) {
        const cols: GridLayoutColumnProps[] = []
        const all = width - OFFSET

        const limited = Math.floor((all - gap) / (min + gap)) ?? 1
        const col = limited > column ? column : limited
        const field = (all - gap * (col - 1)) / col

        for (let count = 0; count < col; count++) {
            cols.push({
                width: col === 1 ? '100%' : `${(field / all) * 100}%`,
            })
        }
        return {
            max: col,
            cols,
        }
    }
    return null
}
