/* globals describe, it, expect  */

import { render } from '@testing-library/react'
import SetPasswordModal from './SetPasswordModal'

describe('SetPasswordModal', () => {
  it('should render SetPasswordModal correctly', () => {
    const { baseElement } = render(<SetPasswordModal isOpen='true' />)

    expect(baseElement).toMatchSnapshot()
  })
})
