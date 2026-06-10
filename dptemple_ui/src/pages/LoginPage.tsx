import { useState, FormEvent } from 'react'
import { isAxiosError } from 'axios'
import { Link } from 'react-router-dom'
import { authService } from '@/services/authService'
import { useAuth } from '@/contexts/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [resendLoading, setResendLoading] = useState(false)
  const [resendMessage, setResendMessage] = useState<string | null>(null)
  const { login, isLoading } = useAuth()
  
  useDocumentTitle('Đăng nhập - Chùa Diệu Pháp')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setResendMessage(null)

    try {
      await login({ email, password })
    } catch (error) {
      if (isAxiosError(error)) {
        const responseMessage = error.response?.data?.message ?? ''
        if (/verify|xác thực|email chưa được xác thực/i.test(responseMessage)) {
          setError('Email chưa được xác thực. Vui lòng kiểm tra email hoặc gửi lại email xác thực.')
          return
        }
      }

      setError('Tài khoản hoặc mật khẩu không đúng')
    }
  }

  const handleResendVerification = async () => {
    setError(null)
    setSuccess(null)
    setResendMessage(null)

    if (!email) {
      setError('Vui lòng nhập email để gửi lại mã xác thực.')
      return
    }

    try {
      setResendLoading(true)
      await authService.resendVerificationEmail(email)
      setResendMessage('Email xác thực đã được gửi lại. Vui lòng kiểm tra hộp thư đến.')
    } catch (error) {
      console.error(error)
      // If server returns a 4xx/5xx with a message, handle 'already verified' specifically
      if (isAxiosError(error)) {
        const respMsg = (error.response?.data?.message || '').toString()
        if (/already verified|email is already verified|đã.*xác thực/i.test(respMsg)) {
          setResendMessage('Email của bạn đã được xác thực trước đó.')
          return
        }
        // otherwise show server-provided message if available
        if (respMsg) {
          setError(respMsg)
          return
        }
      }

      setError('Không thể gửi lại email xác thực. Vui lòng thử lại sau.')
    } finally {
      setResendLoading(false)
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
          <Link to="/auth/forgot-password" className="text-sm text-[#2d4a3e] hover:text-[#1a2e25] transition-colors">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm">
            {success}
          </div>
        )}

        {resendMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm">
            {resendMessage}
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
        <button
          type="button"
          onClick={handleResendVerification}
          disabled={resendLoading}
          className="w-full border border-[#2d4a3e] text-[#2d4a3e] py-2.5 rounded-lg hover:bg-[#f2f0e8] transition-colors text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {resendLoading ? 'Đang gửi lại...' : 'Gửi lại email xác thực'}
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
