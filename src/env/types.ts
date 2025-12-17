export type EnvironmentProps = {
  THEME: 'light' | 'dark'
  BACKEND_API: string
  MAINTENANCE_MODE?: boolean
  FETCH_TIMEOUT?: number
}
