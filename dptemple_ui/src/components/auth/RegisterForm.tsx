import { useState, useRef } from 'react'

interface RegisterFormProps {
  onClose?: () => void
  onSubmit?: (data: RegisterData) => void
}

interface RegisterData {
  avatar: File | null
  fullName: string
  dharmName: string
  phone: string
  birthDate: string
  email: string
  password: string
  confirmPassword: string
  gender: string
  occupation: string
  address: string
}

export default function RegisterForm({ onClose, onSubmit }: RegisterFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null)
  const [form, setForm] = useState<RegisterData>({
    avatar: null,
    fullName: '',
    dharmName: '',
    phone: '',
    birthDate: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    occupation: '',
    address: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setForm({ ...form, avatar: file })
    setAvatarPreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    onSubmit?.(form)
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 w-full max-w-lg shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
        <h2
          className="text-lg font-semibold text-gray-900"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Đăng ký
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

      {/* Avatar */}
      <div className="mb-5">
        <label className="block text-sm text-gray-700 mb-2">
          Ảnh chân dung <span className="text-[#c8a96e]">*</span>
        </label>
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-16 h-16 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-[#0d6e56] transition-colors overflow-hidden"
        >
          {avatarPreview ? (
            <img src={avatarPreview} alt="avatar" className="w-full h-full object-cover" />
          ) : (
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="8" r="4" stroke="#9ca3af" strokeWidth="1.5" />
              <path d="M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          )}
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpg,image/jpeg,image/png,image/gif,image/webp"
          className="hidden"
          onChange={handleAvatarChange}
        />
        <p className="text-xs text-gray-400 mt-1">JPG, PNG, GIF, WEBP  tối đa 10Mb</p>
      </div>

      {/* Họ và tên */}
      <div className="mb-4">
        <label className="block text-sm text-gray-700 mb-1.5">
          Họ và tên <span className="text-[#c8a96e]">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Nhập họ và tên đầy đủ"
          className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
        />
      </div>

      {/* Pháp danh + SĐT */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">Pháp danh nếu có</label>
          <input
            type="text"
            name="dharmName"
            value={form.dharmName}
            onChange={handleChange}
            placeholder="Nhập pháp danh"
            className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">
            Số điện thoại <span className="text-[#c8a96e]">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
            className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Ngày sinh + Email */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">
            Ngày sinh <span className="text-[#c8a96e]">*</span>
          </label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all text-gray-700"
          />
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">
            Email <span className="text-[#c8a96e]">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Nhập địa chỉ email"
            className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Mật khẩu + Xác nhận */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
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
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">
            Xác nhận mật khẩu <span className="text-[#c8a96e]">*</span>
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Nhập lại mật khẩu"
            className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Giới tính + Nghề nghiệp */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">
            Giới tính <span className="text-[#c8a96e]">*</span>
          </label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all text-gray-700"
          >
            <option value="" disabled>Chọn giới tính</option>
            <option value="nam">Nam</option>
            <option value="nu">Nữ</option>
            <option value="khac">Khác</option>
          </select>
        </div>
        <div>
          <label className="block text-sm text-gray-700 mb-1.5">
            Nghề nghiệp <span className="text-[#c8a96e]">*</span>
          </label>
          <input
            type="text"
            name="occupation"
            value={form.occupation}
            onChange={handleChange}
            placeholder="Nhập nghề nghiệp"
            className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Địa chỉ */}
      <div className="mb-5">
        <label className="block text-sm text-gray-700 mb-1.5">
          Địa chỉ <span className="text-[#c8a96e]">*</span>
        </label>
        <input
          type="text"
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Nhập địa chỉ"
          className="w-full h-10 px-3 text-sm bg-gray-50 border border-gray-200 rounded-lg outline-none focus:border-[#0d6e56] focus:ring-2 focus:ring-[#0d6e56]/10 transition-all placeholder:text-gray-400"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full h-11 bg-[#0d6e56] hover:bg-[#0a5a46] text-white text-sm font-medium rounded-lg transition-colors"
      >
        Đăng ký
      </button>
    </div>
  )
}