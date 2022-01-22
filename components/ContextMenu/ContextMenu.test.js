/* globals describe, expect, it */
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ContextMenu from './ContextMenu'
import ContextMenuItem from '../ContextMenuItem/ContextMenuItem'

const menuRenderer = () => (
  <ContextMenu id='1'>
    <ContextMenuItem name='setPassword' icon='lock' />
    <ContextMenuItem name='deleteBoard' icon='delete' />
  </ContextMenu>
)

describe('ContextMenu', () => {
  it('should renders correctly ContextMenu', () => {
    const { container } = render(menuRenderer())
    expect(container).toMatchSnapshot()
  })

  it('should open navigation on button click', () => {
    render(menuRenderer())

    expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false')

    userEvent.click(screen.getByText('more_horiz'))

    expect(screen.getByRole('navigation')).toBeVisible()
    expect(screen.getByRole('navigation').classList.contains('active')).toBeTruthy()

    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-haspopup', 'menu')
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-controls', '1')
  })

  it('should open navigation on button click and close when clicked button again', () => {
    render(menuRenderer())

    userEvent.click(screen.getByText('more_horiz'))
    expect(screen.getByRole('navigation')).toBeVisible()
    expect(
      screen.getByRole('navigation').classList.contains('active')
    ).toBeTruthy()

    userEvent.click(screen.getByText('more_horiz'))
    expect(screen.queryByRole('navigation')).toBeNull()

    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-haspopup', 'menu')
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-controls', '1')
  })

  it('should open navigation on button click and close when clicked outside', () => {
    render(
      <>
        {menuRenderer()}
        <div>outsideDiv</div>
      </>
    )

    userEvent.click(screen.getByText('more_horiz'))
    expect(screen.getByRole('navigation')).toBeVisible()
    expect(screen.getByRole('navigation').classList.contains('active')).toBeTruthy()

    userEvent.click(screen.getByText('outsideDiv'))
    expect(screen.queryByRole('navigation')).toBeNull()

    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-haspopup', 'menu')
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-controls', '1')
  })

  it('should open navigation on button click and close when clicked inside navigation', () => {
    render(
      <>
        {menuRenderer()}
        <div>outsideDiv</div>
      </>
    )

    userEvent.click(screen.getByText('more_horiz'))
    userEvent.click(screen.getByRole('navigation'))

    expect(screen.queryByRole('navigation')).toBeNull()

    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-haspopup', 'menu')
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-expanded', 'false')
    expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-controls', '1')
  })
})
