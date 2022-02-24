/* globals describe, it, expect  */
/* eslint-env jest */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from './index.page'

describe('Home', () => {
  const tilesList = [
    {
      id: 1,
      name: 'mockedName',
      date: '1 Jan 2022',
      cardCount: 0,
      hasPassword: false
    }
  ]

  it('should render Home page', async () => {
    const { container } = render(<Home tilesList={tilesList} />)
    expect(container).toMatchSnapshot()
  })

  // TODO!! all tests that are below must be moved to BoardTile after the modal component will be integrated

  it('should open Modal after button click and close it after click on backdrop', () => {
    render(<Home tilesList={tilesList} />)
    expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /Click to Open Modal/i }))
    expect(screen.getByTestId('backdrop')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('backdrop'))
    expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on cancel button', () => {
    render(<Home tilesList={tilesList} />)
    expect(screen.queryByRole('button', { name: /buttons.cancel/i })).not.toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /Click to Open Modal/i }))
    expect(screen.getByRole('button', { name: /buttons.cancel/i })).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /buttons.cancel/i }))
    expect(screen.queryByRole('button', { name: /buttons.cancel/i })).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on continue button', () => {
    render(<Home tilesList={tilesList} />)
    expect(screen.queryByRole('button', { name: /buttons.continue/i })).not.toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /Click to Open Modal/i }))
    expect(screen.getByRole('button', { name: /buttons.continue/i })).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /buttons.continue/i }))
    expect(screen.queryByRole('button', { name: /buttons.continue/i })).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on Esc keyboard button', () => {
    render(<Home tilesList={tilesList} />)
    expect(screen.queryByRole('button', { name: /buttons.continue/i })).not.toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /Click to Open Modal/i }))
    expect(screen.getByRole('button', { name: /buttons.continue/i })).toBeInTheDocument()
    userEvent.keyboard('{esc}')
    expect(screen.queryByRole('button', { name: /buttons.continue/i })).not.toBeInTheDocument()
  })
})
