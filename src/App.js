import { BrowserRouter as Router, Route } from 'react-router-dom'
import Main from './components/Main'
import About from './components/About'

function App() {
  return (
    <Router>
      <Route path="/" exact render={() => (
        <Main/>
      )}/>
      <Route path="/about" exact render={() => (
        <About/>
      )}/>
    </Router>
  );
}

export default App;
