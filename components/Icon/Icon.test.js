/* globals describe, expect, it */

import { render } from '@testing-library/react'
import Icon from './Icon'

describe('Icon', () => {
  it('renders correctly name props', () => {
    const icon = render(<Icon name='tag_faces' />)
    expect(icon.container).toMatchSnapshot()
  })
})
