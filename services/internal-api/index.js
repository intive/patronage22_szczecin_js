import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : 'http://localhost:3000',
  responseType: 'json',
  withCredentials: true
})

export const getBoards = async (...args) => {
  return axiosInstance.get('/api/boards', { params: Object.assign({}, ...args) })
}

export const deleteBoard = async (id) => {
  return axiosInstance.delete(`/api/boards/${id}`)
}
