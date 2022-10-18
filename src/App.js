import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Gameboard from './gameboard/Gameboard';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>&gt; pathfinding &lt;</h1>
      </header>
      <content>
        <Gameboard/>
      </content>
    </div>
  );
}

export default App;