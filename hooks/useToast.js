import { useState, useEffect } from 'react'
import Toast from '../components/Toast/Toast'

const useToast = () => {
  const [isOpenToast, setIsOpenToast] = useState(false)
  const [toastType, setToastType] = useState('success')
  const [toastNotification, setToastNotification] = useState('')

  function showToast (type, notification) {
    setToastType(type)
    setToastNotification(notification)
    setIsOpenToast(true)
  }

  useEffect(() => {
    if (isOpenToast) {
      setTimeout(() => {
        setIsOpenToast(false)
      }, 3900)
    }
  }, [isOpenToast])

  const RenderToast = () => {
    return (isOpenToast && <Toast isOpen type={toastType}>{toastNotification}</Toast>)
  }

  return { showToast, RenderToast, isOpenToast }
}

export default useToast
