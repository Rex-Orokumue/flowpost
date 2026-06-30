import { useActiveCalendar } from '../hooks'
import CalendarGrid from '../components/CalendarGrid'
import GenerateCalendarButton from '../components/GenerateCalendarButton'
import Spinner from '../../../components/Spinner'

export default function CalendarPage() {
  const { calendar, slots, isLoading } = useActiveCalendar()

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Calendar</h1>
          <p className="text-sm text-gray-500 mt-1">
            {calendar ? calendar.name : 'No active calendar yet'}
          </p>
        </div>
        <GenerateCalendarButton />
      </div>

      {isLoading ? (
        <div className="flex justify-center py-20"><Spinner size="lg" /></div>
      ) : !calendar ? (
        <div className="rounded-xl border border-dashed border-gray-200 p-16 text-center">
          <p className="text-sm text-gray-500 mb-3">Generate your first calendar to get started.</p>
          <GenerateCalendarButton />
        </div>
      ) : (
        <div className="rounded-xl border border-gray-100 bg-white shadow-sm p-4">
          <CalendarGrid slots={slots} />
        </div>
      )}
    </div>
  )
}
