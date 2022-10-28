import React from 'react'
import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import PlusMinus from './PlusMinus';

test('renders PlusMinus enabled', async () => {
  // Arrange
  render(<PlusMinus position="bottom" onClickPlusMinus={()=>{}}/>);
  // Assert
  screen.getAllByRole('button').forEach(b=>{
    expect(b).not.toBeDisabled()
  })
})
