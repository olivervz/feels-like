import React from 'react'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'

const Location = ({ selected, data, name, address, key, id, onSelect, onDelete }) => {

  return (
    <div>
      <Container disableGutters={true}>
        <Typography component="div" style={{ backgroundColor: selected ? '#e6efff': '#f2f7ff'}}>
          <Button onClick={() => onSelect(id)}>{name}</Button> 
          <IconButton onClick={() => onDelete(id)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
      </Container>
    </div>
  )
}

export default Location
