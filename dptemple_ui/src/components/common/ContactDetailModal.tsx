interface ContactItem {
  id: number
  fullName: string
  email: string
  phone: string
  message: string
  status: 'new' | 'read' | 'replied' | 'archived'
  createdAt: string
  repliedAt?: string
}

interface ContactDetailModalProps {
  isOpen: boolean
  onClose: () => void
  contact: ContactItem | null
  onStatusChange?: (id: number, newStatus: ContactItem['status']) => void
  onReply?: (contact: ContactItem) => void
}

export default function ContactDetailModal({
  isOpen,
  onClose,
  contact,
  onStatusChange,
  onReply
}: ContactDetailModalProps) {
  if (!isOpen || !contact) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-red-100 text-red-800'
      case 'read': return 'bg-blue-100 text-blue-800'
      case 'replied': return 'bg-green-100 text-green-800'
      case 'archived': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'new': return 'Mới'
      case 'read': return 'Đã đọc'
      case 'replied': return 'Đã trả lời'
      case 'archived': return 'Lưu trữ'
      default: return status
    }
  }

  const handleStatusChange = (newStatus: ContactItem['status']) => {
    if (onStatusChange) {
      onStatusChange(contact.id, newStatus)
    }
  }

  const handleReply = () => {
    if (onReply) {
      onReply(contact)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold text-gray-900">Chi tiết tin nhắn</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Status */}
          <div className="flex items-center gap-2">
            <span className={`px-3 py-1 text-sm rounded-full ${getStatusColor(contact.status)}`}>
              {getStatusText(contact.status)}
            </span>
            <span className="text-sm text-gray-500">
              Ngày gửi: {formatDate(contact.createdAt)}
            </span>
            {contact.repliedAt && (
              <span className="text-sm text-gray-500">
                Trả lời: {formatDate(contact.repliedAt)}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
              <p className="text-gray-900 font-medium">{contact.fullName}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <p className="text-gray-900">
                <a href={`mailto:${contact.email}`} className="text-blue-600 hover:text-blue-800">
                  {contact.email}
                </a>
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label>
              <p className="text-gray-900">
                <a href={`tel:${contact.phone}`} className="text-blue-600 hover:text-blue-800">
                  {contact.phone}
                </a>
              </p>
            </div>
          </div>

          {/* Message */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Nội dung tin nhắn</label>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-900 whitespace-pre-wrap">{contact.message}</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {contact.status !== 'read' && (
                <button
                  onClick={() => handleStatusChange('read')}
                  className="px-4 py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Đánh dấu đã đọc
                </button>
              )}
              {contact.status !== 'replied' && (
                <button
                  onClick={handleReply}
                  className="px-4 py-2 text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition-colors"
                >
                  Trả lời
                </button>
              )}
              {contact.status !== 'archived' && (
                <button
                  onClick={() => handleStatusChange('archived')}
                  className="px-4 py-2 text-gray-600 border border-gray-600 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Lưu trữ
                </button>
              )}
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
