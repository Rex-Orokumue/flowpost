import { useGenerateCalendar } from '../hooks'
import Button from '../../../components/Button'
import toast from 'react-hot-toast'

export default function GenerateCalendarButton() {
  const { mutate, isPending } = useGenerateCalendar()
  return (
    <Button
      loading={isPending}
      onClick={() => mutate(null, {
        onSuccess: () => toast.success('Calendar generated!'),
        onError: () => toast.error('Failed to generate calendar. Try again.'),
      })}
    >
      Generate Calendar
    </Button>
  )
}
