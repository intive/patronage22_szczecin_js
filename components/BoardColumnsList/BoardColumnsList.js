import { useContext } from 'react'
import ColumnsContext from '../../store/columns-context'
import BoardColumn from '../BoardColumn/BoardColumn'

import { ColumnsWrapper, ColumnsContainer } from './style'

export default function BoardColumnsList () {
  const columnsCtx = useContext(ColumnsContext)
  const columns = columnsCtx.columns
  const boardId = columnsCtx.boardId

  const generateColumnsList = columns.map(column =>
    <BoardColumn
      id={column.id}
      key={column.id}
      name={column.name}
      cards={column.cards}
      boardId={boardId}
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
