import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@material-ui/core'
import PropTypes from 'prop-types'

export default function DeletingForm({ path, name, open, close, onDelete }) {
  const deleteAttr = () => {
    onDelete()
    close()
  }
  return (
    <Dialog open={open} onClose={close}>
      <DialogTitle>Удаление элемента</DialogTitle>
      <DialogContent>
        {path
          ? `Удалить элемент result.${path}.${name}?`
          : `Удалить элемент result.${name}?`}
      </DialogContent>
      <DialogActions>
        <Button onClick={close} color="primary">
          Нет
        </Button>
        <Button onClick={deleteAttr} color="primary">
          Да
        </Button>
      </DialogActions>
    </Dialog>
  )
}

DeletingForm.propTypes = {
  path: PropTypes.string,
  name: PropTypes.string,
  open: PropTypes.bool,
  close: PropTypes.func,
  onDelete: PropTypes.func
}
