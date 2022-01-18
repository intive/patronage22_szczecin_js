/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import BoardTile from './BoardTile'

describe('BoardTile', () => {
  it('renders correctly without password', () => {
    const Tile = render(<BoardTile name='Board name 1' date='1 Jan 2022' cardCount={0} />)
    expect(Tile.container).toMatchSnapshot()
  })

  it('renders correctly with password', () => {
    const Tile = render(<BoardTile name='Board name 1' date='1 Jan 2022' cardCount={0} hasPassword />)
    expect(Tile.container).toMatchSnapshot()
  })
})
