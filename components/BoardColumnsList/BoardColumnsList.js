import BoardColumn from '../BoardColumn/BoardColumn'
import ColumnsContext from '../../store/columns-context'
import { ColumnsWrapper, ColumnsContainer } from './style'
import { useContext } from 'react'

export default function BoardColumnsList () {
  const columnsCtx = useContext(ColumnsContext)
  const columns = columnsCtx.columns

  const generateColumnsList = columns.map(column =>
    <BoardColumn
      key={column.id}
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
