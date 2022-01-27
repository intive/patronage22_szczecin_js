/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import Input from './Input'

describe('Input', () => {
  it('should render Input correctly', () => {
    const { container } = render(<Input />)

    expect(container).toMatchSnapshot()
  })

  it('should render Input with type correctly', () => {
    const { container } = render(<Input type='password' />)

    expect(container).toMatchSnapshot()
  })
})
