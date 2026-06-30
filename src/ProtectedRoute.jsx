import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './hooks/useAuth'
import Spinner from './components/Spinner'

export default function ProtectedRoute() {
  const { token, isLoading } = useAuth()
  if (isLoading) return <div className="flex h-screen items-center justify-center"><Spinner size="lg" /></div>
  return token ? <Outlet /> : <Navigate to="/auth" replace />
}
