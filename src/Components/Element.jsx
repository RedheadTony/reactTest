import React, { useState } from 'react'
import { Button, Icon } from '@material-ui/core'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Container = styled.div`
  border-left: 1px solid black;
  width: min-content;
`

const ButtonsGroup = styled.div`
  display: flex;
  width: 200px;
`

const Title = styled.div`
  width: 100px;
  flex: none;
  cursor: pointer;
`

const AttributesContainer = styled.div`
  display: flex;
  align-items: center;
`

function Element(props) {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen(!isOpen)
  const {
    openDeletingDialog,
    schema,
    path,
    openCreatingDialog,
    openEditingForm
  } = props

  const createAttribute = () => {
    openCreatingDialog(schema, path)
  }

  const editAttribute = (name, value, type) => {
    openEditingForm(name, value, type, schema, path)
  }

  const deleteAttribute = name => {
    openDeletingDialog(path, name)
  }

  function renderLines(schema) {
    const listJsx = []
    for (const key in schema) {
      const value = schema[key]
      const onEdit = () => {
        editAttribute(
          key,
          value,
          typeof value === 'string' ? 'string' : 'component'
        )
      }
      const onDelete = () => deleteAttribute(key)
      if (typeof value === 'string') {
        listJsx.push(
          <AttributesContainer key={key}>
            <Button onClick={onDelete}>
              <Icon>delete</Icon>
            </Button>
            <Title title={key.length < 9 ? null : key} onClick={onEdit}>
              {key.length < 9 ? key : `${key.substr(0, 8)}...`}:
            </Title>
            <div>{schema[key]}</div>
          </AttributesContainer>
        )
      } else {
        listJsx.push(
          <AttributesContainer key={key}>
            <Button onClick={onDelete}>
              <Icon>delete</Icon>
            </Button>
            <Title title={key.length < 9 ? null : key} onClick={onEdit}>
              {key.length < 10 ? key : `${key.substr(0, 9)}...`}:
            </Title>

            <Element
              schema={schema[key]}
              openCreatingDialog={openCreatingDialog}
              openEditingForm={openEditingForm}
              path={path ? `${path}.${key}` : key}
              openDeletingDialog={openDeletingDialog}
            />
          </AttributesContainer>
        )
      }
    }
    return listJsx
  }

  return (
    <Container>
      <ButtonsGroup>
        <Button onClick={toggleOpen}>Element</Button>
        <Button onClick={createAttribute}>
          <Icon>add</Icon>
        </Button>
      </ButtonsGroup>
      {isOpen && <div style={{ paddingLeft: 25 }}>{renderLines(schema)}</div>}
    </Container>
  )
}

Element.propTypes = {
  openDeletingDialog: PropTypes.func,
  schema: PropTypes.object,
  path: PropTypes.string,
  openCreatingDialog: PropTypes.func,
  openEditingForm: PropTypes.func
}

export default Element
