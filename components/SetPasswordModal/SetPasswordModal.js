import Modal from '../Modal/Modal'
import BoardsContext from '../../store/boards-context'
import { useTranslation } from 'next-i18next'
import { StyledInput } from './style'
import { useState, useContext, useEffect } from 'react'
import { updateBoard } from '../../services/internal-api'
import { ModalProvider } from '../../store/modal-context.js'

export default function SetPasswordModal ({ boardId, handleClose, isModalOpen }) {
  const { t } = useTranslation(['modals'])

  const [password, setPassword] = useState('')

  const boardsCtx = useContext(BoardsContext)

  const refreshOnSuccess = data => data.status === 204 && boardsCtx.reload()
  const updateBoardHandler = async (id, options) => refreshOnSuccess(await updateBoard(id, options))

  const handleOnChange = (event) => {
    const onlyDigitsRegex = /^[0-9\b]+$/
    if (event.target.value === '' || onlyDigitsRegex.test(event.target.value)) {
      setPassword(event.target.value)
    }
  }

  const handleSaveClick = () => {
    updateBoardHandler(boardId, { password: password })
  }

  useEffect(() => {
    if (!isModalOpen) {
      setPassword('')
    }
  }, [isModalOpen])

  const modalOptions = {
    isModalOpen,
    icon: 'lock_outline',
    handleClose,
    handleSaveClick,
    title: t('setPasswordModal.title'),
    subtitle: t('setPasswordModal.subtitle'),
    disabled: password.length < 8
  }

  return (
    <ModalProvider value={modalOptions}>
      <Modal>
        <StyledInput value={password} onChange={handleOnChange} type='password' maxLength='8' placeholder='Enter password' />
      </Modal>
    </ModalProvider>
  )
}
