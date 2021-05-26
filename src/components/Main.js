import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import { Button } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import Input from '@material-ui/core/Input';
import { useState } from 'react'

const Main = () => {

  const [backgroundState, setBackgroundState] = useState({
    color: 'white',
    userInput: '',
    userInputInvalid: false
  }) 

  const makeBlue = () => {
    setBackgroundState({...backgroundState, color: 'blue'})
  }
  const makeRed = () => {
    setBackgroundState({...backgroundState, color: 'red'})
  }
  const makeYellow = () => {
    setBackgroundState({...backgroundState, color: 'yellow'})
  }
  const handleChange = (prop) => (event) => {
    setBackgroundState({...backgroundState, userInput: event.target.value})
  }
  const keyPress = (event) => {
    if(event.keyCode == 13){
      const s = new Option().style;
      s.color = backgroundState.userInput;
      if (s.color !== '') {
        setBackgroundState({...backgroundState, color: backgroundState.userInput, userInput:'', userInputInvalid: false})
      }
      else {
        setBackgroundState({...backgroundState, userInputInvalid: true})
      }
   }
  }

  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl' disableGutters={true}>
        <Typography component="div" style={{ backgroundColor: backgroundState.color, height: '100vh' }}>
          <Button variant='outlined' color={backgroundState.color === 'black' ? 'primary' : 'default'} onClick={makeBlue}>blue</Button>
          <Button variant='outlined' color={backgroundState.color === 'black' ? 'primary' : 'default'} onClick={makeRed}>red</Button>
          <Button variant='outlined' color={backgroundState.color === 'black' ? 'primary' : 'default'} onClick={makeYellow}>yellow</Button>
          <Input id="filled-basic" label="Filled" variant="filled" onKeyDown={keyPress} onChange={handleChange('color')} error={backgroundState.userInputInvalid}/>
        </Typography>
      </Container>
    </>
  )
}

export default Main
