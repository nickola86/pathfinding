import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Gameboard from './Gameboard';

test('renders the Gameboard', async () => {
  render(<Gameboard />);
  //Gameboard must be rendered
  expect(document.querySelector('.gameboard')).toBeInTheDocument();
  //Plus Minus controllers must be 4
  expect(document.querySelectorAll('.btn-group').length).toBe(4);
  const btn = screen.getByText('Trova il cammino minimo!');
  //Start button must be rendered
  expect(btn).toBeInTheDocument();
  //Start button must be disabled
  expect(btn).toBeDisabled();
  //default grid qith 19 rows, 43 cols, 817 cells.
  expect(document.querySelectorAll(".grid .clear").length).toBe(19);
  expect(document.querySelectorAll(".grid .cell").length).toBe(817);

  //backend loader button must be rendered
  expect(screen.getByText('Carica griglia da backend')).toBeInTheDocument();
})
