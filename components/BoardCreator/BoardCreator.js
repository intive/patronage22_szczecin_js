import { CloseButton, Modal, Title, BoardContent, StyledButton } from './style'
import { useTranslation } from 'next-i18next'
import BoardCreatorWizard from '../BoardCreatorWizard/BoardCreatorWizard'
import ReactPortal from '../ReactPortal/ReactPortal'
import { useEffect, useState, useContext } from 'react'
import { addBoard } from '../../services/internal-api'
import BoardsContext from '../../store/boards-context'

const BoardCreator = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common')
  const [boardName, setBoardName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const boardsCtx = useContext(BoardsContext)
  const properties = { minLength: 5, maxLength: 50 }

  const handleOnChange = (event) => {
    setBoardName(event.target.value)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    try {
      onClose()
    } catch (err) {}
  }

  const addBoardHandler = async (boardName) => {
    closeModal()
    try {
      const data = await addBoard(boardName)
      if (data.status === 204) {
        boardsCtx.reload()
      }
    } catch (err) {}
  }

  useEffect(() => {
    setBoardName('')
    setIsModalOpen(isOpen)
  }, [isOpen])

  return isModalOpen
    ? (
      <ReactPortal wrapperId='modal-portal'>
        <Modal aria-hidden='false' role='dialog'>
          <CloseButton onClick={closeModal} icon='close' />
          <BoardContent>
            <Title>{t('createNewBoard.createNewBoardTitle')}</Title>
            <BoardCreatorWizard onChange={handleOnChange} value={boardName} maxLength={properties.maxLength} />
            <StyledButton disabled={boardName.trim().length < properties.minLength} onClick={() => addBoardHandler(boardName.trim())}>{t('buttons.continue')}</StyledButton>
          </BoardContent>
        </Modal>
      </ReactPortal>
      )
    : null
}

export default BoardCreator
