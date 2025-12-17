import { observer } from 'mobx-react-lite'
import { PropsWithChildren } from 'react'
import { styled } from 'styled-components'
import { SVG_NAMESPACES } from '../../constants'

const Root = styled.svg`
    color: var(--kendo-color-on-app-surface);
`
type IProps = PropsWithChildren<React.SVGProps<SVGSVGElement>>
export const SVG = observer(({ children, ...others }: IProps) => {
    return (
        <Root width={'100%'} height={'100%'} xmlns={SVG_NAMESPACES} {...others}>
            {children}
        </Root>
    )
})
