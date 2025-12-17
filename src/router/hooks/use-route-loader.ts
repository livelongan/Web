import { useLoaderData } from 'react-router-dom'
import type { RouterProps } from '../types'

export type RouteLoaderType = {
  route: RouterProps
}

export function useRouteLoader(): RouteLoaderType {
  return useLoaderData() as RouteLoaderType
}
