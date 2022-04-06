import Modal from '../Modal/Modal'
import { useTranslation } from 'next-i18next'
import { StyledInput } from './style'
import { useContext } from 'react'
import ToastsContext from '../../store/toasts-context'
import { ModalProvider } from '../../store/modal-context.js'

export default function MockAddColumnModal ({ id, isModalOpen, handleClose }) {
  const { t } = useTranslation(['common', 'modals'])
  const toastsCtx = useContext(ToastsContext)

  const toastMessage = {
    success: t('toastMessage.column.successToast'),
    error: t('toastMessage.errorToast')
  }
  const addColumnHandler = async (id) => {
    const data = { status: id }

    if (data.status === 200) {
      toastsCtx.showSuccessToast(toastMessage.success)
    } else {
      toastsCtx.showErrorToast(toastMessage.error)
    }
  }

  const handleSaveClick = () => {
    addColumnHandler(id)
  }

  const modalOptions = {
    isModalOpen,
    handleClose,
    handleSaveClick,
    title: t('addColumnModal.title', { ns: 'modals' }),
    subtitle: t('addColumnModal.subtitle', { ns: 'modals' })
  }

  return (
    <ModalProvider value={modalOptions}>
      <Modal>
        <StyledInput maxLength='30' />
      </Modal>
    </ModalProvider>
  )
}
