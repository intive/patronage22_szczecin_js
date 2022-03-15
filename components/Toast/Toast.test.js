/* globals describe, expect, it */

import { act, render, screen } from '@testing-library/react'
import Toast from './Toast'
import { jest } from '@jest/globals'

describe('Toast', () => {
  it('should render Toast with given text', () => {
    const { baseElement } = render(
      <Toast isOpen id='toast-test-id' type='success'>Board added successfully</Toast>)

    expect(screen.getByText('Board added successfully')).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render success Toast', () => {
    const { baseElement } = render(
      <Toast isOpen id='toast-test-id' type='success'>Board added successfully</Toast>)

    expect(screen.getByText(/done/, { consider: 'span' })).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render error Toast', () => {
    const { baseElement } = render(
      <Toast isOpen id='toast-test-id'>Failed to add board</Toast>)

    expect(screen.getByText(/priority_high/, { consider: 'span' })).toBeInTheDocument()
    expect(baseElement).toMatchSnapshot()
  })

  it('should render Toast and automatically close it after 4 seconds', () => {
    jest.useFakeTimers()
    render(<Toast isOpen id='toast-test-id'>Failed to add board</Toast>)
    const toast = screen.getByText('Failed to add board')

    expect(toast).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(4000)
    })
    expect(toast).not.toBeInTheDocument()

    jest.clearAllTimers()
  })

  it('should render Toast, Toast should still be present after 3sec', () => {
    jest.useFakeTimers()
    render(<Toast isOpen id='toast-test-id'>Failed to add board</Toast>)
    const toast = screen.getByText('Failed to add board')

    expect(toast).toBeInTheDocument()
    act(() => {
      jest.advanceTimersByTime(3000)
    })
    expect(toast).toBeInTheDocument()

    jest.clearAllTimers()
  })
})
