/* globals describe, it, expect  */

import { render, screen } from '@testing-library/react'
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

  it('should render Input component and CharacterCounter with text 0/8', () => {
    render(<Input maxLength='8' />)

    expect(screen.getByText('0/8')).toBeTruthy()
  })
})
