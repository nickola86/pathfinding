import React, { Component } from 'react';
import './Cell.css'
import Button from 'react-bootstrap/Button';

const transitions = {
    "empty":"wall",
    "wall":"entrypoint",
    "entrypoint":"wayout",
    "wayout":"empty"
}
const labels = {
    "empty":"Passaggio",
    "wall":"Muro",
    "entrypoint":"Ingresso",
    "wayout":"Uscita"
}
const icons = {
    "entrypoint":"fa fa-chevron-right",
    "wayout":"fa fa-xmark"
}

class Cell extends Component{

    constructor(props,context) {
        super(props, context);
        this._isMouseDown=false;
        this.state={
           cellType: props.cellType || "empty",
           coord:{
               x:props.x,
               y:props.y,
             }
        };
    }

    static getDerivedStateFromProps(props,state){
        /*
        FIXME!
        console.log("getDerivedStateFromProps > state",state)
        console.log("getDerivedStateFromProps > props",props)

        if( props.cellType !== state.cellType){
            state = {
                cellType: props.cellType || "empty",
                coord:{
                    x:props.x,
                    y:props.y,
                  }
            };
        }
        return state;
        */
    }

    onClickHandler = () => {
        this.toggleCellType();
    }

    toggleCellType = () => {
        if(this.props.disabled) return;
        this.setState(prevState => ({...this.state, cellType: transitions[prevState.cellType] }),
            ()=>{this.props.onCellChange(this.state)}
        );
    };

    render(){
        return <span>
            <Button variant="light" className={`cell ${this.state.cellType}`}
                    onClick={this.onClickHandler}>
                <i className={icons[this.state.cellType]}/>
            </Button>
            <label className={`${this.props.labels==='on' ? 'visible' : 'hidden'}`}>{labels[this.state.cellType]}</label>
        </span>
    }
}

export default Cell;