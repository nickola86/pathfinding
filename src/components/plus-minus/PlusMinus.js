import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './PlusMinus.css'
function PlusMinus(props){
    return <div className={`buttons ${props.position}`}>
        <ButtonGroup title={props.tooltip}>
            <Button onClick={()=>{
                let event = {action:'plus',side:props.position};
                props.onClickPlusMinus(event);
            }}><i className="fa fa-plus"/></Button>
            <Button onClick={()=>{
                let event = {action:'minus',side:props.position};
                props.onClickPlusMinus(event);
            }}><i className="fa fa-minus"/></Button>
        </ButtonGroup>
    </div>
}
export default PlusMinus