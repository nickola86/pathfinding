import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import Cell from "./Cell";

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

it("renders with label Passaggio", () => {
    act(() => {
    render(<Cell labels='on' cellType='empty'/>, container);
    });
    expect(container.textContent).toBe("Passaggio");
});
it("renders with label Muro", () => {
    act(() => {
    render(<Cell labels='on' cellType='wall'/>, container);
    });
    expect(container.textContent).toBe("Muro");
});
it("renders with label Ingresso", () => {
    act(() => {
    render(<Cell labels='on' cellType='entrypoint'/>, container);
    });
    expect(container.textContent).toBe("Ingresso");
});
it("renders with label Uscita", () => {
    act(() => {
    render(<Cell labels='on' cellType='wayout'/>, container);
    });
    expect(container.textContent).toBe("Uscita");
});

it("changes cellType from empty to wall when clicked", () => {
  const onChange = jest.fn();
  act(() => {
    render(<Cell cellType='empty' onCellChange={()=>{}} />, container);
  });
  const button = document.querySelector("button.cell.empty");
  act(() => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });
  expect(button.classList.contains("wall")).toBe(true);
});