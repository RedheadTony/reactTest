import React, { useState } from 'react'
import { Button, Icon } from '@material-ui/core'

function Element(props) {
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = () => setIsOpen(!isOpen);
  const {
    setDeletingName,
    openDeletingDialog,
    schema,
    openAddingForm,
    path,
    setPath,
    clearForm,
    setEditDate,
    setFormMode,
    setEditingSchema
  } = props;

  const createAttribute = () => {
    setFormMode('create');
    setEditingSchema(schema);
    clearForm();
    setPath(path);
    openAddingForm();
  };

  const editAttribute = (name, value, type) => {
    setFormMode('edit');
    setEditingSchema(schema);
    setEditDate(name, value, type);
    setPath(path);
    openAddingForm();
  };

  const deleteAttribute = name => {
    setPath(path);
    setDeletingName(name);
    openDeletingDialog();
  };

  function renderLines(schema) {
    const listJsx = [];
    for (const key in schema) {
      const value = schema[key];
      const onEdit = () => {
        editAttribute(
          key,
          value,
          typeof value === 'string' ? 'string' : 'component'
        )
      }
      const onDelete = () => deleteAttribute(key);
      if (typeof value === 'string') {
        listJsx.push(
          <div key={key} style={{ display: 'flex', alignItems: 'center' }}>
            <Button onClick={onDelete}><Icon>delete</Icon></Button>
            <div
              title={key.length < 9 ? null : key}
              onClick={onEdit}
              style={{ width: 100, flex: 'none', cursor: 'pointer' }}>
              {key.length < 9 ? key : `${key.substr(0, 8)}...`}:
            </div>
            <div>{schema[key]}</div>
          </div>
        )
      } else {
        listJsx.push(
          <div
            style={{
              display: 'flex',
              alignItems: 'center'
            }}
            key={key}>
            <Button onClick={onDelete}><Icon>delete</Icon></Button>
            <div
              title={key.length < 9 ? null : key}
              onClick={onEdit}
              style={{ width: 100, flex: 'none', cursor: 'pointer' }}>
              {key.length < 10 ? key : `${key.substr(0, 9)}...`}:
            </div>

            <Element
              schema={schema[key]}
              path={path ? `${path}.${key}` : key}
              openAddingForm={openAddingForm}
              clearForm={clearForm}
              openDeletingDialog={openDeletingDialog}
              setEditDate={setEditDate}
              setPath={setPath}
              setFormMode={setFormMode}
              setDeletingName={setDeletingName}
              setEditingSchema={setEditingSchema}
            />
          </div>
        )
      }
    }
    return listJsx
  }

  return (
    <div
      style={{
        borderLeft: '1px solid black',
        width: 'min-content'
      }}>
      <div style={{ display: 'flex', width: 200 }}>
        <Button onClick={toggleOpen}>Element</Button>
        <Button onClick={createAttribute}><Icon>add</Icon></Button>
      </div>
      {isOpen && <div style={{ paddingLeft: 25 }}>{renderLines(schema)}</div>}
    </div>
  )
}

export default Element
