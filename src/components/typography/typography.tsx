import { observer } from 'mobx-react-lite'
import { PropsWithChildren, useMemo } from 'react'
import { styled } from 'styled-components'
import {
    KendoReactComponentBaseProps,
    Typography as KendoTypography,
} from '@progress/kendo-react-common'

const Large = styled(KendoTypography.h4)``
const H1 = styled(KendoTypography.h5)``
const H2 = styled(KendoTypography.h6)``
const Paragraph = styled(KendoTypography.p)``
const Code = styled(KendoTypography.code)``
const Pre = styled(KendoTypography.pre)``
const Span = styled.span``

export type TypographyProps = PropsWithChildren<KendoReactComponentBaseProps> & {
    style?: React.CSSProperties
    className?: string
    title?: string
    textAlign?: 'left' | 'right' | 'center' | 'justify' | undefined
    fontSize?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' | undefined
    fontWeight?: 'light' | 'normal' | 'bold' | undefined
    textTransform?: 'lowercase' | 'uppercase' | 'capitalize' | undefined
    themeColor?: 'inherit' | 'primary' | 'info' | 'success' | 'warning' | 'error' | undefined
    type?: 'h1' | 'h2' | 'large' | 'p' | 'code' | 'pre' | 'span'
}

const SIZES = {
    xsmall: 'xs',
    small: 'sm',
    medium: 'md',
    large: 'lg',
    xlarge: 'xl',
}
export const Typography = observer<TypographyProps>(({ children, type = 'span', ...others }) => {
    const {
        className = '',
        themeColor,
        fontSize,
        textAlign,
        fontWeight,
        textTransform,
        ...spans
    } = others

    const getClassName = useMemo(() => {
        const cls: string[] = []
        if (themeColor) {
            cls.push(`k-color-${themeColor}`)
        }
        if (fontSize) {
            cls.push(`k-fs-${SIZES[fontSize]}`)
        }
        if (textAlign) {
            cls.push(`k-text-${textAlign}`)
        }
        if (fontWeight) {
            cls.push(`k-font-${fontWeight}`)
        }
        if (textTransform) {
            cls.push(`k-text-${textTransform}`)
        }
        return `${className} ${cls.join(' ')}`.trim()
    }, [className, fontSize, fontWeight, textAlign, textTransform, themeColor])

    const Root = useMemo(() => {
        if (type === 'p') {
            return Paragraph
        } else if (type === 'h1') {
            return H1
        } else if (type === 'h2') {
            return H2
        } else if (type === 'large') {
            return Large
        }
        return type === 'code' ? Code : Pre
    }, [type])
    return type === 'span' ? (
        <Span {...spans} className={getClassName}>
            {children}
        </Span>
    ) : (
        <Root {...others}>{children}</Root>
    )
})
