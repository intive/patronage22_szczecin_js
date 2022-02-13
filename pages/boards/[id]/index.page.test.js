/* globals describe, it, expect */

import { render } from '@testing-library/react'
import BoardDetails from './index.page'

describe('BoardDetails', () => {
  const tileDetails = {
    id: 'mockedId1',
    name: 'mockedName',
    createdAt: '2022-02-07T09:21:06.262Z',
    password: '12345'
  }
  it('should render BoardDetails', () => {
    const { container } = render(<BoardDetails tileDetails={tileDetails} />)
    expect(container).toMatchSnapshot()
  })
})
