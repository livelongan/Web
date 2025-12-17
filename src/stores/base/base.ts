import { cast, SnapshotOut, types } from 'mobx-state-tree'
import { MenuItemProps, NotificationDto, StoreModalProps } from '../../components'
import { NOTIFICATION_COUNT } from '../../constants'
import { PaletteMode, ThemePalette } from '../../theme'
import { ThemePaletteModel } from '../../models'

const MenuModel = types.model('ModalModel').props({
    width: types.number,
    collapse: types.maybe(types.boolean),
    dragging: types.maybe(types.boolean),
    expandIds: types.array(types.string),
    route: types.maybe(types.frozen<MenuItemProps>()),
    routePaths: types.array(types.frozen<MenuItemProps>()),
})

const ModalModel = types.model('ModalModel').props({
    data: types.array(types.frozen<StoreModalProps>()),
    staging: types.maybe(types.boolean),
    resizing: types.maybe(types.boolean),
})

export const BaseStoreModel = types
    .model('BaseStoreModel')
    .props({
        notifications: types.array(types.frozen<NotificationDto>()),
        theme: ThemePaletteModel,

        menu: MenuModel,
        modal: ModalModel,
    })
    .views((self) => ({}))
    .actions((self) => ({
        setThemeMode(mode: PaletteMode) {
            self.theme.mode = mode
        },
        setThemeType(value: ThemePalette) {
            self.theme.value = value
        },
        setMenuCollapse(collapse: boolean) {
            self.menu.collapse = collapse
        },
        setMenuWidth(width: number) {
            self.menu.width = width
        },
        setMenuDragging(dragging: boolean) {
            self.menu.dragging = dragging
        },
        setMenuRoute(route: MenuItemProps | undefined) {
            self.menu.route = route
        },
        setMenuRoutePaths(routes: MenuItemProps[]) {
            self.menu.routePaths = cast(routes)
        },
        toggleMenuExpandedId(id: string) {
            const index = self.menu.expandIds.findIndex((it) => it === id)
            if (index >= 0) {
                self.menu.expandIds.splice(index, 1)
            } else {
                self.menu.expandIds.push(id)
            }
        },
        setMenuExpandedId(ids: string[]) {
            self.menu.expandIds = cast(ids)
        },
        addModal(id: string, modal: StoreModalProps['modal']) {
            self.modal.resizing = !self.modal.resizing
            const has = self.modal.data.findIndex((it) => it.id === id)
            if (has >= 0) {
                self.modal.data.splice(has, 1)
            }
            self.modal.data.push({ id, modal })
        },
        findModal(id: string | null): StoreModalProps['modal'] | null {
            if (!id) {
                return null
            }
            const has = self.modal.data.find((it) => it.id === id)
            return has?.modal ?? null
        },
        delModal(id: string) {
            const has = self.modal.data.findIndex((it) => it.id === id)
            if (has >= 0) {
                self.modal.data.splice(has, 1)
            }
        },
        changeModalStage() {
            self.modal.staging = !self.modal.staging
        },
        addNotifications(dto: NotificationDto) {
            const data = [...self.notifications]
            if (data.length > NOTIFICATION_COUNT - 1) {
                data.splice(0, 1)
            }
            data.push({ ...dto })
            self.notifications = cast(data)
        },
        delNotifications(id: string) {
            const index = self.notifications.findIndex((it) => it.id === id)
            if (index >= 0) {
                self.notifications.splice(index, 1)
            }
        },
    }))

export type BaseStoreType = SnapshotOut<typeof BaseStoreModel>
