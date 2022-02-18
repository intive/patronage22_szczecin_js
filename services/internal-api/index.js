import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` || 'http://localhost:3000',
  responseType: 'json',
  withCredentials: true
})

export const getBoards = async (...args) => {
  return axiosInstance.get('/api/boards', { params: Object.assign({}, ...args) })
}
