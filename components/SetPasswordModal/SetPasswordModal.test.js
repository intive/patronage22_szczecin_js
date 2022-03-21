/* globals describe, it, expect, jest */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SetPasswordModal from './SetPasswordModal'
import * as InternalApi from '../../services/internal-api'

describe('SetPasswordModal', () => {
  const mockUpdateBoard = jest.spyOn(InternalApi, 'updateBoard')

  it('should render SetPasswordModal correctly', () => {
    const { baseElement } = render(<SetPasswordModal isModalOpen='true' />)

    expect(baseElement).toMatchSnapshot()
  })

  it('should call patch option when save button is clicked', () => {
    render(<SetPasswordModal boardId='mockedId' isModalOpen />)
    expect(screen.getByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText('Enter password'), '12345678')
    expect(screen.getByPlaceholderText('Enter password')).toHaveValue('12345678')
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeDisabled()
    userEvent.click(screen.getByRole('button', { name: /buttons.save/i }))
    expect(mockUpdateBoard).toHaveBeenCalledTimes(1)
    expect(mockUpdateBoard).toHaveBeenCalledWith('mockedId', { password: '12345678' })
  })
})
