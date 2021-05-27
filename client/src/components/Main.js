import { Container } from '@material-ui/core';
import { Typography } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import LocationBar from './LocationBar'

const Main = () => {

  return (
    <>
      <CssBaseline />
      <Container maxWidth='xl' disableGutters={true}>
        <Typography component="div" style={{backgroundColor: '#f2f7ff', height: '100vh' }}>
          <LocationBar />
        </Typography>
      </Container>
    </>
  )
}

export default Main
