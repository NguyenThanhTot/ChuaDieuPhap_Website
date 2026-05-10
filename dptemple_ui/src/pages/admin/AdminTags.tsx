import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import AdminHeader from '@/components/layout/AdminHeader'
import AdminNavbar from '@/components/layout/AdminNavbar'

interface TagItem {
  id: number
  name: string
  slug: string
  description: string
  color: string
  postCount: number
  status: 'active' | 'inactive'
  createdAt: string
  updatedAt: string
}

export default function AdminTags() {
  useDocumentTitle('Quản lý Tags - Admin')
  const navigate = useNavigate()

  const [tags] = useState<TagItem[]>([
    {
      id: 1,
      name: 'Phật giáo',
      slug: 'phat-giao',
      description: 'Các bài viết về Phật giáo',
      color: '#3B82F6',
      postCount: 45,
      status: 'active',
      createdAt: '2026-05-01',
      updatedAt: '2026-05-08'
    },
    {
      id: 2,
      name: 'Khóa tu',
      slug: 'khoa-tu',
      description: 'Thông tin về các khóa tu',
      color: '#10B981',
      postCount: 23,
      status: 'active',
      createdAt: '2026-05-01',
      updatedAt: '2026-05-07'
    },
    {
      id: 3,
      name: 'Lễ Phật Đản',
      slug: 'le-phat-dan',
      description: 'Các bài viết về lễ Phật Đản',
      color: '#F59E0B',
      postCount: 12,
      status: 'active',
      createdAt: '2026-05-02',
      updatedAt: '2026-05-06'
    },
    {
      id: 4,
      name: 'Từ thiện',
      slug: 'tu-thien',
      description: 'Hoạt động từ thiện, công đức',
      color: '#EF4444',
      postCount: 18,
      status: 'active',
      createdAt: '2026-05-02',
      updatedAt: '2026-05-09'
    },
    {
      id: 5,
      name: 'Pháp thoại',
      slug: 'phat-thoai',
      description: 'Các bài pháp thoại của chùa',
      color: '#8B5CF6',
      postCount: 34,
      status: 'active',
      createdAt: '2026-05-03',
      updatedAt: '2026-05-05'
    },
    {
      id: 6,
      name: 'Thiền',
      slug: 'thien',
      description: 'Các bài viết về thiền định',
      color: '#06B6D4',
      postCount: 8,
      status: 'inactive',
      createdAt: '2026-05-03',
      updatedAt: '2026-05-04'
    },
    {
      id: 7,
      name: 'Kinh Phật',
      slug: 'kinh-phat',
      description: 'Các bài kinh Phật',
      color: '#84CC16',
      postCount: 27,
      status: 'active',
      createdAt: '2026-05-04',
      updatedAt: '2026-05-08'
    },
    {
      id: 8,
      name: 'Chùa Diệu Pháp',
      slug: 'chua-dieu-phap',
      description: 'Thông tin về Chùa Diệu Pháp',
      color: '#F97316',
      postCount: 15,
      status: 'active',
      createdAt: '2026-05-04',
      updatedAt: '2026-05-06'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  const filteredTags = tags.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.slug.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800'
      case 'inactive': return 'bg-gray-100 text-gray-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Hoạt động'
      case 'inactive': return 'Không hoạt động'
      default: return status
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const handleEditClick = (tag: TagItem) => {
    console.log('Edit tag:', tag)
    // Navigate to edit page or open modal
  }

  const handleStatusToggle = (id: number, currentStatus: TagItem['status']) => {
    const newStatus = currentStatus === 'active' ? 'inactive' : 'active'
    console.log('Toggle status:', id, newStatus)
    // Update status via API
  }

  const handleDeleteClick = (id: number) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tag này?')) {
      console.log('Delete tag:', id)
      // Delete via API
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminNavbar currentPage="tags" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Tags Management Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Quản lý Tags</h1>
              <p className="text-gray-600 mt-1">Quản lý tất cả các tags của hệ thống</p>
            </div>
            <button 
              onClick={() => navigate('/admin/tags/create')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm tag
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
                    placeholder="Tìm kiếm tên, mô tả, slug..."
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
                    <option value="active">Hoạt động</option>
                    <option value="inactive">Không hoạt động</option>
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

            {/* Tags Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tên tag</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Màu sắc</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mô tả</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Số bài viết</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ngày tạo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredTags.map((tag, index) => (
                    <tr key={tag.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: tag.color }}
                          ></div>
                          <div className="text-sm font-medium text-gray-900">{tag.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-600 font-mono">{tag.slug}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div 
                            className="w-6 h-6 rounded border border-gray-300" 
                            style={{ backgroundColor: tag.color }}
                          ></div>
                          <span className="text-sm text-gray-600">{tag.color}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 max-w-xs truncate" title={tag.description}>
                          {tag.description}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{tag.postCount}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{formatDate(tag.createdAt)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(tag.status)}`}>
                          {getStatusText(tag.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditClick(tag)}
                            className="text-blue-600 hover:text-blue-900"
                            title="Chỉnh sửa"
                          >
                            ✏️
                          </button>
                          <button
                            onClick={() => handleStatusToggle(tag.id, tag.status)}
                            className={tag.status === 'active' ? "text-yellow-600 hover:text-yellow-900" : "text-green-600 hover:text-green-900"}
                            title={tag.status === 'active' ? "Tắt hoạt động" : "Bật hoạt động"}
                          >
                            {tag.status === 'active' ? "🔒" : "🔓"}
                          </button>
                          <button
                            onClick={() => handleDeleteClick(tag.id)}
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
            {filteredTags.length === 0 && (
              <div className="text-center py-16">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Không tìm thấy tag nào</h3>
                <p className="text-sm text-gray-500 mb-6">Bắt đầu bằng cách tạo tag đầu tiên của bạn</p>
                <button 
                  onClick={() => navigate('/admin/tags/create')}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Thêm tag đầu tiên
                </button>
              </div>
            )}

            {/* Pagination */}
            {filteredTags.length > 0 && (
              <div className="px-6 py-4 border-t flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Hiển thị 1 đến {filteredTags.length} của {tags.length} kết quả
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
    </div>
  )
}
