
/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import Home from './index.page'

describe('Home', () => {
  it('should render Home page', () => {
    const { container } = render(<Home />)
    expect(container).toMatchSnapshot()
  })
})
