import api from '../../lib/axios'

export const getPlatforms = () => api.get('/api/platforms').then(r => r.data)

export const disconnectPlatform = (platform) =>
  api.delete(`/api/platforms/${platform}`).then(r => r.data)
