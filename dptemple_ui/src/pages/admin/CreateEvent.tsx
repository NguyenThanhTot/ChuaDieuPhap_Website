import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import AdminHeader from '@/components/layout/AdminHeader'
import AdminNavbar from '@/components/layout/AdminNavbar'
import { useToast } from '@/components/common/Toast'
import { eventService } from '@/services/eventService'

interface EventFormData {
  title: string
  eventType: string
  eventCode: string
  location: string
  capacity: string
  registrationFee: string
  registrationStartDate: string
  registrationEndDate: string
  eventStartDate: string
  eventEndDate: string
  startTime: string
  endTime: string
  isActive: boolean
  isPinned: boolean
  requiresEmailVerification: boolean
  imageUploadMethod: 'file' | 'url'
  imageUrl: string
  imageFile: File | null
  description: string
  speaker: string
}

export default function CreateEvent() {
  useDocumentTitle('Tạo Sự kiện - Admin')
  const navigate = useNavigate()
  const { success, error } = useToast()

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    eventType: '',
    eventCode: '',
    location: '',
    capacity: '',
    registrationFee: '',
    registrationStartDate: '',
    registrationEndDate: '',
    eventStartDate: '',
    eventEndDate: '',
    startTime: '08:00',
    endTime: '17:00',
    isActive: true,
    isPinned: false,
    requiresEmailVerification: false,
    imageUploadMethod: 'file',
    imageUrl: '',
    imageFile: null,
    description: '',
    speaker: ''
  })

  const [errors, setErrors] = useState<Partial<Omit<EventFormData, 'imageFile'> & { imageFile: string }>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (field: keyof EventFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Omit<EventFormData, 'imageFile'> & { imageFile: string }> = {}

    if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề sự kiện'
    if (!formData.eventType) newErrors.eventType = 'Vui lòng chọn loại sự kiện'
    if (!formData.eventCode.trim()) newErrors.eventCode = 'Vui lòng nhập mã sự kiện'
    if (!formData.location.trim()) newErrors.location = 'Vui lòng nhập địa điểm'
    if (!formData.capacity) newErrors.capacity = 'Vui lòng nhập sức chứa'
    if (!formData.registrationStartDate) newErrors.registrationStartDate = 'Vui lòng chọn ngày bắt đầu đăng ký'
    if (!formData.registrationEndDate) newErrors.registrationEndDate = 'Vui lòng chọn ngày kết thúc đăng ký'
    if (!formData.eventStartDate) newErrors.eventStartDate = 'Vui lòng chọn ngày bắt đầu sự kiện'
    if (!formData.eventEndDate) newErrors.eventEndDate = 'Vui lòng chọn ngày kết thúc sự kiện'
    if (!formData.speaker.trim()) newErrors.speaker = 'Vui lòng nhập tên diễn giả'
    if (!formData.description.trim()) newErrors.description = 'Vui lòng nhập mô tả sự kiện'

    // Date validation
    if (formData.registrationStartDate && formData.registrationEndDate) {
      if (new Date(formData.registrationStartDate) >= new Date(formData.registrationEndDate)) {
        newErrors.registrationEndDate = 'Ngày kết thúc phải sau ngày bắt đầu'
      }
    }

    if (formData.eventStartDate && formData.eventEndDate) {
      if (new Date(formData.eventStartDate) >= new Date(formData.eventEndDate)) {
        newErrors.eventEndDate = 'Ngày kết thúc phải sau ngày bắt đầu'
      }
    }

    // Image validation
    if (formData.imageUploadMethod === 'url' && !formData.imageUrl.trim()) {
      newErrors.imageUrl = 'Vui lòng nhập URL hình ảnh'
    }
    if (formData.imageUploadMethod === 'file' && !formData.imageFile) {
      newErrors.imageFile = 'Vui lòng chọn hình ảnh'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      const imageUrl = formData.imageUploadMethod === 'url' ? formData.imageUrl.trim() : ''
      await eventService.create({
        title: formData.title,
        imageUrl: imageUrl || undefined,
        startDate: formData.eventStartDate,
        endDate: formData.eventEndDate,
        eventTime: `${formData.startTime} - ${formData.endTime}`,
        location: formData.location,
        description: formData.description,
        isFeatured: formData.isPinned,
        isPublished: formData.isActive
      })

      success('Sự kiện đã được tạo thành công')
      navigate('/admin/events')
    } catch (submitError) {
      console.error('Failed to create event:', submitError)
      error('Tạo sự kiện thất bại. Vui lòng thử lại.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        imageFile: file
      }))
    }
  }

  const eventTypes = [
    'Khóa tu',
    'Lễ Phật',
    'Hoa đăng',
    'Thuyết giảng',
    'Hoạt động từ thiện',
    'Khác'
  ]

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return `${hour}:00`
  })

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminNavbar currentPage="events" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Create Event Form */}
        <div className="p-6">
          <div className="bg-white rounded-xl border border-gray-200">
            {/* Form Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Tạo Sự kiện Mới</h1>
                  <p className="text-gray-600 mt-1">Điền thông tin để tạo sự kiện mới</p>
                </div>
                <button
                  onClick={() => navigate('/admin/events')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Quay lại
                </button>
              </div>
            </div>

            {/* Form Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Toggle Switches */}
              <div className="flex flex-wrap gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isActive}
                    onChange={(e) => handleInputChange('isActive', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Hoạt động</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.isPinned}
                    onChange={(e) => handleInputChange('isPinned', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Ghim trang chủ</span>
                </label>
                
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.requiresEmailVerification}
                    onChange={(e) => handleInputChange('requiresEmailVerification', e.target.checked)}
                    className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-gray-700">Cần xác thực email để tham dự</span>
                </label>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Hình ảnh sự kiện</label>
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="imageMethod"
                        value="file"
                        checked={formData.imageUploadMethod === 'file'}
                        onChange={() => handleInputChange('imageUploadMethod', 'file')}
                        className="text-blue-600"
                      />
                      <span>Upload file</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="imageMethod"
                        value="url"
                        checked={formData.imageUploadMethod === 'url'}
                        onChange={() => handleInputChange('imageUploadMethod', 'url')}
                        className="text-blue-600"
                      />
                      <span>Nhập URL</span>
                    </label>
                  </div>

                  {formData.imageUploadMethod === 'file' ? (
                    <div>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageFileChange}
                        className="hidden"
                        id="imageFile"
                      />
                      <label
                        htmlFor="imageFile"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                        </svg>
                        Chọn hình ảnh
                      </label>
                      {formData.imageFile && (
                        <span className="ml-3 text-sm text-gray-600">{formData.imageFile.name}</span>
                      )}
                      {errors.imageFile && (
                        <p className="mt-1 text-sm text-red-600">{errors.imageFile}</p>
                      )}
                    </div>
                  ) : (
                    <div>
                      <input
                        type="url"
                        placeholder="https://example.com/image.jpg"
                        value={formData.imageUrl}
                        onChange={(e) => handleInputChange('imageUrl', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      {errors.imageUrl && (
                        <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập tiêu đề sự kiện"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại sự kiện *</label>
                  <select
                    value={formData.eventType}
                    onChange={(e) => handleInputChange('eventType', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.eventType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Chọn loại sự kiện</option>
                    {eventTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.eventType && <p className="mt-1 text-sm text-red-600">{errors.eventType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mã sự kiện *</label>
                  <input
                    type="text"
                    value={formData.eventCode}
                    onChange={(e) => handleInputChange('eventCode', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.eventCode ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="VD: SUKIEN2026"
                  />
                  {errors.eventCode && <p className="mt-1 text-sm text-red-600">{errors.eventCode}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Địa điểm *</label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.location ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="VD: Chùa Diệu Pháp"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sức chứa *</label>
                  <input
                    type="number"
                    value={formData.capacity}
                    onChange={(e) => handleInputChange('capacity', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.capacity ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="VD: 100"
                    min="1"
                  />
                  {errors.capacity && <p className="mt-1 text-sm text-red-600">{errors.capacity}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phí đăng ký</label>
                  <input
                    type="text"
                    value={formData.registrationFee}
                    onChange={(e) => handleInputChange('registrationFee', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="VD: 500000 hoặc Miễn phí"
                  />
                </div>
              </div>

              {/* Speaker Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Diễn giả *</label>
                <input
                  type="text"
                  value={formData.speaker}
                  onChange={(e) => handleInputChange('speaker', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.speaker ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nhập tên diễn giả"
                />
                {errors.speaker && <p className="mt-1 text-sm text-red-600">{errors.speaker}</p>}
              </div>

              {/* Description Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mô tả *</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  rows={6}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.description ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Nhập mô tả chi tiết về sự kiện..."
                />
                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
              </div>

              {/* Date Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu đăng ký *</label>
                  <input
                    type="date"
                    value={formData.registrationStartDate}
                    onChange={(e) => handleInputChange('registrationStartDate', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.registrationStartDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.registrationStartDate && <p className="mt-1 text-sm text-red-600">{errors.registrationStartDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc đăng ký *</label>
                  <input
                    type="date"
                    value={formData.registrationEndDate}
                    onChange={(e) => handleInputChange('registrationEndDate', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.registrationEndDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.registrationEndDate && <p className="mt-1 text-sm text-red-600">{errors.registrationEndDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày bắt đầu *</label>
                  <input
                    type="date"
                    value={formData.eventStartDate}
                    onChange={(e) => handleInputChange('eventStartDate', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.eventStartDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.eventStartDate && <p className="mt-1 text-sm text-red-600">{errors.eventStartDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ngày kết thúc *</label>
                  <input
                    type="date"
                    value={formData.eventEndDate}
                    onChange={(e) => handleInputChange('eventEndDate', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.eventEndDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.eventEndDate && <p className="mt-1 text-sm text-red-600">{errors.eventEndDate}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian bắt đầu</label>
                  <select
                    value={formData.startTime}
                    onChange={(e) => handleInputChange('startTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thời gian kết thúc</label>
                  <select
                    value={formData.endTime}
                    onChange={(e) => handleInputChange('endTime', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {timeOptions.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/admin/events')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Đang tạo...' : 'Tạo sự kiện'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
