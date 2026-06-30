import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { getPlatforms, disconnectPlatform } from './api'

export const usePlatforms = () =>
  useQuery({ queryKey: ['platforms'], queryFn: getPlatforms })

export const useDisconnectPlatform = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (platform) => disconnectPlatform(platform),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['platforms'] }),
  })
}
