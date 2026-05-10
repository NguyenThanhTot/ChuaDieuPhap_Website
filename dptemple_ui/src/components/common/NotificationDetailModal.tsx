interface NotificationItem {
  id: number
  title: string
  content?: string
  type: 'general' | 'event' | 'course' | 'urgent'
  targetAudience: 'all' | 'phat_tu' | 'tu_sinh' | 'ban_to_chuc'
  status: 'published' | 'draft' | 'expired'
  publishDate: string
  expiryDate?: string
  createdAt: string
  views: number
  attachments: number
}

interface NotificationDetailModalProps {
  isOpen: boolean
  onClose: () => void
  notification: NotificationItem | null
  onEdit?: (notification: NotificationItem) => void
  onDelete?: (id: number) => void
  onStatusChange?: (id: number, newStatus: NotificationItem['status']) => void
}

export default function NotificationDetailModal({
  isOpen,
  onClose,
  notification,
  onEdit,
  onDelete,
  onStatusChange
}: NotificationDetailModalProps) {
  if (!isOpen || !notification) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'general': return 'bg-blue-100 text-blue-800'
      case 'event': return 'bg-green-100 text-green-800'
      case 'course': return 'bg-purple-100 text-purple-800'
      case 'urgent': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeText = (type: string) => {
    switch (type) {
      case 'general': return 'Thông báo chung'
      case 'event': return 'Thông báo sự kiện'
      case 'course': return 'Thông báo khóa tu'
      case 'urgent': return 'Thông báo khẩn'
      default: return type
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800'
      case 'draft': return 'bg-yellow-100 text-yellow-800'
      case 'expired': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published': return 'Đã đăng'
      case 'draft': return 'Bản nháp'
      case 'expired': return 'Hết hạn'
      default: return status
    }
  }

  const getTargetAudienceText = (audience: string) => {
    switch (audience) {
      case 'all': return 'Tất cả'
      case 'phat_tu': return 'Phật tử'
      case 'tu_sinh': return 'Tu sinh'
      case 'ban_to_chuc': return 'Ban tổ chức'
      default: return audience
    }
  }

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const handleStatusChange = (newStatus: NotificationItem['status']) => {
    if (onStatusChange) {
      onStatusChange(notification.id, newStatus)
    }
  }

  const handleEdit = () => {
    if (onEdit) {
      onEdit(notification)
    }
  }

  const handleDelete = () => {
    if (onDelete) {
      onDelete(notification.id)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Chi tiết thông báo</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Title and Status */}
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">{notification.title}</h4>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(notification.type)}`}>
                  {getTypeText(notification.type)}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(notification.status)}`}>
                  {getStatusText(notification.status)}
                </span>
                <span className="text-sm text-gray-500">
                  Đối tượng: {getTargetAudienceText(notification.targetAudience)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {/* Notification Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày đăng</label>
              <p className="text-gray-900">{notification.publishDate || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ngày hết hạn</label>
              <p className="text-gray-900">{notification.expiryDate || '-'}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lượt xem</label>
              <p className="text-gray-900">{formatViews(notification.views)}</p>
            </div>
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung</label>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap">
                {notification.content || 'Đây là nội dung mẫu cho thông báo. Trong thực tế, nội dung sẽ được lấy từ database.'}
              </p>
            </div>
          </div>

          {/* Attachments */}
          {notification.attachments > 0 && (
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Tệp đính kèm</label>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                <span>{notification.attachments} tệp đính kèm</span>
              </div>
            </div>
          )}

          {/* Metadata */}
          <div className="text-sm text-gray-500">
            <p>Ngày tạo: {formatDate(notification.createdAt)}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {notification.status === 'draft' && (
                <button
                  onClick={() => handleStatusChange('published')}
                  className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Đăng thông báo
                </button>
              )}
              {notification.status === 'published' && (
                <button
                  onClick={() => handleStatusChange('expired')}
                  className="px-4 py-2 text-gray-600 border border-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Hết hạn
                </button>
              )}
              <button
                onClick={handleEdit}
                className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Chỉnh sửa
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
              >
                Xóa
              </button>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Đóng
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
