import { useEffect } from 'react'
import { useNavigate, useRouteError } from 'react-router-dom'

export const RouterError = () => {
    const error = useRouteError()
    const navigate = useNavigate()
    useEffect(() => {
        if (error) {
            navigate('/')
        }
    }, [error, navigate])
    return null
}
