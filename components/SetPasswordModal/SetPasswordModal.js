import Modal from '../Modal/Modal'
import { useTranslation } from 'next-i18next'
import { StyledInput } from './style'

export default function SetPasswordModal ({ handleClose, isOpen }) {
  const { t } = useTranslation(['modals'])

  return (
    <Modal handleClose={handleClose} isOpen={isOpen} icon='lock_outline' title={t('setPasswordModal.title')} subtitle={t('setPasswordModal.subtitle')}>
      <StyledInput type='password' />
    </Modal>
  )
}
