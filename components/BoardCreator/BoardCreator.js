import { CloseButton, Modal, Title, BoardContent, StyledButton } from './style'
import { useTranslation } from 'next-i18next'
import BoardCreatorWizard from '../BoardCreatorWizard/BoardCreatorWizard'
import ReactPortal from '../ReactPortal/ReactPortal'
import { useEffect, useState, useContext } from 'react'
import { addBoard } from '../../services/internal-api'
import BoardsContext from '../../store/boards-context'
import ToastsContext from '../../store/toasts-context'

const BoardCreator = ({ isOpen, onClose }) => {
  const { t } = useTranslation('common')
  const [boardName, setBoardName] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(isOpen)
  const [showCloseButton, setShowCloseButton] = useState(true)

  const boardsCtx = useContext(BoardsContext)
  const properties = { minLength: 5, maxLength: 50 }
  const toastsCtx = useContext(ToastsContext)

  const toastMessage = {
    success: t('toastMessage.board.addBoard'),
    error: t('toastMessage.errorToast')
  }

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
    setShowCloseButton(false)
    try {
      const data = await addBoard(boardName)
      if (data.status === 204) {
        boardsCtx.reload()
        toastsCtx.showSuccessToast(toastMessage.success)
      } else {
        toastsCtx.showErrorToast(toastMessage.error)
      }
      setTimeout(() => {
        setShowCloseButton(true)
        closeModal()
      }, 3900)
    } catch (err) {
      console.error(err.response)
      toastsCtx.showErrorToast(toastMessage.error)
    }
  }

  useEffect(() => {
    setBoardName('')
    setIsModalOpen(isOpen)
  }, [isOpen])

  return isModalOpen
    ? (
      <ReactPortal wrapperId='modal-portal'>
        <Modal aria-hidden='false' role='dialog' data-testid='board-creator'>
          {showCloseButton && <CloseButton onClick={closeModal} icon='close' />}
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
