import { Stack, Box } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { useRouteError, useNavigate } from 'react-router-dom'
import {
  ButtonContained,
  ButtonOutlined,
  TextNormal,
  TitleLevel1,
  TitleLevel2,
  TitleLevel3,
} from '../../components'

interface RouteError {
  status?: number
  statusText?: string
  message?: string
  data?: any
}

export const ErrorCatcher = observer(() => {
  const error = useRouteError() as RouteError
  const navigate = useNavigate()

  const getErrorMessage = () => {
    if (error?.status === 404) {
      return 'Page Not Found'
    }
    if (error?.status === 403) {
      return 'Access Denied'
    }
    if (error?.status === 500) {
      return 'Internal Server Error'
    }
    return error?.message || error?.statusText || 'Unknown Error Occurred'
  }

  const getErrorDetails = () => {
    return {
      status: error?.status,
      statusText: error?.statusText,
      message: error?.message,
      data: error?.data,
    }
  }

  return (
    <Stack
      sx={{
        minHeight: '80vh',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '32px',
      }}
    >
      <TitleLevel1 color='error' sx={{ fontSize: '6rem' }}>
        {error?.status || 'ERROR'}
      </TitleLevel1>

      <TitleLevel2>{getErrorMessage()}</TitleLevel2>

      <TextNormal>
        Sorry, there was a problem with the page. Please try again later or
        return to the homepage.
      </TextNormal>

      <Stack flexDirection='row' alignItems={'center'}>
        <ButtonContained onClick={() => navigate(-1)}>Back</ButtonContained>
        <ButtonOutlined onClick={() => navigate('/')}>Home</ButtonOutlined>
      </Stack>

      {/* Error Details (Development Mode) */}
      {/* {env.NODE_ENV === 'development' && ( */}
      <Box
        sx={{
          padding: '0 16px 8px',
          bgcolor: 'var(--background-secondary)',
          borderRadius: '8px',
          maxWidth: '600px',
          width: '100%',
        }}
      >
        <TitleLevel3>Error Details (Development Mode)</TitleLevel3>
        <TextNormal component={'pre'} sx={{ whiteSpace: 'break-spaces' }}>
          {JSON.stringify(getErrorDetails(), null, 2)}
        </TextNormal>
      </Box>
      {/* )} */}
    </Stack>
  )
})
