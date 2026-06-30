import { useNavigate } from 'react-router-dom'
import { useGenerateDraft } from '../hooks'
import Card from '../../../components/Card'
import Badge from '../../../components/Badge'
import Button from '../../../components/Button'
import toast from 'react-hot-toast'

const POST_TYPE_COLORS = {
  story: 'text-purple-600', tip: 'text-blue-600', opinion: 'text-orange-600',
  question: 'text-pink-600', case_study: 'text-teal-600', announcement: 'text-brand-600',
}

export default function DraftCard({ slot }) {
  const navigate = useNavigate()
  const { mutate, isPending } = useGenerateDraft({
    onSuccess: (data) => navigate(`/posts/${data.post.id}`),
  })

  return (
    <Card className="p-4 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className={`text-xs font-semibold uppercase tracking-wide ${POST_TYPE_COLORS[slot.post_type] || 'text-gray-500'}`}>
            {slot.post_type?.replace('_', ' ')}
          </p>
          <p className="mt-1 text-sm font-medium text-gray-900 line-clamp-2">{slot.topic}</p>
        </div>
        <Badge status={slot.status} />
      </div>
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">
          {new Date(slot.scheduled_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
        <Button size="sm" loading={isPending} onClick={() => mutate(slot.id)}>
          Generate Draft
        </Button>
      </div>
    </Card>
  )
}
