import { useState } from 'react'

const useModal = () => {
  const [isModalOpen, setModalIsOpen] = useState(false)

  function toggleModalOpening () {
    setModalIsOpen((prevState) => !prevState)
  }

  return { isModalOpen, toggleModalOpening }
}

export default useModal
