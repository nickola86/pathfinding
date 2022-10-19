import './Gameboard.css';
import Grid from '../grid/Grid';
import Cell from '../cell/Cell';
import PlusMinus from '../plus-minus/PlusMinus';
import Button from 'react-bootstrap/Button';

function Gameboard() {
  return (<div class="gameboard container">
      <div class="row">
        <div class="col-sm-2 left">
            <PlusMinus position="left" />
        </div>
        <div class="col-sm center">
            <PlusMinus position="top" />
            <Grid nRows={8} nCols={12}/>
            <PlusMinus position="bottom" />
        </div>
        <div class="col-sm-2 right">
            <PlusMinus position="right"/>
        </div>
      </div>
      <hr/>
      <div class="row">
        <div class="col">
            <Button disabled="true">Trova il cammino minimo!</Button>
            <p>
                <em>Per abilitare questo bottone devi selezionare una cella di entrata e una di uscita dal labirinto</em>
            </p>
        </div>
      </div>
      <div class="row">
        <em>Legenda:</em>
        <div class="col"><Cell cellType="empty" disabled={true} labels="on"/></div>
        <div class="col"><Cell cellType="wall" disabled={true} labels="on"/></div>
        <div class="col"><Cell cellType="entrypoint" disabled={true} labels="on"/></div>
        <div class="col"><Cell cellType="wayout" disabled={true} labels="on"/></div>
      </div>
    </div>
  );
}

export default Gameboard;