import { API } from '../../../axios'
import { getBaseSettingsUrl } from './base.url'

export const getBaseSettingApi = (params: any): Promise<any> => {
  return API.post(getBaseSettingsUrl, params, {
    Information: {
      type: 'update',
    },
  })
}
