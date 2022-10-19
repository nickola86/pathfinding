import './Grid.css'
import Cell from '../cell/Cell';
import React, { Component } from 'react';
import transitions from '../TransitionsManager'

//Rules
let rules=[
    {
        cellType:'entrypoint',
        maxNumber:1
    },
    {
        cellType:'wayout',
        maxNumber:1
    }
]


class Grid extends Component{

    constructor(props){
        super(props);
        let state = {
            nRows: props.nRows,
            nCols: props.nCols,
            cells: buildMatrix(props.nRows,props.nCols)
        };
        this.state=state;
    }

    updateCellState = (cellState) => {
        //Se non supero i controlli in base ai vincoli della griglia:
        if(!this.areRulesStillSatisfiedWithThisNew(cellState)){
            //passo al cellType successivo:
            cellState.cellType=transitions[cellState.cellType];
            this.updateCellState(cellState)
        }else{
            //Solo se sono in uno stato (cellType) valido aggiorno lo stato!
            const currentCells = [...this.state.cells];
            currentCells[cellState.coord.x][cellState.coord.y]=cellState;
            this.setState({
                cells: currentCells
            });
        }
    }

    areRulesStillSatisfiedWithThisNew = (cell) => {
        let allSatisfied = true;
        let list = [].concat(...this.state.cells);
        //Filtro le regole che si applicano alla cella dello stesso tipo di quella in input
        //e per ciascuna regola verifico che siano tutte (every) soddisfatte...
        rules.filter(r=>r.cellType===cell.cellType).every(
            r => {
                //il più uno va letto come: "se aggiungo l'elemento di tipo cellType alla lista, la regola vale ancora?"
                allSatisfied = allSatisfied && list.filter(c=>{return c.cellType===r.cellType}).length+1<=r.maxNumber;
                return allSatisfied;
            }
        )
        return allSatisfied;
    }

    render(){
        const grid = <div className="grid">
            {
                this.state.cells.map(row=>
                    <span>
                        {row.map(col=>
                            <Cell x={col.coord.x} y={col.coord.y} cellType={col.cellType} onCellChange={this.updateCellState}/>
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
          let e = {...emptyCell, ...{"coord":{x:i,y:j%nCols}}};
          j++;
          return e;
        });
        i++;
        return row;
    })
    return matrix;
}

export default Grid;