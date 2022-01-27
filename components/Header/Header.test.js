/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import Header from './Header'

describe('Header', () => {
  it('should render Header', () => {
    const { container } = render(<Header />)

    expect(container).toMatchSnapshot()
  })
})
