import { ModalOverlay, ModalContainer, ModalHeader, StyledIcon, ModalTitle, ModalSubtitle, ModalContent, ModalFooter, StyledCancelButton, StyledContinueButton } from './style'
import { useTranslation } from 'next-i18next'
import { useEffect } from 'react'
import ReactPortal from '../ReactPortal/ReactPortal'

export default function Modal ({ children, isOpen, handleClose, icon, title, subtitle }) {
  const { t } = useTranslation(['common'])

  useEffect(() => {
    const closeOnEscapeKey = e => e.key === 'Escape' ? handleClose() : null

    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', closeOnEscapeKey)
    }

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', closeOnEscapeKey)
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

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
          <StyledContinueButton onClick={handleClose}>{t('buttons.continue')}</StyledContinueButton>
        </ModalFooter>
      </ModalContainer>
    </ReactPortal>
  )
}
