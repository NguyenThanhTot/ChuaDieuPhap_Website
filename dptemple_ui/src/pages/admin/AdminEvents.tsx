import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useAuth } from '@/contexts/AuthContext'
import { eventService } from '@/services/eventService'
import AdminNavbar from '@/components/layout/AdminNavbar'
import AdminHeader from '@/components/layout/AdminHeader'
import type { Event } from '@/types'

export default function AdminEvents() {
  useDocumentTitle('Quản lý sự kiện - Admin')
  const navigate = useNavigate()
  const { user } = useAuth()

  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [totalItems, setTotalItems] = useState(0)

  const searchInputRef = useRef<HTMLInputElement | null>(null)

  const loadEvents = async (pageIndex = page, size = pageSize) => {
    try {
      setLoading(true)
      const response = await eventService.findAllPublished({ page: pageIndex, size, sort: ['startDate,asc'] })
      setEvents(response.content)
      setTotalItems(response.totalElements || 0)
      setTotalPages(response.totalPages || 1)
    } catch (error) {
      console.error('Failed to load events:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadEvents(page, pageSize)
  }, [page, pageSize])

  const handleDeleteEvent = async (id: string) => {
    if (!user) return
    try {
      await eventService.delete(id, user.id)
      setEvents((prev) => prev.filter((item) => item.id !== id))
      setTotalItems((prev) => Math.max(0, prev - 1))
    } catch (error) {
      console.error('Failed to delete event:', error)
    }
  }

  const handleFilterFocus = () => {
    searchInputRef.current?.focus()
  }

  const handleClearFilters = () => {
    setSearchTerm('')
  }

  const handlePageSizeChange = (value: number) => {
    setPageSize(value)
    setPage(0)
  }

  const filteredEvents = events.filter((event) => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (event.location ?? '').toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const getStatusColor = (isPublished: boolean) =>
    isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'

  const getStatusText = (isPublished: boolean) =>
    isPublished ? 'Hoạt động' : 'Bản nháp'

  const getEventType = (event: Event) =>
    event.isFeatured ? 'Nổi bật' : 'Sự kiện'

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <AdminNavbar currentPage="events" />

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <AdminHeader />

        {/* Events Management Content */}
        <div className="p-6">
          {/* Page Header */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Danh sách Sự kiện</h1>
              <p className="text-gray-600 mt-1">Quản lý tất cả sự kiện của chùa</p>
            </div>
            <button 
              onClick={() => navigate('/admin/events/create')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Thêm sự kiện
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl border border-gray-200 mb-6">
            <div className="p-6 border-b border-gray-100 bg-gray-50">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Tìm kiếm tiêu đề, địa điểm..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={handleFilterFocus} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                    Bộ lọc
                  </button>
                  <button onClick={handleClearFilters} className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            </div>

            {/* Events Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">STT</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hình ảnh</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tiêu đề sự kiện</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian sự kiện</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian đăng ký</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trạng thái</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Chức năng</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredEvents.map((event, index) => (
                    <tr key={event.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <img
                          src={event.imageUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&q=80'}
                          alt={event.title}
                          className="w-12 h-12 rounded object-cover"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{event.title}</div>
                          <div className="text-gray-500">{event.location || 'Chưa có địa điểm'}</div>
                          <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">{getEventType(event)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          <div>Bắt đầu: {event.startDate}</div>
                          <div>Kết thúc: {event.endDate}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        <div className="space-y-1">
                          <div>Giờ: {event.eventTime || 'Chưa có giờ'}</div>
                          <div>Ưu tiên: {event.homepagePriority ?? 0}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(event.isPublished)}`}>{getStatusText(event.isPublished)}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-3">
                          <button onClick={() => navigate(`/events/${event.id}`)} className="text-blue-600 hover:text-blue-800">👁️</button>
                          <button onClick={() => navigate(`/admin/events/edit/${event.id}`)} className="text-green-600 hover:text-green-800">✏️</button>
                          <button onClick={() => handleDeleteEvent(event.id)} className="text-red-600 hover:text-red-800">🗑️</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="px-6 py-4 border-t flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="text-sm text-gray-700">
                Hiển thị {filteredEvents.length} trong {totalItems} kết quả
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  ←
                </button>
                <span className="px-3 py-1 border border-gray-300 rounded bg-white text-gray-700">{page + 1}</span>
                <button
                  onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                  disabled={page >= totalPages - 1}
                  className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  →
                </button>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="ml-4 px-3 py-1 border border-gray-300 rounded"
                >
                  <option value={10}>10 / page</option>
                  <option value={20}>20 / page</option>
                  <option value={50}>50 / page</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
