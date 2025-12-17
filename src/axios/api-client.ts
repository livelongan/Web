import axios, {
  AxiosError,
  type AxiosRequestConfig,
  type AxiosResponse,
  type InternalAxiosRequestConfig,
} from 'axios'
import type {
  BackendConfig,
  BackendDownloadConfig,
  BackendDownloadResponse,
  BackendResponse,
} from './type'
import { getResponseFilename } from '../tools'

export const AxiosConfig = {
  baseURL: '',
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
}
const DEFAULT_RESPONSE: BackendResponse = {
  Response: null,
  Data: null,
  Message: '',
  ErrorCode: '',
  StatusCode: null,
  Success: false,
}
const requestSuccess = (config: BackendConfig) => {
  return config as InternalAxiosRequestConfig
}
const requestError = (error: AxiosError) => {
  return Promise.resolve(error)
}
const responseSuccess = (response: AxiosResponse) => {
  return response
}
const responseError = (error: AxiosError) => {
  return Promise.resolve(error)
}

const instance = axios.create(AxiosConfig)
instance.interceptors.request.use(requestSuccess, requestError)
instance.interceptors.response.use(responseSuccess, responseError)

const handleSuccessResponse = (response: AxiosResponse): BackendResponse => {
  return {
    ...DEFAULT_RESPONSE,
    Response: response,
    Data: response.data,
    Message: response.statusText,
    ErrorCode: '',
    StatusCode: response.status,
    Success: response.status >= 200 && response.status < 300,
  }
}
const handleSuccessDownload = (response: AxiosResponse): BackendResponse => {
  const disposition = response.headers['content-disposition'] ?? ''
  const filename = getResponseFilename(disposition)
  return {
    ...DEFAULT_RESPONSE,
    Response: response,
    Data: {
      blob: response.data,
      fileName: filename,
    },
    Message: response.statusText,
    ErrorCode: '',
    StatusCode: response.status,
    Success: response.status >= 200 && response.status < 300,
  }
}
const handleErrorResponse = (response: AxiosResponse): BackendResponse => {
  return {
    ...DEFAULT_RESPONSE,
    Response: response,
    Data: response.data,
    Message: response.statusText,
    ErrorCode: '',
    StatusCode: response.status,
    Success: false,
  }
}

export const API = {
  post: (
    url: string,
    params?: AxiosRequestConfig['data'],
    config?: BackendConfig,
  ): Promise<BackendResponse> => {
    return instance
      .post(url, params, config)
      .then((response) => {
        return handleSuccessResponse(response)
      })
      .catch((error) => {
        return handleErrorResponse(error.response as AxiosResponse)
      })
  },
  get: (
    url: string,
    params?: AxiosRequestConfig['params'],
    config?: BackendConfig,
  ): Promise<BackendResponse> => {
    return instance
      .get(url, { params: params, ...config })
      .then((response) => {
        return handleSuccessResponse(response)
      })
      .catch((error) => {
        return handleErrorResponse(error.response as AxiosResponse)
      })
  },
  download: (
    url: string,
    params?: AxiosRequestConfig['data'],
    config?: BackendDownloadConfig,
  ): Promise<BackendDownloadResponse> => {
    return instance
      .post(url, params, config)
      .then((response) => {
        return handleSuccessDownload(response)
      })
      .catch(async (error) => {
        const text = await error.response.data.text()
        const json = JSON.parse(text)
        error.response.data = json
        return handleErrorResponse(error.response as AxiosResponse)
      })
  },
}
