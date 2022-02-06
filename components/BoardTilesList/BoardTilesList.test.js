
/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import BoardTilesList from './BoardTilesList'

describe('BoardTilesList', () => {
  const tilesList = [
    {
      id: 'mockedId1',
      name: 'mockedName',
      date: '1 Jan 2022',
      cardCount: 0,
      hasPassword: false
    },
    {
      id: 'mockedId2',
      name: 'mockedName',
      date: '1 Jan 2022',
      cardCount: 3,
      hasPassword: true
    }
  ]

  it('should render name, date, no icon when password is not provided or render render icon when password is provided', () => {
    const { container } = render(<BoardTilesList tilesList={tilesList} />)
    expect(container).toMatchSnapshot()
  })
})
