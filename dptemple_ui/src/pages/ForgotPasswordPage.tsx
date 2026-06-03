import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { authService } from '@/services/authService'
import type { ForgetPasswordRequest } from '@/types'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  useDocumentTitle('Quên mật khẩu - Chùa Diệu Pháp')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setStatus(null)

    if (!email.trim()) {
      setError('Vui lòng nhập email của bạn')
      return
    }

    try {
      setIsLoading(true)
      const request: ForgetPasswordRequest = { email: email.trim() }
      await authService.forgetPassword(request)

      setStatus(
        'Nếu email tồn tại trong hệ thống, hướng dẫn đặt lại mật khẩu sẽ được gửi tới email của bạn. Nếu bạn không nhận được email, vui lòng liên hệ quản trị viên.'
      )
      setEmail('')
    } catch (err) {
      console.error(err)
      setError('Không thể gửi yêu cầu quên mật khẩu. Vui lòng thử lại sau.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="text-[#2d4a3e] text-3xl mb-3">☸</div>
        <h1 className="text-2xl font-semibold text-[#2d4a3e] mb-2" style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}>
          Quên mật khẩu
        </h1>
        <p className="text-sm text-[#5a7060]">
          Nhập email để nhận hướng dẫn đặt lại mật khẩu.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#2d4a3e] mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
            required
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}

        {status && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-3 py-2 rounded-lg text-sm">
            {status}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2d4a3e] text-white py-2.5 rounded-lg hover:bg-[#1a2e25] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang gửi...' : 'Gửi yêu cầu'}
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-[#5a7060]">
          Quay lại đăng nhập?{' '}
          <Link to="/auth/login" className="text-[#2d4a3e] hover:text-[#1a2e25] font-medium transition-colors">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  )
}
