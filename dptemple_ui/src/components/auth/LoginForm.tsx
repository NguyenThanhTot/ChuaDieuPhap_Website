import { useState } from 'react'

interface LoginFormProps {
  onClose?: () => void
  onSubmit?: (data: LoginData) => void
}

interface LoginData {
  email: string
  password: string
}

export default function LoginForm({ onClose, onSubmit }: LoginFormProps) {
  const [form, setForm] = useState<LoginData>({ email: '', password: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onSubmit?.(form)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-md shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
        <h2
          className="text-lg font-semibold text-gray-900"
          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
        >
          Đăng Nhập
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        )}
      </div>

      {/* Email */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1.5">
          Email <span className="text-[#c8a96e]">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Nhập email"
          className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Mật khẩu */}
      <div className="mb-6">
        <label className="block text-sm text-gray-700 mb-1.5">
          Mật khẩu <span className="text-[#c8a96e]">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Nhập mật khẩu"
          className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full h-11 bg-[#0d6e56] hover:bg-[#0a5a46] text-white text-sm font-medium rounded-lg transition-colors"
      >
        Đăng nhập
      </button>
    </div>
  )
}