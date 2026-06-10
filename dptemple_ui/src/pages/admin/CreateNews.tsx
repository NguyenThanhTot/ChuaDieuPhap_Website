import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import AdminHeader from '@/components/layout/AdminHeader'
import AdminNavbar from '@/components/layout/AdminNavbar'
import { useToast } from '@/components/common/Toast'
import { newsService } from '@/services/newsService'

interface NewsFormData {
  isActive: boolean
  title: string
  newsType: string
  author: string
  tags: string
  imageUploadMethod: 'file' | 'url'
  imageUrl: string
  imageFile: File | null
  content: string
}

export default function CreateNews() {
  const { id } = useParams<{ id?: string }>()
  const isEditMode = Boolean(id)

  useDocumentTitle(isEditMode ? 'Chỉnh sửa tin tức - Admin' : 'Tạo tin tức - Admin')
  const navigate = useNavigate()
  const { success, error } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState<NewsFormData>({
    isActive: true,
    title: '',
    newsType: '',
    author: '',
    tags: '',
    imageUploadMethod: 'file',
    imageUrl: '',
    imageFile: null,
    content: ''
  })

  const [errors, setErrors] = useState<Partial<Omit<NewsFormData, 'imageFile'> & { imageFile: string }>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!id) return

    // Debug: log when edit page mounts and the id being requested
    // eslint-disable-next-line no-console
    console.log('[CreateNews] mount, id=', id)

    setIsLoading(true)
    newsService.findById(id)
      .then((news) => {
        setFormData({
          isActive: news.isPublished,
          title: news.title,
          newsType: '',
          author: news.author?.fullName ?? '',
          tags: '',
          imageUploadMethod: news.thumbnailUrl ? 'url' : 'file',
          imageUrl: news.thumbnailUrl || '',
          imageFile: null,
          content: news.content
        })
      })
      .catch((loadError) => {
        console.error('Failed to load news for edit:', loadError)
        error('Không thể tải dữ liệu tin tức. Vui lòng thử lại.')
        navigate('/admin/news')
      })
      .finally(() => setIsLoading(false))
  }, [id, navigate])

  const handleInputChange = (field: keyof NewsFormData, value: any) => {
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
    const newErrors: Partial<Omit<NewsFormData, 'imageFile'> & { imageFile: string }> = {}

    if (!formData.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề tin tức'
    if (!formData.newsType) newErrors.newsType = 'Vui lòng chọn loại tin tức'
    if (!formData.author.trim()) newErrors.author = 'Vui lòng nhập tác giả'
    if (!formData.content.trim()) newErrors.content = 'Vui lòng nhập nội dung tin tức'

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
      const thumbnailUrl = formData.imageUploadMethod === 'url' ? formData.imageUrl.trim() : ''
      if (isEditMode && id) {
        await newsService.update(id, {
          title: formData.title,
          content: formData.content,
          thumbnailUrl: thumbnailUrl || undefined,
          isPublished: formData.isActive,
          isFeatured: false
        })
        success('Tin tức đã được cập nhật thành công')
      } else {
        await newsService.create({
          title: formData.title,
          content: formData.content,
          thumbnailUrl: thumbnailUrl || undefined,
          isPublished: formData.isActive,
          isFeatured: false,
          publishedDate: new Date().toISOString()
        })
        success('Tin tức đã được tạo thành công')
      }

      navigate('/admin/news')
    } catch (submitError) {
      console.error('Failed to save news:', submitError)
      error(isEditMode ? 'Cập nhật tin tức thất bại. Vui lòng thử lại.' : 'Tạo tin tức thất bại. Vui lòng thử lại.')
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

  const newsTypes = [
    'Tin chung',
    'Tin hoạt động',
    'Tin sự kiện',
    'Tin khuyến mãi',
    'Tin khác'
  ]

  const tagOptions = [
    'Phật giáo',
    'Khóa tu',
    'Lễ hội',
    'Hoạt động từ thiện',
    'Sự kiện đặc biệt',
    'Thông báo'
  ]

  if (isEditMode && isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-700">Đang tải dữ liệu tin tức...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminNavbar currentPage="news" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Create News Form */}
        <div className="p-6">
          <div className="bg-white rounded-xl border border-gray-200">
            {/* Form Header */}
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">
                    {isEditMode ? 'Chỉnh sửa tin tức' : 'Tạo tin tức'}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {isEditMode ? 'Cập nhật thông tin tin tức' : 'Điền thông tin để tạo tin tức mới'}
                  </p>
                </div>
                <button
                  onClick={() => navigate('/admin/news')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Quay lại
                </button>
              </div>
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
                    placeholder="Nhập tiêu đề tin tức"
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Loại tin tức *</label>
                  <select
                    value={formData.newsType}
                    onChange={(e) => handleInputChange('newsType', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.newsType ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Chọn loại tin tức</option>
                    {newsTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.newsType && <p className="mt-1 text-sm text-red-600">{errors.newsType}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tác giả *</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => handleInputChange('author', e.target.value)}
                    className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.author ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Nhập tên tác giả"
                  />
                  {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                  <select
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Chọn tags</option>
                    {tagOptions.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Cách chọn hình ảnh</label>
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
                        className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                          errors.imageUrl ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.imageUrl && (
                        <p className="mt-1 text-sm text-red-600">{errors.imageUrl}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Content Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung *</label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  {/* Rich Text Editor Toolbar (Placeholder) */}
                  <div className="bg-gray-50 border-b border-gray-300 p-2 flex items-center gap-2">
                    <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                      Edit
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                      Insert
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                      Format
                    </button>
                    <button type="button" className="px-2 py-1 text-sm border border-gray-300 rounded hover:bg-gray-100">
                      Help
                    </button>
                    <div className="border-l border-gray-300 h-6 mx-2"></div>
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded">
                      <option>Paragraph</option>
                      <option>Heading 1</option>
                      <option>Heading 2</option>
                      <option>Heading 3</option>
                    </select>
                    <select className="px-2 py-1 text-sm border border-gray-300 rounded">
                      <option>Font Family</option>
                      <option>Arial</option>
                      <option>Times New Roman</option>
                      <option>Courier New</option>
                    </select>
                    <div className="border-l border-gray-300 h-6 mx-2"></div>
                    <button type="button" className="px-2 py-1 font-bold border border-gray-300 rounded hover:bg-gray-100">
                      B
                    </button>
                    <button type="button" className="px-2 py-1 italic border border-gray-300 rounded hover:bg-gray-100">
                      I
                    </button>
                    <button type="button" className="px-2 py-1 underline border border-gray-300 rounded hover:bg-gray-100">
                      U
                    </button>
                    <div className="border-l border-gray-300 h-6 mx-2"></div>
                    <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
                      Link
                    </button>
                    <button type="button" className="px-2 py-1 border border-gray-300 rounded hover:bg-gray-100">
                      Image
                    </button>
                  </div>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleInputChange('content', e.target.value)}
                    rows={12}
                    className={`w-full px-3 py-2 border-0 focus:outline-none focus:ring-0 resize-none ${
                      errors.content ? 'border-red-500' : ''
                    }`}
                    placeholder="Nhập nội dung chi tiết của tin tức..."
                  />
                </div>
                {errors.content && <p className="mt-1 text-sm text-red-600">{errors.content}</p>}
              </div>

              {/* Form Actions */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => navigate('/admin/news')}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (isEditMode ? 'Đang cập nhật...' : 'Đang tạo...') : (isEditMode ? 'Cập nhật tin tức' : 'Tạo tin tức')}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
