import { observer } from 'mobx-react-lite'
import { FieldLabel, IconButton, iconSuccess, notification } from '../../components'
import { styled } from 'styled-components'
import './styles.css'
import { copy } from '../../utils'
import { copyIcon } from '@progress/kendo-svg-icons'
import { useState } from 'react'

const Color = styled.span`
    display: block;
    width: 14px;
    height: 14px;
    margin-right: 4px;
    outline: 1px solid var(--kendo-color-primary-active);
    border: 2px solid var(--kendo-color-surface-alt);
`
const Label = styled.div`
    display: flex;
    text-align: center;
    align-items: center;
    gap: 4px;
`
type IProps = { bgColor: string; foreColor?: string }
export const ColorLabel = observer(({ bgColor, foreColor }: IProps) => {
    const [change, setChange] = useState(false)
    return (
        <Label>
            <IconButton
                svgIcon={!change ? copyIcon : iconSuccess}
                fillMode={'clear'}
                label="Copy"
                style={{
                    color: !change ? 'inherit' : 'var(--kendo-color-success)',
                }}
                onClick={() => {
                    copy(bgColor)
                        .then(() => {
                            notification({
                                type: 'success',
                                message: `Copy color to clipboard success.`,
                            })
                            setChange(true)
                            setTimeout(() => {
                                setChange(false)
                            }, 500)
                        })
                        .catch(() => {
                            notification({
                                type: 'warning',
                                message: `Copy color to clipboard failed.`,
                            })
                        })
                }}
            />
            <Color
                style={{
                    backgroundColor: bgColor,
                }}
            />
            <FieldLabel
                label={bgColor}
                style={{
                    width: '190px',
                    color: foreColor ? foreColor : 'inherit',
                    background: foreColor ? bgColor : 'unset',
                }}
            />
        </Label>
    )
})
