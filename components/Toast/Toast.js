import { NotificationToast, NotificationIcon } from './style'
import ReactPortal from '../ReactPortal/ReactPortal'
import { ulid } from 'ulid'
import { useEffect, useState } from 'react'

const Toast = ({ id, type, children, isOpen }) => {
  const [portalId] = useState(ulid())
  const [isOpenToast, setIsOpenToast] = useState(isOpen)
  const autoCloseTime = 3900

  useEffect(() => {
    setTimeout(() => {
      setIsOpenToast(false)
    }, autoCloseTime)
  }, [])

  return isOpenToast
    ? (
      <ReactPortal wrapperId={`toast-portal-${id || portalId}`}>
        <NotificationToast type={type} role='alert' data-testid='toast' aria-hidden='true'>
          {type === 'success'
            ? <NotificationIcon name='done' />
            : <NotificationIcon name='priority_high' />}
          {children}
        </NotificationToast>
      </ReactPortal>
      )
    : null
}

export default Toast
