import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import AdminNavbar from '@/components/layout/AdminNavbar'

export default function AdminDashboard() {
  useDocumentTitle('Admin Dashboard - Chùa Diệu Pháp')
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState('overview')

  const stats = [
    { label: 'Tổng sự kiện', value: '24', change: '+3', color: 'text-green-600' },
    { label: 'Tổng tin tức', value: '156', change: '+12', color: 'text-green-600' },
    { label: 'Pháp thoại', value: '89', change: '+5', color: 'text-green-600' },
    { label: 'Người dùng', value: '1,234', change: '+45', color: 'text-green-600' },
  ]

  const recentActivity = [
    { id: 1, action: 'Thêm sự kiện mới', item: 'Khoá tu mùa hè 2026', time: '2 giờ trước', type: 'event' },
    { id: 2, action: 'Cập nhật tin tức', item: 'Lễ Vu Lan báo hiếu', time: '5 giờ trước', type: 'news' },
    { id: 3, action: 'Thêm pháp thoại', item: 'Tuệ giác trong cuộc sống', time: '1 ngày trước', type: 'dharma' },
    { id: 4, action: 'Gửi thông báo', item: 'Khai mạc khoá tu', time: '2 ngày trước', type: 'notification' },
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white rounded-xl p-6 border border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">{stat.label}</p>
                      <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    </div>
                    <div className={`text-sm font-medium ${stat.color}`}>{stat.change}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="text-lg font-semibold mb-4">Hoạt động gần đây</h3>
              <div className="space-y-3">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-sm">
                        {activity.type === 'event' && '📅'}
                        {activity.type === 'news' && '📰'}
                        {activity.type === 'dharma' && '🎙️'}
                        {activity.type === 'notification' && '🔔'}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.item}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )

      case 'events':
        navigate('/admin/events')
        return null

      case 'news':
        navigate('/admin/news')
        return null

      case 'dharma-talks':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Quản lý Pháp thoại</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Thêm pháp thoại
              </button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">Chưa có pháp thoại nào</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Thêm pháp thoại đầu tiên
              </button>
            </div>
          </div>
        )

      case 'notifications':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Quản lý Thông báo</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Gửi thông báo
              </button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">Chưa có thông báo nào</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Gửi thông báo đầu tiên
              </button>
            </div>
          </div>
        )

      case 'users':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold">Quản lý Người dùng</h3>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Thêm người dùng
              </button>
            </div>
            <div className="text-center py-12 text-gray-500">
              <p className="mb-4">Chưa có người dùng nào</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Thêm người dùng đầu tiên
              </button>
            </div>
          </div>
        )

      case 'settings':
        return (
          <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-lg font-semibold mb-6">Cài đặt hệ thống</h3>
            <div className="space-y-6">
              <div>
                <h4 className="font-medium mb-3">Thông tin chùa</h4>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tên chùa</label>
                    <input
                      type="text"
                      defaultValue="Chùa Diệu Pháp"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Địa chỉ</label>
                    <input
                      type="text"
                      defaultValue="109/67C Hoàng Minh Luỹ, TP. Hồ Chí Minh"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Điện thoại</label>
                    <input
                      type="text"
                      defaultValue="0123456789"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Lưu cài đặt
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminNavbar currentPage="dashboard" onNavigate={setActiveTab} />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <div className="bg-white border-b border-gray-200">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  ← Quay lại trang chủ
                </button>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">Xin chào, Admin</span>
                <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
