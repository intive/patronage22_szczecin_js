import { createContext, useState } from 'react'
import { getBoard } from '../services/internal-api'

const ColumnsContext = createContext({
  boardId: '',
  columns: [],
  reload: () => {}
})

export const ColumnsContextProvider = (props) => {
  const [updateColumns, setUpdateColumns] = useState(props.columns.columns)

  const reloadHandler = async () => {
    setUpdateColumns((await getBoard(props.columns.id)).data.columns)
  }

  const context = {
    boardId: props.columns.id,
    columns: updateColumns,
    reload: reloadHandler
  }

  return (
    <ColumnsContext.Provider value={context}>
      {props.children}
    </ColumnsContext.Provider>
  )
}

export default ColumnsContext
