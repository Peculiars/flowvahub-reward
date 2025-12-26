import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useUserStore } from '../store/userStore'
import Loading from './ui/Loading'
import type { JSX } from 'react'

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { user: authUser, loading } = useAuth()
  const { user: appUser } = useUserStore()
  const location = useLocation()

  if (loading) return <Loading />

  if (!authUser) {
    return <Navigate to="/login" replace />
  }

  if (!appUser) {
    return <Loading />
  }

  const isDashboard = location.pathname.startsWith('/dashboard')

  if (!appUser.hasCompletedOnboarding && isDashboard) {
    return <Navigate to="/onboarding" replace />
  }

  return children
}

export default ProtectedRoute
