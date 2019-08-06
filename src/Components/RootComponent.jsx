import React from 'react';
import { connect } from 'react-redux';
import { Snackbar, Button, SnackbarContent } from '@material-ui/core';
import styled from 'styled-components';

import Element from './Element';
import Form from './NewAttributeForm';
import DeletingForm from './DeletingForm';
import * as actions from '../actions';

const TreeWrapper = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
  overflow-x: auto
`;

const TreeContainer = styled.div`
  padding-right: 50px;
  padding-left: 50px;
  display: inline-block;
`;

const ResultWrapper = styled.div`
  padding-right: 50px;
  padding-left: 50px;
`;

function RootComponent(props) {
  const {
    pathForForm,
    deletingName,
    deletingDialogIsOpen,
    schema,
    closeError,
    errorIsOpen,
    deleteAttr,
    openCreatingDialog,
    formIsOpen,
    closeCreatingForm,
    openEditingForm,
    openDeletingDialog,
    closeDeletingDialog
  } = props;

  return (
    <>
      <TreeWrapper>
        <TreeContainer>
          <Form isOpen={formIsOpen} close={closeCreatingForm} />
          <DeletingForm
            onDelete={deleteAttr}
            open={deletingDialogIsOpen}
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
            openEditingForm={openEditingForm}
            openCreatingDialog={openCreatingDialog}
            openDeletingDialog={openDeletingDialog}
            path=""
            schema={schema}
          />
        </TreeContainer>
      </TreeWrapper>
      <ResultWrapper>
        Схема в формате JSON:
        <br />
        {JSON.stringify(schema)}
      </ResultWrapper>
    </>
  )
}

const mapStateToProps = state => ({
  schema: state.result,
  errorIsOpen: state.errorIsOpen,
  deletingDialogIsOpen: state.deletingDialogIsOpen,
  pathForForm: state.pathForForm,
  deletingName: state.deletingName,
  formIsOpen: state.formIsOpen
});

const mapDispatchToProps = dispatch => ({
  closeError: () => dispatch(actions.closeError()),
  deleteAttr: () => dispatch(actions.deleteAttribute()),
  openCreatingDialog: (schema, path) => dispatch(actions.openCreatingDialog(schema, path)),
  closeCreatingForm: () => dispatch(actions.closeCreatingForm()),
  openEditingForm: (name, value, type, schema, path) =>
      dispatch(actions.openEditingForm(name, value, type, schema, path)),
  openDeletingDialog: (path, name) => dispatch(actions.openDeletingDialog(path, name)),
  closeDeletingDialog: () => dispatch(actions.closeDeletingDialog())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootComponent)
