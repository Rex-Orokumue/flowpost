import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { submitOnboarding } from '../api'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import Textarea from '../../../components/Textarea'
import Select from '../../../components/Select'
import toast from 'react-hot-toast'

const STEPS = ['Niche', 'Goals', 'Target Audience', 'Posting Frequency']

const FREQUENCY_OPTIONS = [
  { value: 1, label: '1 post per week' },
  { value: 2, label: '2 posts per week' },
  { value: 3, label: '3 posts per week' },
  { value: 5, label: '5 posts per week' },
  { value: 7, label: 'Daily' },
]

export default function OnboardingPage() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    full_name: user?.full_name || '',
    niche: '',
    goals: '',
    target_audience: '',
    posting_frequency: 3,
  })

  const set = (key) => (e) =>
    setForm(f => ({ ...f, [key]: e.target.value ?? e }))

  const next = () => setStep(s => Math.min(s + 1, STEPS.length - 1))
  const back = () => setStep(s => Math.max(s - 1, 0))

  const handleFinish = async () => {
    setLoading(true)
    try {
      await submitOnboarding({ ...form, posting_frequency: Number(form.posting_frequency) })
      toast.success('Welcome to FlowPost!')
      navigate('/dashboard')
    } catch {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-lg">
        {/* Logo */}
        <div className="mb-8 flex items-center gap-2.5">
          <img src="/logo.png" alt="FlowPost" className="h-10 w-10 object-contain" />
          <span className="text-base font-semibold text-gray-900">FlowPost</span>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="flex justify-between mb-2">
            {STEPS.map((s, i) => (
              <span key={s} className={`text-xs font-medium ${i === step ? 'text-brand-600' : i < step ? 'text-gray-400' : 'text-gray-300'}`}>{s}</span>
            ))}
          </div>
          <div className="h-1 w-full rounded-full bg-gray-100">
            <div
              className="h-1 rounded-full bg-brand-500 transition-all duration-300"
              style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-sm">
          {step === 0 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">What's your niche?</h2>
              <p className="text-sm text-gray-500 mb-6">This helps FlowPost generate relevant content ideas for your audience.</p>
              <Input
                id="niche"
                label="Niche or industry"
                placeholder="e.g. SaaS founders, indie hackers, B2B marketing"
                value={form.niche}
                onChange={set('niche')}
                autoFocus
              />
            </div>
          )}
          {step === 1 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">What are your goals?</h2>
              <p className="text-sm text-gray-500 mb-6">What do you want to achieve by posting consistently?</p>
              <Textarea
                id="goals"
                label="Your goals"
                placeholder="e.g. Build an audience of developers, drive traffic to my SaaS, establish thought leadership"
                value={form.goals}
                onChange={set('goals')}
                autoFocus
              />
            </div>
          )}
          {step === 2 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">Who are you writing for?</h2>
              <p className="text-sm text-gray-500 mb-6">Describe your ideal reader so FlowPost can match the right tone and topics.</p>
              <Textarea
                id="target_audience"
                label="Target audience"
                placeholder="e.g. Early-stage founders building B2B SaaS, engineers who want to start a business"
                value={form.target_audience}
                onChange={set('target_audience')}
                autoFocus
              />
            </div>
          )}
          {step === 3 && (
            <div className="space-y-2">
              <h2 className="text-xl font-semibold text-gray-900">How often do you want to post?</h2>
              <p className="text-sm text-gray-500 mb-6">FlowPost will fill your calendar with this many slots per week.</p>
              <Select
                id="posting_frequency"
                label="Posting frequency"
                options={FREQUENCY_OPTIONS}
                value={form.posting_frequency}
                onChange={(e) => setForm(f => ({ ...f, posting_frequency: Number(e.target.value) }))}
              />
            </div>
          )}

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <Button variant="ghost" onClick={back} disabled={step === 0}>
              Back
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next} disabled={!form[['niche', 'goals', 'target_audience', 'posting_frequency'][step]]}>
                Continue
              </Button>
            ) : (
              <Button onClick={handleFinish} loading={loading}>
                Finish setup
              </Button>
            )}
          </div>
        </div>

        <p className="mt-4 text-center text-xs text-gray-400">Step {step + 1} of {STEPS.length}</p>
      </div>
    </div>
  )
}
