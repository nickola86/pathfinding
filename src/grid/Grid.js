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
const emptyCell = {
    cellType : "empty",
};

class Grid extends Component{

    constructor(props){
        super(props);
        this.state = {
             nRows: props.nRows,
             nCols: props.nCols,
             cells: buildMatrix(props.nRows,props.nCols),
             resizeEvent: props.resizeEvent
         };
    }

    static getDerivedStateFromProps(props,state){

        //console.log("Grid > getDerivedStateFromProps > props",props);

        if(!!props.cells) state.cells = props.cells;

        if(props.nCols!==state.nCols || props.nRows!==state.nRows){

            if(props.resizeEvent.side==='left' && props.resizeEvent.amount===-1){
                state.cells.map(row=>{
                    row.shift()
                    row.map(col=>{
                        col.coord.y--;
                        return col;
                    })
                    return row;
                })
            }
            if(props.resizeEvent.side==='top' && props.resizeEvent.amount===-1){
                state.cells.shift();
                state.cells.map(row=>{
                    row.map(col=>{
                        col.coord.x--;
                        return col;
                    })
                    return row;
                })
            }
            if(props.resizeEvent.side==='right' && props.resizeEvent.amount===-1){
                state.cells.map(row=>{
                    row.pop()
                    return row;
                })
            }
            if(props.resizeEvent.side==='bottom' && props.resizeEvent.amount===-1){
                state.cells.pop()
            }

            let i=0;
            if(props.resizeEvent.side==='left' && props.resizeEvent.amount===1){
                state.cells.map(row=>{
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
            if(props.resizeEvent.side==='top' && props.resizeEvent.amount===1){
                state.cells.map(row=>{
                    row.map(col=>{
                        col.coord.x++;
                        return col;
                    })
                    return row;
                })
                state.cells.unshift(Array(props.nCols).fill().map((col)=>{
                    col={...emptyCell, ...{"coord":{x:0,y:j}}}
                    j++;
                    return col;
                }));
            }
            i=0;
            if(props.resizeEvent.side==='right' && props.resizeEvent.amount===1){
                state.cells.map(row=>{
                    row.push({...emptyCell, ...{"coord":{x:i,y:props.nCols-1}}})
                    i++;
                    return row;
                })
            }
            j=0;
            if(props.resizeEvent.side==='bottom' && props.resizeEvent.amount===1){
                state.cells.push(Array(props.nCols).fill().map((col)=>{
                     col={...emptyCell, ...{"coord":{x:props.nRows-1,y:j}}}
                     j++;
                     return col;
                 }))
            }
            state.nRows = props.nRows;
            state.nCols = props.nCols;
        }
        return state;
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

        //Se la griglia contiene una cella entryPoint e una cella wayOut informo la Gameboard che il gioco può iniziare
        let list = [].concat(...this.state.cells);
        this.props.isGridReady(!!list.find(c=>{return c.cellType==='entrypoint'}) && !!list.find(c=>{return c.cellType==='wayout'}),[...this.state.cells])
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
        const cells = [...this.state.cells]
        console.log("Grid.Render! state > cells", cells);
        let grid = <div className="grid">
            {   cells.map(row=>
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