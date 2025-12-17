import _ from 'lodash'

const processEnv = process.env

export type VersionProps = {
    lastDate: Date
    lastCommit: string
    lastCommitUser: string
    lastCommitDate: string

    branchName: string
    buildDate: string
}
type EnvironmentVariables = {
    version: string
    name: string
    env: 'LOCAL' | 'ODC' | 'DEV' | 'UAT' | 'PROD'
    nodeEnvironment: typeof process.env.NODE_ENV
    basePath: string
    apiBaseUrl: string
    apiTimeout: string
    projectName: string
    commit?: VersionProps
}

export const env: EnvironmentVariables = Object.keys(processEnv).reduce(
    (acc: object, key: string) => {
        if (key.startsWith('REACT_APP_')) {
            const field = _.camelCase(key.replace(/^REACT_APP_/, ''))
            if (key.endsWith('_COMMIT')) {
                return {
                    ...acc,
                    [field]: (processEnv[key]
                        ? JSON.parse(`${processEnv[key]}`)
                        : undefined) as VersionProps,
                }
            }
            return {
                ...acc,
                [field]: processEnv[key],
            }
        }
        return acc
    },
    { nodeEnvironment: process.env.NODE_ENV },
) as EnvironmentVariables

export const isDevelopment = process.env.NODE_ENV === 'development'
