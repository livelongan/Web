import { Card, CardBody, CardHeader } from '@progress/kendo-react-layout'
import React, { ErrorInfo, PropsWithChildren } from 'react'
import { styled } from 'styled-components'

type State = {
    errorThrown: { error: Error; info: ErrorInfo; stack: { [key: string]: string } } | undefined
}
const Root = styled(Card)`
    margin: 20px;
    overflow: hidden;
    max-height: 100vh;
    width: calc(100vw - 40px);
    .k-card-body {
        overflow: auto;
    }
    .k-card-header {
        font-weight: 500;
    }
`

export class ErrorBoundary extends React.Component<PropsWithChildren<object>, State> {
    public constructor(props: object) {
        super(props)
        this.state = { errorThrown: undefined }
    }

    public static getDerivedStateFromError(error: any) {
        console.log(error)
        // 更新状态，以便下一次渲染将显示后备 UI。
        return { hasError: true }
    }

    public async componentDidCatch(error: Error, info: React.ErrorInfo): Promise<void> {
        const stack: { [key: string]: string } = {}
        try {
            const regex = /[^() ]*(\([^()]*\))/g // regular expression to find strings inside param
            const source = info.componentStack ? info.componentStack.toString() : ''

            let match = regex.exec(source)
            while (match) {
                const [wholeMatch, key] = match
                stack[key] = wholeMatch
                match = regex.exec(source)
            }
        } catch (err) {
            console.error('Error regex', (err as Error).toString())
        }
        this.setState({ errorThrown: { error, info, stack } })
    }

    public render(): React.ReactNode {
        const { errorThrown } = this.state
        const { children } = this.props
        if (errorThrown != null) {
            return (
                <Root>
                    <CardHeader>{errorThrown.error.message}</CardHeader>
                    {<CardBody>{JSON.stringify(errorThrown.stack, null, '\t')}</CardBody>}
                </Root>
            )
        }
        return children
    }
}
