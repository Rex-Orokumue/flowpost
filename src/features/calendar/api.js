import api from '../../lib/axios'

export const getCalendars = () => api.get('/api/calendars').then(r => r.data)
export const generateCalendar = () => api.post('/api/calendars/generate').then(r => r.data)
export const generateDraftFromSlot = (slotId) =>
  api.post(`/api/slots/${slotId}/generate-draft`).then(r => r.data)
