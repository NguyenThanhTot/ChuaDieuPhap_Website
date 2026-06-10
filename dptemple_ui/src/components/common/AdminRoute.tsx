import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

interface AdminRouteProps {
  children: ReactNode
}

export default function AdminRoute({ children }: AdminRouteProps) {
  const { isAuthenticated, user } = useAuth()
  const location = useLocation()

  // Debug: log auth state when admin routes are evaluated
  // (leave as debug to aid reproduction; can be removed after fix)
  // eslint-disable-next-line no-console
  console.log('[AdminRoute] isAuthenticated=', isAuthenticated, 'role=', user?.role, 'path=', location.pathname)

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace state={{ from: location }} />
  }

  if (user?.role !== 'admin') {
    return <Navigate to="/home" replace />
  }

  return <>{children}</>
}
