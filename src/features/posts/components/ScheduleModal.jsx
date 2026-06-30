import { useState } from 'react'
import { useSchedulePost } from '../hooks'
import Modal from '../../../components/Modal'
import Button from '../../../components/Button'
import toast from 'react-hot-toast'

export default function ScheduleModal({ postId, onClose }) {
  const now = new Date()
  now.setMinutes(now.getMinutes() + 30)
  const defaultVal = now.toISOString().slice(0, 16)

  const [scheduledAt, setScheduledAt] = useState(defaultVal)
  const [platforms, setPlatforms] = useState(['linkedin', 'x'])
  const { mutate, isPending } = useSchedulePost(postId)

  const toggle = (p) => setPlatforms(ps =>
    ps.includes(p) ? ps.filter(x => x !== p) : [...ps, p]
  )

  const handleSchedule = () => {
    if (!platforms.length) { toast.error('Select at least one platform'); return }
    mutate(
      { scheduledAt: new Date(scheduledAt).toISOString(), platforms },
      {
        onSuccess: () => { toast.success('Post scheduled!'); onClose() },
        onError: () => toast.error('Failed to schedule. Try again.'),
      }
    )
  }

  return (
    <Modal title="Schedule Post" onClose={onClose}>
      <div className="space-y-5">
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-gray-700">Date & time</label>
          <input
            type="datetime-local"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
            min={defaultVal}
            className="h-9 rounded border border-gray-200 px-3 text-sm outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Platforms</p>
          <div className="flex gap-3">
            {['linkedin', 'x'].map(p => (
              <button
                key={p}
                onClick={() => toggle(p)}
                className={`flex-1 py-2 rounded border text-sm font-medium transition-colors capitalize
                  ${platforms.includes(p)
                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                    : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}
              >
                {p === 'x' ? 'X (Twitter)' : 'LinkedIn'}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3 pt-1">
          <Button variant="secondary" onClick={onClose} className="flex-1">Cancel</Button>
          <Button onClick={handleSchedule} loading={isPending} className="flex-1">Schedule</Button>
        </div>
      </div>
    </Modal>
  )
}
