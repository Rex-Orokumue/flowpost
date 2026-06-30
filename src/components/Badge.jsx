const STATUS_STYLES = {
  pending_draft: 'bg-gray-100 text-gray-600',
  draft_ready:   'bg-yellow-100 text-yellow-700',
  approved:      'bg-blue-100 text-blue-700',
  scheduled:     'bg-brand-100 text-brand-700',
  published:     'bg-green-100 text-green-700',
  failed:        'bg-red-100 text-red-700',
}

const STATUS_LABELS = {
  pending_draft: 'pending draft',
  draft_ready:   'draft ready',
  approved:      'approved',
  scheduled:     'scheduled',
  published:     'published',
  failed:        'failed',
}

export default function Badge({ status }) {
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'}`}>
      {STATUS_LABELS[status] || status}
    </span>
  )
}
