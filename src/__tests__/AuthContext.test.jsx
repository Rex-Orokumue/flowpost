import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '../features/auth/AuthContext'
import { useAuth } from '../hooks/useAuth'
import { vi } from 'vitest'

vi.mock('../lib/axios', () => ({
  default: { get: vi.fn() },
  setLogoutCallback: vi.fn(),
}))

import api from '../lib/axios'

function TestConsumer() {
  const { user, isLoading } = useAuth()
  if (isLoading) return <div>loading</div>
  return <div>{user ? `user:${user.id}` : 'no-user'}</div>
}

function Wrapper({ children }) {
  return <MemoryRouter><AuthProvider>{children}</AuthProvider></MemoryRouter>
}

test('shows no-user when no token stored', async () => {
  localStorage.clear()
  render(<TestConsumer />, { wrapper: Wrapper })
  await waitFor(() => expect(screen.getByText('no-user')).toBeInTheDocument())
})

test('loads user from profile when token exists', async () => {
  localStorage.setItem('flowpost_token', 'fake-jwt')
  api.get.mockResolvedValueOnce({ data: { id: 'abc', full_name: 'Rex', onboarding_completed: true } })
  render(<TestConsumer />, { wrapper: Wrapper })
  await waitFor(() => expect(screen.getByText('user:abc')).toBeInTheDocument())
  localStorage.clear()
})
