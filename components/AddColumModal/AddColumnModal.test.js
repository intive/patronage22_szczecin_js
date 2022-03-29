/* globals describe, it, expect, jest */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import AddColumnModal from './AddColumnModal'
import * as InternalApi from '../../services/internal-api'
import { ToastsContextProvider } from '../../store/toasts-context'
import MockAddColumnModal from './MockAddColumnModal'

describe('AddColumnModal', () => {
  const mockAddColumn = jest.spyOn(InternalApi, 'addColumn')

  it('should render AddColumnModal correctly', () => {
    const { baseElement } = render(<AddColumnModal isModalOpen='true' />)

    expect(baseElement).toMatchSnapshot()
  })

  it('should call addColumn option when save button is clicked', () => {
    const mockOnClick = jest.fn()
    render(<AddColumnModal boardId='mockedId' isModalOpen handleClose={mockOnClick} />)
    expect(screen.getByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
    userEvent.type(screen.getByRole('textbox'), 'Column1')
    expect(screen.getByRole('textbox')).toHaveValue('Column1')
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeDisabled()
    userEvent.click(screen.getByRole('button', { name: /buttons.save/i }))
    expect(mockAddColumn).toHaveBeenCalledTimes(1)
    expect(mockAddColumn).toHaveBeenCalledWith('mockedId', 'Column1')
  })

  it('should display a success toast after a successful add column operation', async () => {
    const mockOnClick = jest.fn()
    const mockStatus = mockAddColumn.mockResolvedValue({ status: 200 })
    const data = await mockStatus()

    render(<ToastsContextProvider><MockAddColumnModal isModalOpen handleClose={mockOnClick} id={data.status} /></ToastsContextProvider>)

    userEvent.type(screen.getByRole('textbox'), 'Column1')
    userEvent.click(screen.getByRole('button', { name: /buttons.save/i }))

    expect(screen.getByText(/toastMessage.column.successToast/)).toBeInTheDocument()
  })

  it('should display an error toast after a failed add column operation', async () => {
    const mockOnClick = jest.fn()
    const mockStatus = mockAddColumn.mockResolvedValue({ status: 404 })
    const data = await mockStatus()

    render(<ToastsContextProvider><MockAddColumnModal isModalOpen handleClose={mockOnClick} id={data.status} /></ToastsContextProvider>)

    userEvent.type(screen.getByRole('textbox'), 'Column1')
    userEvent.click(screen.getByRole('button', { name: /buttons.save/i }))

    expect(screen.getByText(/toastMessage.errorToast/)).toBeInTheDocument()
  })
})
