import './Grid.css'
import Cell from '../cell/Cell';
import React, { Component } from 'react';

class Grid extends Component{

    constructor(props){
        super(props);
        let state = {
            nRows: props.nRows,
            nCols: props.nCols,
            cells: buildMatrix(props.nRows,props.nCols)
        };
        console.log("state",state);
        this.state=state;
    }

    updateCellState = (cellState) => {
        console.log("cellChanged! > new cellState", cellState);
    }

    render(){
        console.log("Render", this.state);
        const grid = <div className="grid">
            {
                this.state.cells.map(row=>
                    <span>
                        {row.map(col=>
                            <Cell x={col.coords.x} y={col.coords.y} cellType={col.cellType} onCellChange={this.updateCellState}/>
                        )}
                        <br/>
                    </span>
                )
            }
        </div>
        return grid;
    }
}

function buildMatrix(nRows,nCols){
    let emptyCell = {
        cellType : "empty",

    };
    let matrix = [];
    let i=0, j=0;
    matrix = Array(nRows).fill().map(()=>{
        let row = Array(nCols).fill().map(()=>{
          let e = {...emptyCell, ...{"coords":{x:i,y:j%nCols}}};
          j++;
          return e;
        });
        i++;
        return row;
    })
    return matrix;
}

export default Grid;