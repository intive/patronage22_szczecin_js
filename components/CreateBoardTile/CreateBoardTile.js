import Button from '../Button/Button'
import { Tile } from './style'

export default function CreateBoardTile ({ onClick }) {
  return (
    <Tile role='button' tabIndex='0' onClick={onClick}>
      <Button icon='crop_original'>New board</Button>
    </Tile>
  )
}
