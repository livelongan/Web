import { FetchParameterType, ProjectSourceType } from '../models'
// import axios from 'axios'
import { env } from '../utils'

export const queryProjectListUrl = `${env.apiBaseUrl}/Client/GetAllProject`

export const createProjectUrl = `${env.apiBaseUrl}/Client/CreateProject`

export const updateProjectUrl = `${env.apiBaseUrl}/Client/UpdateProject`

export const deleteProjectListUrl = `${env.apiBaseUrl}/Client/DeleteProject`

export const fetchProjectApi = async (
    params: FetchParameterType,
    // information?: ApiInformation,
): Promise<ProjectSourceType | null> => {
    return null
    // return axios.post(
    //     queryProjectListUrl,
    //     params,
    //     // information
    //     //     ? {
    //     //           ApiInformation: information,
    //     //       }
    //     //     : undefined,
    // )
}
