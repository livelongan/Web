import React, { useRef, useEffect, useState } from 'react'
import * as d3 from 'd3'
import { mockData } from './fn'

interface LogChartProps {
    data?: { value: number; minutes: number }[]
    height?: number
    circleRadius?: number
    xRangeHighlight?: [number, number]
}

export const LogChart: React.FC<LogChartProps> = ({
    data = mockData,
    height = 600,
    circleRadius = 5,
    xRangeHighlight,
}) => {
    const svgRef = useRef<SVGSVGElement>(null)
    const [width, setWidth] = useState<number>(800)

    // 响应式宽度
    useEffect(() => {
        const handleResize = () => {
            if (svgRef.current) {
                const containerWidth = svgRef.current.parentElement?.clientWidth ?? 800
                setWidth(containerWidth - 80) // 减去左右边距
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        if (!data || data.length === 0 || !svgRef.current) return

        // 清除之前的图表
        d3.select(svgRef.current).selectAll('*').remove()

        const margin = { top: 40, right: 30, bottom: 80, left: 60 } // 增加底部边距
        const innerWidth = width - margin.left - margin.right
        const innerHeight = height - margin.top - margin.bottom

        // 创建SVG容器
        const svg = d3.select(svgRef.current).attr('width', width).attr('height', height)

        // 创建图表组，并应用边距
        const g = svg.append('g').attr('transform', `translate(${margin.left},${margin.top})`)

        // 创建X轴的对数比例尺
        const xScale = d3
            .scaleLog<number>()
            .base(10)
            .domain([d3.min(data, (d) => d.value)!, d3.max(data, (d) => d.value)!])
            .range([0, innerWidth])

        // 创建Y轴的线性比例尺（Minutes）
        const yScale = d3
            .scaleLinear<number>()
            .domain([0, d3.max(data, (d) => d.minutes)!])
            .range([innerHeight, 0])

        // 创建X轴
        const xAxis = d3
            .axisBottom(xScale)
            .ticks(8, '~s') // 减少刻度数量
            .tickFormat(d3.format('.0s'))

        // 创建Y轴
        const yAxis = d3.axisLeft(yScale).ticks(10)

        // 添加X轴
        g.append('g')
            .attr('class', 'axis')
            .attr('transform', `translate(0,${innerHeight})`)
            .call(xAxis)

        // 添加X轴标签
        g.append('text')
            .attr('class', 'axis-label')
            .attr('x', innerWidth / 2)
            .attr('y', innerHeight + margin.bottom - 10)
            .style('text-anchor', 'middle')
            // .text('值 (对数尺度)')
            .text('Value (Log Scale)')

        // 添加Y轴
        g.append('g').attr('class', 'axis').call(yAxis)

        // 添加Y轴标签
        g.append('text')
            .attr('class', 'axis-label')
            .attr('transform', 'rotate(-90)')
            .attr('x', -innerHeight / 2)
            .attr('y', -margin.left + 15)
            .style('text-anchor', 'middle')
            .text('Minutes')

        // 创建颜色比例尺
        const colorScale = d3
            .scaleSequential(d3.interpolateViridis)
            .domain([d3.min(data, (d) => d.minutes)!, d3.max(data, (d) => d.minutes)!])

        // 绘制圆圈
        g.selectAll('.circle')
            .data(data)
            .enter()
            .append('circle')
            .attr('class', 'circle')
            .attr('cx', (d) => xScale(d.value))
            .attr('cy', (d) => yScale(d.minutes))
            .attr('r', circleRadius)
            .attr('fill', (d) => colorScale(d.minutes))
            .attr('stroke', '#fff')
            .attr('stroke-width', 1)

        // 高亮区间（放在最后面）
        if (xRangeHighlight) {
            const [xMin, xMax] = xRangeHighlight
            const xMinLog = Math.log10(xMin)
            const xMaxLog = Math.log10(xMax)

            const xMinPixel = xScale(xMin)
            const xMaxPixel = xScale(xMax)

            // 使用g元素包裹矩形和文本，确保它们绘制在最后
            const highlightGroup = g.append('g').attr('class', 'highlight-group')

            highlightGroup
                .append('rect')
                .attr('x', xMinPixel)
                .attr('y', 0)
                .attr('width', xMaxPixel - xMinPixel)
                .attr('height', innerHeight)
                .attr('fill', 'rgba(0, 128, 255, 0.2)')
                .attr('stroke', 'blue')
                .attr('stroke-width', 1)

            highlightGroup
                .append('text')
                .attr('x', (xMinPixel + xMaxPixel) / 2)
                .attr('y', -10)
                .style('text-anchor', 'middle')
                .style('font-size', '12px')
                .style('fill', 'blue')
                .text(`[${xMin}, ${xMax}]`)
        }

        // 添加交互提示框
        const tooltip = d3.select('#tooltip')
        if (tooltip.empty()) {
            d3.select('#log-chart').append('div').attr('id', 'tooltip')
            // .style('position', 'absolute')
            // .style('padding', '8px')
            // .style('background', 'rgba(0, 0, 0, 0.8)')
            // .style('color', 'white')
            // .style('border-radius', '4px')
            // .style('pointer-events', 'none')
            // .style('font-size', '12px')
            // .style('z-index', '1000')
        }
        // Append a path for each state.

        g.selectAll('.circle')
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr('r', circleRadius * 1.5)
                    .attr('fill', 'orange')

                d3.select('#tooltip')
                    .style('opacity', 1)
                    .html(
                        `Value: ${d.value.toLocaleString()}<br>Minutes: ${d.minutes.toLocaleString()}`,
                    )
                    .style('left', event.pageX - 80 + 'px')
                    .style('top', event.pageY - 100 + 'px')
                // .style('left', event.pageX + 10 + 'px')
                // .style('top', event.pageY - 20 + 'px')
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr('r', circleRadius)
                    .attr('fill', (d) => colorScale(d.minutes))
                d3.select('#tooltip').style('opacity', 0)
            })
    }, [data, height, circleRadius, xRangeHighlight, width])

    return (
        <div style={{ width: '100%', position: 'relative' }} id="log-chart">
            <svg ref={svgRef} />
            <div id="tooltip" style={{ opacity: 0 }} />
        </div>
    )
}
