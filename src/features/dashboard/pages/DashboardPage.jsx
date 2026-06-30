import { Link } from 'react-router-dom'
import { useDashboard } from '../hooks'
import DraftCard from '../components/DraftCard'
import UpcomingPostRow from '../components/UpcomingPostRow'
import PublishedPostRow from '../components/PublishedPostRow'
import Spinner from '../../../components/Spinner'

function Section({ title, children }) {
  return (
    <section>
      <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">{title}</h2>
      {children}
    </section>
  )
}

export default function DashboardPage() {
  const { data, isLoading } = useDashboard()

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>

  const { pending_drafts = [], upcoming_posts = [], recently_published = [] } = data ?? {}

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Your content pipeline at a glance.</p>
      </div>

      <Section title="Pending Drafts">
        {pending_drafts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-gray-200 p-10 text-center">
            <p className="text-sm text-gray-500">No drafts to review — generate a calendar to get started.</p>
            <Link to="/calendar" className="mt-3 inline-block text-sm font-medium text-brand-600 hover:text-brand-700">
              Go to Calendar →
            </Link>
          </div>
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {pending_drafts.map(slot => <DraftCard key={slot.id} slot={slot} />)}
          </div>
        )}
      </Section>

      <Section title="Upcoming Posts">
        {upcoming_posts.length === 0 ? (
          <p className="text-sm text-gray-400 py-4">Nothing scheduled yet — approve a draft to schedule it.</p>
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
            {upcoming_posts.map(post => <UpcomingPostRow key={post.id} post={post} />)}
          </div>
        )}
      </Section>

      <Section title="Recently Published">
        {recently_published.length === 0 ? (
          <p className="text-sm text-gray-400 py-4">Your published posts will appear here.</p>
        ) : (
          <div className="rounded-xl border border-gray-100 bg-white shadow-sm divide-y divide-gray-50">
            {recently_published.map(post => <PublishedPostRow key={post.id} post={post} />)}
          </div>
        )}
      </Section>
    </div>
  )
}
