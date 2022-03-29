/* globals describe, it, expect */

import { render, screen, waitFor } from '@testing-library/react'
import BoardDetails from './index.page'
import userEvent from '@testing-library/user-event'

describe('BoardDetails', () => {
  const tileDetails = {
    columns: [
      {
        id: '01FV73XQTDV2Q6YWMGG8Z4A0NE',
        name: 'column 1',
        cards: [
          {
            id: '01FV75BM8W3ZDZHSQE36AART7B',
            text: 'card 1'
          },
          {
            id: '01FV75BQYD91NGEGE9V2Q1ZTMY',
            text: 'card 2'
          },
          {
            id: '01FV75BTSWEZYV8786KJTY3KSS',
            text: 'card 3'
          }
        ]
      },
      {
        id: '01FV73XQTDV2Q6YWMGG8Z4A0N1',
        name: 'column 2',
        cards: [
          {
            id: '01FV75BM8W3ZDZHSQE36AART7V',
            text: 'card 1'
          }
        ]
      }
    ],
    name: 'board 3',
    id: '01FV75A884ZHZE347P83K0SXRR',
    password: false
  }

  it('should render BoardDetails', async () => {
    const { container } = render(<BoardDetails tileDetails={tileDetails} />)
    await waitFor(() => {
      expect(container).toMatchSnapshot()
    })
  })

  it('should open Modal after button click and close it after click on backdrop', () => {
    render(<BoardDetails tileDetails={tileDetails} />)
    expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument()
    userEvent.click(screen.queryByRole('button', { name: /boardHeader.buttonText/i }))
    expect(screen.getByTestId('backdrop')).toBeInTheDocument()
    userEvent.click(screen.getByTestId('backdrop'))
    expect(screen.queryByTestId('backdrop')).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on cancel button', () => {
    render(<BoardDetails tileDetails={tileDetails} />)
    expect(screen.queryByRole('button', { name: /buttons.cancel/i })).not.toBeInTheDocument()
    userEvent.click(screen.queryByRole('button', { name: /boardHeader.buttonText/i }))
    expect(screen.getByRole('button', { name: /buttons.cancel/i })).toBeInTheDocument()
    userEvent.click(screen.getByRole('button', { name: /buttons.cancel/i }))
    expect(screen.queryByRole('button', { name: /buttons.cancel/i })).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on Esc keyboard button', () => {
    render(<BoardDetails tileDetails={tileDetails} />)
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
    userEvent.click(screen.queryByRole('button', { name: /boardHeader.buttonText/i }))
    expect(screen.getByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
    userEvent.keyboard('{esc}')
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
  })

  it('should open Modal after button click and close it after click on save button if column Name length is more then 5', () => {
    render(<BoardDetails tileDetails={tileDetails} />)
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
    userEvent.click(screen.queryByRole('button', { name: /boardHeader.buttonText/i }))
    expect(screen.getByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
    userEvent.type(screen.getByRole('textbox'), 'New Column')
    expect(screen.getByRole('textbox')).toHaveValue('New Column')
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeDisabled()
    userEvent.click(screen.getByRole('button', { name: /buttons.save/i }))
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
  })

  it('should open Modal after button click and save button to be disabled if password length less than 5', () => {
    render(<BoardDetails tileDetails={tileDetails} />)
    expect(screen.queryByRole('button', { name: /buttons.save/i })).not.toBeInTheDocument()
    userEvent.click(screen.queryByRole('button', { name: /boardHeader.buttonText/i }))
    expect(screen.getByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
    userEvent.type(screen.getByRole('textbox'), '1234')
    expect(screen.getByRole('textbox')).toHaveValue('1234')
    expect(screen.queryByRole('button', { name: /buttons.save/i })).toBeDisabled()
    expect(screen.queryByRole('button', { name: /buttons.save/i })).toBeInTheDocument()
  })
})
