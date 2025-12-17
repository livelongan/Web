import { observer } from 'mobx-react-lite'
import { Loading } from './loading'
import { LayoutMain } from '../layout'

export const LoadingMain = observer(() => {
  return (
    <LayoutMain>
      <Loading />
    </LayoutMain>
  )
})
