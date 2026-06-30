import { useState, useEffect } from 'react'
import { useUpdateVersion } from '../hooks'
import Badge from '../../../components/Badge'

const TWEET_MAX = 280

function TweetBox({ value, onChange, onRemove, canRemove, index }) {
  const count = value.length
  const nearLimit = count >= TWEET_MAX * 0.85
  return (
    <div className="relative">
      <div className="flex items-start gap-2">
        <div className="flex flex-col items-center gap-1 pt-2 shrink-0">
          <span className="text-xs font-semibold text-gray-400">{index + 1}</span>
          {index < 5 && <div className="w-px flex-1 min-h-[20px] bg-gray-200 my-1" />}
        </div>
        <div className="flex-1">
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            maxLength={TWEET_MAX}
            className="w-full min-h-[80px] rounded border border-gray-200 px-3 py-2 text-sm resize-none outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100 transition-colors"
            placeholder={index === 0 ? 'First tweet — make it count...' : 'Continue the thread...'}
          />
          <div className="flex justify-between items-center mt-1">
            {canRemove && (
              <button onClick={onRemove} className="text-xs text-red-400 hover:text-red-600 transition-colors">Remove</button>
            )}
            <p className={`ml-auto text-xs ${nearLimit ? 'text-amber-500 font-medium' : 'text-gray-400'}`}>
              {count}/{TWEET_MAX}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function XThreadEditor({ postId, version }) {
  const [tweets, setTweets] = useState(() => {
    if (version?.thread_parts?.length) return version.thread_parts
    if (version?.content) return [version.content]
    return ['']
  })
  const { mutate: save } = useUpdateVersion(postId)

  useEffect(() => {
    if (version?.thread_parts?.length) setTweets(version.thread_parts)
    else if (version?.content) setTweets([version.content])
  }, [version?.thread_parts, version?.content])

  const handleBlur = () => {
    const prevTweets = version?.thread_parts?.length ? version.thread_parts : [version?.content || '']
    if (JSON.stringify(tweets) !== JSON.stringify(prevTweets)) {
      save({
        platform: 'x',
        content: tweets[0],
        thread_parts: tweets.length > 1 ? tweets : null,
      })
    }
  }

  const updateTweet = (i, val) => setTweets(t => t.map((tw, idx) => idx === i ? val : tw))
  const addTweet = () => { if (tweets.length < 6) setTweets(t => [...t, '']) }
  const removeTweet = (i) => setTweets(t => t.filter((_, idx) => idx !== i))

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs text-gray-400">{tweets.length} tweet{tweets.length !== 1 ? 's' : ''} · Edits save on blur</p>
        {version?.status && <Badge status={version.status} />}
      </div>
      <div className="space-y-3" onBlur={handleBlur}>
        {tweets.map((tw, i) => (
          <TweetBox
            key={i}
            index={i}
            value={tw}
            onChange={(val) => updateTweet(i, val)}
            onRemove={() => removeTweet(i)}
            canRemove={tweets.length > 1}
          />
        ))}
      </div>
      {tweets.length < 6 && (
        <button
          onClick={addTweet}
          className="w-full py-2 text-sm text-brand-600 hover:text-brand-700 border border-dashed border-brand-200 hover:border-brand-400 rounded-lg transition-colors"
        >
          + Add tweet
        </button>
      )}
    </div>
  )
}
