/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_NAME: string
  readonly VITE_VERSION: string
  readonly VITE_BASE_PATH: string
  readonly VITE_BASE_API_URL: string
  readonly VITE_PROJECT_NAME: string
  readonly VITE_BACKEND_API: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
