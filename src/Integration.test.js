import React from 'react'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import Gameboard from './components/gameboard/Gameboard'

//Long running test
jest.setTimeout(60000)


const MOCK = {"cols": 43,"rows": 19,"cells": [{"x": 0,"y": 1,"type": "wall"}, {"x": 0,"y": 5,"type": "wall"}, {"x": 0,"y": 6,"type": "wall"}, {"x": 0,"y": 10,"type": "wall"}, {"x": 0,"y": 17,"type": "wall"}, {"x": 0,"y": 28,"type": "wall"}, {"x": 0,"y": 32,"type": "wall"}, {"x": 1,"y": 0,"type": "wall"}, {"x": 1,"y": 10,"type": "wall"}, {"x": 1,"y": 18,"type": "wall"}, {"x": 1,"y": 25,"type": "wall"}, {"x": 1,"y": 29,"type": "wall"}, {"x": 1,"y": 38,"type": "wall"}, {"x": 1,"y": 39,"type": "wall"}, {"x": 2,"y": 5,"type": "wall"}, {"x": 2,"y": 7,"type": "wall"}, {"x": 2,"y": 9,"type": "wall"}, {"x": 2,"y": 10,"type": "wall"}, {"x": 2,"y": 21,"type": "wall"}, {"x": 2,"y": 22,"type": "wall"}, {"x": 2,"y": 23,"type": "wall"}, {"x": 2,"y": 26,"type": "wall"}, {"x": 2,"y": 28,"type": "wall"}, {"x": 2,"y": 35,"type": "wall"}, {"x": 3,"y": 11,"type": "wall"}, {"x": 3,"y": 14,"type": "wall"}, {"x": 3,"y": 16,"type": "wall"}, {"x": 3,"y": 20,"type": "wall"}, {"x": 3,"y": 22,"type": "wall"}, {"x": 3,"y": 24,"type": "wall"}, {"x": 3,"y": 28,"type": "wall"}, {"x": 3,"y": 30,"type": "wall"}, {"x": 3,"y": 31,"type": "wall"}, {"x": 3,"y": 35,"type": "wall"}, {"x": 3,"y": 37,"type": "wall"}, {"x": 3,"y": 40,"type": "wall"}, {"x": 4,"y": 9,"type": "wall"}, {"x": 4,"y": 18,"type": "wall"}, {"x": 4,"y": 21,"type": "wall"}, {"x": 4,"y": 27,"type": "wall"}, {"x": 4,"y": 28,"type": "wall"}, {"x": 4,"y": 29,"type": "wall"}, {"x": 4,"y": 30,"type": "wall"}, {"x": 4,"y": 32,"type": "wall"}, {"x": 4,"y": 36,"type": "wall"}, {"x": 4,"y": 38,"type": "wall"}, {"x": 5,"y": 0,"type": "wall"}, {"x": 5,"y": 1,"type": "wall"}, {"x": 5,"y": 3,"type": "wall"}, {"x": 5,"y": 4,"type": "wall"}, {"x": 5,"y": 13,"type": "wall"}, {"x": 5,"y": 14,"type": "wall"}, {"x": 5,"y": 24,"type": "wall"}, {"x": 5,"y": 26,"type": "wall"}, {"x": 5,"y": 29,"type": "wall"}, {"x": 5,"y": 31,"type": "wall"}, {"x": 5,"y": 35,"type": "wall"}, {"x": 5,"y": 38,"type": "wall"}, {"x": 5,"y": 40,"type": "wall"}, {"x": 6,"y": 13,"type": "wall"}, {"x": 6,"y": 18,"type": "wall"}, {"x": 6,"y": 19,"type": "wall"}, {"x": 6,"y": 25,"type": "wall"}, {"x": 6,"y": 27,"type": "wall"}, {"x": 6,"y": 28,"type": "wall"}, {"x": 6,"y": 30,"type": "wall"}, {"x": 6,"y": 31,"type": "wall"}, {"x": 7,"y": 6,"type": "wall"}, {"x": 7,"y": 14,"type": "wall"}, {"x": 7,"y": 17,"type": "wall"}, {"x": 7,"y": 18,"type": "wall"}, {"x": 7,"y": 19,"type": "wall"}, {"x": 7,"y": 20,"type": "wall"}, {"x": 7,"y": 24,"type": "wall"}, {"x": 7,"y": 27,"type": "wall"}, {"x": 7,"y": 29,"type": "wall"}, {"x": 7,"y": 32,"type": "wall"}, {"x": 7,"y": 36,"type": "wall"}, {"x": 7,"y": 41,"type": "wall"}, {"x": 8,"y": 5,"type": "wall"}, {"x": 8,"y": 7,"type": "wall"}, {"x": 8,"y": 13,"type": "wall"}, {"x": 8,"y": 16,"type": "wall"}, {"x": 8,"y": 20,"type": "wall"}, {"x": 8,"y": 22,"type": "wall"}, {"x": 8,"y": 36,"type": "wall"}, {"x": 8,"y": 37,"type": "wall"}, {"x": 9,"y": 4,"type": "start"}, {"x": 9,"y": 8,"type": "wall"}, {"x": 9,"y": 9,"type": "wall"}, {"x": 9,"y": 10,"type": "wall"}, {"x": 9,"y": 15,"type": "wall"}, {"x": 9,"y": 21,"type": "wall"}, {"x": 9,"y": 26,"type": "wall"}, {"x": 9,"y": 30,"type": "wall"}, {"x": 9,"y": 33,"type": "wall"}, {"x": 9,"y": 38,"type": "finish"}, {"x": 9,"y": 40,"type": "wall"}, {"x": 9,"y": 41,"type": "wall"}, {"x": 10,"y": 0,"type": "wall"}, {"x": 10,"y": 5,"type": "wall"}, {"x": 10,"y": 9,"type": "wall"}, {"x": 10,"y": 13,"type": "wall"}, {"x": 10,"y": 15,"type": "wall"}, {"x": 10,"y": 18,"type": "wall"}, {"x": 10,"y": 25,"type": "wall"}, {"x": 10,"y": 29,"type": "wall"}, {"x": 10,"y": 31,"type": "wall"}, {"x": 10,"y": 33,"type": "wall"}, {"x": 10,"y": 37,"type": "wall"}, {"x": 10,"y": 39,"type": "wall"}, {"x": 10,"y": 41,"type": "wall"}, {"x": 11,"y": 1,"type": "wall"}, {"x": 11,"y": 2,"type": "wall"}, {"x": 11,"y": 3,"type": "wall"}, {"x": 11,"y": 6,"type": "wall"}, {"x": 11,"y": 11,"type": "wall"}, {"x": 11,"y": 14,"type": "wall"}, {"x": 11,"y": 17,"type": "wall"}, {"x": 11,"y": 18,"type": "wall"}, {"x": 11,"y": 19,"type": "wall"}, {"x": 11,"y": 24,"type": "wall"}, {"x": 11,"y": 25,"type": "wall"}, {"x": 11,"y": 28,"type": "wall"}, {"x": 11,"y": 32,"type": "wall"}, {"x": 12,"y": 0,"type": "wall"}, {"x": 12,"y": 6,"type": "wall"}, {"x": 12,"y": 10,"type": "wall"}, {"x": 12,"y": 23,"type": "wall"}, {"x": 12,"y": 24,"type": "wall"}, {"x": 12,"y": 28,"type": "wall"}, {"x": 12,"y": 33,"type": "wall"}, {"x": 12,"y": 34,"type": "wall"}, {"x": 12,"y": 35,"type": "wall"}, {"x": 12,"y": 37,"type": "wall"}, {"x": 12,"y": 41,"type": "wall"}, {"x": 13,"y": 8,"type": "wall"}, {"x": 13,"y": 11,"type": "wall"}, {"x": 13,"y": 12,"type": "wall"}, {"x": 13,"y": 15,"type": "wall"}, {"x": 13,"y": 16,"type": "wall"}, {"x": 13,"y": 24,"type": "wall"}, {"x": 13,"y": 26,"type": "wall"}, {"x": 13,"y": 29,"type": "wall"}, {"x": 13,"y": 31,"type": "wall"}, {"x": 13,"y": 32,"type": "wall"}, {"x": 13,"y": 33,"type": "wall"}, {"x": 14,"y": 0,"type": "wall"}, {"x": 14,"y": 1,"type": "wall"}, {"x": 14,"y": 3,"type": "wall"}, {"x": 14,"y": 4,"type": "wall"}, {"x": 14,"y": 5,"type": "wall"}, {"x": 14,"y": 8,"type": "wall"}, {"x": 14,"y": 10,"type": "wall"}, {"x": 14,"y": 15,"type": "wall"}, {"x": 14,"y": 18,"type": "wall"}, {"x": 14,"y": 19,"type": "wall"}, {"x": 14,"y": 24,"type": "wall"}, {"x": 14,"y": 25,"type": "wall"}, {"x": 14,"y": 27,"type": "wall"}, {"x": 14,"y": 31,"type": "wall"}, {"x": 15,"y": 0,"type": "wall"}, {"x": 15,"y": 1,"type": "wall"}, {"x": 15,"y": 7,"type": "wall"}, {"x": 15,"y": 8,"type": "wall"}, {"x": 15,"y": 9,"type": "wall"}, {"x": 15,"y": 14,"type": "wall"}, {"x": 15,"y": 29,"type": "wall"}, {"x": 15,"y": 30,"type": "wall"}, {"x": 15,"y": 32,"type": "wall"}, {"x": 15,"y": 38,"type": "wall"}, {"x": 16,"y": 2,"type": "wall"}, {"x": 16,"y": 3,"type": "wall"}, {"x": 16,"y": 6,"type": "wall"}, {"x": 16,"y": 11,"type": "wall"}, {"x": 16,"y": 17,"type": "wall"}, {"x": 16,"y": 21,"type": "wall"}, {"x": 16,"y": 26,"type": "wall"}, {"x": 16,"y": 28,"type": "wall"}, {"x": 16,"y": 30,"type": "wall"}, {"x": 16,"y": 37,"type": "wall"}, {"x": 16,"y": 38,"type": "wall"}, {"x": 16,"y": 39,"type": "wall"}, {"x": 16,"y": 40,"type": "wall"}, {"x": 17,"y": 1,"type": "wall"}, {"x": 17,"y": 3,"type": "wall"}, {"x": 17,"y": 19,"type": "wall"}, {"x": 17,"y": 20,"type": "wall"}, {"x": 17,"y": 25,"type": "wall"}, {"x": 17,"y": 30,"type": "wall"}, {"x": 17,"y": 33,"type": "wall"}, {"x": 17,"y": 34,"type": "wall"}, {"x": 17,"y": 38,"type": "wall"}, {"x": 17,"y": 39,"type": "wall"}, {"x": 17,"y": 41,"type": "wall"}, {"x": 17,"y": 42,"type": "wall"}, {"x": 18,"y": 3,"type": "wall"}, {"x": 18,"y": 6,"type": "wall"}, {"x": 18,"y": 11,"type": "wall"}, {"x": 18,"y": 12,"type": "wall"}, {"x": 18,"y": 13,"type": "wall"}, {"x": 18,"y": 16,"type": "wall"}, {"x": 18,"y": 18,"type": "wall"}, {"x": 18,"y": 19,"type": "wall"}, {"x": 18,"y": 21,"type": "wall"}, {"x": 18,"y": 22,"type": "wall"}, {"x": 18,"y": 23,"type": "wall"}, {"x": 18,"y": 27,"type": "wall"}, {"x": 18,"y": 31,"type": "wall"}, {"x": 18,"y": 33,"type": "wall"}, {"x": 18,"y": 35,"type": "wall"}, {"x": 18,"y": 40,"type": "wall"}]};

const server = setupServer(
  // capture "GET /greeting" requests
  rest.get('/api/grid.json', (req, res, ctx) => {
    // respond using a mocked JSON body
    return res(ctx.json(MOCK))
  })
)

// establish API mocking before all tests
beforeAll(() => server.listen())
// reset any request handlers that are declared as a part of our tests
// (i.e. for testing one-time error scenarios)
afterEach(() => server.resetHandlers())
// clean up once the tests are done
afterAll(() => server.close())

test('End2End - Gameboard fetch load grid from backend and find path of cost 45', async () => {
  render(<Gameboard />);
  //backend loader button must be rendered
  const btnLoadBackend = screen.getByRole('button-load-backend');
  expect(btnLoadBackend).toBeInTheDocument();
  fireEvent.click(btnLoadBackend);
  //Grid loaded with 211 walls
  await waitFor(() => expect(document.querySelectorAll('.cell.wall').length).toBe(211))
  //solve button must be rendered
  const btnSolve = screen.getByRole('button-solve')
  expect(btnSolve).toBeInTheDocument();
  fireEvent.click(btnSolve)
  await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Costo del cammino minimo: 45'),
      {
        timeout: 60000,
        interval: 5000,
        onTimeout: (error) => {
            expect(screen.getByRole('status').toHaveTextContent('Destinazione non raggiunta'))
        }
      })
})