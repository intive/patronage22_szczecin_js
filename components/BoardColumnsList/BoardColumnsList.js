import BoardColumn from '../BoardColumn/BoardColumn'

import { ColumnsWrapper, ColumnsContainer } from './style'

export default function BoardColumnsList ({ tileDetails }) {
  const generateColumnsList = tileDetails.columns.map(column =>
    <BoardColumn
      key={column.id}
      columnId={column.id}
      boardId={tileDetails.id}
      name={column.name}
      cards={column.cards}
    />
  )

  return (
    <ColumnsContainer>
      <ColumnsWrapper>
        {generateColumnsList}
      </ColumnsWrapper>
    </ColumnsContainer>
  )
}
