/* globals describe, it, expect  */
/* eslint-env jest */

import { render, screen } from '@testing-library/react'
import BoardCreatorWizard from './BoardCreatorWizard'

describe('BoardCreatorWizard', () => {
  it('renders boardCreatorWizard', () => {
    const { container } = render(
      <BoardCreatorWizard />
    )

    expect(container).toMatchSnapshot()
  })

  it('should filled input field correctly', () => {
    const inputData = { boardname: 'My new board' }
    const { container } = render(
      <BoardCreatorWizard />
    )
    const boardnameInput = screen.getByRole('textbox')
    boardnameInput.value = inputData.boardname

    expect(boardnameInput.value.length).toBe(12)
    expect(boardnameInput.value).toBe('My new board')
    expect(container).toMatchSnapshot()
  })
})
