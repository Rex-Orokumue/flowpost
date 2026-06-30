import { Outlet } from 'react-router-dom'
import Sidebar from './components/Sidebar'

export default function AppShell() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      {/* md:ml-60 offsets for desktop sidebar; pb-16 md:pb-0 clears mobile tab bar */}
      <main className="md:ml-60 pb-16 md:pb-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 md:px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
