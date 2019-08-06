import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import {
  Input,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core';

import * as actions from '../actions';

const isValidValue = value => value.match(/^[а-яА-ЯёЁa-zA-Z0-9]+$/);

function NewAttributeForm({
  isOpen,
  close,
  createNewAttribute,
  formName,
  formType,
  formValue,
  editAttribute,
  formMode,
  schemaEditingElement,
  openError
}) {
  const [type, setType] = useState(formType);
  const [name, setName] = useState(formName);
  const [value, setValue] = useState(formValue);
  const [errors, setErrors] = useState({});
  const onClick = () => {
    const errorsObj = {};
    if (!name) {
      errorsObj.name = true;
    }
    if (!value && type === 'string') {
      errorsObj.value = true;
    }
    if (errorsObj.name || errorsObj.value) {
      setErrors(errorsObj);
      return
    }
    if (!schemaEditingElement[name] || formName === name) {
      const typeForm = type === 'string' ? value : undefined;
      close();
      if (formMode === 'create') {
        createNewAttribute(name, typeForm)
      } else {
        editAttribute(name, typeForm);
        close()
      }
    } else {
      openError()
    }
  };
  const onSelectChange = e => {
    setType(e.target.value);
    setValue('');
  };
  useEffect(
    () => {
      if (isOpen) {
        setType(formType);
        setName(formName);
        setValue(formValue);
        setErrors({});
      }
    },
    [isOpen, formType, formName, formValue]
  );

  const onNameChange = e => {
    const { value } = e.target;
    if (isValidValue(value) || !value) {
      setName(value);
    }
  };
  const onValueChange = e => {
    const { value } = e.target;
    if (isValidValue(value) || !value) {
      setValue(value);
    }
  };
  return (
    <Dialog open={isOpen} onClose={close}>
      <DialogTitle>
        {formMode === 'create' ? 'Создание' : 'Редактирование'} атрибута
      </DialogTitle>
      <DialogContent>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: 25 }}>
            <Input
              value={name}
              onChange={onNameChange}
              style={{ width: 300 }}
              placeholder="Название"
            />
            {errors.name && (
              <div style={{ color: '#d32f2f', fontFamily: 'Roboto' }}>
                Поле обязательно
              </div>
            )}
          </div>
          <Select
            style={{ marginBottom: 25, width: 300 }}
            value={type}
            onChange={onSelectChange}>
            <MenuItem
              value="string"
              style={{ backgroundColor: 'white', color: 'black' }}>
              Строка
            </MenuItem>
            <MenuItem
              value="component"
              style={{ backgroundColor: 'white', color: 'black' }}>
              Компонент
            </MenuItem>
          </Select>
          {type === 'string' && (
            <div>
              <Input
                style={{ width: 300 }}
                value={value}
                onChange={onValueChange}
                placeholder="Значение"
              />
              {errors.value && (
                <div style={{ color: '#d32f2f', fontFamily: 'Roboto' }}>
                  Поле обязательно
                </div>
              )}
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Отмена
        </Button>
        <Button onClick={onClick} color="primary">
          {formMode === 'create' ? 'Создать' : 'Редактировать'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const mapDispatchToProps = dispatch => ({
  createNewAttribute: (name, value) => dispatch(actions.createAttribute(name, value)),
  editAttribute: (name, value) => dispatch(actions.editAttribute(name, value)),
  openError: () => dispatch(actions.openError())
});

const mapStateToProps = state => ({
  formName: state.formName,
  formType: state.formType,
  formValue: state.formValue,
  formMode: state.formMode,
  schemaEditingElement: state.schemaEditingElement
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewAttributeForm)
