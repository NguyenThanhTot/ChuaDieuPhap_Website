import { useState } from 'react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import AdminHeader from '@/components/layout/AdminHeader'
import AdminNavbar from '@/components/layout/AdminNavbar'
import ConfirmDialog from '@/components/common/ConfirmDialog'
import ContactDetailModal from '@/components/common/ContactDetailModal'
import { useToast } from '@/components/common/Toast'

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

export default function AdminContact() {
  useDocumentTitle('Quản lý Liên hệ - Admin')
  const { success } = useToast()

  const [contacts] = useState<ContactItem[]>([
    {
      id: 1,
      fullName: 'Nguyễn Văn A',
      email: 'nguyenvana@email.com',
      phone: '0901234567',
      message: 'Tôi muốn tìm hiểu về khóa tu mùa hè sắp tới. Xin cho tôi biết thông tin chi tiết.',
      status: 'new',
      createdAt: '2026-05-09 09:30'
    },
    {
      id: 2,
      fullName: 'Trần Thị B',
      email: 'tranthib@email.com',
      phone: '0912345678',
      message: 'Chùa có tổ chức lễ Vu Lan báo hiếu không ạ? Tôi muốn đăng ký tham gia.',
      status: 'read',
      createdAt: '2026-05-08 14:20'
    },
    {
      id: 3,
      fullName: 'Lê Văn C',
      email: 'levanc@email.com',
      phone: '0923456789',
      message: 'Tôi muốn quy y tam bảo, thủ tục cần những gì ạ?',
      status: 'replied',
      createdAt: '2026-05-07 10:15',
      repliedAt: '2026-05-07 16:45'
    },
    {
      id: 4,
      fullName: 'Phạm Thị D',
      email: 'phamthid@email.com',
      phone: '0934567890',
      message: 'Xin chào, tôi muốn hỏi về các hoạt động từ thiện của chùa.',
      status: 'archived',
      createdAt: '2026-05-06 11:25'
    },
    {
      id: 5,
      fullName: 'Hoàng Văn E',
      email: 'hoangvane@email.com',
      phone: '0945678901',
      message: 'Tôi là phật tử mới, muốn tìm hiểu thêm về Phật giáo. Chùa có lớp học nào không?',
      status: 'new',
      createdAt: '2026-05-05 16:40'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; id: number | null }>({ isOpen: false, id: null })

  const filteredContacts = contacts.filter(item => {
    const matchesSearch = item.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.message.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

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

  const handleMessageClick = (contact: ContactItem) => {
    setSelectedContact(contact)
    setIsDetailModalOpen(true)
  }

  const handleStatusChange = (id: number, newStatus: ContactItem['status']) => {
    // Here you would update the status via API
    console.log('Update status:', id, newStatus)
    success(`Đã cập nhật trạng thái thành ${newStatus === 'new' ? 'Mới' : newStatus === 'read' ? 'Đã đọc' : newStatus === 'replied' ? 'Đã trả lời' : 'Lưu trữ'}`)
  }

  const handleDelete = (id: number) => {
    setDeleteConfirm({ isOpen: true, id })
  }

  const confirmDelete = () => {
    if (deleteConfirm.id) {
      // Here you would delete via API
      console.log('Delete contact:', deleteConfirm.id)
      success('Đã xóa tin nhắn liên hệ thành công')
      setDeleteConfirm({ isOpen: false, id: null })
    }
  }

  const handleReply = (contact: ContactItem) => {
    // Here you would open reply form or navigate
    console.log('Reply to contact:', contact)
    success('Đã mở form trả lời')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminNavbar currentPage="contact" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Contact Management Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quản lý Liên hệ</h1>
              <p className="text-gray-600 mt-1">Quản lý tất cả tin nhắn liên hệ từ Phật tử</p>
            </div>
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
                    placeholder="Tìm kiếm tên, email, nội dung..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">Tất cả trạng thái</option>
                    <option value="new">Mới</option>
                    <option value="read">Đã đọc</option>
                    <option value="replied">Đã trả lời</option>
                    <option value="archived">Lưu trữ</option>
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

            {/* Contacts Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Họ và tên</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Điện thoại</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tin nhắn</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày gửi</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredContacts.map((contact, index) => (
                    <tr key={contact.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{contact.fullName}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{contact.phone}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={contact.message}>
                          {contact.message}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(contact.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(contact.status)}`}>
                          {getStatusText(contact.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleMessageClick(contact)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Xem chi tiết"
                          >
                            👁️
                          </button>
                          {contact.status !== 'replied' && (
                            <button
                              onClick={() => handleStatusChange(contact.id, 'replied')}
                              className="text-green-600 hover:text-green-900"
                              title="Đánh dấu đã trả lời"
                            >
                              ✉️
                            </button>
                          )}
                          {contact.status !== 'archived' && (
                            <button
                              onClick={() => handleStatusChange(contact.id, 'archived')}
                              className="text-gray-600 hover:text-gray-900"
                              title="Lưu trữ"
                            >
                              📁
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(contact.id)}
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
            {filteredContacts.length === 0 && (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy tin nhắn nào</h3>
                <p className="text-sm text-gray-500">Chưa có tin nhắn liên hệ nào từ Phật tử</p>
              </div>
            )}

            {/* Pagination */}
            {filteredContacts.length > 0 && (
              <div className="px-6 py-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Hiển thị 1 đến {filteredContacts.length} của {contacts.length} kết quả
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

      {/* Contact Detail Modal */}
      <ContactDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedContact(null)
        }}
        contact={selectedContact}
        onStatusChange={handleStatusChange}
        onReply={handleReply}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, id: null })}
        onConfirm={confirmDelete}
        title="Xác nhận xóa"
        message="Bạn có chắc chắn muốn xóa tin nhắn liên hệ này? Hành động này không thể hoàn tác."
        confirmText="Xóa"
        cancelText="Hủy"
        type="danger"
      />
    </div>
  )
}
