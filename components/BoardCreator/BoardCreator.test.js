/* globals describe, it, expect  */
/* eslint-env jest */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BoardCreator from './BoardCreator'

describe('BoardCreator', () => {
  it('renders modal BoardCreator', () => {
    const { baseElement } = render(
      <BoardCreator isOpen />
    )

    expect(baseElement).toMatchSnapshot()
  })

  it('should close modal after click on cross button', () => {
    const mockOnClick = jest.fn()
    const { baseElement } = render(
      <BoardCreator isOpen onClose={mockOnClick} />
    )
    userEvent.click(screen.getByRole('button', { name: /close/ }))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(baseElement).toMatchSnapshot()
  })

  it('should close modal after click on continue button', () => {
    const mockOnClick = jest.fn()
    const { baseElement } = render(
      <BoardCreator isOpen handleOnClickContinue={mockOnClick} />
    )
    userEvent.click(screen.getByRole('button', { name: /buttons.continue/ }))

    expect(mockOnClick).toHaveBeenCalledTimes(1)
    expect(baseElement).toMatchSnapshot()
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
})
