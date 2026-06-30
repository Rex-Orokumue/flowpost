import { Link } from 'react-router-dom'
import Badge from '../../../components/Badge'

export default function UpcomingPostRow({ post }) {
  const platforms = post.post_platform_versions?.map(v => v.platform) ?? []
  return (
    <Link
      to={`/posts/${post.id}`}
      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors group"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {post.calendar_slots?.topic || 'Untitled post'}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          {new Date(post.scheduled_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
        </p>
      </div>
      <div className="flex items-center gap-2 ml-4">
        {platforms.map(p => (
          <span key={p} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full font-medium capitalize">{p}</span>
        ))}
        <Badge status={post.status} />
      </div>
    </Link>
  )
}
