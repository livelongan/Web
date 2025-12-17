import { SVGElementProps } from './svg-renderer'

export const generateEnglishPlaid = (props?: { small: string; middle: string; large: string }) => {
    const {
        small = 'hsl(0 100% 78% / 0.5)',
        middle = 'hsl(204 47% 75% / 0.5)',
        large = 'hsl(42 100% 95% / 0.2)',
    } = props ?? {}
    return `${small} 0 2.5%,${large} 2.5% ${6 * 2.5}%,${middle} ${6 * 2.5}% ${9 * 2.5}%,${large} ${9 * 2.5}% ${11 * 2.5}%,
            ${middle} ${11 * 2.5}% ${14 * 2.5}%,${large} ${14 * 2.5}% ${19 * 2.5}%,${small} ${19 * 2.5}% ${20 * 2.5}%,
            ${small} ${20 * 2.5}% ${21 * 2.5}%, ${large} ${21 * 2.5}% ${26 * 2.5}%,${middle} ${26 * 2.5}% ${29 * 2.5}%,${large} ${29 * 2.5}% ${31 * 2.5}%,
            ${middle} ${31 * 2.5}% ${34 * 2.5}%,${large} ${34 * 2.5}% ${39 * 2.5}%,${small} ${39 * 2.5}% ${40 * 2.5}%`
}

export const linearStripe = (color = 'hsl(42 100% 95% / 0.2)', angle = 0) => {
    return `repeating-linear-gradient(${angle}deg, transparent 0 1px, ${color} 1px 2px)`
}

export const stripe1 = `${linearStripe()}, linear-gradient(45deg, ${generateEnglishPlaid()}),linear-gradient(135deg, ${generateEnglishPlaid()})`

export const svgBackground = (props: SVGElementProps, stroke = 'none', fill = 'none') => {
    const { content } = props
    return `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
    <g stroke-linecap="round" stroke-linejoin="round" stroke-width="1" stroke="${stroke}" fill="${fill}">${content}
    </g></svg>')`.replace(/[\t\r\n]/g, '')
}
// src/data/mockData.ts
export const generateMockData = (count = 50): { value: number; minutes: number }[] => {
    const data: { value: number; minutes: number }[] = []

    // 生成更随机的数据分布
    for (let i = 0; i < count; i++) {
        const rand = Math.random()
        let value = Math.pow(10, Math.random() * -1)

        if (rand < 0.6) {
            // 60% 的数据集中在 [10, 1000] 区间
            value = Math.pow(10, Math.random() * 3 + 1)
        } else if (rand < 0.8) {
            // 20% 的数据在 [1, 10] 区间
            value = Math.pow(10, Math.random() * 1)
        }

        // else if (rand < 0.95) {
        //     // 15% 的数据在 [1000, 10000] 区间
        //     value = Math.pow(10, Math.random() * 4 + 3)
        // } else {
        //     // 5% 的数据在 [0.1, 1] 区间（极端值）
        //     value = Math.pow(10, Math.random() * -1)
        // }
        const minutes = Math.floor(Math.random() * 60) + 1 // 1~60 分钟

        if (value >= 1) {
            data.push({ value, minutes })
        }
    }

    return data
}

export const mockData = generateMockData(1000)
