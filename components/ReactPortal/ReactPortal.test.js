/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import ReactPortal from './ReactPortal'

describe('ReactPortal', () => {
  it('should render ReactPortal correctly', () => {
    const { baseElement } = render(<ReactPortal wrapperId='testId' />)

    expect(baseElement).toMatchSnapshot()
  })
})
