import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Gameboard from './gameboard/Gameboard';
import EventViewer from './eventviewer/EventViewer';

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>pathfinding visualizer</h1>
          <hr/>
      </header>
      <content>
        <Gameboard/>
      </content>
    </div>
  );
}

export default App;