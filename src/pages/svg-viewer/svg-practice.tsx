import { LogChart } from './log-chart'

export const SvgPractice = () => {
    // 生成对数分布数据
    // const generateLogData = (count = 100, minExp = 0, maxExp = 4) => {
    //     const data = []
    //     for (let i = 0; i < count; i++) {
    //         const logValue = Math.random() * (maxExp - minExp) + minExp
    //         const value = Math.pow(10, logValue)
    //         data.push(value)
    //     }
    //     return data.sort((a, b) => a - b)
    // }

    // const data = generateLogData(100, 0, 4) // 1到10000之间的对数分布数据

    return (
        <div style={{ padding: '20px' }}>
            {/* <LogChart height={600} xRangeHighlight={[10, 1000]} /> */}
            <LogChart height={600} />
        </div>
    )
}
