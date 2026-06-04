import { useState, useEffect } from 'react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { dharmaTalkService } from '@/services/dharmaTalkService'
import DharmaTalkDetailModal from '@/components/common/DharmaTalkDetailModal'
import type { DharmaTalk as ApiDharmaTalk, Pageable } from '@/types'

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  } catch {
    return dateString
  }
}

interface UiDharmaTalk {
  id: string
  title: string
  speaker: string
  date: string
  duration: string
  category: string
  excerpt: string
  content: string
  audioUrl?: string
  videoUrl?: string
  views?: number
  tags: string[]
  featured?: boolean
}

const mapDharmaTalk = (talk: ApiDharmaTalk): UiDharmaTalk => ({
  id: talk.id,
  title: talk.title,
  speaker: 'Chư tôn đức',
  date: formatDate(talk.createdAt),
  duration: 'Không xác định',
  category: 'Pháp thoại',
  excerpt: talk.description ? `${talk.description.slice(0, 140)}...` : 'Không có mô tả.',
  content: talk.description || 'Nội dung đang được cập nhật.',
  audioUrl: undefined,
  videoUrl: talk.youtubeUrl,
  views: 0,
  tags: [],
  featured: (talk.homepagePriority ?? 0) > 0
})

export default function DharmaTalks() {
  const [talks, setTalks] = useState<UiDharmaTalk[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  const [selectedTalk, setSelectedTalk] = useState<UiDharmaTalk | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  
  useDocumentTitle('Pháp thoại - Chùa Diệu Pháp')

  useEffect(() => {
    fetchTalks()
  }, [page])

  const fetchTalks = async () => {
    try {
      setLoading(true)
      const pageable: Pageable = {
        page,
        size: 12
      }
      const response = await dharmaTalkService.findAllPublished(pageable)
      if (response) {
        setTalks(response.content?.map(mapDharmaTalk) || [])
        setTotalPages(response.totalPages || 1)
      }
    } catch (error) {
      console.error('Failed to fetch dharma talks:', error)
    } finally {
      setLoading(false)
    }
  }

  const filteredTalks = talks.filter(talk => {
    const matchesSearch = talk.title.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const featuredTalks = filteredTalks.filter(talk => talk.featured)
  const regularTalks = filteredTalks.filter(talk => !talk.featured)

  const handleTalkClick = (talk: UiDharmaTalk) => {
    setSelectedTalk(talk)
    setIsDetailModalOpen(true)
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
          <div className="text-4xl md:text-5xl mb-4">🎙️</div>
          <h1 
            className="text-3xl md:text-5xl font-light tracking-[0.15em] uppercase leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Pháp Thoại
          </h1>
          <p className="text-center max-w-2xl opacity-90">
            Các bài giảng pháp từ chư tôn đức Chùa Diệu Pháp, giúp chúng ta tìm hiểu và thực hành giáo lý nhà Phật.
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
                placeholder="Tìm kiếm bài giảng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none text-sm"
              />
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <section className="py-20 px-6 md:px-12">
          <div className="max-w-6xl mx-auto flex items-center justify-center">
            <div className="text-center">
              <div className="inline-block animate-spin text-2xl">⏳</div>
              <p className="text-[#5a7060] mt-4">Đang tải pháp thoại...</p>
            </div>
          </div>
        </section>
      ) : (
        <>
          {/* Featured Talks */}
          {featuredTalks.length > 0 && (
            <section className="py-12 px-6 md:px-12">
              <div className="max-w-6xl mx-auto">
                <h2 
                  className="text-2xl font-semibold text-[#2d4a3e] mb-8"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  Nổi bật
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {featuredTalks.map(talk => (
                    <div
                      key={talk.id}
                      onClick={() => handleTalkClick(talk)}
                      className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    >
                      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#2d4a3e] to-[#1a2e25] flex items-center justify-center">
                        <div className="text-6xl text-white/20">🎙️</div>
                        <div className="absolute top-4 left-4">
                          <span className="bg-[#2d4a3e] text-white px-3 py-1 rounded-full text-xs font-medium">
                            Nổi bật
                          </span>
                        </div>
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#2d4a3e]">
                          {talk.category}
                        </div>
                      </div>

                      <div className="p-6">
                        <h3 className="text-lg font-semibold text-[#2d4a3e] mb-3 leading-tight">
                          {talk.title}
                        </h3>
                        
                        <p className="text-sm text-[#5a7060] mb-4 line-clamp-3">
                          {talk.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-xs text-[#5a7060] mb-4">
                          <div className="flex items-center gap-4">
                            <span>👤 {talk.speaker}</span>
                            <span>📅 {formatDate(talk.date)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Regular Talks */}
          <section className="py-12 px-6 md:px-12">
            <div className="max-w-6xl mx-auto">
              <h2 
                className="text-2xl font-semibold text-[#2d4a3e] mb-8"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                Tất cả pháp thoại
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {regularTalks.map(talk => (
                  <div
                    key={talk.id}
                    onClick={() => handleTalkClick(talk)}
                    className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >
                    <div className="relative h-44 overflow-hidden bg-[#f0f4ef] flex items-center justify-center">
                      <div className="text-5xl">🎙️</div>
                    </div>

                    <div className="p-5">
                      <h3 className="text-sm font-semibold text-[#2d4a3e] uppercase tracking-wide mb-3 leading-snug line-clamp-2">
                        {talk.title}
                      </h3>
                      
                      <p className="text-xs text-[#5a7060] mb-4 line-clamp-3">
                        {talk.excerpt}
                      </p>

                      <div className="text-xs text-[#5a7060] mb-4">
                        <span>👤 {talk.speaker}</span>
                        <span className="mx-2">•</span>
                        <span>📅 {formatDate(talk.date)}</span>
                      </div>

                      <button className="w-full bg-[#2d4a3e] text-white py-2 rounded-lg hover:bg-[#1a2e25] transition-colors text-sm font-medium">
                        Xem chi tiết
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTalks.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-4xl mb-4">🔍</div>
                  <h3 className="text-lg font-medium text-[#2d4a3e] mb-2">Không tìm thấy pháp thoại</h3>
                  <p className="text-sm text-[#5a7060]">
                    Không có bài giảng nào phù hợp với tìm kiếm của bạn.
                  </p>
                </div>
              )}

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

      {/* Dharma Talk Detail Modal */}
      <DharmaTalkDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedTalk(null)
        }}
        talk={selectedTalk}
      />
    </div>
  )
}
