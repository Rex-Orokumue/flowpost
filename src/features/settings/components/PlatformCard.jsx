import { useState } from 'react'
import { useDisconnectPlatform } from '../hooks'
import Button from '../../../components/Button'
import Modal from '../../../components/Modal'
import toast from 'react-hot-toast'
import api from '../../../lib/axios'

const PLATFORM_META = {
  linkedin: {
    name: 'LinkedIn',
    icon: (
      <svg className="h-6 w-6 text-[#0A66C2]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  x: {
    name: 'X (Twitter)',
    icon: (
      <svg className="h-6 w-6 text-gray-900" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
}

const COMING_SOON = ['x']

export default function PlatformCard({ platform, connected }) {
  const meta = PLATFORM_META[platform]
  const { mutate: disconnect, isPending } = useDisconnectPlatform()
  const [showConfirm, setShowConfirm] = useState(false)
  const isComingSoon = COMING_SOON.includes(platform)

  const handleConnect = async () => {
    try {
      const { data } = await api.get(`/api/platforms/${platform}/auth`)
      window.location.href = data.url
    } catch {
      toast.error('Failed to start connection. Try again.')
    }
  }

  const handleDisconnect = () => {
    disconnect(platform, {
      onSuccess: () => { toast.success(`${meta.name} disconnected`); setShowConfirm(false) },
      onError: () => toast.error('Failed to disconnect. Try again.'),
    })
  }

  if (isComingSoon) {
    return (
      <div className="rounded-xl border border-gray-100 bg-gray-50 p-5 flex items-center justify-between gap-4 opacity-60">
        <div className="flex items-center gap-3">
          <div className="grayscale">{meta.icon}</div>
          <div>
            <p className="text-sm font-semibold text-gray-500">{meta.name}</p>
            <p className="text-xs text-gray-400 mt-0.5">Coming soon</p>
          </div>
        </div>
        <span className="text-xs font-medium text-gray-400 bg-gray-200 px-2.5 py-1 rounded-full">Coming soon</span>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {meta.icon}
          <div>
            <p className="text-sm font-semibold text-gray-900">{meta.name}</p>
            {connected ? (
              <p className="text-xs text-gray-400 mt-0.5">{connected.platform_username || 'connected'}</p>
            ) : (
              <p className="text-xs text-gray-400 mt-0.5">Not connected</p>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {connected ? (
            <>
              <span className="text-xs font-medium text-brand-600 bg-brand-50 px-2.5 py-1 rounded-full">Connected</span>
              <Button variant="secondary" size="sm" onClick={() => setShowConfirm(true)}>Disconnect</Button>
            </>
          ) : (
            <Button size="sm" onClick={handleConnect}>Connect</Button>
          )}
        </div>
      </div>

      {showConfirm && (
        <Modal title={`Disconnect ${meta.name}?`} onClose={() => setShowConfirm(false)}>
          <p className="text-sm text-gray-600 mb-6">
            Scheduled posts to {meta.name} will fail until you reconnect. This cannot be undone.
          </p>
          <div className="flex gap-3">
            <Button variant="secondary" onClick={() => setShowConfirm(false)} className="flex-1">Cancel</Button>
            <Button
              variant="primary"
              onClick={handleDisconnect}
              loading={isPending}
              className="flex-1 bg-red-500 hover:bg-red-600"
            >
              Disconnect
            </Button>
          </div>
        </Modal>
      )}
    </>
  )
}
