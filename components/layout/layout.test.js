/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import Layout from './Layout'

describe('Header', () => {
  it('should render Layout', () => {
    const layout = render(<Layout />)
    expect(layout).toMatchSnapshot()
  })
})
