/* globals describe, it, expect */

import { render } from '@testing-library/react'
import BoardDetails from './index.page'

describe('BoardDetails', () => {
  const tileDetails = {
    id: 'mockedId1',
    name: 'mockedName',
    createdAt: '2022-02-07T09:21:06.262Z',
    password: '12345',
    columns: [
      {
        id: '01FZMRG5SMX53ST5M7Y7XZAE6M',
        name: 'Quasicolumn',
        cards: [
          {
            id: '01FZMRHGYWE7S8FFB46VHN2CJQ',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
          }
        ]
      },
      {
        id: '01FZSVE2NSS9CP4FD6Q9SB69JA',
        name: 'Another column'
      }
    ]
  }
  it('should render BoardDetails', () => {
    const { container } = render(<BoardDetails tileDetails={tileDetails} />)
    expect(container).toMatchSnapshot()
  })
})
