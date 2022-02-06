/* globals describe, expect, it */
/* eslint-env jest */

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TextArea from './TextArea'

describe('TextArea', () => {
  it('should render TextArea component', () => {
    const { container } = render(<TextArea />)

    expect(container).toMatchSnapshot()
  })

  it('should have value hello world and be called 13 times after onchange is called', () => {
    const mockOnChange = jest.fn()
    render(<TextArea onChange={mockOnChange} />)
    userEvent.type(screen.getByRole('textbox'), 'Hello,{enter}World!')

    expect(screen.getByRole('textbox')).toHaveValue('Hello,\nWorld!')
    expect(mockOnChange).toHaveBeenCalledTimes(13)
  })
})
