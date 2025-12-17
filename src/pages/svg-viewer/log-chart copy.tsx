import React, { useRef, useEffect } from 'react'
import * as d3 from 'd3'
import { mockData } from './fn'

interface LogCircleChartProps {
    data?: { value: number; minutes: number }[]
    width?: number
    height?: number
    circleRadius?: number
}

export const LogChart: React.FC<LogCircleChartProps> = ({
    data = mockData,
    width = 800,
    height = 600,
    circleRadius = 5,
}) => {
    const svgRef = useRef<SVGSVGElement>(null)

    useEffect(() => {
        if (!data || data.length === 0) return

        // 清除之前的图表
        d3.select(svgRef.current).selectAll('*').remove()

        // 设置边距
        const margin = { top: 40, right: 30, bottom: 60, left: 60 }
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
            .ticks(10, '~s') // 使用科学计数法
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

        // 创建颜色比例尺（可选）
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
            .on('mouseover', function (event, d) {
                d3.select(this)
                    .attr('r', circleRadius * 2)
                    .attr('fill', 'orange')

                // 显示提示框
                const tooltip = d3.select('#tooltip')
                if (tooltip.empty()) {
                    d3.select('body')
                        .append('div')
                        .attr('id', 'tooltip')
                        .style('position', 'absolute')
                        .style('padding', '8px')
                        .style('background', 'rgba(0, 0, 0, 0.8)')
                        .style('color', 'white')
                        .style('border-radius', '4px')
                        .style('pointer-events', 'none')
                        .style('font-size', '12px')
                        .style('z-index', '1000')
                }

                d3.select('#tooltip')
                    .style('opacity', 1)
                    .html(
                        `值: ${d.value.toLocaleString()}<br>Minutes: ${d.minutes.toLocaleString()}`,
                    )
                    .style('left', event.pageX + 10 + 'px')
                    .style('top', event.pageY - 20 + 'px')
            })
            .on('mouseout', function () {
                d3.select(this)
                    .attr('r', circleRadius)
                    .attr('fill', (d) => colorScale(d.minutes))

                // 隐藏提示框
                d3.select('#tooltip').style('opacity', 0)
            })

        // 添加图例（可选）
        const legend = g
            .selectAll('.legend')
            .data(colorScale.ticks(6).slice(1))
            .enter()
            .append('g')
            .attr('class', 'legend')
            .attr('transform', (d, i) => `translate(0,${-margin.top - 20 - i * 20})`)

        legend
            .append('rect')
            .attr('x', innerWidth - 20)
            .attr('width', 20)
            .attr('height', 20)
            .attr('fill', (d) => colorScale(d))

        legend
            .append('text')
            .attr('x', innerWidth - 25)
            .attr('y', 10)
            .attr('dy', '0.35em')
            .style('text-anchor', 'end')
            .text((d) => `${d} Minutes`)
    }, [data, width, height, circleRadius])

    return (
        <div style={{ position: 'relative' }}>
            <svg ref={svgRef} />
            {/* 提示框 */}
            <div id="tooltip" style={{ opacity: 0 }} />
        </div>
    )
}
