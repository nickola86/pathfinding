import './Grid.css'
import Cell from '../cell/Cell';
import React, { Component } from 'react';
import transitions from '../../services/TransitionsManager'

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
        this.state = {
             cells: props.cells || [],
             nRows: props.cells ? props.cells.length : 0,
             nCols: props.cells && props.cells[0] ? props.cells[0].length : 0
         };
    }

    static getDerivedStateFromProps(props,state){
        if(!!props.cells){
            state.cells = props.cells;
            state.nRows = props.cells.length;
            state.nCols = props.cells[0].length;
        }
        //Sbianco le celle blue e gialle
        state.cells.forEach(r=>{
            r.forEach(c=>{
                if(c.backgroundColor==='blue'||c.backgroundColor==='yellow') c.backgroundColor=''
            })
        })

        //Le coloro nuovamente
        props && props.visitedCells && props.visitedCells.forEach(c => {
            state.cells[c[0]][c[1]].backgroundColor='blue';
        })
        props && props.shortestPath && props.shortestPath.forEach(c => {
            state.cells[c[0]][c[1]].backgroundColor='yellow';
        })
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
        return <div key={CreateGuid()} className="grid">
               {   cells.map(row=>
                       <div key={CreateGuid()} className="clear">
                           {row.map(col=>
                               <Cell key={CreateGuid()} x={col.coord.x} y={col.coord.y} cellType={col.cellType} onCellChange={this.updateCellState} backgroundColor={col.backgroundColor}/>
                           )}
                           <br/>
                       </div>
                   )
               }
           </div>;
    }

}
function CreateGuid() {
   function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
   }
   return _p8() + _p8(true) + _p8(true) + _p8();
}
export default Grid;