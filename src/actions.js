import * as types from './types';

export const createAttribute = (name, value) => ({
  type: types.CREATE_ATTRIBUTE,
  name,
  value
});

export const editAttribute = (name, value) => ({
  type: types.EDIT,
  name,
  value
});

export const setPathForForm = path => ({
  type: types.SET_PATH_FOR_FORM,
  path
});

export const setCreatingFormDate = (name, value, type, mode) => ({
  type: types.SET_CREATING_FORM_DATE,
  name,
  value,
  formType: type,
  mode
});

export const clearForm = () => ({
  type: types.CLEAR_FORM
});

export const deleteAttribute = () => ({
  type: types.DELETE
});

export const setFormMode = mode => ({
  type: types.SET_FORM_MODE,
  mode
});

export const openError = () => ({
  type: types.OPEN_ERROR
});

export const closeError = () => ({
  type: types.CLOSE_ERROR
});

export const setEditingSchema = schema => ({
  type: types.SET_EDITING_SCHEMA,
  schema
});

export const setDeletingName = name => ({
  type: types.SET_DELETING_NAME,
  name
});

export const setDeletingDialogVisible = visible => ({
  type: types.SET_DELETING_DIALOG_VISIBLE,
  visible
});
