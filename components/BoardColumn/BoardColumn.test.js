/* globals describe, expect, it */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BoardColumn from './BoardColumn'

describe('BoardColumn', () => {
  it('should render BoardColumn component', () => {
    const { container } = render(<BoardColumn />)

    expect(container).toMatchSnapshot()
  })

  it('should hide add card button and show cancel button after click on add card button', () => {
    render(<BoardColumn />)
    const button = screen.getByText('boardColumn.addCard')
    userEvent.click(button)

    expect(screen.queryByText(/buttons.cancel/i)).toBeVisible()
    expect(button).not.toBeVisible()
  })

  it('should hide add card button and show save button after click on add card button', () => {
    render(<BoardColumn />)
    const button = screen.getByText('boardColumn.addCard')
    userEvent.click(button)

    expect(screen.queryByText(/buttons.save/i)).toBeVisible()
    expect(button).not.toBeInTheDocument()
  })

  it('should hide save button and show add card button after click on save button', () => {
    render(<BoardColumn />)
    userEvent.click(screen.getByText('boardColumn.addCard'))
    userEvent.click(screen.getByText('buttons.save'))

    expect(screen.queryByText(/boardColumn.save/i)).not.toBeInTheDocument()
    expect(screen.getByText('boardColumn.addCard')).toBeVisible()
  })

  it('should hide cancel button and show add card button after click on cancel button', () => {
    render(<BoardColumn />)
    userEvent.click(screen.getByText('boardColumn.addCard'))
    userEvent.click(screen.getByText('buttons.cancel'))

    expect(screen.queryByText(/boardColumn.cancel/i)).not.toBeInTheDocument()
    expect(screen.getByText('boardColumn.addCard')).toBeVisible()
  })
})
