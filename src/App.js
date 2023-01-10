import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Gameboard from './components/gameboard/Gameboard';


function App() {
  console.log("App rendering");
  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>pathfinding visualizer</h1>
      </header>
      <Gameboard/>
    </div>
  );
}

export default App;
