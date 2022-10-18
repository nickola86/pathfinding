import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import './PlusMinus.css'
function PlusMinus(props){
    return <div className={`buttons ${props.position}`}>
        <ButtonGroup>
            <Button><i className="fa fa-plus" /></Button>
            <Button><i className="fa fa-minus" /></Button>
        </ButtonGroup>
    </div>
}
export default PlusMinus