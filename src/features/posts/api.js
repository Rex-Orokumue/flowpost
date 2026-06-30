import api from '../../lib/axios'

export const getPost = (id) =>
  api.get(`/api/posts/${id}`).then(r => r.data)

export const updateVersion = (postId, platform, data) =>
  api.put(`/api/posts/${postId}/versions/${platform}`, data).then(r => r.data)

export const approveVersion = (postId, platform) =>
  api.post(`/api/posts/${postId}/versions/${platform}/approve`).then(r => r.data)

export const schedulePost = (postId, scheduledAt, platforms) =>
  api.post(`/api/posts/${postId}/schedule`, { scheduled_at: scheduledAt, platforms }).then(r => r.data)
