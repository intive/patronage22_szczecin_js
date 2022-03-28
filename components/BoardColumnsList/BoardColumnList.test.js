
/* globals describe, it, expect */

import { render } from '@testing-library/react'
import BoardColumnsList from './BoardColumnsList'

describe('BoardColumnList', () => {
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
    id: '01FV75A884ZHZE347P83K0SXRR'
  }

  it('should render a board with its name, two columns: one with three cards and one with single card', () => {
    const { container } = render(<BoardColumnsList tileDetails={tileDetails} />)
    expect(container).toMatchSnapshot()
  })
})
