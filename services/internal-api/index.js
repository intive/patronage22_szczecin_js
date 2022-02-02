import axios from 'axios'

const axiosInstance = axios.create()

export const getBoards = async (...args) => {
  return axiosInstance.get('/api/boards', { params: Object.assign({}, ...args) })
}
