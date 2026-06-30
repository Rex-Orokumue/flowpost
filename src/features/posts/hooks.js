import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPost, updateVersion, approveVersion, schedulePost } from './api'

export const usePost = (postId) =>
  useQuery({ queryKey: ['posts', postId], queryFn: () => getPost(postId), enabled: !!postId })

export const useUpdateVersion = (postId) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ platform, content, thread_parts }) =>
      updateVersion(postId, platform, { content, thread_parts }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['posts', postId] }),
  })
}

export const useApproveVersion = (postId) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (platform) => approveVersion(postId, platform),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['posts', postId] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useSchedulePost = (postId) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: ({ scheduledAt, platforms }) => schedulePost(postId, scheduledAt, platforms),
    onMutate: async ({ scheduledAt }) => {
      await qc.cancelQueries({ queryKey: ['posts', postId] })
      const previous = qc.getQueryData(['posts', postId])
      qc.setQueryData(['posts', postId], (old) =>
        old ? { ...old, status: 'scheduled', scheduled_at: scheduledAt } : old
      )
      return { previous }
    },
    onError: (_, __, ctx) => {
      if (ctx?.previous) qc.setQueryData(['posts', postId], ctx.previous)
    },
    onSettled: () => {
      qc.invalidateQueries({ queryKey: ['posts', postId] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}
