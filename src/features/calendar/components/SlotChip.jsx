const TYPE_STYLES = {
  story:        'bg-purple-100 text-purple-700 hover:bg-purple-200',
  tip:          'bg-blue-100 text-blue-700 hover:bg-blue-200',
  opinion:      'bg-orange-100 text-orange-700 hover:bg-orange-200',
  question:     'bg-pink-100 text-pink-700 hover:bg-pink-200',
  case_study:   'bg-teal-100 text-teal-700 hover:bg-teal-200',
  announcement: 'bg-brand-100 text-brand-700 hover:bg-brand-200',
}

export default function SlotChip({ slot, onClick, loading }) {
  return (
    <button
      onClick={() => onClick(slot)}
      disabled={loading}
      className={`w-full text-left px-1.5 py-0.5 rounded text-xs font-medium truncate transition-colors
        ${TYPE_STYLES[slot.post_type] || 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
        ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
      title={slot.topic}
    >
      {slot.topic}
    </button>
  )
}
