import { CloseButton, Modal, Title, BoardContent, StyledButton } from './style'
import { useTranslation } from 'next-i18next'
import BoardCreatorWizard from '../BoardCreatorWizard/BoardCreatorWizard'
import ReactPortal from '../ReactPortal/ReactPortal'

const BoardCreator = (props) => {
  const { t } = useTranslation('common')

  return (
    <ReactPortal wrapperId='modal-portal'>
      <Modal aria-hidden='false' role='dialog'>
        <CloseButton onClick={props.onClose} icon='close' />
        <BoardContent>
          <Title>{t('createNewBoard.createNewBoardTitle')}</Title>
          <BoardCreatorWizard />
          <StyledButton onClick={props.handleOnClickContinue}>{t('buttons.continue')}</StyledButton>
        </BoardContent>
      </Modal>
    </ReactPortal>
  )
}

export default BoardCreator
