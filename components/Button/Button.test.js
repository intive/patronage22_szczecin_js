/* globals describe, expect, it */

import { render } from '@testing-library/react'
import Button from './Button'

describe('Button', () => {
  it('renders contained button with icon', () => {
    const button = render(<Button icon='crop_original'>New board</Button>)
    expect(button.container).toMatchSnapshot()
    expect(button.getByRole('button')).toBeEnabled()
  })

  it('renders contained button without icon', () => {
    const button = render(<Button>New board</Button>)
    expect(button.container).toMatchSnapshot()
    expect(button.getByRole('button')).toBeEnabled()
  })

  it('renders button with icon', () => {
    const button = render(<Button text icon='crop_original'>Continue</Button>)
    expect(button.container).toMatchSnapshot()
    expect(button.getByRole('button')).toBeEnabled()
  })

  it('renders button without icon', () => {
    const button = render(<Button text>Continue</Button>)
    expect(button.container).toMatchSnapshot()
    expect(button.getByRole('button')).toBeEnabled()
  })

  it('renders contained disabled button with icon', () => {
    const button = render(<Button icon='crop_original' disabled>New board</Button>)
    expect(button.container).toMatchSnapshot()
    expect(button.getByRole('button')).toHaveAttribute('disabled')
    expect(button.getByRole('button')).toBeDisabled()
  })

  it('renders contained disabled button without icon', () => {
    const button = render(<Button disabled>New board</Button>)
    expect(button.container).toMatchSnapshot()
    expect(button.getByRole('button')).toHaveAttribute('disabled')
    expect(button.getByRole('button')).toBeDisabled()
  })

  it('renders disabled button with icon', () => {
    const button = render(<Button text icon='crop_original' disabled>Continue</Button>)
    expect(button.container).toMatchSnapshot()
    expect(button.getByRole('button')).toHaveAttribute('disabled')
    expect(button.getByRole('button')).toBeDisabled()
  })

  it('renders disabled button without icon', () => {
    const button = render(<Button text disabled>Continue</Button>)
    expect(button.container).toMatchSnapshot()
    expect(button.getByRole('button')).toHaveAttribute('disabled')
    expect(button.getByRole('button')).toBeDisabled()
  })
})
