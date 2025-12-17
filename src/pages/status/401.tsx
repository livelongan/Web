import { observer } from 'mobx-react-lite'
import { useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { BaseButton, PageLayout } from '../../components'

const Root = styled(PageLayout)`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: -100px;
    color: var(--kendo-color-base-active);
    h1 {
        font-size: 10rem;
        margin: 0;
        padding: 0;
    }
    h2 {
        margin: 0;
        padding: 0;
    }
    p {
        color: var(--kendo-color-base-on-subtle);
    }
`
export const Authorization = observer(() => {
    const navigate = useNavigate()
    return (
        <Root>
            <h1>401</h1>
            <h2>No Authorization</h2>
            <p>Sorry, you has no authorization to looking for the web site.</p>
            <BaseButton
                label="Back to home"
                themeColor={'primary'}
                onClick={() => {
                    navigate('/', { replace: true })
                }}
            />
        </Root>
    )
})
