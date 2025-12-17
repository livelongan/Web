import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import fs from 'fs'
import type { EnvironmentProps } from './src/env'

const PRESET_CONFIG: EnvironmentProps = {
  THEME: 'light',
  BACKEND_API: 'http://localhost:3000/api',
  FETCH_TIMEOUT: 60000,
}

const loadEnvironmentConfig = (): Partial<EnvironmentProps> | null => {
  const configsDir = path.join(process.cwd(), 'public')
  const configFileName = 'config. json'
  const envConfigPath = path.join(configsDir, configFileName)
  const fallbackConfigPath = path.join(configsDir, 'config.json')

  let finalConfigPath = fallbackConfigPath
  if (fs.existsSync(envConfigPath) && configFileName !== 'config. json') {
    finalConfigPath = envConfigPath
  }
  try {
    const config = JSON.parse(fs.readFileSync(finalConfigPath, 'utf-8'))
    return { ...PRESET_CONFIG, ...config }
  } catch (error) {
    console.warn(
      `Failed to load config from ${finalConfigPath}, using empty config`,
      error,
    )
  }
  return { ...PRESET_CONFIG }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  const webConfig = loadEnvironmentConfig()

  if (webConfig) {
    Object.entries(webConfig).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        process.env[`VITE_${key}`] = value || value === false ? `${value}` : ''
      }
    })
  }

  return {
    base: env.VITE_PUBLIC_URL || '/',
    plugins: [react()],
    envPrefix: 'VITE_',
    build: {
      outDir: 'dist',
      assetsDir: 'static',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'static/js/[name]-[hash].js',
          chunkFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: ({ name }) => {
            if (/\.css$/.test(name ?? '')) {
              return 'static/css/[name]-[hash] [extname]'
            }
            if (/\.(js|mjs)$/.test(name ?? '')) {
              return 'static/js/[name]-[hash] [extname]'
            }
            return 'static/media/[name]-[hash] [extname]'
          },
        },
      },
    },
    server: {
      port: 3000,
      open: true,
      // https: {
      //   key: './certs/server.key',
      //   cert: './certs/server.crt',
      // },
      proxy: {
        '/backend/api': {
          target: env.VITE_BACKEND_API,
          changeOrigin: true,
          secure: true,
          rewrite: (path) => path.replace(/^\/backend\/api/, '/api'),
        },
      },
    },
  }
})
