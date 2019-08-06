import {
  CREATE_ATTRIBUTE,
  EDIT,
  SET_PATH_FOR_FORM,
  SET_CREATING_FORM_DATE,
  CLEAR_FORM,
  DELETE,
  SET_FORM_MODE,
  OPEN_ERROR,
  CLOSE_ERROR,
  SET_EDITING_SCHEMA,
  SET_DELETING_NAME,
  SET_DELETING_DIALOG_VISIBLE
} from './types'

const init = {
  result: {},
  formIsOpen: false,
  formName: '',
  formType: 'string',
  formValue: '',
  formMode: 'create',
  schemaEditingElement: {},
  pathForForm: '',
  errorIsOpen: false,
  deletingName: '',
  deletingDialogVisible: false
}

const getChangeableValue = (obj, pathForForm) => {
  let changeableValue = obj
  if (pathForForm) {
    const keysArray = pathForForm.split('.')
    keysArray.forEach(key => {
      changeableValue = changeableValue[key]
    })
  }
  return changeableValue
}

const valueIsChanged = (prev, next) => {
  if (typeof prev === 'object' && typeof next === 'undefined') return false
  if (typeof prev === 'undefined' && typeof next === 'string') return true
  if (typeof prev === 'string') {
    if (prev !== next) return true
    return false
  }
  return false
}

export default function stuff(state = init, action) {
  switch (action.type) {
    case CREATE_ATTRIBUTE: {
      const newResult = { ...state.result }
      const changeableValue = getChangeableValue(newResult, state.pathForForm)
      changeableValue[action.name] = action.value || {}
      return {
        ...state,
        result: newResult
      }
    }
    case EDIT: {
      const newResult = { ...state.result }
      if (action.name === state.formName) {
        if (action.value !== state.formValue) {
          const changeableValue = getChangeableValue(
            newResult,
            state.pathForForm
          )
          changeableValue[action.name] = action.value || {}
          return {
            ...state,
            result: newResult
          }
        } else {
          return state
        }
      } else {
        if (valueIsChanged(action.value, state.formValue)) {
          // создать новый атрибут
          const changeableValue = getChangeableValue(
            newResult,
            state.pathForForm
          )
          changeableValue[action.name] = action.value || {}
          // удалить старый
          delete changeableValue[state.formName]
          return {
            ...state,
            result: newResult
          }
        } else {
          const changeableValue = getChangeableValue(
            newResult,
            state.pathForForm
          )
          // копировать старое значение
          if (typeof changeableValue[state.formName] === 'string') {
            changeableValue[action.name] = changeableValue[state.formName]
          } else {
            changeableValue[action.name] = {
              ...changeableValue[state.formName]
            }
          }

          // удалить старый
          delete changeableValue[state.formName]
          return {
            ...state,
            result: newResult
          }
        }
      }
    }
    case SET_PATH_FOR_FORM:
      return {
        ...state,
        pathForForm: action.path
      }
    case SET_CREATING_FORM_DATE:
      return {
        ...state,
        formName: action.name,
        formType: action.formType,
        formValue: action.value
      }
    case CLEAR_FORM:
      return {
        ...state,
        formName: '',
        formType: 'string',
        formValue: ''
      }
    case DELETE: {
      const newResult = { ...state.result }
      const changeableValue = getChangeableValue(newResult, state.pathForForm)
      delete changeableValue[state.deletingName]
      return {
        ...state,
        result: newResult
      }
    }
    case SET_FORM_MODE:
      return {
        ...state,
        formMode: action.mode
      }
    case OPEN_ERROR:
      return {
        ...state,
        errorIsOpen: true
      }
    case CLOSE_ERROR:
      return {
        ...state,
        errorIsOpen: false
      }
    case SET_EDITING_SCHEMA:
      return {
        ...state,
        schemaEditingElement: action.schema
      }
    case SET_DELETING_NAME:
      return {
        ...state,
        deletingName: action.name
      }
    case SET_DELETING_DIALOG_VISIBLE:
      return {
        ...state,
        deletingDialogVisible: action.visible
      }
    default:
      return state
  }
}
