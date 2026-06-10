import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import AdminHeader from '@/components/layout/AdminHeader'
import AdminNavbar from '@/components/layout/AdminNavbar'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import NotificationDetailModal from '@/components/common/NotificationDetailModal'
import { useToast } from '@/components/common/Toast'
import { useAuth } from '@/contexts/AuthContext'
import { notificationService } from '@/services/notificationService'
import type { Notification } from '@/types'

export default function AdminNotifications() {
  useDocumentTitle('Quản lý Thông báo - Admin')
  const navigate = useNavigate()
  const { user } = useAuth()
  const { success } = useToast()

  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: string | null }>({ isOpen: false, id: null })

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        setLoading(true)
        const response = await notificationService.findAllPublished({ page: 0, size: 20, sort: ['homepagePriority,desc'] })
        setNotifications(response.content)
      } catch (error) {
        console.error('Failed to load notifications:', error)
      } finally {
        setLoading(false)
      }
    }

    loadNotifications()
  }, [])

  const filteredNotifications = notifications.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || (item.isFeatured ? 'urgent' : 'general') === filterType
    const matchesStatus = filterStatus === 'all' || (item.isPublished ? 'published' : 'draft') === filterStatus
    return matchesSearch && matchesType && matchesStatus
  })

  const getTypeColor = (type?: Notification['type']) => {
    switch (type) {
      case 'event':
      case 'course':
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'general':
      default:
        return 'bg-blue-100 text-blue-800'
    }
  }

  const getTypeText = (type?: Notification['type']) => {
    switch (type) {
      case 'general':
        return 'Thông báo chung'
      case 'event':
        return 'Thông báo sự kiện'
      case 'course':
        return 'Thông báo khóa tu'
      case 'urgent':
        return 'Thông báo khẩn'
      default:
        return 'Thông báo'
    }
  }

  const getStatusColor = (status?: Notification['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'expired':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-yellow-100 text-yellow-800'
    }
  }

  const getStatusText = (status?: Notification['status']) => {
    switch (status) {
      case 'published':
        return 'Đã đăng'
      case 'expired':
        return 'Hết hạn'
      default:
        return 'Bản nháp'
    }
  }

  const getTargetAudienceText = (audience?: Notification['targetAudience']) => {
    switch (audience) {
      case 'all':
        return 'Tất cả'
      case 'phat_tu':
        return 'Phật tử'
      case 'tu_sinh':
        return 'Tu sinh'
      case 'ban_to_chuc':
        return 'Ban tổ chức'
      default:
        return 'Chưa xác định'
    }
  }

  const formatViews = (views = 0) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`
    }
    return views.toString()
  }

  const handleViewNotification = (notification: Notification) => {
    setSelectedNotification(notification)
    setIsDetailModalOpen(true)
  }

  const handleEditNotification = (notification: Notification) => {
    navigate(`/admin/notifications/edit/${notification.id}`)
  }

  const handleDeleteNotification = (id: string) => {
    setDeleteConfirm({ isOpen: true, id })
  }

  const confirmDelete = async () => {
    if (!deleteConfirm.id || !user) {
      setDeleteConfirm({ isOpen: false, id: null })
      return
    }

    try {
      await notificationService.delete(deleteConfirm.id, user.id)
      setNotifications((prev) => prev.filter((item) => item.id !== deleteConfirm.id))
      success('Đã xóa thông báo thành công')
    } catch (error) {
      console.error('Failed to delete notification:', error)
    } finally {
      setDeleteConfirm({ isOpen: false, id: null })
    }
  }

  const handleStatusChange = async (id: string, newStatus: Notification['status']) => {
    const notification = notifications.find((item) => item.id === id)
    if (!notification || !user) return

    try {
      const response = await notificationService.update(id, {
        ...notification,
        isPublished: newStatus === 'published',
        status: newStatus
      })
      setNotifications((prev) => prev.map((item) => (item.id === id ? response : item)))
      success(`Đã cập nhật trạng thái thành ${newStatus === 'published' ? 'Đã đăng' : newStatus === 'expired' ? 'Hết hạn' : 'Bản nháp'}`)
    } catch (error) {
      console.error('Failed to update notification status:', error)
    }
  }

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminNavbar currentPage="notifications" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Notifications Management Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Danh sách Thông báo</h1>
              <p className="text-gray-600 mt-1">Quản lý tất cả thông báo của chùa</p>
            </div>
            <button 
              onClick={() => navigate('/admin/notifications/create')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm thông báo
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200">
            {/* Search and Filter */}
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Tìm kiếm tiêu đề..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả loại</option>
                    <option value="general">Thông báo chung</option>
                    <option value="event">Thông báo sự kiện</option>
                    <option value="course">Thông báo khóa tu</option>
                    <option value="urgent">Thông báo khẩn</option>
                  </select>
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="published">Đã đăng</option>
                    <option value="draft">Bản nháp</option>
                    <option value="expired">Hết hạn</option>
                  </select>
                  <button className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            </div>

            {/* Notifications Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đối tượng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày đăng</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lượt xem</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Đính kèm</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredNotifications.map((notification, index) => (
                    <tr key={notification.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 max-w-xs truncate">{notification.title}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(notification.type)}`}>
                          {getTypeText(notification.type)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {getTargetAudienceText(notification.targetAudience)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {notification.publishDate || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatViews(notification.views)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {(notification.attachments ?? 0) > 0 ? (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                            </svg>
                            {notification.attachments}
                          </span>
                        ) : (
                          '-'
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(notification.status)}`}>
                          {getStatusText(notification.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button 
                            onClick={() => handleViewNotification(notification)}
                            className="text-blue-600 hover:text-blue-900" 
                            title="Xem chi tiết"
                          >
                            👁️
                          </button>
                          <button 
                            onClick={() => handleEditNotification(notification)}
                            className="text-green-600 hover:text-green-900" 
                            title="Chỉnh sửa"
                          >
                            ✏️
                          </button>
                          <button 
                            onClick={() => handleDeleteNotification(notification.id)}
                            className="text-red-600 hover:text-red-900" 
                            title="Xóa"
                          >
                            🗑️
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {filteredNotifications.length === 0 && (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy thông báo nào</h3>
                <p className="text-sm text-gray-500 mb-6">Bắt đầu bằng cách tạo thông báo đầu tiên của bạn</p>
                <button 
                  onClick={() => navigate('/admin/notifications/create')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm thông báo đầu tiên
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredNotifications.length > 0 && (
              <div className="px-6 py-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Hiển thị 1 đến {filteredNotifications.length} của {notifications.length} kết quả
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    ←
                  </button>
                  <button className="px-3 py-1 bg-green-600 text-white rounded">
                    1
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    3
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">
                    →
                  </button>
                  <select className="ml-4 px-3 py-1 border border-gray-300 rounded">
                    <option>10 / page</option>
                    <option>25 / page</option>
                    <option>50 / page</option>
                  </select>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Detail Modal */}
      <NotificationDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedNotification(null)
        }}
        notification={selectedNotification}
        onEdit={handleEditNotification}
        onDelete={handleDeleteNotification}
        onStatusChange={handleStatusChange}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa thông báo này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  )
}
