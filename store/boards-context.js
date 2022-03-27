import { createContext, useState } from 'react'
import { getBoards } from '../services/internal-api'

const BoardsContext = createContext({
  boards: [],
  reload: () => {}
})

export const BoardsContextProvider = (props) => {
  const [updateBoards, setUpdateBoards] = useState(props.boards)

  const reloadHandler = async () => {
    try {
      const { data } = await getBoards()
      setUpdateBoards(data)
    } catch (err) {
      console.log(err)
    }
  }

  const context = {
    boards: updateBoards,
    reload: reloadHandler
  }

  return (
    <BoardsContext.Provider value={context}>
      {props.children}
    </BoardsContext.Provider>
  )
}

export default BoardsContext
