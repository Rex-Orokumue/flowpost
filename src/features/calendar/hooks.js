import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getCalendars, generateCalendar, generateDraftFromSlot } from './api'

export const useCalendars = () =>
  useQuery({ queryKey: ['calendars'], queryFn: getCalendars })

export const useActiveCalendar = () => {
  const { data, isLoading } = useCalendars()
  const active = data?.find(c => c.is_active) ?? data?.[0] ?? null
  return { calendar: active, slots: active?.calendar_slots ?? [], isLoading }
}

export const useGenerateCalendar = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: generateCalendar,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['calendars'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
    },
  })
}

export const useGenerateDraftFromSlot = ({ onSuccess } = {}) => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (slotId) => generateDraftFromSlot(slotId),
    onSuccess: (data) => {
      qc.invalidateQueries({ queryKey: ['calendars'] })
      qc.invalidateQueries({ queryKey: ['dashboard'] })
      onSuccess?.(data)
    },
  })
}
