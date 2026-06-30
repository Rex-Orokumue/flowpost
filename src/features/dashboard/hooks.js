import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getDashboard, generateDraft } from './api'

export const useDashboard = () =>
  useQuery({ queryKey: ['dashboard'], queryFn: getDashboard })

export const useGenerateDraft = ({ onSuccess } = {}) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (slotId) => generateDraft(slotId),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      onSuccess?.(data)
    },
  })
}
