import { createContext, useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProfile } from './api'
import { setLogoutCallback } from '../../lib/axios'

export const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(() => localStorage.getItem('flowpost_token'))
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  const logout = useCallback(() => {
    localStorage.removeItem('flowpost_token')
    setToken(null)
    setUser(null)
    navigate('/auth')
  }, [navigate])

  useEffect(() => {
    setLogoutCallback(logout)
  }, [logout])

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }
    getProfile()
      .then(setUser)
      .catch(() => {
        localStorage.removeItem('flowpost_token')
        setToken(null)
      })
      .finally(() => setIsLoading(false))
  }, [token])

  const login = useCallback(async (newToken) => {
    localStorage.setItem('flowpost_token', newToken)
    setToken(newToken)
    const profile = await getProfile()
    setUser(profile)
    navigate(profile.onboarding_completed ? '/dashboard' : '/onboarding')
  }, [navigate])

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
