import { createContext, useState } from 'react'
import { getBoard } from '../services/internal-api'

const ColumnsContext = createContext({
  columns: [],
  reload: () => {}
})

export const ColumnsContextProvider = (props) => {
  const [updateColumns, setUpdateColumns] = useState(props.columns || [])

  const reloadHandler = async (id) => {
    try {
      const { data } = await getBoard(id)
      setUpdateColumns(data.columns)
    } catch (err) {
      console.log(err)
    }
  }

  const context = {
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
