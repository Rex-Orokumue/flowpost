import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
})

let _logout = null
export const setLogoutCallback = (fn) => { _logout = fn }

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('flowpost_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401 && _logout) _logout()
    return Promise.reject(err)
  }
)

export default api
