import Button from '../Button/Button'
import { Tile } from './style'
import BoardCreator from '../BoardCreator/BoardCreator'
import useModal from '../../hooks/useModal'

export default function CreateBoardTile () {
  const { isModalOpen, toggleModalOpening } = useModal()

  return (
    <>
      <Tile role='button' tabIndex='0' onClick={toggleModalOpening} data-testid='create-board-tile'>
        <Button icon='crop_original'>New board</Button>
      </Tile>
      <BoardCreator onClose={toggleModalOpening} isOpen={isModalOpen} />
    </>
  )
}
