/* globals describe, it, expect, jest */

import { render, screen, waitFor } from '@testing-library/react'
import BoardTile from './BoardTile'
import userEvent from '@testing-library/user-event'
import * as InternalApi from '../../services/internal-api'

describe('BoardTile', () => {
  const mockDeleteBoard = jest.spyOn(InternalApi, 'deleteBoard')
  const mockUpdateBoard = jest.spyOn(InternalApi, 'updateBoard')

  it('renders correctly without password', async () => {
    const Tile = render(<BoardTile id='mockId' name='Board name 1' date='1 Jan 2022' cardCount={0} />)
    await waitFor(() => {
      expect(Tile.container).toMatchSnapshot()
    })
  })

  it('renders correctly with password', () => {
    const Tile = render(<BoardTile id='mockId' name='Board name 1' date='1 Jan 2022' cardCount={0} hasPassword />)
    expect(Tile.container).toMatchSnapshot()
  })

  it('BoardTile with password should have option removePassword and should not have option setPassword', () => {
    render(<BoardTile hasPassword />)
    userEvent.click(screen.getByText('more_horiz'))
    expect(screen.getByRole('button', { name: /contextMenu.removePassword/i })).toBeVisible()
    expect(screen.queryByRole('button', { name: /contextMenu.setPassword/i })).not.toBeInTheDocument()
  })

  it('BoardTile without password should have option setPassword and should not have option removePassword', () => {
    render(<BoardTile />)
    userEvent.click(screen.getByText('more_horiz'))
    expect(screen.getByRole('button', { name: /contextMenu.setPassword/i })).toBeVisible()
    expect(screen.queryByRole('button', { name: /contextMenu.removePassword/i })).not.toBeInTheDocument()
  })

  it('should call delete option when deleteBoard button is clicked', () => {
    render(<BoardTile id='mockedId' />)
    userEvent.click(screen.getByText('contextMenu.deleteBoard'))
    expect(mockDeleteBoard).toHaveBeenCalledTimes(1)
    expect(mockDeleteBoard).toHaveBeenCalledWith('mockedId')
  })

  it('should call patch option when removePassword button is clicked', () => {
    render(<BoardTile id='mockedId' hasPassword />)
    userEvent.click(screen.getByText('contextMenu.removePassword'))
    expect(mockUpdateBoard).toHaveBeenCalledTimes(1)
    expect(mockUpdateBoard).toHaveBeenCalledWith('mockedId', { password: null })
  })

  it('should open Modal after button click and close it after click on backdrop', () => {
    render(<BoardTile />)
    expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument()
    userEvent.click(screen.getByText('more_horiz'))
    userEvent.click(screen.queryByRole('button', { name: /contextMenu.setPassword/i }))
    expect(screen.getByTestId('backdrop')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('backdrop'))
    expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on cancel button', () => {
    render(<BoardTile />)
    expect(screen.queryByRole('button', { name: /buttons.cancel/i })).not.toBeInTheDocument()
    userEvent.click(screen.getByText('more_horiz'))
    userEvent.click(screen.queryByRole('button', { name: /contextMenu.setPassword/i }))
    expect(screen.getByRole('button', { name: /buttons.cancel/i })).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /buttons.cancel/i }))
    expect(screen.queryByRole('button', { name: /buttons.cancel/i })).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on Esc keyboard button', () => {
    render(<BoardTile />)
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
    userEvent.click(screen.getByText('more_horiz'))
    userEvent.click(screen.queryByRole('button', { name: /contextMenu.setPassword/i }))
    expect(screen.getByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
    userEvent.keyboard('{esc}')
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on save button if password length equal 8', () => {
    render(<BoardTile />)
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
    userEvent.click(screen.getByText('more_horiz'))
    userEvent.click(screen.queryByRole('button', { name: /contextMenu.setPassword/i }))
    expect(screen.getByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText('Enter password'), '12345678')
    expect(screen.getByPlaceholderText('Enter password')).toHaveValue('12345678')
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeDisabled()
    userEvent.click(screen.getByRole('button', { name: /buttons.save/i }))
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
  })

  it('should open Modal after button click and save button to be disabled if password length less than 8', () => {
    render(<BoardTile />)
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
    userEvent.click(screen.getByText('more_horiz'))
    userEvent.click(screen.queryByRole('button', { name: /contextMenu.setPassword/i }))
    expect(screen.getByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
    userEvent.type(screen.getByPlaceholderText('Enter password'), '1234')
    expect(screen.getByPlaceholderText('Enter password')).toHaveValue('1234')
    expect(screen.queryByRole('button', { name: /buttons.save/i })).toBeDisabled()
    expect(screen.queryByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
  })
})
