import axios from 'axios'

const getBaseURL = () => {
  if (process.env.NEXT_PUBLIC_VERCEL_ENV === 'production') return 'https://patronage22-szczecin-js.vercel.app'
  else if (process.env.NEXT_PUBLIC_VERCEL_URL) return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  else return 'http://localhost:3000'
}

const axiosInstance = axios.create({
  baseURL: getBaseURL(),
  responseType: 'json',
  withCredentials: true
})

export const getBoards = async (...args) => {
  return axiosInstance.get('/api/boards', { params: Object.assign({}, ...args) })
}

export const deleteBoard = async (id) => {
  return axiosInstance.delete(`/api/boards/${id}`)
}

export const updateBoard = async (id, options) => {
  return axiosInstance.patch(`/api/boards/${id}`, options)
}

export const getBoard = async (id) => {
  return axiosInstance.get(`/api/boards/${id}`)
}

export const addBoard = async (name) => {
  return axiosInstance.post('/api/boards', { name })
}

export const deleteCard = async (id, columnId, cardId) => {
  return axiosInstance.delete(`/api/boards/${id}/columns/${columnId}/cards/${cardId}`)
}
