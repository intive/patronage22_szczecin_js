import { ModalOverlay, ModalContainer, ModalHeader, StyledIcon, ModalTitle, ModalSubtitle, ModalContent, ModalFooter, StyledCancelButton, StyledSaveButton } from './style'
import { useTranslation } from 'next-i18next'
import { useContext, useEffect } from 'react'
import ReactPortal from '../ReactPortal/ReactPortal'
import ModalContext from '../../store/modal-context.js'

export default function Modal ({ children }) {
  const { t } = useTranslation(['common'])

  const { isModalOpen, icon, handleClose, handleSaveClick, title, subtitle, disabled } = useContext(ModalContext)

  useEffect(() => {
    const closeOnEscapeKey = e => e.key === 'Escape' ? handleClose() : null

    if (isModalOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', closeOnEscapeKey)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [isModalOpen, handleClose])

  if (!isModalOpen) return null

  return (
    <ReactPortal wrapperId='modal-portal'>
      <ModalOverlay data-testid='backdrop' onClick={handleClose} />
      <ModalContainer aria-hidden='false' role='dialog' data-testid='modal'>
        <ModalHeader>
          {icon && <StyledIcon name={icon} />}
          <ModalTitle id='modalTitle'>{title}</ModalTitle>
          <ModalSubtitle id='modalSubtitle'>{subtitle}</ModalSubtitle>
        </ModalHeader>
        <ModalContent>{children}</ModalContent>
        <ModalFooter>
          <StyledCancelButton text onClick={handleClose}>{t('buttons.cancel')}</StyledCancelButton>
          <StyledSaveButton onClick={handleSaveClick} disabled={disabled}>{t('buttons.save')}</StyledSaveButton>
        </ModalFooter>
      </ModalContainer>
    </ReactPortal>
  )
}
