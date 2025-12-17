import type {
  AxiosResponse,
  InternalAxiosRequestConfig,
  ResponseType,
} from 'axios'
import type React from 'react'

export type BackendResponse = {
  Response: AxiosResponse | null
  Data: any
  Message: string
  ErrorCode: string
  StatusCode: number | null
  Success: boolean
}

export type BackendDownloadResponse = Omit<BackendResponse, 'Data'> & {
  Response: AxiosResponse | null
  Data: {
    blob: BlobPart | null
    fileName: string
  }
  Message: string
  ErrorCode: string
  StatusCode: number | null
  Success: boolean
}

export type BackendInformation = {
  type?: 'query' | 'update' | 'delete'
  errorMessage?: string | React.ReactNode
  successMessage?: string | React.ReactNode
  [statusCode: number]: string | React.ReactNode
  [errorCode: string]: string | React.ReactNode
}

export type BackendConfig = Omit<InternalAxiosRequestConfig, 'headers'> & {
  Information?: BackendInformation
  headers?: Record<string, string>
}
export type BackendDownloadConfig = Omit<
  InternalAxiosRequestConfig,
  'headers' | 'responseType'
> & {
  Information?: BackendInformation & {
    generate?: boolean
    fileName?: string
  }
  headers?: Record<string, string>
  responseType: ResponseType
}
