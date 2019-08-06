import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Snackbar, Button, SnackbarContent } from '@material-ui/core';

import Element from './Element';
import Form from './NewAttributeForm';
import DeletingForm from './DeletingForm';
import * as actions from '../actions';

function RootComponent(props) {
  const {
    pathForForm,
    deletingName,
    setDeletingName,
    deletingDialogVisible,
    setDeletingDialogVisible,
    schema,
    closeError,
    errorIsOpen,
    setPath,
    clearForm,
    setEditDate,
    deleteAttr,
    setFormMode,
    setEditingSchema
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  const openDeletingDialog = () => setDeletingDialogVisible(true);

  const closeDeletingDialog = () => setDeletingDialogVisible(false);

  return (
    <>
      <div style={{ paddingTop: 100, paddingBottom: 100, overflowX: 'auto' }}>
        <div
          style={{
            paddingRight: 50,
            paddingLeft: 50,
            display: 'inline-block'
          }}>
          <Form isOpen={isOpen} close={close} />
          <DeletingForm
            onDelete={deleteAttr}
            open={deletingDialogVisible}
            path={pathForForm}
            name={deletingName}
            close={closeDeletingDialog}
          />
          <Snackbar
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left'
            }}
            autoHideDuration={6000}
            onClose={closeError}
            open={errorIsOpen}>
            <SnackbarContent
              message={
                <span style={{ color: '#FFFFFF' }}>
                  Атрибут уже существует
                </span>
              }
              style={{ backgroundColor: '#d32f2f' }}
              action={[
                <Button
                  key="undo"
                  style={{ color: '#FFFFFF' }}
                  size="small"
                  onClick={closeError}>
                  Close
                </Button>
              ]}
            />
          </Snackbar>
          <Element
            openDeletingDialog={openDeletingDialog}
            setDeletingName={setDeletingName}
            openAddingForm={open}
            path=""
            schema={schema}
            clearForm={clearForm}
            setEditDate={setEditDate}
            setPath={setPath}
            setFormMode={setFormMode}
            setEditingSchema={setEditingSchema}
          />
        </div>
      </div>
      <div style={{
          paddingRight: 50,
          paddingLeft: 50
        }}>
        Схема в формате JSON:
        <br />
        {JSON.stringify(schema)}
      </div>
    </>
  )
}

const mapStateToProps = state => ({
  schema: state.result,
  errorIsOpen: state.errorIsOpen,
  deletingDialogVisible: state.deletingDialogVisible,
  pathForForm: state.pathForForm,
  deletingName: state.deletingName
});

const mapDispatchToProps = dispatch => ({
  closeError: () => dispatch(actions.closeError()),
  setPath: path => dispatch(actions.setPathForForm(path)),
  clearForm: () => dispatch(actions.clearForm()),
  setEditDate: (name, value, type) =>
    dispatch(actions.setCreatingFormDate(name, value, type)),
  deleteAttr: () => dispatch(actions.deleteAttribute()),
  setFormMode: mode => dispatch(actions.setFormMode(mode)),
  setEditingSchema: schema => dispatch(actions.setEditingSchema(schema)),
  setDeletingDialogVisible: visible =>
    dispatch(actions.setDeletingDialogVisible(visible)),
  setDeletingName: name => dispatch(actions.setDeletingName(name))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComponent)
