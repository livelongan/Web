import { Tooltip } from '@progress/kendo-react-tooltip'
import { ReactNode, useMemo, useRef, useState } from 'react'

type TooltipHookProps = {
    attribute?: string
}

type TooltipHandle = {
    content: string
    setContent: React.Dispatch<React.SetStateAction<string>>
    tooltip: React.RefObject<Tooltip>
    showTooltip: (event: React.MouseEvent) => void
    removeTooltip: () => void
    TooltipAdapter: ReactNode
    setTargetElement: React.Dispatch<React.SetStateAction<HTMLDivElement | null>>
}

export const useTooltip = (props?: TooltipHookProps): TooltipHandle => {
    const { attribute = 'tooltip' } = props ?? {}
    const tooltip = useRef<Tooltip>(null)
    const [content, setContent] = useState('')
    const [targetElement, setTargetElement] = useState<HTMLDivElement | null>(null)

    const showTooltip: TooltipHandle['showTooltip'] = (event) => {
        setContent((event.target as HTMLElement)?.getAttribute(attribute) ?? '')
    }
    const removeTooltip = () => {
        setContent('')
    }

    const TooltipAdapter = useMemo(
        () => (
            <Tooltip
                ref={tooltip}
                anchorElement="target"
                targetElement={targetElement}
                openDelay={0}
                style={{ zIndex: 999999 }}
            />
        ),
        [targetElement],
    )

    return {
        tooltip,
        content,
        setContent,
        showTooltip,
        removeTooltip,
        TooltipAdapter,
        setTargetElement,
    }
}
