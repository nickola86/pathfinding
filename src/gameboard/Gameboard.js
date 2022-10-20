import './Gameboard.css';
import Grid from '../grid/Grid';
import Cell from '../cell/Cell';
import PlusMinus from '../plus-minus/PlusMinus';
import Button from 'react-bootstrap/Button';
import React, { Component } from 'react';

const MIN_ROWS = 4;
const MIN_COLS = 4;

class Gameboard extends Component {

    constructor(props,context){
        super(props,context);
        this.state = {
            grid : {
                size : {
                    nRows:8,
                    nCols:8
                },
                resize : {
                    side : null,
                    amount : 0
                }
            }
        }
    }

    resizeEventIsValid(e,g){
        return MIN_ROWS<=g.size.nRows && MIN_COLS <=g.size.nCols
    }

    onClickResizeHandler = (event) => {

        let _grid = {...this.state.grid};

        _grid = JSON.parse(JSON.stringify(_grid))

        _grid.resize.side=event.side;
        event.action==='plus' ? _grid.resize.amount=1 : _grid.resize.amount=-1;

        if(['top','bottom'].indexOf(event.side)>=0) _grid.size.nRows = _grid.size.nRows + _grid.resize.amount;
        if(['left','right'].indexOf(event.side)>=0) _grid.size.nCols = _grid.size.nCols + _grid.resize.amount;

        if(this.resizeEventIsValid(event,_grid)){
            //Aggiorno lo stato se resize valido!
            console.log("onClickResizeHandler > this.state",this.state);
            console.log("onClickResizeHandler > _grid",_grid);
            this.setState(prevState => {
                return {
                    ...prevState, ...{grid:_grid}
                }
            });
        }

    }

    render(){
        console.log("Render Gameboard");
      return (<div class="gameboard container">
          <div class="row">
            <div class="col-sm-1 left">
                <PlusMinus position="left" tooltip="Aggiungi(+) o rimuovi(-) una colonna da sinistra" onClickPlusMinus={this.onClickResizeHandler}/>
            </div>
            <div class="col-sm center">
                <PlusMinus position="top" tooltip="Aggiungi(+) o rimuovi(-) una riga dall' alto" onClickPlusMinus={this.onClickResizeHandler}/>
                <Grid nRows={this.state.grid.size.nRows} nCols={this.state.grid.size.nCols} resizeEvent={this.state.grid.resize}/>
                <PlusMinus position="bottom" tooltip="Aggiungi(+) o rimuovi(-) una riga dal basso" onClickPlusMinus={this.onClickResizeHandler}/>
            </div>
            <div class="col-sm-1 right">
                <PlusMinus position="right" tooltip="Aggiungi(+) o rimuovi(-) una colonna da destra" onClickPlusMinus={this.onClickResizeHandler}/>
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
}

export default Gameboard;