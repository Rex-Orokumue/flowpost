import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { usePost, useApproveVersion } from '../hooks'
import LinkedInEditor from '../components/LinkedInEditor'
import XThreadEditor from '../components/XThreadEditor'
import ScheduleModal from '../components/ScheduleModal'
import VersionHistory from '../components/VersionHistory'
import Button from '../../../components/Button'
import Badge from '../../../components/Badge'
import Spinner from '../../../components/Spinner'
import toast from 'react-hot-toast'

const TABS = ['linkedin']

export default function PostPage() {
  const { id } = useParams()
  const { data: post, isLoading } = usePost(id)
  const { mutate: approve, isPending: approving } = useApproveVersion(id)
  const [activeTab, setActiveTab] = useState('linkedin')
  const [showSchedule, setShowSchedule] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

  if (isLoading) return <div className="flex justify-center py-20"><Spinner size="lg" /></div>
  if (!post) return <p className="text-sm text-gray-500">Post not found.</p>

  const versions = post.post_platform_versions ?? []
  const activeVersion = versions.find(v => v.platform === activeTab)

  const handleApprove = () => {
    approve(activeTab, {
      onSuccess: () => toast.success('LinkedIn version approved'),
      onError: () => toast.error('Failed to approve. Try again.'),
    })
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {post.calendar_slots?.topic || 'Post Editor'}
          </h1>
          <div className="flex items-center gap-2 mt-1.5">
            <Badge status={post.status} />
            {post.scheduled_at && (
              <span className="text-xs text-gray-400">
                Scheduled for {new Date(post.scheduled_at).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })}
              </span>
            )}
          </div>
        </div>
        <button
          onClick={() => setShowHistory(h => !h)}
          className="text-xs text-gray-400 hover:text-gray-600 transition-colors shrink-0"
        >
          {showHistory ? 'Hide' : 'Show'} history
        </button>
      </div>

      <div className="flex gap-6">
        {/* Main editor */}
        <div className="flex-1 min-w-0">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 mb-4">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2.5 text-sm font-medium transition-colors capitalize border-b-2 -mb-px
                  ${activeTab === tab
                    ? 'border-brand-500 text-brand-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'}`}
              >
                {tab === 'x' ? 'X (Twitter)' : tab}
              </button>
            ))}
          </div>

          {/* Editor */}
          {activeTab === 'linkedin' && (
            <LinkedInEditor postId={id} version={activeVersion} />
          )}
          {activeTab === 'x' && (
            <XThreadEditor postId={id} version={activeVersion} />
          )}
        </div>

        {/* Version history panel */}
        {showHistory && (
          <div className="w-64 shrink-0">
            <div className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Version History</h3>
              <VersionHistory versions={versions} />
            </div>
          </div>
        )}
      </div>

      {/* Sticky action bar */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 -mx-4 md:-mx-8 px-4 md:px-8 py-3 flex items-center justify-between gap-3">
        <div className="text-xs text-gray-400">
          {activeVersion?.status && <Badge status={activeVersion.status} />}
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleApprove}
            loading={approving}
            disabled={activeVersion?.status === 'approved' || activeVersion?.status === 'scheduled'}
          >
            Approve LinkedIn
          </Button>
          <Button
            size="sm"
            onClick={() => setShowSchedule(true)}
            disabled={post.status === 'scheduled' || post.status === 'published'}
          >
            Schedule
          </Button>
        </div>
      </div>

      {showSchedule && (
        <ScheduleModal postId={id} onClose={() => setShowSchedule(false)} />
      )}
    </div>
  )
}
