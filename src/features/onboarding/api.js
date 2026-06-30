import api from '../../lib/axios'

export const submitOnboarding = (data) =>
  api.post('/api/profile/onboarding', data).then(r => r.data)
