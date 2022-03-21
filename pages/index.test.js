/* globals describe, it, expect  */
/* eslint-env jest */

import { render, waitFor } from '@testing-library/react'
import Home from './index.page'

describe('Home', () => {
  const tilesList = [
    {
      id: 1,
      name: 'mockedName',
      date: '1 Jan 2022',
      cardCount: 0,
      hasPassword: false
    }
  ]

  it('should render Home page', async () => {
    const { container } = render(<Home tilesList={tilesList} />)
    await waitFor(() => { expect(container).toMatchSnapshot() })
  })
})
