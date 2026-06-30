export default function VersionHistory({ versions = [] }) {
  const allDrafts = versions
    .flatMap(v => (v.post_drafts || []).map(d => ({ ...d, platform: v.platform })))
    .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))

  if (!allDrafts.length) return <p className="text-xs text-gray-400">No version history yet.</p>

  return (
    <div className="space-y-3">
      {allDrafts.map((draft) => (
        <div key={draft.id} className="border-l-2 border-gray-100 pl-3">
          <div className="flex items-center justify-between gap-2">
            <span className={`text-xs font-medium ${draft.authored_by === 'ai' ? 'text-brand-600' : 'text-gray-600'}`}>
              {draft.authored_by === 'ai' ? 'AI draft' : 'Your edit'} · v{draft.version_number}
            </span>
            <span className="text-xs text-gray-400 capitalize">{draft.platform}</span>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            {new Date(draft.created_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
          </p>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {Array.isArray(draft.thread_parts) ? draft.thread_parts[0] : draft.content}
          </p>
        </div>
      ))}
    </div>
  )
}
