import React, { Component } from 'react';
import './Cell.css'
import Button from 'react-bootstrap/Button';

class Cell extends Component{
    constructor(props) {
        super(props);
        props.cellType="square";
    }
    render(){
        console.log("Render >> this.props.cellType", this.props.cellType);
        return <Button variant="light" className="cell"></Button>
    }
}

export default Cell;