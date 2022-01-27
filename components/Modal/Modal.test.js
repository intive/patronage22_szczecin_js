/* globals describe, it, expect  */
/* eslint-env jest */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Modal from './Modal'

describe('Modal', () => {
  it('should render Modal correctly', () => {
    const { baseElement } = render(<Modal isOpen='true' title='title' subtitle='subtitle' />)

    expect(baseElement).toMatchSnapshot()
  })

  it('should close Modal after click on cancel button', () => {
    const mockOnClick = jest.fn()
    render(<Modal isOpen='true' handleClose={mockOnClick} />)
    userEvent.click(screen.getByRole('button', { name: /buttons.cancel/i }))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should close Modal after click on continue button', () => {
    const mockOnClick = jest.fn()
    render(<Modal isOpen='true' handleClose={mockOnClick} />)
    userEvent.click(screen.getByRole('button', { name: /buttons.continue/i }))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should close Modal after click on Backdrop', () => {
    const mockOnClick = jest.fn()
    render(<Modal isOpen='true' handleClose={mockOnClick} />)
    userEvent.click(screen.getByTestId('backdrop'))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should close Modal after click on Esc keyboard button', () => {
    const mockOnClick = jest.fn()
    render(<Modal isOpen='true' handleClose={mockOnClick} />)
    userEvent.keyboard('{esc}')

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
