import { useLocation } from 'react-router'
import { useNavigate } from 'react-router'

export const useAppPosition = () => {
  const location = useLocation()
  const navigate = useNavigate()

  return {
    location,
    navigate,
  }
}
