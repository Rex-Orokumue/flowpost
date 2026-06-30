import { useState } from 'react'
import { useAuth } from '../../../hooks/useAuth'
import { signup, login } from '../api'
import Button from '../../../components/Button'
import Input from '../../../components/Input'
import toast from 'react-hot-toast'

export default function AuthPage() {
  const { login: authLogin } = useAuth()
  const [mode, setMode] = useState('login') // 'login' | 'signup'
  const [form, setForm] = useState({ email: '', password: '', full_name: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    if (!form.password || form.password.length < 6) e.password = 'Password must be at least 6 characters'
    if (mode === 'signup' && !form.full_name) e.full_name = 'Name is required'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    setErrors({})
    try {
      if (mode === 'signup') {
        await signup(form.email, form.password, form.full_name)
      }
      const { session } = await login(form.email, form.password)
      await authLogin(session.access_token)
    } catch (err) {
      const msg = err.response?.data?.error || 'Something went wrong'
      toast.error(msg)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-brand-500 flex items-center justify-center">
            <svg className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">FlowPost</h1>
          <p className="text-sm text-gray-500">
            {mode === 'login' ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>

        {/* Card */}
        <div className="rounded-xl border border-gray-100 bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {mode === 'signup' && (
              <Input
                id="full_name"
                label="Full name"
                type="text"
                placeholder="Rex Founder"
                value={form.full_name}
                onChange={set('full_name')}
                error={errors.full_name}
                autoFocus
              />
            )}
            <Input
              id="email"
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              autoFocus={mode === 'login'}
            />
            <Input
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={set('password')}
              error={errors.password}
            />
            <Button type="submit" loading={loading} className="w-full mt-1">
              {mode === 'login' ? 'Sign in' : 'Create account'}
            </Button>
          </form>
        </div>

        {/* Toggle */}
        <p className="mt-4 text-center text-sm text-gray-500">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            onClick={() => { setMode(m => m === 'login' ? 'signup' : 'login'); setErrors({}) }}
            className="font-medium text-brand-600 hover:text-brand-700 transition-colors"
          >
            {mode === 'login' ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  )
}
