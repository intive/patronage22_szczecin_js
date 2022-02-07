/* globals describe, expect, it */

import { render } from '@testing-library/react'
import BoardHeader from './BoardHeader'

describe('BoardHeader', () => {
  it('should render BoardHeader', () => {
    const { container } = render(<BoardHeader returnLinkText='Return to main board' buttonText='New Column' title='Board name 1' />)
    expect(container).toMatchSnapshot()
  })
})
