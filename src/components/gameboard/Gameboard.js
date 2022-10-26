import './Gameboard.css';
import Grid from '../grid/Grid';
import Cell from '../cell/Cell';
import Graph from '../../libs/Graph'

//import AStarService from '../AStarService';

import AStarService from '../../services/AStarServiceBinaryHeap';


import PlusMinus from '../plus-minus/PlusMinus';
import Button from 'react-bootstrap/Button';

import React, { Component } from 'react';

const MIN_ROWS = 4;
const MIN_COLS = 4;

const EMPTY_GRID = {
   size : {
       nRows:15,
       nCols:15
   },
   resize : {
       side : null,
       amount : 0
   }
}
const emptyCell = {
    cellType : "empty",
};


class Gameboard extends Component {

    constructor(props,context){
        super(props,context);

        const _state =  {
           grid : EMPTY_GRID,
           showPlusMinus : true,
           cells: buildMatrix(EMPTY_GRID.size.nRows,EMPTY_GRID.size.nCols)
        }

        this.state = _state;
    }

    resizeEventIsValid(e,g){
        return MIN_ROWS<=g.size.nRows && MIN_COLS <=g.size.nCols
    }

    onClickResizeHandler = (event) => {
        //Pulisco le celle visitate, le celle del cammino minimo, mantengo solo la griglia.
        let grid = {...this.state.grid};
        let cells = !!this.state.cells && this.state.cells.length > 0 ? [...this.state.cells] : [];

        grid.resize.side=event.side;
        event.action==='plus' ? grid.resize.amount=1 : grid.resize.amount=-1;

        if(['top','bottom'].indexOf(event.side)>=0) grid.size.nRows = grid.size.nRows + grid.resize.amount;
        if(['left','right'].indexOf(event.side)>=0) grid.size.nCols = grid.size.nCols + grid.resize.amount;

        if(grid.resize.side==='left' && grid.resize.amount===-1){
            //Tolgo una colonna da sinistra
            cells.map(row=>{
                row.shift()
                row.map(col=>{
                    col.coord.y--;
                    return col;
                })
                return row;
            })
        }
        if(grid.resize.side==='top' && grid.resize.amount===-1){
            //Tolgo una colonna dall'alto
            cells.shift();
            cells.map(row=>{
                row.map(col=>{
                    col.coord.x--;
                    return col;
                })
                return row;
            })
        }
        if(grid.resize.side==='right' && grid.resize.amount===-1){
            //Tolgo una colonna da destra
            cells.map(row=>{
                row.pop()
                return row;
            })
        }
        if(grid.resize.side==='bottom' && grid.resize.amount===-1){
            //Tolgo una colonna dal basso
            cells.pop()
        }

        let i=0;
        if(grid.resize.side==='left' && grid.resize.amount===1){
            //Aggiungo una colonna da sinistra
            cells.map(row=>{
                row.map(col=>{
                    col.coord.y++;
                    return col;
                })
                row.unshift({...emptyCell, ...{"coord":{x:i,y:0}}})
                i++;
                return row;
            })
        }
        let j=0;
        if(grid.resize.side==='top' && grid.resize.amount===1){
            //Aggiungo una colonna dall'alto
            cells.map(row=>{
                row.map(col=>{
                    col.coord.x++;
                    return col;
                })
                return row;
            })
            cells.unshift(Array(grid.size.nCols).fill().map((col)=>{
                col={...emptyCell, ...{"coord":{x:0,y:j}}}
                j++;
                return col;
            }));
        }
        i=0;
        if(grid.resize.side==='right' && grid.resize.amount===1){
            //Aggiungo una colonna da destra
            cells.map(row=>{
                row.push({...emptyCell, ...{"coord":{x:i,y:grid.size.nCols-1}}})
                i++;
                return row;
            })
        }
        j=0;
        if(grid.resize.side==='bottom' && grid.resize.amount===1){
            //Aggiungo una colonna dal basso
            cells.push(Array(grid.size.nCols).fill().map((col)=>{
                 col={...emptyCell, ...{"coord":{x:grid.size.nRows-1,y:j}}}
                 j++;
                 return col;
             }))
        }
        if(this.resizeEventIsValid(event,grid)){
            //Aggiorno lo stato se resize valido!
            this.setState(prevState => {
                return {
                    ...prevState, grid, cells, shortestPathCoords:[],visitedCells:[]
                }
            },()=>{
                 this.isGridReady();
             });
        }
    }

    isGridReady = (isReady) => {

        if(typeof isReady==='undefined'){
            const list = [].concat(...this.state.cells);
            isReady = !!list.find(c=>{return c.cellType==='entrypoint'}) && !!list.find(c=>{return c.cellType==='wayout'});
        }

        this.setState(prevState => {
            return {
                ...prevState, isGameboardReady : isReady, visitedCells:[],shortestPathCoords:[]
            }
        });
    }

    onClickStartHandler = () => {
        const cells = [...this.state.cells];
        const startCoords = this.getEntrypointCoords(cells);
        const endCoords = this.getWayoutCoords(cells);
        const graph = new Graph(cells.map(r=>{return [...r.map(c=>{return c.cellType==='wall' ? 1 : 0})]}));
        const  start = graph.nodes[startCoords[0]][startCoords[1]];
        const  end = graph.nodes[endCoords[0]][endCoords[1]];
        AStarService.search(graph,start,end,this.renderCallback);
    }

    renderCallback = (path,startCoords,graph) => {
        let shortestPathCoords = [...path.map(p=>{return [p.x,p.y]}), startCoords];
        const list = [].concat(...graph.nodes);
        let visitedCells = list.filter(c=>{return c.visited}).map(c=>{return [c.x,c.y]});
        this.setState(prevState => {
            return {...prevState,shortestPathCoords,visitedCells}
        });
    }

    getEntrypointCoords = (cells) => {
        const list = [].concat(...cells);
        const entrypoint = list.find(c=>{return c.cellType==='entrypoint'});
        return [entrypoint.coord.x,entrypoint.coord.y];
    }
    getWayoutCoords = (cells) => {
        const list = [].concat(...cells);
        const entrypoint = list.find(c=>{return c.cellType==='wayout'});
        return [entrypoint.coord.x,entrypoint.coord.y];
    }


    onClickLoadGridFromRemote = () => {
        fetch("/api/grid.json")
          .then(res => res.json())
          .then(
            (result) => {
                let grid=EMPTY_GRID;
                grid.size.nRows=result.rows;
                grid.size.nCols=result.cols;
                let cells=buildMatrix(result.rows,result.cols)
                const list = [].concat(...cells);
                list.forEach(c=>{
                    const cell = result.cells.find(e=>{return e.x===c.coord.x && e.y===c.coord.y});
                    if(cell?.type==='wall') c.cellType='wall'
                    if(cell?.type==='start') c.cellType='entrypoint'
                    if(cell?.type==='finish') c.cellType='wayout'
                    return c;
                })
                this.setState(prevState => {
                    return {
                        ...prevState, grid, cells, shortestPathCoords:[],visitedCells:[]
                    }
                    //
                },()=>{
                    this.isGridReady();
                });
            }
          )
    }

    render(){
      return (<div className="gameboard container">
          <div className="row">
            <div className="col-sm-1 left">
                {this.state.showPlusMinus && <PlusMinus position="left" tooltip="Aggiungi(+) o rimuovi(-) una colonna da sinistra" onClickPlusMinus={this.onClickResizeHandler}/>}
            </div>
            <div className="col-sm center">
                {this.state.showPlusMinus && <PlusMinus position="top" tooltip="Aggiungi(+) o rimuovi(-) una riga dall' alto" onClickPlusMinus={this.onClickResizeHandler}/>}
                {
                    <Grid   nRows={this.state.grid.size.nRows}
                            nCols={this.state.grid.size.nCols}
                            resizeEvent={this.state.grid.resize}
                            isGridReady={this.isGridReady}
                            cells={this.state.cells}
                            shortestPath={this.state.shortestPathCoords}
                            visitedCells={this.state.visitedCells}/>
                }
                {this.state.showPlusMinus && <PlusMinus position="bottom" tooltip="Aggiungi(+) o rimuovi(-) una riga dal basso" onClickPlusMinus={this.onClickResizeHandler}/>}
            </div>
            <div className="col-sm-1 right">
                {this.state.showPlusMinus && <PlusMinus position="right" tooltip="Aggiungi(+) o rimuovi(-) una colonna da destra" onClickPlusMinus={this.onClickResizeHandler}/>}
            </div>
          </div>
          <hr/>
          <div className="row">
            <div className="col">
                <Button disabled={!this.state.isGameboardReady} onClick={this.onClickStartHandler}>Trova il cammino minimo!</Button>
                <p>
                    <em>Per abilitare questo bottone devi selezionare una cella di entrata e una di uscita dal labirinto</em>
                </p>
            </div>
          </div>
          <div className="row">
              <div className="col">
                <Button onClick={this.onClickLoadGridFromRemote}>Carica griglia da backend</Button>
              </div>
          </div>
          <div className="row">
            <em>Legenda:</em>
            <div className="col"><Cell cellType="empty" disabled={true} labels="on"/></div>
            <div className="col"><Cell cellType="wall" disabled={true} labels="on"/></div>
            <div className="col"><Cell cellType="entrypoint" disabled={true} labels="on"/></div>
            <div className="col"><Cell cellType="wayout" disabled={true} labels="on"/></div>
          </div>
          <hr/>
          {this.state.visitedCells && this.state.visitedCells.length > 1 ? <h3>Celle esplorate: {this.state.visitedCells.length} su {this.state.grid.size.nRows*this.state.grid.size.nCols} totali ({(100*this.state.visitedCells.length / (this.state.grid.size.nRows*this.state.grid.size.nCols)).toFixed(2)}%)</h3> : ''}
          {this.state.shortestPathCoords && this.state.shortestPathCoords.length > 1 ? <h3>Costo del cammino minimo: {this.state.shortestPathCoords.length}</h3> : ''}
          {this.state.visitedCells && this.state.visitedCells.length > 1 && this.state.shortestPathCoords && this.state.shortestPathCoords.length === 1 ? <h3>Destinazione non raggiunta</h3> : ''}
        </div>
      );
    }
}
function buildMatrix(nRows,nCols){
    let matrix = [];
    let i=0, j=0;
    matrix = Array(nRows).fill().map(()=>{
        let row = Array(nCols).fill().map(()=>{
          let e = {...emptyCell, ...{"coord":{x:i,y:j%nCols}},guid:CreateGuid()};
          j++;
          return e;
        });
        i++;
        return row;
    })
    return matrix;
}
function CreateGuid() {
   function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
   }
   return _p8() + _p8(true) + _p8(true) + _p8();
}

export default Gameboard;
