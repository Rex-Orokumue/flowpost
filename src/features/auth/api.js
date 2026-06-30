import api from '../../lib/axios'

export const signup = (email, password, full_name) =>
  api.post('/api/auth/signup', { email, password, full_name }).then(r => r.data)

export const login = (email, password) =>
  api.post('/api/auth/login', { email, password }).then(r => r.data)

export const getProfile = () =>
  api.get('/api/profile').then(r => r.data)
