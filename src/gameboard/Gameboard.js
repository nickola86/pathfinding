import './Gameboard.css';
import Grid from '../grid/Grid';
import Cell from '../cell/Cell';

import AStarService from '../AStarService';

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
                    nRows:4,
                    nCols:4
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
            this.setState(prevState => {
                return {
                    ...prevState, ...{grid:_grid}
                }
            });
        }
    }

    isGridReady = (isReady,cells) => {
        this.setState(prevState => {
            return {
                ...prevState, isGameboardReady : isReady, "cells":cells
            }
        }, ()=>{
            this.setState(prevState=>{
                return {...prevState, gridHidden:true};
            },()=>{
                this.setState(prevState=>{
                    return {...prevState, gridHidden:false};
                });
            });
        });
    }

    onClickStartHandler = () => {
        console.log("this.state.cells",this.state.cells);
        const grid = [...this.state.cells];
        const entrypointCoords = this.getEntrypointCoords(grid);
        AStarService.findShortestPath(entrypointCoords, grid);
    }

    getEntrypointCoords = (grid) => {
        const list = [].concat(...grid);
        const entrypoint = list.find(c=>{return c.cellType==='entrypoint'});
        return [entrypoint.coord.x,entrypoint.coord.y];
    }

    render(){
      return (<div class="gameboard container">
          <div class="row">
            <div class="col-sm-1 left">
                <PlusMinus position="left" tooltip="Aggiungi(+) o rimuovi(-) una colonna da sinistra" onClickPlusMinus={this.onClickResizeHandler}/>
            </div>
            <div class="col-sm center">
                <PlusMinus position="top" tooltip="Aggiungi(+) o rimuovi(-) una riga dall' alto" onClickPlusMinus={this.onClickResizeHandler}/>
                {
                    !this.state.gridHidden && <Grid nRows={this.state.grid.size.nRows} nCols={this.state.grid.size.nCols} resizeEvent={this.state.grid.resize} isGridReady={this.isGridReady} cells={this.state.cells}/>
                }
                <PlusMinus position="bottom" tooltip="Aggiungi(+) o rimuovi(-) una riga dal basso" onClickPlusMinus={this.onClickResizeHandler}/>
            </div>
            <div class="col-sm-1 right">
                <PlusMinus position="right" tooltip="Aggiungi(+) o rimuovi(-) una colonna da destra" onClickPlusMinus={this.onClickResizeHandler}/>
            </div>
          </div>
          <hr/>
          <div class="row">
            <div class="col">
                <Button disabled={!this.state.isGameboardReady} onClick={this.onClickStartHandler}>Trova il cammino minimo!</Button>
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