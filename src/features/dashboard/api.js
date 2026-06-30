import api from '../../lib/axios'

export const getDashboard = () => api.get('/api/dashboard').then(r => r.data)

export const generateDraft = (slotId) =>
  api.post(`/api/slots/${slotId}/generate-draft`).then(r => r.data)
