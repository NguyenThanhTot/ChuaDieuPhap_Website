import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import AdminHeader from '@/components/layout/AdminHeader'
import AdminNavbar from '@/components/layout/AdminNavbar'

interface VideoFormData {
  isActive: boolean
  title: string
  youtubeUrl: string
}

export default function CreateVideo() {
  useDocumentTitle('Thêm video - Admin')
  const navigate = useNavigate()

  const [formData, setFormData] = useState<VideoFormData>({
    isActive: true,
    title: '',
    youtubeUrl: ''
  })

  const [errors, setErrors] = useState<Partial<VideoFormData>>({})

  const handleInputChange = (field: keyof VideoFormData, value: any) => {
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
    const newErrors: Partial<VideoFormData> = {}

    if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề video'
    if (!formData.youtubeUrl.trim()) newErrors.youtubeUrl = 'Vui lòng nhập URL YouTube'
    
    // Basic YouTube URL validation
    if (formData.youtubeUrl.trim()) {
      const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/
      if (!youtubeRegex.test(formData.youtubeUrl.trim())) {
        newErrors.youtubeUrl = 'Vui lòng nhập URL YouTube hợp lệ'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (validateForm()) {
      // Here you would normally send the data to your API
      console.log('Creating video:', formData)
      
      // Show success message (you could use a toast library here)
      alert('Thêm video thành công!')
      
      // Navigate back to videos list
      navigate('/admin/videos')
    }
  }

  const handleClose = () => {
    navigate('/admin/videos')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminNavbar currentPage="videos" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Create Video Modal */}
        <div className="p-6">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h1 className="text-xl font-bold text-gray-800">Thêm video</h1>
                <button
                  onClick={handleClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                {/* Toggle Switch */}
                <div className="flex items-center gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isActive}
                      onChange={(e) => handleInputChange('isActive', e.target.checked)}
                      className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <span className="text-gray-700">Hoạt động</span>
                  </label>
                </div>

                {/* Title Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tiêu đề</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập tiêu đề video"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                {/* YouTube URL Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">URL YouTube</label>
                  <input
                    type="url"
                    value={formData.youtubeUrl}
                    onChange={(e) => handleInputChange('youtubeUrl', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.youtubeUrl ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Ví dụ: https://www.youtube.com/watch?v=VIDEO_ID"
                  />
                  {errors.youtubeUrl && <p className="mt-1 text-sm text-red-600">{errors.youtubeUrl}</p>}
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Hủy
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Lưu
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
