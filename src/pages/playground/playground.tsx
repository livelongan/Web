import { Stack } from '@mui/material'
import { observer } from 'mobx-react-lite'
import {
  ButtonBaseIcon,
  ButtonContained,
  ButtonContainedIcon,
  ButtonOutlined,
  ButtonText,
  LayoutPage,
} from '../../components'
import VerticalAlignTop from '@mui/icons-material/VerticalAlignTop'

const butttons: any[] = [
  'primary',
  'secondary',
  'error',
  'warning',
  'info',
  'success',
  'inherit',
]
export const Playground = observer(() => {
  return (
    <LayoutPage>
      {butttons.map((it) => (
        <Stack flexDirection='row' alignItems={'center'} key={it}>
          <ButtonContained color={it}>Contained</ButtonContained>
          <ButtonOutlined color={it}>Outlined</ButtonOutlined>
          <ButtonText color={it}>Text</ButtonText>
        </Stack>
      ))}
      <Stack flexDirection='row' alignItems={'center'}>
        <ButtonContained disabled>Contained</ButtonContained>
        <ButtonOutlined disabled>Outlined</ButtonOutlined>
        <ButtonText disabled>Text</ButtonText>
      </Stack>
      <Stack flexDirection='row' alignItems={'center'}>
        <ButtonContained loading>Contained</ButtonContained>
        <ButtonOutlined loading>Outlined</ButtonOutlined>
        <ButtonText loading>Text</ButtonText>
      </Stack>
      <Stack flexDirection='row' alignItems={'center'}>
        <ButtonContainedIcon>
          <VerticalAlignTop />
        </ButtonContainedIcon>
        <ButtonContainedIcon loading>
          <VerticalAlignTop />
        </ButtonContainedIcon>
        <ButtonContainedIcon disabled>
          <VerticalAlignTop />
        </ButtonContainedIcon>
        <ButtonBaseIcon>
          <VerticalAlignTop />
        </ButtonBaseIcon>
        <ButtonBaseIcon loading>
          <VerticalAlignTop />
        </ButtonBaseIcon>
        <ButtonBaseIcon disabled>
          <VerticalAlignTop />
        </ButtonBaseIcon>
      </Stack>
    </LayoutPage>
  )
})
