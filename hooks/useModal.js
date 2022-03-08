import { useState } from 'react'

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  function toggle () {
    setIsOpen((prevState) => !prevState)
  }

  return { isOpen, toggle }
}

export default useModal
