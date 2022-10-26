import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import PlusMinus from './PlusMinus';

let container = null;

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

it("renders PlusMinus with 1 button plus and 1 button minus ", () => {
    act(() => {
    render(<PlusMinus position="bottom" onClickPlusMinus={()=>{}}/>, container);
    });
    const buttons = document.querySelectorAll(".plus-minus");
    expect(buttons.length).toBe(1);
    const plusBtn = document.querySelectorAll(".plus-minus button.plus");
    expect(buttons.length).toBe(1);
    const minusBtn = document.querySelectorAll(".plus-minus button.minus");
    expect(buttons.length).toBe(1);
});
