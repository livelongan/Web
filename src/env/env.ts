import _ from 'lodash'

const processEnv = import.meta.env

type EnvironmentVariables = {
  version: string
  name: string
  NODE_ENV: 'development' | 'production' //local, sit, uat,...
  basePath: string
  baseApiUrl: string
  projectName: string
  publicUrl: string

  theme: 'light' | 'dark'
  backendApi: string
  maintenanceMode: boolean
  fetchTimeout: number
}

export const env: EnvironmentVariables = Object.keys(processEnv).reduce(
  (acc: object, key: string) => {
    if (key.startsWith('VITE_')) {
      const field = _.camelCase(key.replace(/^VITE_/, ''))
      let value = processEnv[key]
      if (field === 'VITE_MAINTENANCE_MODE') {
        value = value === 'true'
      } else if (field === 'VITE_FETCH_TIMEOUT') {
        value = Number(value)
      }
      return {
        ...acc,
        [field]: value,
      }
    }
    return acc
  },
  { nodeEnvironment: processEnv.NODE_ENV },
) as EnvironmentVariables

export const isDevelopment = processEnv.NODE_ENV === 'development'
