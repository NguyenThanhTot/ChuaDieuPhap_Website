import { useState, FormEvent, useEffect } from 'react'
import { useSearchParams, Link, useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { authService } from '@/services/authService'
import type { ResetPasswordRequest } from '@/types'

export default function ResetPasswordPage() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  useDocumentTitle('Đặt lại mật khẩu - Chùa Diệu Pháp')

  useEffect(() => {
    if (!token) {
      setError('Liên kết đặt lại mật khẩu không hợp lệ. Vui lòng yêu cầu gửi lại email.')
    }
  }, [token])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!token) {
      setError('Liên kết không hợp lệ. Vui lòng yêu cầu gửi lại email.')
      return
    }

    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    try {
      setIsLoading(true)
      const request: ResetPasswordRequest = {
        token,
        newPassword: password
      }
      await authService.resetPassword(request)

      setSuccess(true)
      setTimeout(() => {
        navigate('/auth/login')
      }, 2000)
    } catch (err) {
      console.error(err)
      setError('Không thể đặt lại mật khẩu. Liên kết có thể đã hết hạn. Vui lòng yêu cầu gửi lại email.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="text-[#2d4a3e] text-3xl mb-3">☸</div>
        <h1
          className="text-2xl font-semibold text-[#2d4a3e] mb-2"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Đặt lại mật khẩu
        </h1>
        <p className="text-sm text-[#5a7060]">
          Nhập mật khẩu mới cho tài khoản của bạn
        </p>
      </div>

      {success ? (
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-center">
          <p className="font-medium mb-2">Đặt lại mật khẩu thành công!</p>
          <p className="text-sm">Đang chuyển hướng đến trang đăng nhập...</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
              Mật khẩu mới
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
              className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
              required
            />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
              Xác nhận mật khẩu
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Nhập lại mật khẩu"
              className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading || !token}
            className="w-full bg-[#2d4a3e] text-white py-2.5 rounded-lg hover:bg-[#1a2e25] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
          </button>
        </form>
      )}

      {/* Footer */}
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
