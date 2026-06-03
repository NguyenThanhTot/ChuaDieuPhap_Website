import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { eventService } from '@/services/eventService'
import type { Event, Pageable } from '@/types'

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  } catch {
    return dateString
  }
}

export default function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  
  useDocumentTitle('Sự kiện - Chùa Diệu Pháp')

  useEffect(() => {
    fetchEvents()
  }, [page])

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const pageable: Pageable = {
        page,
        size: 12
      }
      const response = await eventService.findAllPublished(pageable)
      if (response.data) {
        setEvents(response.data.content || [])
        setTotalPages(response.data.totalPages || 1)
      }
    } catch (error) {
      console.error('Failed to fetch events:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleEventClick = (id: string) => {
    navigate(`/events/${id}`)
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(45,74,62,0.7), rgba(26,46,37,0.85)), url('/src/assets/img/Banner.jpg')"
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <div className="text-4xl md:text-5xl mb-4">☸</div>
          <h1 
            className="text-3xl md:text-5xl font-light tracking-[0.15em] uppercase leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            Sự Kiện
          </h1>
          <p className="text-center max-w-2xl opacity-90">
            Các sự kiện và hoạt động Phật pháp tại Chùa Diệu Pháp, cơ hội để tu học và kết nối cộng đồng.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 px-6 md:px-12 border-b border-[#e8d5a3]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Tìm kiếm sự kiện..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="inline-block animate-spin text-2xl">⏳</div>
                <p className="text-[#5a7060] mt-4">Đang tải sự kiện...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredEvents.map(event => (
                  <div
                    key={event.id}
                    onClick={() => handleEventClick(event.id)}
                    className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={event.imageUrl || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80'} 
                        alt={event.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          event.isFeatured 
                            ? 'bg-orange-100 text-orange-700' 
                            : 'bg-green-100 text-green-700'
                        }`}>
                          {event.isFeatured ? 'NỔI BẬT' : 'SẮP DIỄN RA'}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-[#2d4a3e] uppercase tracking-wide mb-3 leading-snug line-clamp-2">
                        {event.title}
                      </h3>
                      
                      {event.description && (
                        <p className="text-xs text-[#5a7060] mb-4 line-clamp-2">
                          {event.description}
                        </p>
                      )}

                      {/* Event Info */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-xs text-[#5a7060]">
                          <span className="w-4">📅</span>
                          <span className="ml-2">{formatDate(event.startDate)}</span>
                        </div>
                        <div className="flex items-center text-xs text-[#5a7060]">
                          <span className="w-4">📅</span>
                          <span className="ml-2">Đến: {formatDate(event.endDate)}</span>
                        </div>
                        {event.eventTime && (
                          <div className="flex items-center text-xs text-[#5a7060]">
                            <span className="w-4">⏰</span>
                            <span className="ml-2">{event.eventTime}</span>
                          </div>
                        )}
                        {event.location && (
                          <div className="flex items-center text-xs text-[#5a7060]">
                            <span className="w-4">📍</span>
                            <span className="ml-2">{event.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      <button className="w-full bg-[#2d4a3e] text-white py-2 rounded-lg hover:bg-[#1a2e25] transition-colors text-sm font-medium">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredEvents.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-[#2d4a3e] mb-2">Không tìm thấy sự kiện</h3>
                  <p className="text-sm text-[#5a7060]">
                    Không có sự kiện nào phù hợp với tìm kiếm của bạn.
                  </p>
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-4 mt-8">
                  <button
                    onClick={() => setPage(Math.max(0, page - 1))}
                    disabled={page === 0}
                    className="px-4 py-2 border border-[#2d4a3e] text-[#2d4a3e] rounded-lg hover:bg-[#2d4a3e] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Trang trước
                  </button>
                  <span className="text-[#5a7060] text-sm">
                    Trang {page + 1} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
                    disabled={page >= totalPages - 1}
                    className="px-4 py-2 border border-[#2d4a3e] text-[#2d4a3e] rounded-lg hover:bg-[#2d4a3e] hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm"
                  >
                    Trang sau
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

