import { Pager, PagerProps } from '@progress/kendo-react-data-tools'
import { styled } from 'styled-components'
import { GAP } from '../../constants'
import { Typography } from '../typography'

const Root = styled.div`
    padding: 0 ${GAP.normal}px;
    border-color: transparent;
    display: flex;
    flex-direction: row-reverse;
    background-color: var(--kendo-color-surface-alt);
    align-items: center;
    .k-input-inner {
        padding: 2px ${GAP.normal}px;
    }
    .k-pager-sizes .k-dropdownlist {
        width: fit-content;
    }
    .k-pager {
        flex: 1;
        margin-left: 20px;
    }
`
const Total = styled.div``
const PagerRoot = styled(Pager)`
    border: none;
    background-color: unset;
    padding: 4px;
    &:focus,
    &.k-focus {
        box-shadow: unset;
    }
    .k-dropdown-list {
        border-radius: 0;
    }
`

type IProps = PagerProps & {
    mode?: 'cell' | 'row'
    selection: number
    noPaging?: boolean
}

export const GridPager = (props: IProps) => {
    const { total, noPaging = false, mode = 'row', selection, ...others } = props

    return (
        <Root>
            {noPaging && (
                <Total>
                    1 - {total} of {total} items
                </Total>
            )}

            {!noPaging && <PagerRoot {...others} total={total} responsive={false} info={false} />}

            {mode === 'row' && (
                <Typography themeColor={selection > 0 ? 'primary' : undefined}>
                    {selection} selected
                </Typography>
            )}
        </Root>
    )
}
