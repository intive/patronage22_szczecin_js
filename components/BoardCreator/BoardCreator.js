import { CloseButton, Modal, Title, BoardContent, StyledButton } from './style'
import { useTranslation } from 'next-i18next'
import BoardCreatorWizard from '../BoardCreatorWizard/BoardCreatorWizard'
import ReactPortal from '../ReactPortal/ReactPortal'

const BoardCreator = ({ onClose, handleOnClickContinue, isOpen }) => {
  const { t } = useTranslation('common')

  return isOpen
    ? (
      <ReactPortal wrapperId='modal-portal'>
        <Modal aria-hidden='false' role='dialog'>
          <CloseButton onClick={onClose} icon='close' />
          <BoardContent>
            <Title>{t('createNewBoard.createNewBoardTitle')}</Title>
            <BoardCreatorWizard />
            <StyledButton onClick={handleOnClickContinue}>{t('buttons.continue')}</StyledButton>
          </BoardContent>
        </Modal>
      </ReactPortal>
      )
    : null
}

export default BoardCreator
