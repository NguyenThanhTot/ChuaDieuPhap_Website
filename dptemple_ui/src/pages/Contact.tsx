import { useState } from 'react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function Contact() {
  useDocumentTitle('Liên hệ - Chùa Diệu Pháp')

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission here
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#2d4a3e] mb-4">Liên Hệ</h1>
        <p className="text-[#5a7060]">
          Hãy liên hệ với chúng tôi để biết thêm thông tin về các hoạt động của chùa
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Contact Information */}
        <div>
          <h2 className="text-2xl font-semibold text-[#2d4a3e] mb-6">Thông Tin Liên Hệ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-[#2d4a3e] mb-2">Địa chỉ</h3>
              <p className="text-[#5a7060]">109/67C Hoàng Minh Luỹ, TP. Hồ Chí Minh</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d4a3e] mb-2">Điện thoại</h3>
              <p className="text-[#5a7060]">0123456789</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d4a3e] mb-2">Email</h3>
              <p className="text-[#5a7060]">chuadieuphap@gmail.com</p>
            </div>
            <div>
              <h3 className="font-semibold text-[#2d4a3e] mb-2">Giờ mở cửa</h3>
              <p className="text-[#5a7060]">06:00 – 17:00</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-2xl font-semibold text-[#2d4a3e] mb-6">Gửi Tin Nhắn</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#2d4a3e] mb-1">
                Họ và tên
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d4a3e]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2d4a3e] mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d4a3e]"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-[#2d4a3e] mb-1">
                Điện thoại
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d4a3e]"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-[#2d4a3e] mb-1">
                Tin nhắn
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2d4a3e]"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#2d4a3e] text-white py-2 px-4 rounded-md hover:bg-[#1a2e25] transition-colors"
            >
              Gửi Tin Nhắn
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
