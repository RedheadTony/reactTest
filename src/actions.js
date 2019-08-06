import * as types from './types'

export const createAttribute = (name, value) => ({
  type: types.CREATE_ATTRIBUTE,
  name,
  value
})

export const openCreatingDialog = (schema, path) => ({
  type: types.OPEN_CREATING_DIALOG,
  schema,
  path
})

export const openEditingForm = (name, value, type, schema, path) => ({
  type: types.OPEN_EDITING_DIALOG,
  schema,
  path,
  name,
  value,
  formType: type
})

export const closeCreatingForm = () => ({
  type: types.CLOSE_CREATING_DIALOG
})

export const openDeletingDialog = (path, name) => ({
  type: types.OPEN_DELETING_DIALOG,
  path,
  name
})

export const closeDeletingDialog = () => ({
  type: types.CLOSE_DELETING_DIALOG
})

export const editAttribute = (name, value) => ({
  type: types.EDIT,
  name,
  value
})

export const deleteAttribute = () => ({
  type: types.DELETE
})

export const openError = () => ({
  type: types.OPEN_ERROR
})

export const closeError = () => ({
  type: types.CLOSE_ERROR
})
