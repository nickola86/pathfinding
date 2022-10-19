import React, { Component } from 'react';
import './Cell.css'
import Button from 'react-bootstrap/Button';

const transitions = {
    "empty":"wall",
    "wall":"entrypoint",
    "entrypoint":"wayout",
    "wayout":"empty"
}
const icons = {
    "entrypoint":"fa fa-arrow-right",
    "wayout":"fa fa-xmark"
}

class Cell extends Component{
    constructor(props,context) {
        super(props, context);
        this.state = {
          cellType:props.cellType || "empty",
          coord:{
            x:props.x,
            y:props.y,
          }
        };
    }
    toggleCellType = () => {
        console.log(`Cell[${this.props.x},${this.props.y}] : ${transitions[this.state.cellType]}`);
        this.setState(prevState => ({...this.state, cellType: transitions[prevState.cellType] }),
            ()=>{this.props.onCellChange(this.state)}
        );
    };

    render(){
        return <Button variant="light" className={`cell ${this.state.cellType}`} onClick={this.toggleCellType}>
            <i className={icons[this.state.cellType]}/>
        </Button>
    }
}

export default Cell;