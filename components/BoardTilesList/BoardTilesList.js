import BoardTile from '../BoardTile/BoardTile'
import CreateBoardTile from '../CreateBoardTile/CreateBoardTile'
import { List } from './style'

export default function BoardTilesList ({ tilesList }) {
  const generateBoardList = tilesList.map(board =>
    <BoardTile
      id={board.id}
      key={board.id}
      name={board.name}
      date={board.createdAt}
      cardCount={board.cardCount}
      hasPassword={board.hasPassword}
    />)

  return (
    <List>
      <CreateBoardTile />
      {generateBoardList}
    </List>
  )
}
