import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SlotChip from './SlotChip'
import { useGenerateDraftFromSlot } from '../hooks'
import toast from 'react-hot-toast'

function getDaysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarGrid({ slots = [] }) {
  const navigate = useNavigate()
  const today = new Date()
  const [viewDate, setViewDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [generatingSlotId, setGeneratingSlotId] = useState(null)

  const { mutate: generateDraft } = useGenerateDraftFromSlot({
    onSuccess: (data) => navigate(`/posts/${data.post.id}`),
  })

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOfMonth(year, month)

  const slotsByDate = slots.reduce((acc, slot) => {
    const key = slot.scheduled_date?.slice(0, 10)
    if (!acc[key]) acc[key] = []
    acc[key].push(slot)
    return acc
  }, {})

  const handleSlotClick = (slot) => {
    const existingPost = slot.posts?.[0]
    if (existingPost) {
      navigate(`/posts/${existingPost.id}`)
    } else {
      setGeneratingSlotId(slot.id)
      generateDraft(slot.id, {
        onSettled: () => setGeneratingSlotId(null),
        onError: () => toast.error('Failed to generate draft'),
      })
    }
  }

  const prevMonth = () => setViewDate(new Date(year, month - 1, 1))
  const nextMonth = () => setViewDate(new Date(year, month + 1, 1))

  const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

  return (
    <div className="overflow-x-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button onClick={prevMonth} className="p-2 rounded hover:bg-gray-100 transition-colors">
          <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h3 className="text-base font-semibold text-gray-900">
          {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
        </h3>
        <button onClick={nextMonth} className="p-2 rounded hover:bg-gray-100 transition-colors">
          <svg className="h-4 w-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* Grid */}
      <div className="min-w-[560px]">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 mb-1">
          {WEEKDAYS.map(d => (
            <div key={d} className="py-2 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">{d}</div>
          ))}
        </div>

        {/* Days */}
        <div className="grid grid-cols-7 border-l border-t border-gray-100">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="border-r border-b border-gray-100 min-h-[90px] bg-gray-50/50" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1
            const dateKey = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
            const daySlots = slotsByDate[dateKey] || []
            const isToday = today.getFullYear() === year && today.getMonth() === month && today.getDate() === day

            return (
              <div key={day} className="border-r border-b border-gray-100 min-h-[90px] p-1.5">
                <p className={`text-xs font-medium mb-1 w-6 h-6 flex items-center justify-center rounded-full
                  ${isToday ? 'bg-brand-500 text-white' : 'text-gray-500'}`}>
                  {day}
                </p>
                <div className="space-y-0.5">
                  {daySlots.map(slot => (
                    <SlotChip
                      key={slot.id}
                      slot={slot}
                      onClick={handleSlotClick}
                      loading={generatingSlotId === slot.id}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
