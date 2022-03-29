import Modal from '../Modal/Modal'
import { useTranslation } from 'next-i18next'
import { StyledInput } from './style'
import { useState, useContext, useEffect } from 'react'
import { addColumn } from '../../services/internal-api'
import ColumnsContext from '../../store/columns-context'
import ToastsContext from '../../store/toasts-context'
import { ModalProvider } from '../../store/modal-context.js'

export default function AddColumnModal ({ boardId, handleClose, isModalOpen }) {
  const { t } = useTranslation(['common', 'modals'])
  const columnsCtx = useContext(ColumnsContext)
  const toastsCtx = useContext(ToastsContext)
  const [columnName, setColumnName] = useState('')

  const toastMessage = {
    success: t('toastMessage.column.successToast'),
    error: t('toastMessage.errorToast')
  }
  const addColumnHandler = async (id, name) => {
    try {
      await addColumn(id, name)
      toastsCtx.showSuccessToast(toastMessage.success)
      columnsCtx.reload(boardId)
    } catch (error) {
      toastsCtx.showErrorToast(toastMessage.error)
    }
  }

  const handleOnChange = (event) => {
    setColumnName(event.target.value)
  }

  const handleSaveClick = () => {
    addColumnHandler(boardId, columnName)
  }

  useEffect(() => {
    if (!isModalOpen) {
      setColumnName('')
    }
  }, [isModalOpen])

  const modalOptions = {
    isModalOpen,
    handleClose,
    handleSaveClick,
    title: t('addColumnModal.title', { ns: 'modals' }),
    subtitle: t('addColumnModal.subtitle', { ns: 'modals' }),
    disabled: columnName.length < 5
  }

  return (
    <ModalProvider value={modalOptions}>
      <Modal>
        <StyledInput value={columnName} onChange={handleOnChange} maxLength='30' />
      </Modal>
    </ModalProvider>
  )
}
