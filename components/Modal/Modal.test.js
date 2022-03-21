/* globals describe, it, expect  */
/* eslint-env jest */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ModalProvider } from '../../store/modal-context'
import Modal from './Modal'

const renderModal = (value) => render(
  <ModalProvider value={value}>
    <Modal />
  </ModalProvider>
)

describe('Modal', () => {
  it('should render Modal correctly', () => {
    const value = {
      isModalOpen: 'true',
      title: 'title',
      subtitle: 'subtitle'
    }
    const { baseElement } = renderModal(value)

    expect(baseElement).toMatchSnapshot()
  })

  it('should close Modal after click on cancel button', () => {
    const mockOnClick = jest.fn()
    const value = {
      isModalOpen: 'true',
      handleClose: mockOnClick
    }
    renderModal(value)
    userEvent.click(screen.getByRole('button', { name: /buttons.cancel/i }))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('if button disabled, should not close Modal after click on save button', () => {
    const mockOnClick = jest.fn()
    const value = {
      isModalOpen: 'true',
      closeModal: mockOnClick,
      disabled: 'disabled'
    }
    renderModal(value)
    expect(screen.queryByRole('button', { name: /buttons.save/i })).toBeDisabled()
    userEvent.click(screen.getByRole('button', { name: /buttons.save/i }))

    expect(mockOnClick).toHaveBeenCalledTimes(0)
  })

  it('should close Modal after click on Backdrop', () => {
    const mockOnClick = jest.fn()
    const value = {
      isModalOpen: 'true',
      handleClose: mockOnClick
    }
    renderModal(value)
    userEvent.click(screen.getByTestId('backdrop'))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })

  it('should close Modal after click on Esc keyboard button', () => {
    const mockOnClick = jest.fn()
    const value = {
      isModalOpen: 'true',
      handleClose: mockOnClick
    }
    renderModal(value)
    userEvent.keyboard('{esc}')

    expect(mockOnClick).toHaveBeenCalledTimes(1)
  })
})
