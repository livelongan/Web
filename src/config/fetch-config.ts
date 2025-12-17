import axios from 'axios'
import type { SettingType } from './types'
import { env } from '../env'

let caches: SettingType | null = null
export const WEB_CONFIG: SettingType = {
  THEME: 'light',
}

export const fetchConfig = async () => {
  if (caches) {
    Promise.resolve(caches)
  }
  try {
    const response = await axios.get(`${env.publicUrl}/config.json`)
    caches = response.data as SettingType
    for (let key in caches) {
      const prop = key as keyof SettingType
      WEB_CONFIG[prop] = caches[prop]
    }
    return WEB_CONFIG
  } catch (error) {
    console.error('fetch public config error', error)
    return WEB_CONFIG
  }
}
