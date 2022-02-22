/* globals describe, expect, it */

import { render, screen } from '@testing-library/react'
import CharacterCounter from './CharacterCounter'

describe('CharacterCounter', () => {
  it('should render CharacterCounter component', () => {
    const { container } = render(<CharacterCounter maxCharacters='30' />)

    expect(container).toMatchSnapshot()
  })

  it('should render CharacterCounter component with text 9/30', () => {
    render(<CharacterCounter inputValue='Test test' maxCharacters='30' />)

    expect(screen.getByText('9/30')).toBeTruthy()
  })

  it('should render CharacterCounter component with text 0/30 when inputValue is empty', () => {
    render(<CharacterCounter maxCharacters='30' />)

    expect(screen.getByText('0/30')).toBeTruthy()
  })
})
