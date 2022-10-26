import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Grid from './Grid';
function CreateGuid() {
   function _p8(s) {
      var p = (Math.random().toString(16)+"000000000").substr(2,8);
      return s ? "-" + p.substr(0,4) + "-" + p.substr(4,4) : p ;
   }
   return _p8() + _p8(true) + _p8(true) + _p8();
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
let container = null;
const emptyCell = {
    cellType : "empty",
};

beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders grid of nCols(10) x nRows(10) = Cells(100) ", () => {
    act(() => {
    render(<Grid  cells={buildMatrix(10,10)}/>, container);
    });
    const buttons = document.querySelectorAll("button.cell");
    console.log("buttons",buttons);
    expect(buttons.length).toBe(100);
});
