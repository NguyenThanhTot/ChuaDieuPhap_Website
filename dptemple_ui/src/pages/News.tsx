import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { newsService } from '@/services/newsService'
import type { News, Pageable } from '@/types'

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  } catch {
    return dateString
  }
}

export default function News() {
  const [news, setNews] = useState<News[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const navigate = useNavigate()
  
  useDocumentTitle('Tin tức - Chùa Diệu Pháp')

  useEffect(() => {
    fetchNews()
  }, [page])

  const fetchNews = async () => {
    try {
      setLoading(true)
      const pageable: Pageable = {
        page,
        size: 12
      }
      const response = await newsService.findAllPublished(pageable)
      if (response) {
        setNews(response.content || [])
        setTotalPages(response.totalPages || 1)
      }
    } catch (error) {
      console.error('Failed to fetch news:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredNews = news.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const handleNewsClick = (id: string) => {
    navigate(`/news/${id}`)
  }

  const featuredNews = filteredNews.filter(item => item.isFeatured)
  const regularNews = filteredNews.filter(item => !item.isFeatured)

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
          <div className="text-4xl md:text-5xl mb-4">📖</div>
          <h1 
            className="text-3xl md:text-5xl font-light tracking-[0.15em] uppercase leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            Tin Tức
          </h1>
          <p className="text-center max-w-2xl opacity-90">
            Cập nhật các hoạt động, sự kiện và bài chia sẻ Phật pháp từ Chùa Diệu Pháp.
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
                placeholder="Tìm kiếm tin tức..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {/* News Content */}
      {loading ? (
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin text-2xl">⏳</div>
              <p className="text-[#5a7060] mt-4">Đang tải tin tức...</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured News */}
          {featuredNews.length > 0 && (
            <section className="py-12 px-6 md:px-12">
              <div className="max-w-6xl mx-auto">
                <h2 
                  className="text-2xl font-semibold text-[#2d4a3e] mb-8"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Nổi bật
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredNews.map(item => (
                    <div
                      key={item.id}
                      onClick={() => handleNewsClick(item.id)}
                      className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'} 
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#2d4a3e] text-white px-3 py-1 rounded-full text-xs font-medium">
                            Nổi bật
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-[#2d4a3e] mb-3 leading-tight">
                          {item.title}
                        </h3>
                        
                        <p className="text-sm text-[#5a7060] mb-4 line-clamp-3">
                          {item.content ? `${item.content.slice(0, 180)}...` : 'Nội dung đang được cập nhật.'}
                        </p>

                        <div className="flex items-center justify-between text-xs text-[#5a7060] mb-4">
                          <span>
                            {item.author ? `👤 ${item.author.fullName}` : '👤 Chùa Diệu Pháp'} · 📅 {formatDate(item.publishedDate || item.createdAt)}
                          </span>
                          <button className="text-[#2d4a3e] hover:text-[#1a2e25] font-medium text-sm transition-colors">
                            Đọc thêm →
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Regular News Grid */}
          <section className="py-12 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <h2 
                className="text-2xl font-semibold text-[#2d4a3e] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
              >
                Tất cả tin tức
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {regularNews.map(item => (
                  <div
                    key={item.id}
                    onClick={() => handleNewsClick(item.id)}
                    className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={item.thumbnailUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80'} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-[#2d4a3e] uppercase tracking-wide mb-3 leading-snug line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <p className="text-xs text-[#5a7060] mb-4 line-clamp-3">
                        {item.content ? `${item.content.slice(0, 120)}...` : 'Nội dung đang được cập nhật.'}
                      </p>

                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-[#5a7060] mb-4">
                        <span>📅 {formatDate(item.publishedDate || item.createdAt)}</span>
                      </div>

                      {/* Action Button */}
                      <button className="w-full bg-[#2d4a3e] text-white py-2 rounded-lg hover:bg-[#1a2e25] transition-colors text-sm font-medium">
                        Đọc thêm
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results */}
              {filteredNews.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-[#2d4a3e] mb-2">Không tìm thấy tin tức</h3>
                  <p className="text-sm text-[#5a7060]">
                    Không có bài viết nào phù hợp với tìm kiếm của bạn.
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
            </div>
          </section>
        </>
      )}
    </div>
  )
}
