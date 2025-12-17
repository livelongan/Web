import { forwardRef, PropsWithChildren, RefObject, useImperativeHandle, useRef } from 'react'
import { styled } from 'styled-components'
import { StackLayout, StackLayoutHandle, StackLayoutProps } from '@progress/kendo-react-layout'
import { PAGE_SUFFIX } from '../../constants'
import { uniqueId } from 'lodash'

const Root = styled(StackLayout)`
    height: 100%;
    width: 100%;
    display: flex;
    min-height: 0;
    color: var(--kendo-color-on-app-surface);
    flex-flow: wrap;
`

type IProps = PropsWithChildren<
    Omit<StackLayoutProps, 'align'> & {
        id?: string
        direction?: 'row' | 'column'
        gap?: number
        ref?: RefObject<StackLayoutHandle>
    }
>
type PageLayoutHandle = {
    element: HTMLDivElement | null
}

export const PageLayout = forwardRef<PageLayoutHandle, IProps>((props, ref) => {
    const { id, className = '', direction = 'column', gap = 0, children, ...others } = props
    const pageRef = useRef<StackLayoutHandle>(null)
    const pid = id ?? uniqueId()

    useImperativeHandle(ref, () => {
        const handler: PageLayoutHandle = {
            element: pageRef.current?.element ?? null,
        }
        return handler
    }, [])

    return (
        <Root
            className={`page-layout ${className}`.trim()}
            {...others}
            ref={pageRef}
            id={`${pid}${PAGE_SUFFIX}`}
            data-page={id}
            align={{ horizontal: 'start' }}
            style={{
                flexDirection: direction,
                gap: gap,
                ...(others.style ?? {}),
            }}
        >
            {children}
        </Root>
    )
})
