import { useState, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { authService } from '@/services/authService'
import type { RegisterRequest } from '@/types'

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterRequest>({
    fullName: '',
    dharmaName: '',
    email: '',
    password: '',
    phone: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useDocumentTitle('Đăng ký - Chùa Diệu Pháp')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)

    if (formData.password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }

    if (formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự')
      return
    }

    try {
      setIsLoading(true)
      // Register via auth endpoint
      await authService.register(formData)
      setSuccess('Đăng ký thành công. Vui lòng kiểm tra email và xác thực trước khi đăng nhập.')
      setFormData({
        fullName: '',
        dharmaName: '',
        email: '',
        password: '',
        phone: ''
      })
      setConfirmPassword('')
    } catch (err) {
      console.error(err)
      setError('Đăng ký không thành công. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
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
          Đăng Ký
        </h1>
        <p className="text-sm text-[#5a7060]">
          Tạo tài khoản để tham gia cộng đồng Chùa Diệu Pháp
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
            Họ và tên
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Nhập họ và tên của bạn"
            className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
            required
          />
        </div>

        {/* Dharma Name */}
        <div>
          <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
            Tên pháp danh (tùy chọn)
          </label>
          <input
            type="text"
            name="dharmaName"
            value={formData.dharmaName}
            onChange={handleChange}
            placeholder="Nhập tên pháp danh"
            className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="email@example.com"
            className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
            required
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
            Số điện thoại (tùy chọn)
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
            Mật khẩu
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
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
            onChange={handleConfirmPasswordChange}
            placeholder="Nhập lại mật khẩu"
            className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none transition text-sm"
            required
          />
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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#2d4a3e] text-white py-2.5 rounded-lg hover:bg-[#1a2e25] transition-colors font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Đang đăng ký...' : 'Đăng ký'}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-6 text-center">
        <p className="text-sm text-[#5a7060]">
          Đã có tài khoản?{' '}
          <Link 
            to="/auth/login" 
            className="text-[#2d4a3e] hover:text-[#1a2e25] font-medium transition-colors"
          >
            Đăng nhập ngay
          </Link>
        </p>
      </div>

      {/* Buddhist Quote */}
      <div className="mt-8 pt-6 border-t border-[#e8d5a3]">
        <p className="text-xs text-[#7a9e7e] text-center italic">
          "Phật pháp không phải là để tin, mà là để thực hành"
        </p>
      </div>
    </div>
  )
}
