import { Button, ButtonProps } from '@progress/kendo-react-buttons'
import {
    arrowRotateCcwIcon,
    cancelIcon,
    checkIcon,
    saveIcon,
    xIcon,
} from '@progress/kendo-svg-icons'
import { observer } from 'mobx-react-lite'
import { useMemo } from 'react'
import { styled } from 'styled-components'
import { BUTTON_PREFIX, ROUNDED } from '../../constants'
import { getId } from '../../utils'

export type ButtonMode = 'cancel' | 'confirm' | 'submit' | 'reset' | 'add' | 'edit'

export type BaseButtonProps = {
    page?: string
    mode?: ButtonMode
    label?: string
    loading?: boolean
} & Omit<ButtonProps, 'startIcon'>

const Root = styled(Button)`
    position: relative;
    overflow: hidden;

    &.k-disabled .k-icon {
        color: var(--kendo-color-error);
    }
    &.loading.k-disabled .k-icon {
        color: inherit;
    }
    &.loading.k-disabled {
        opacity: 0.8;
    }
    &:hover .button-mask {
        left: 150%;
        opacity: 1;
        transition: left 2.5s cubic-bezier(0.075, 0.82, 0.165, 1);
    }
`
const Mask = styled.span`
    position: absolute;
    width: 150%;
    height: 150%;
    left: 0%;
    top: -20%;
    rotate: 45deg;
    opacity: 0;
    background: linear-gradient(0, rgba(255, 255, 255, 0.6) 30%, transparent 70%);
`
export const BaseButton = observer<BaseButtonProps>(
    ({
        page,
        mode = '',
        label,
        loading,
        svgIcon,
        icon,
        disabled,
        type,
        className = '',
        ...others
    }) => {
        const isCancel = mode === 'cancel'
        const isConfirm = mode === 'confirm'
        const isSubmit = mode === 'submit' || type === 'submit'
        const isReset = mode === 'reset' || type === 'reset'

        const svg = useMemo(() => {
            if (loading) {
                return undefined
            } else if (disabled) {
                return cancelIcon
            } else if (isConfirm) {
                return checkIcon
            } else if (isReset) {
                return arrowRotateCcwIcon
            } else if (!isSubmit && !isCancel) {
                return svgIcon
            }
            return isSubmit ? saveIcon : xIcon
        }, [disabled, isCancel, isConfirm, isReset, isSubmit, loading, svgIcon])

        const text = useMemo(() => {
            if (label) {
                return label
            }
            if (isCancel) {
                return 'Cancel'
            } else if (isConfirm) {
                return 'Confirm'
            } else if (isSubmit) {
                return 'Submit'
            } else if (isReset) {
                return 'Reset'
            }
            return mode === 'add' ? 'Add' : 'Edit'
        }, [isCancel, isConfirm, isReset, isSubmit, label, mode])

        return (
            <Root
                title={text}
                id={getId(`${mode}${BUTTON_PREFIX}${text}`, page)}
                rounded={ROUNDED}
                themeColor={isSubmit || isReset || isCancel || isConfirm ? 'primary' : 'base'}
                fillMode={isReset || isCancel ? 'outline' : 'solid'}
                {...others}
                type={mode === 'submit' || mode === 'reset' ? mode : 'button'}
                className={`${className} ${loading ? 'loading' : ''}`.trim()}
                svgIcon={svg}
                icon={loading ? 'loading' : icon}
                disabled={loading ? true : disabled}
                formNoValidate
            >
                <Mask className="button-mask" />
                {text}
            </Root>
        )
    },
)
