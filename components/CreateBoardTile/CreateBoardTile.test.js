/* globals describe, it, expect  */
/* eslint-env jest */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import CreateBoardTile from './CreateBoardTile'

describe('CreateBoardTile', () => {
  it('renders correctly', () => {
    const { container } = render(<CreateBoardTile />)
    expect(container).toMatchSnapshot()
  })

  it('clicks on whole tile', () => {
    const mockOnClick = jest.fn()
    render(<CreateBoardTile onClick={mockOnClick} />)
    userEvent.click(screen.getAllByRole('button')[0])
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('clicks on button', () => {
    const mockOnClick = jest.fn()
    render(<CreateBoardTile onClick={mockOnClick} />)
    userEvent.click(screen.getByText('New board'))
    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
