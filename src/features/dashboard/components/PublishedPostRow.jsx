import { Link } from 'react-router-dom'

export default function PublishedPostRow({ post }) {
  return (
    <Link
      to={`/posts/${post.id}`}
      className="flex items-center justify-between py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
    >
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {post.calendar_slots?.topic || 'Untitled post'}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">
          Published {new Date(post.published_at || post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </p>
      </div>
      <div className="flex gap-2">
        {post.post_platform_versions?.map(v => (
          <span key={v.platform} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full font-medium capitalize">{v.platform}</span>
        ))}
      </div>
    </Link>
  )
}
