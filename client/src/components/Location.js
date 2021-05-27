import React from 'react'
import Button from '@material-ui/core/Button'
import { Typography } from '@material-ui/core';
import Container from '@material-ui/core/Container'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import { useState, useEffect } from 'react'

const Location = ({ selected, data, onSelect, onDelete }) => {

  return (
    <div>
      <Container disableGutters={true}>
        <Typography component="div" style={{ backgroundColor: selected ? 'red': 'blue'}}>
          <Button onClick={() => onSelect(data.name)}>{data.name}</Button> 
          <IconButton onClick={() => onDelete(data.name)} aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Typography>
      </Container>
    </div>
  )
}

export default Location
