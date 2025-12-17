import { observer } from 'mobx-react-lite'
import {
    FormNumeric,
    FormContext,
    useFormContext,
    FormContextProps,
    PageLayout,
} from '../../components'
import { styled } from 'styled-components'
import { useCallback, useMemo, useRef, useState } from 'react'
import { PATTERN } from '../../constants'
import { NormalizedDragEvent, useDraggable } from '@progress/kendo-react-common'
import { getAngleBy3Point } from '../../utils'
import { ColorLabel } from './color-label'
import { ForeColor } from './fore-color'

const Root = styled.div`
    display: flex;
    gap: 20px;
`

const ColorPalette = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`
const HueRound = styled.div`
    position: relative;
    margin: 25px;
`
const Hue = styled.div`
    width: 180px;
    height: 180px;
    border-radius: 50%;
    outline: 1px solid var(--kendo-color-primary-active);
`
const RoundDegree = styled.div`
    position: absolute;
    height: 105px;
    top: -15px;
    left: 90px;
    width: 0;
    transform-origin: bottom center;
    border-left: 1px solid var(--kendo-color-primary-active);
`
const ColorHandle = styled.div`
    position: absolute;
    width: 10px;
    height: 10px;
    border: 1px solid var(--kendo-color-primary-active);
    border-radius: 50%;
    left: -6px;
    top: -6px;
    background: white;
    box-shadow: inset 0 0 4px var(--kendo-color-primary-active);
    &:hover {
        cursor: pointer;
    }
`
const Label = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
`
const Degree = styled.div`
    position: absolute;
    height: 90px;
    top: 0;
    left: 90px;
    width: 0;
    transform-origin: bottom center;
    border-left: 1px dashed white;
    opacity: 0.8;
    & .text {
        position: absolute;
        top: -20px;
        left: -8px;
    }
`
const ColorOptions = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
`
const pageName = 'palette-color'
const data = {
    hue: 0,
    saturation: 100,
    lightness: 50,
    opacity: 1,
}
export const Palette = observer(() => {
    const handler = useRef<HTMLDivElement | null>(null)
    const reference = useRef<HTMLDivElement | null>(null)
    const [details, setDetails] = useState<KeyValue<number>>(data)
    const [dragging, setDragging] = useState<boolean>(false)
    const { id, valueSetter } = useFormContext({
        page: pageName,
        mode: 'normal',
        data: { ...data },
        rules: {
            hue: {
                required: true,
                min: 0,
                max: 360,
            },
            saturation: {
                required: true,
                min: 0,
                max: 100,
            },
            lightness: {
                required: true,
                min: 0,
                max: 100,
            },
            opacity: {
                required: true,
                min: 0,
                max: 1,
            },
        },
    })
    useDraggable(handler, {
        onDrag: (event: NormalizedDragEvent) => {
            if (reference.current) {
                const bounding = reference.current.getBoundingClientRect()
                const intersection = [bounding.x, bounding.bottom]
                const origin = [bounding.x, bounding.top]
                const target = [event.pageX, event.pageY]
                const angle = getAngleBy3Point(origin, intersection, target)
                valueSetter('hue', angle)
            }
        },
        onDragStart: () => {
            setDragging(true)
        },
        onDragEnd: () => {
            setDragging(false)
        },
    })
    const onChange: FormContextProps['onChange'] = (values) => {
        setDetails(values)
    }
    const getColor = useCallback((data: KeyValue<number | string>) => {
        return `hsl(${data.hue},${data.saturation}%,${data.lightness}%,${data.opacity})`
    }, [])

    const background = useMemo(() => {
        return `conic-gradient(
                    hsl(${0}, ${details.saturation}%, ${details.lightness}%) 0%,
                    hsl(${30}, ${details.saturation}%, ${details.lightness}%) ${(30 / 360) * 100}%,
                    hsl(${60}, ${details.saturation}%, ${details.lightness}%) ${(60 / 360) * 100}%,
                    hsl(${120}, ${details.saturation}%, ${details.lightness}%) ${(120 / 360) * 100}%,
                    hsl(${180}, ${details.saturation}%, ${details.lightness}%) 50%,
                    hsl(${240}, ${details.saturation}%, ${details.lightness}%) ${(240 / 360) * 100}%,
                    hsl(${300}, ${details.saturation}%, ${details.lightness}%) ${(300 / 360) * 100}%,
                    hsl(${0}, ${details.saturation}%, ${details.lightness}%) 100%
                )`.replace(PATTERN.enter, '')
    }, [details])

    const hslValue = useMemo(() => getColor(details), [details, getColor])

    return (
        <PageLayout id={pageName} direction="row">
            <Root style={{ position: 'relative', userSelect: dragging ? 'none' : 'unset' }}>
                <ColorPalette>
                    <HueRound>
                        <Hue
                            style={{
                                background: background,
                            }}
                        />
                        {[30, 60, 120, 180, 240, 280, 300, 330].map((it) => (
                            <Degree
                                key={`degree-${it}`}
                                style={{
                                    transform: `rotate(${it}deg)`,
                                    userSelect: 'none',
                                    borderColor: [30, 60, 120, 180].includes(it)
                                        ? 'black'
                                        : 'white',
                                }}
                            >
                                <span
                                    className="text"
                                    style={{ transform: it === 180 ? `rotate(${it}deg)` : 'unset' }}
                                >
                                    {it}
                                </span>
                            </Degree>
                        ))}
                        <RoundDegree
                            ref={reference}
                            style={{
                                visibility: 'hidden',
                            }}
                        />
                        <RoundDegree
                            style={{
                                transform: `rotate(${details.hue}deg)`,
                            }}
                        >
                            <ColorHandle ref={handler} />
                        </RoundDegree>
                    </HueRound>
                    <ColorLabel bgColor={hslValue} />
                </ColorPalette>
                <FormContext formId={id} fieldWidth={90} onChange={onChange}>
                    <FormNumeric formId={id} name={'hue'} label={'Hue'} decimal={2} />
                    <FormNumeric
                        formId={id}
                        name={'saturation'}
                        label={'Saturation %'}
                        decimal={2}
                        step={1}
                        min={0}
                        max={100}
                    />
                    <FormNumeric
                        formId={id}
                        name={'lightness'}
                        label={'Lightness %'}
                        decimal={2}
                        step={1}
                        min={0}
                        max={100}
                    />
                    <FormNumeric
                        formId={id}
                        name={'opacity'}
                        label={'Opacity'}
                        decimal={2}
                        step={0.1}
                        min={0}
                        max={1}
                    />
                </FormContext>
                <ColorOptions>
                    <Label>Lightness</Label>
                    {[0, 1, 2, 3, 4, 5].reverse().map((it) => {
                        const color = getColor({
                            ...details,
                            saturation: (details.saturation - it * 6).toFixed(2),
                            lightness: (details.lightness + it * 8).toFixed(2),
                        })
                        return <ColorLabel bgColor={color} key={`Lightness-${it}`} />
                    })}
                </ColorOptions>
                <ColorOptions>
                    <Label>Darkness</Label>
                    {[1, 2, 3, 4, 5, 6].map((it) => {
                        const color = getColor({
                            ...details,
                            saturation: (details.saturation - it * 4).toFixed(2),
                            lightness: (details.lightness - it * 3).toFixed(2),
                        })
                        return <ColorLabel bgColor={color} key={`Darkness-${it}`} />
                    })}
                </ColorOptions>
            </Root>
            <br />
            <ForeColor bgColor={hslValue} />
        </PageLayout>
    )
})
