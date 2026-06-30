import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './features/auth/AuthContext'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import './index.css'

import AuthPage from './features/auth/pages/AuthPage'
import OnboardingPage from './features/onboarding/pages/OnboardingPage'
import DashboardPage from './features/dashboard/pages/DashboardPage'
import CalendarPage from './features/calendar/pages/CalendarPage'
import PostPage from './features/posts/pages/PostPage'
import SettingsPage from './features/settings/pages/SettingsPage'
import AppShell from './AppShell'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, staleTime: 30_000 } },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          <Routes>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route element={<PublicRoute />}>
              <Route path="/auth" element={<AuthPage />} />
            </Route>
            <Route element={<ProtectedRoute />}>
              <Route path="/onboarding" element={<OnboardingPage />} />
              <Route element={<AppShell />}>
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/posts/:id" element={<PostPage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
