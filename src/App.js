//import logo from './logo.svg';
import './App.css';
import { Chivero } from './chivero/Chivero';

const MOCK_DATA = [12, 45, 69, 78, 99];

function App() {
  return (
    <div className="App">
      <header className="App-header"> Snakes everywhere
        {/* <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a> */}
      </header>
      <Chivero payload={MOCK_DATA} />
    </div>
  );
}

export default App;
