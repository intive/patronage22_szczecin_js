import Button from '../Button/Button'
import { Tile } from './style'
import BoardCreator from '../BoardCreator/BoardCreator'
import useModal from '../../hooks/useModal'

export default function CreateBoardTile () {
  const { isOpen, toggle } = useModal()

  return (
    <>
      <Tile role='button' tabIndex='0' onClick={toggle} data-testid='create-board-tile'>
        <Button icon='crop_original'>New board</Button>
      </Tile>
      <BoardCreator onClose={toggle} isOpen={isOpen} />
    </>
  )
}
