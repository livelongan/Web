import { types } from 'mobx-state-tree'
export const AccountModel = types.model('AccountModel', {
  id: types.identifier,
  username: types.string,
  email: types.string,
})
