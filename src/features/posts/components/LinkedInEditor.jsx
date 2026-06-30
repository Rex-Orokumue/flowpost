import { useState, useEffect } from 'react'
import { useUpdateVersion } from '../hooks'
import Textarea from '../../../components/Textarea'
import Badge from '../../../components/Badge'

const MAX = 3000

export default function LinkedInEditor({ postId, version }) {
  const [content, setContent] = useState(version?.content || '')
  const { mutate: save } = useUpdateVersion(postId)

  useEffect(() => { setContent(version?.content || '') }, [version?.content])

  const handleBlur = () => {
    if (content !== version?.content) {
      save({ platform: 'linkedin', content, thread_parts: null })
    }
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">Edits save automatically on blur</p>
        {version?.status && <Badge status={version.status} />}
      </div>
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onBlur={handleBlur}
        maxLength={MAX}
        className="min-h-[300px] font-sans text-sm leading-relaxed"
        placeholder="Your LinkedIn post will appear here after generating a draft..."
      />
    </div>
  )
}
