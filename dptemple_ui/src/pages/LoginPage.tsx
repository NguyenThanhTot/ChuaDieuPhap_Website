import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { login, isLoading } = useAuth()
  
  useDocumentTitle('Đăng nhập - Chùa Diệu Pháp')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login({ email, password })
    } catch {
      setError('Tài khoản hoặc mật khẩu không đúng')
    }
  }

  return (
    <div className="w-full max-w-md">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="text-[#2d4a3e] text-3xl mb-3">☸</div>
        <h1 
          className="text-2xl font-semibold text-[#2d4a3e] mb-2"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Đăng Nhập
        </h1>
        <p className="text-sm text-[#5a7060]">
          Chào mừng bạn trở lại cộng đồng Chùa Diệu Pháp
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Nhập email"
            autoComplete="email"
            className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
            required
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Nhập mật khẩu"
            autoComplete="current-password"
            className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
            required
          />
        </div>

        {/* Remember Me & Forgot Password */}
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="w-4 h-4 text-[#2d4a3e] border-[#d4d4aa] rounded focus:ring-[#2d4a3e]"
            />
            <span className="ml-2 text-sm text-[#5a7060]">Ghi nhớ đăng nhập</span>
          </label>
          <a href="#" className="text-sm text-[#2d4a3e] hover:text-[#1a2e25] transition-colors">
            Quên mật khẩu?
          </a>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2d4a3e] text-white py-2.5 rounded-lg hover:bg-[#1a2e25] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[#5a7060]">
          Chưa có tài khoản?{' '}
          <Link 
            to="/auth/register" 
            className="text-[#2d4a3e] hover:text-[#1a2e25] font-medium transition-colors"
          >
            Đăng ký ngay
          </Link>
        </p>
      </div>

      {/* Buddhist Quote */}
      <div className="mt-8 pt-6 border-t border-[#e8d5a3]">
        <p className="text-xs text-[#7a9e7e] text-center italic">
          "Tâm bình an thì mọi sự đều bình an"
        </p>
      </div>
    </div>
  )
}
