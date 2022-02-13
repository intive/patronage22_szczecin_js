/* globals describe, it, expect  */

import { render, screen } from '@testing-library/react'
import BoardTile from './BoardTile'
import userEvent from '@testing-library/user-event'

describe('BoardTile', () => {
  it('renders correctly without password', () => {
    const Tile = render(<BoardTile name='Board name 1' date='1 Jan 2022' cardCount={0} />)
    expect(Tile.container).toMatchSnapshot()
  })

  it('renders correctly with password', () => {
    const Tile = render(<BoardTile name='Board name 1' date='1 Jan 2022' cardCount={0} hasPassword />)
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
})
