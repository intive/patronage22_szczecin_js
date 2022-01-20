/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import Header from './header'

describe('Header', () => {
  it('should render Header', () => {
    const header = render(<Header />)
    expect(header).toMatchSnapshot()
  })
})
