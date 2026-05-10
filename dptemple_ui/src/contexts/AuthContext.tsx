import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { authService } from '@/services/authService'
import type { User, LoginRequest, AuthContextType } from '@/types'

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user')
    return stored ? JSON.parse(stored) : null
  })
  const [accessToken, setAccessToken] = useState<string | null>(
    () => localStorage.getItem('accessToken')
  )
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const isAuthenticated = !!accessToken && !!user

  const login = useCallback(async (data: LoginRequest) => {
    setIsLoading(true)
    try {
      const res = await authService.login(data)
      const { user, accessToken } = res.data
      localStorage.setItem('accessToken', accessToken)
      localStorage.setItem('user', JSON.stringify(user))
      setUser(user)
      setAccessToken(accessToken)
      navigate('/home')
    } finally {
      setIsLoading(false)
    }
  }, [navigate])

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('user')
    setUser(null)
    setAccessToken(null)
    navigate('/auth/login')
  }, [navigate])

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
