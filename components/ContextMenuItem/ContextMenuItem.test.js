/* globals describe, expect, it, jest */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContextMenuItem from './ContextMenuItem'

describe('ContextMenuItem', () => {
  it('should renders correctly', () => {
    const { container } = render(<ContextMenuItem name='Testname' icon='lock' />)
    expect(container).toMatchSnapshot()
  })

  it('should call onClick prop when clicked', () => {
    const handleClick = jest.fn()

    render(
      <ContextMenuItem name='Testname' icon='lock' onClick={handleClick} />
    )
    userEvent.click(screen.getByText(/Testname/i))

    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
