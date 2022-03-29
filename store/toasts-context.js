import { createContext } from 'react'
import useToast from '../hooks/useToast'

const ToastsContext = createContext({
  showSuccessToast: () => {},
  showErrorToast: () => {}
})

export const ToastsContextProvider = (props) => {
  const { showToast, RenderToast, isOpenToast } = useToast()

  const showSuccessToastHandler = async (notification) => {
    showToast('success', notification)
  }

  const showErrorToastHandler = async (notification) => {
    showToast('error', notification)
  }

  const context = {
    showSuccessToast: showSuccessToastHandler,
    showErrorToast: showErrorToastHandler
  }

  return (
    <ToastsContext.Provider value={context}>
      {props.children}
      {isOpenToast && <RenderToast />}
    </ToastsContext.Provider>
  )
}

export default ToastsContext
