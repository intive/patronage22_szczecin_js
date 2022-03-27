/* globals describe, it, expect  */
/* eslint-env jest */

import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BoardCreator from './BoardCreator'
import * as InternalApi from '../../services/internal-api'

describe('BoardCreator', () => {
  it('renders modal BoardCreator', () => {
    const { baseElement } = render(
      <BoardCreator isOpen />
    )

    expect(baseElement).toMatchSnapshot()
  })

  it('should close modal after click on continue button', async () => {
    render(<BoardCreator isOpen />)
    userEvent.type(screen.getByRole('textbox'), 'Test5')
    const button = screen.getByRole('button', { name: /buttons.continue/ })
    userEvent.click(button)

    waitForElementToBeRemoved(button).then(() => expect(button).not.toBeInTheDocument())
  })

  it('should close modal after click on cross button', () => {
    render(<BoardCreator isOpen />)
    const button = screen.getByRole('button', { name: /close/ })
    userEvent.click(button)
    expect(button).not.toBeInTheDocument()
  })

  it('should filled input field correctly', () => {
    const inputData = { boardname: 'My new board' }
    const { baseElement } = render(
      <BoardCreator isOpen />
    )
    const boardnameInput = screen.getByRole('textbox')
    boardnameInput.value = inputData.boardname

    expect(boardnameInput.value.length).toBe(12)
    expect(boardnameInput.value).toBe('My new board')
    expect(baseElement).toMatchSnapshot()
  })

  it('should show the continue button with the attribute disabled after rendering BoardCreator', () => {
    render(<BoardCreator isOpen />)

    expect(screen.getByText('buttons.continue')).toHaveAttribute('disabled')
  })

  it('should remove disbaled atribute on continue button after type 5 characters in text area', () => {
    render(<BoardCreator isOpen />)

    expect(screen.getByText('buttons.continue')).toHaveAttribute('disabled')

    userEvent.type(screen.getByRole('textbox'), 'Test5')

    expect(screen.getByRole('textbox')).toHaveValue('Test5')
    expect(screen.queryByText('buttons.continue')).not.toHaveAttribute('disabled')
  })

  it('should call add option', () => {
    const mockAddBoard = jest.spyOn(InternalApi, 'addBoard')
    render(<BoardCreator isOpen />)
    userEvent.type(screen.getByRole('textbox'), 'Test5')
    userEvent.click(screen.queryByText('buttons.continue'))

    expect(mockAddBoard).toHaveBeenCalledTimes(1)
  })
})
