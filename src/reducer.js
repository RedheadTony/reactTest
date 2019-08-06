import {
  CREATE_ATTRIBUTE,
  EDIT,
  DELETE,
  OPEN_ERROR,
  CLOSE_ERROR,
  OPEN_CREATING_DIALOG,
  OPEN_EDITING_DIALOG,
  OPEN_DELETING_DIALOG,
  CLOSE_CREATING_DIALOG,
  CLOSE_DELETING_DIALOG
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
  deletingDialogIsOpen: false
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
    case DELETE: {
      const newResult = { ...state.result }
      const changeableValue = getChangeableValue(newResult, state.pathForForm)
      delete changeableValue[state.deletingName]
      return {
        ...state,
        result: newResult
      };
    }
    case OPEN_ERROR:
      return {
        ...state,
        errorIsOpen: true
      };
    case CLOSE_ERROR:
      return {
        ...state,
        errorIsOpen: false
      };
    case OPEN_CREATING_DIALOG:
      return {
        ...state,
        schemaEditingElement: action.schema,
        pathForForm: action.path,
        formIsOpen: true,
        formMode: 'create',
        formName: '',
        formValue: '',
        formType: 'string'
      };
    case CLOSE_CREATING_DIALOG:
      return {
        ...state,
        formIsOpen: false,
      };
    case OPEN_EDITING_DIALOG:
      return {
        ...state,
        formIsOpen: true,
        formMode: 'edit',
        schemaEditingElement: action.schema,
        pathForForm: action.path,
        formName: action.name,
        formValue: action.value,
        formType: action.formType
      };
    case OPEN_DELETING_DIALOG:
      return {
        ...state,
        deletingDialogIsOpen: true,
        pathForForm: action.path,
        deletingName: action.name
      };
    case CLOSE_DELETING_DIALOG:
      return {
        ...state,
        deletingDialogIsOpen: false
      };
    default:
      return state
  }
}
