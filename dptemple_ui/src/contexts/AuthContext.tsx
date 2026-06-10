import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { authService } from '@/services/authService'
import type { User, LoginRequest, AuthContextType } from '@/types'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem('user')
      if (!stored || stored === 'undefined') {
        localStorage.removeItem('user')
        return null
      }
      return JSON.parse(stored)
    } catch {
      localStorage.removeItem('user')
      return null
    }
  })
  const [accessToken, setAccessToken] = useState<string | null>(() => {
    const token = localStorage.getItem('accessToken')
    if (!token || token === 'undefined') {
      localStorage.removeItem('accessToken')
      return null
    }
    return token
  })
  const [isLoading, setIsLoading] = useState(false)

  const isAuthenticated = !!accessToken && !!user

  const login = useCallback(async (data: LoginRequest) => {
    setIsLoading(true)
    try {
      const loginData = await authService.login(data)
      const authenticatedUser: User = {
        id: loginData.id,
        fullName: loginData.fullName,
        dharmaName: loginData.dharmaName,
        email: loginData.email,
        role: loginData.role,
        avatarUrl: loginData.avatarUrl,
        isActive: true,
        createdAt: loginData.loginTime,
        updatedAt: loginData.loginTime,
      }
      localStorage.setItem('accessToken', loginData.token)
      localStorage.setItem('user', JSON.stringify(authenticatedUser))
      setUser(authenticatedUser)
      setAccessToken(loginData.token)
      window.location.href = '/home'
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(async () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
    setAccessToken(null)

    try {
      await authService.logout()
    } catch {
      // ignore logout errors after clearing local state
    }

    window.location.href = '/auth/login'
  }, [])

  // Sync khi localStorage thay đổi từ tab khác
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'accessToken' && !e.newValue) logout()
    }
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [logout])

  return (
    <AuthContext.Provider value={{ user, accessToken, isAuthenticated, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth phải dùng trong AuthProvider')
  return ctx
}
