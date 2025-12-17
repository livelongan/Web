import { types } from 'mobx-state-tree'
import type { SnapshotOut } from 'mobx-state-tree'
import type { ThemeModeType } from '../models/base'

export const BaseStoreModel = types
  .model('BaseStoreModel')
  .props({
    openMenu: types.boolean,
    openPalette: types.boolean,
    themeMode: types.frozen<ThemeModeType>('light'),
    notifications: types.array(types.frozen<any>()),
  })
  .views(() => ({}))
  .actions((self) => ({
    setOpenMenu(open: boolean) {
      self.openMenu = open
    },
    setOpenPalette(open: boolean) {
      self.openPalette = open
    },
    setThemeMode(mode: ThemeModeType) {
      self.themeMode = mode
    },
  }))

export type BaseStoreType = SnapshotOut<typeof BaseStoreModel>
