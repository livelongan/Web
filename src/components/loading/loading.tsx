import { memo } from 'react'
import { styled } from 'styled-components'

const Root = styled('div')(() => ``)
export const Loading = memo(() => {
    return (
        <Root>
            <div className="k-loading-mask">
                <div className="k-loading-text" />
                <div className="k-loading-image" />
                <div className="k-loading-color" />
            </div>
        </Root>
    )
})
