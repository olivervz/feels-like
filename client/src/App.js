import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './components/Main'
import About from './components/About'
import Heading from './components/Heading.js'
import { useState } from 'react'

function App() {

  const [fahrenheitState, setFahrenheitState] = useState(true)

  const onChange = () => {
    setFahrenheitState(!fahrenheitState)
  }
  
  return (
    <Router>
      <Heading switchState={fahrenheitState} onChange={onChange}/>
      <Route path="/" exact render={() => (
        <Main fahrenheit={fahrenheitState}/>
      )}/>
      <Route path="/about" exact render={() => (
        <About/>
      )}/>
    </Router>
  );
}

export default App;
