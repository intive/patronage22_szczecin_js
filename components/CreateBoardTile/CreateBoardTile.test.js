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

  it('should open modal when button is clicked', () => {
    render(<CreateBoardTile />)
    userEvent.click(screen.getAllByRole('button')[0])

    expect(screen.getByRole('button', { name: /buttons.continue/ })).toBeInTheDocument()
  })

  it('should open modal when whole tile is clicked', () => {
    render(<CreateBoardTile />)
    userEvent.click(screen.getByText('New board'))

    expect(screen.getByRole('button', { name: /buttons.continue/ })).toBeInTheDocument()
  })

  it('should close open modal when close button is clicked', () => {
    render(<CreateBoardTile />)
    userEvent.click(screen.getByText('New board'))
    const button = screen.getByRole('button', { name: /close/ })
    userEvent.click(screen.getByRole('button', { name: /close/ }))

    expect(button).not.toBeInTheDocument()
  })
})
