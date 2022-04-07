import Modal from '../Modal/Modal'
import BoardsContext from '../../store/boards-context'
import { useTranslation } from 'next-i18next'
import { StyledInput } from './style'
import { useState, useContext, useEffect } from 'react'
import { updateBoard } from '../../services/internal-api'
import { ModalProvider } from '../../store/modal-context.js'
import ToastsContext from '../../store/toasts-context'

export default function SetPasswordModal ({ boardId, handleClose, isModalOpen }) {
  const { t } = useTranslation(['modals', 'common'])

  const [password, setPassword] = useState('')

  const boardsCtx = useContext(BoardsContext)
  const toastsCtx = useContext(ToastsContext)

  const toastMessage = {
    success: t('common:toastMessage.setPasswordOnBoard.successToast'),
    error: t('common:toastMessage.errorToast')
  }

  const refreshOnSuccess = data => data.status === 204 && boardsCtx.reload()

  const updateBoardHandler = async (id, options) => {
    try {
      const data = await updateBoard(id, options)

      if (data.status === 204) {
        refreshOnSuccess(data)
        toastsCtx.showSuccessToast(toastMessage.success)
      }
    } catch (error) {
      toastsCtx.showErrorToast(toastMessage.error)
      console.error(error)
    }
  }

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
