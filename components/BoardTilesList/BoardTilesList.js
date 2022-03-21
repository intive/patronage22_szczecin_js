import { useContext } from 'react'
import BoardTile from '../BoardTile/BoardTile'
import BoardsContext from '../../store/boards-context'
import CreateBoardTile from '../CreateBoardTile/CreateBoardTile'
import { List } from './style'

export default function BoardTilesList () {
  const boardsCtx = useContext(BoardsContext)
  const boards = boardsCtx.boards

  const generateBoardList = boards.map(board =>
    <BoardTile
      id={board.id}
      key={board.id}
      name={board.name}
      date={board.createdAt}
      cardCount={board.cardCount}
      hasPassword={board.hasPassword}
    />)

  return (
    <List data-testid='board-tiles-list'>
      <CreateBoardTile />
      {generateBoardList}
    </List>
  )
}
