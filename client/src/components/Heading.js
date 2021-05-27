import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import Switch from '@material-ui/core/Switch';
import Grid from '@material-ui/core/Grid'

const Heading = ({switchState, onChange}) => {
  const AntSwitch = withStyles((theme) => ({
    root: {
      width: 28,
      height: 16,
      padding: 0,
      display: 'flex',
    },
    switchBase: {
      padding: 2,
      color: theme.palette.common.white,
      '&$checked': {
        transform: 'translateX(12px)',
        color: theme.palette.common.white,
        '& + $track': {
          opacity: 1,
          backgroundColor: theme.palette.primary.main,
          borderColor: theme.palette.primary.main,
        },
      },
    },
    thumb: {
      width: 12,
      height: 12,
      boxShadow: 'none',
    },
    track: {
      border: `1px solid ${theme.palette.grey[500]}`,
      borderRadius: 16 / 2,
      opacity: 1,
      backgroundColor: theme.palette.primary.main,
    },
    checked: {},
  }))(Switch);  

  return (
    <div style={{backgroundColor: '#dde3f0', textAlign: 'center'}}>
      <h1>Test</h1>
      <Typography component="div">
        <Grid component="label" container alignItems="center" spacing={1}>
          <Grid item>°F</Grid>
          <Grid item>
            <AntSwitch checked={!switchState} onChange={onChange} name="checkedC" />
          </Grid>
          <Grid item>°C</Grid>
        </Grid>
      </Typography>
    </div>
  )
}

export default Heading
