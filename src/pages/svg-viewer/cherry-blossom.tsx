import { observer } from 'mobx-react-lite'
import { BaseButton, ButtonLayout, PageLayout, SVG } from '../../components'
import { useCallback, useEffect, useState } from 'react'
import { getPinkHSLColor, getRandomRange } from '../../utils'
import { arrowRotateCwIcon } from '@progress/kendo-svg-icons'

type RandomProps = {
    id: string
    scale: number
    translateX: number
    translateY: number
    rotate: number
    fill: string
}

const pageName = 'cherry-blossom'
export const CherryBlossom = observer(() => {
    const [dependence] = useState({ loaded: false })
    const [randoms, setRandoms] = useState<RandomProps[]>([])

    const updateRandoms = useCallback(() => {
        const data: RandomProps[] = []
        const width = document.body.clientWidth
        const height = document.body.clientHeight

        for (let index = 0; index < 100; index++) {
            data.push({
                id: `${index + 1}`,
                scale: getRandomRange(3, 15),
                translateX: getRandomRange(100, width - 160),
                translateY: getRandomRange(100, height - 160),
                rotate: getRandomRange(0, 360),
                fill: getPinkHSLColor(),
            })
        }
        setRandoms(data)
    }, [])

    useEffect(() => {
        if (!dependence.loaded) {
            dependence.loaded = true
            updateRandoms()
        }
    }, [dependence, updateRandoms])

    return (
        <PageLayout id={pageName}>
            <ButtonLayout>
                <BaseButton
                    svgIcon={arrowRotateCwIcon}
                    page={pageName}
                    label="Change"
                    onClick={() => {
                        updateRandoms()
                    }}
                />
            </ButtonLayout>
            <SVG>
                <symbol id="symbol" width="140" height="180" viewBox="0 0 30 50">
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

                {randoms.map((it) => (
                    <use
                        href="#symbol"
                        key={`${it.id}`}
                        x={it.translateX}
                        y={it.translateY}
                        transform={`rotate(${it.rotate},${it.translateX},${it.translateY})`}
                        width={50 + it.scale * 7}
                        height={50 + it.scale * 9}
                        fill={it.fill}
                    />
                ))}
            </SVG>
        </PageLayout>
    )
})
