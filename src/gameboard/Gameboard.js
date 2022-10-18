import './Gameboard.css';
import Grid from '../grid/Grid';
import PlusMinus from '../plus-minus/PlusMinus';

function Gameboard() {
  return (<div class="gameboard container">
      <div class="row">
        <div class="col-sm-1 left">
            <PlusMinus position="left" />
        </div>
        <div class="col-sm center">
            <PlusMinus position="top" />
            <Grid />
            <PlusMinus position="bottom" />
        </div>
        <div class="col-sm-1 right">
            <PlusMinus position="right" />
        </div>
      </div>
    </div>
  );
}

export default Gameboard;