import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { usePlatforms } from '../hooks'
import PlatformCard from '../components/PlatformCard'
import Spinner from '../../../components/Spinner'
import toast from 'react-hot-toast'

export default function SettingsPage() {
  const { data: platforms = [], isLoading } = usePlatforms()
  const [searchParams, setSearchParams] = useSearchParams()

  useEffect(() => {
    const connected = searchParams.get('connected')
    const error = searchParams.get('error')
    if (connected) {
      toast.success(`${connected === 'x' ? 'X (Twitter)' : 'LinkedIn'} connected successfully!`)
      setSearchParams({}, { replace: true })
    }
    if (error) {
      toast.error(`OAuth failed: ${error}`)
      setSearchParams({}, { replace: true })
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getConnected = (platform) =>
    platforms.find(p => p.platform === platform && p.is_active) ?? null

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
        <p className="text-sm text-gray-500 mt-1">Manage your connected social media accounts.</p>
      </div>

      <section>
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">Connected Platforms</h2>
        {isLoading ? (
          <div className="flex justify-center py-10"><Spinner /></div>
        ) : (
          <div className="space-y-3">
            <PlatformCard platform="linkedin" connected={getConnected('linkedin')} />
            <PlatformCard platform="x" connected={getConnected('x')} />
          </div>
        )}
      </section>
    </div>
  )
}
