
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { newsService } from '@/services/newsService'
import type { News } from '@/types'

interface UiNewsDetail {
  id: string
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  featured: boolean
  views: number
}

const mapNewsToUi = (news: News): UiNewsDetail => ({
  id: news.id,
  title: news.title,
  excerpt: news.content?.slice(0, 180) || '',
  content: news.content,
  author: news.author?.fullName || 'Chùa Diệu Pháp',
  date: news.publishedDate || news.createdAt,
  readTime: '3 phút đọc',
  category: news.isFeatured ? 'Tin tức nổi bật' : 'Tin tức',
  image: news.thumbnailUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
  featured: news.isFeatured,
  views: 0,
})

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [news, setNews] = useState<UiNewsDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useDocumentTitle(news ? `${news.title} - Chùa Diệu Pháp` : 'Tin tức - Chùa Diệu Pháp')

  useEffect(() => {
    const loadNews = async () => {
      if (!id) {
        setError('ID tin tức không hợp lệ.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError(null)

      try {
        const response = await newsService.findById(id)
        setNews(mapNewsToUi(response.data))
      } catch (err) {
        console.error('Failed to load news item:', err)
        setError('Không thể tải tin tức. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [id])

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('# ')) {
        return (
          <h1 key={index} className="text-2xl font-bold text-[#2d4a3e] mb-4 mt-6">
            {paragraph.replace('# ', '')}
          </h1>
        )
      } else if (paragraph.startsWith('## ')) {
        return (
          <h2 key={index} className="text-xl font-semibold text-[#2d4a3e] mb-3 mt-5">
            {paragraph.replace('## ', '')}
          </h2>
        )
      } else if (paragraph.startsWith('### ')) {
        return (
          <h3 key={index} className="text-lg font-semibold text-[#2d4a3e] mb-2 mt-4">
            {paragraph.replace('### ', '')}
          </h3>
        )
      } else if (paragraph.startsWith('- ')) {
        return (
          <li key={index} className="text-[#5a7060] mb-1 ml-4">
            {paragraph.replace('- ', '')}
          </li>
        )
      } else if (paragraph.trim() === '') {
        return <br key={index} />
      } else {
        return (
          <p key={index} className="text-[#5a7060] mb-4 leading-relaxed">
            {paragraph}
          </p>
        )
      }
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6 md:px-12">
        <div className="text-center py-20">
          <div className="inline-block animate-spin text-2xl">⏳</div>
          <p className="text-[#5a7060] mt-4">Đang tải tin tức...</p>
        </div>
      </div>
    )
  }

  if (error || !news) {
    return (
      <div className="min-h-screen bg-[#f5f0e8] flex items-center justify-center px-6 md:px-12">
        <div className="bg-white rounded-xl p-10 border border-[#dde8da] text-center max-w-2xl">
          <h2 className="text-2xl font-semibold text-[#2d4a3e] mb-4">Không thể tải tin tức</h2>
          <p className="text-[#5a7060] mb-6">{error || 'Tin tức bạn yêu cầu không tồn tại.'}</p>
          <button
            onClick={() => navigate('/news')}
            className="px-5 py-3 bg-[#2d4a3e] text-white rounded-lg hover:bg-[#1a2e25] transition-colors"
          >
            Quay lại danh sách
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-[#e8d5a3] px-6 md:px-12 py-3">
        <div className="max-w-6xl mx-auto flex items-center text-sm">
          <Link to="/home" className="text-[#5a7060] hover:text-[#2d4a3e] transition-colors">
            Trang chủ
          </Link>
          <span className="mx-2 text-[#5a7060]">›</span>
          <Link to="/news" className="text-[#5a7060] hover:text-[#2d4a3e] transition-colors">
            Tin tức
          </Link>
          <span className="mx-2 text-[#5a7060]">›</span>
          <span className="text-[#2d4a3e] font-medium">Chi tiết</span>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative h-64 md:h-96 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(to bottom, rgba(45,74,62,0.6), rgba(26,46,37,0.8)), url('${news.image}')`
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <div className="text-4xl md:text-5xl mb-4">📖</div>
          <h1 
            className="text-2xl md:text-4xl font-light tracking-[0.15em] uppercase leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {news.title}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#2d4a3e]">
              {news.category}
            </span>
            {news.featured && (
              <span className="bg-[#2d4a3e] text-white px-3 py-1 rounded-full text-xs font-medium">
                Nổi bật
              </span>
            )}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Content */}
              <article className="bg-white rounded-xl p-8 border border-[#dde8da]">
                {/* Meta Info */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#e8d5a3]">
                  <div className="flex items-center gap-4 text-sm text-[#5a7060]">
                    <span>👤 {news.author}</span>
                    <span>📅 {news.date}</span>
                    <span>⏱️ {news.readTime}</span>
                  </div>
                  <span className="text-sm text-[#5a7060]">👁️ {news.views} lượt xem</span>
                </div>

                {/* Excerpt */}
                <div className="bg-[#f5f0e8] rounded-lg p-4 mb-6">
                  <p className="text-[#2d4a3e] italic leading-relaxed">
                    {news.excerpt}
                  </p>
                </div>

                {/* Content */}
                <div className="prose prose-sm max-w-none">
                  {formatContent(news.content)}
                </div>

              </article>

              {/* Share Section */}
              <div className="bg-white rounded-xl p-6 border border-[#dde8da] mt-6">
                <h3 className="text-lg font-semibold text-[#2d4a3e] mb-4">Chia sẻ bài viết</h3>
                <div className="flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                    Facebook
                  </button>
                  <button className="px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors text-sm">
                    Twitter
                  </button>
                  <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                    Zalo
                  </button>
                  <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm">
                    Copy link
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Author Info */}
              <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                <h3 className="font-semibold text-[#2d4a3e] mb-4">Tác giả</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-[#2d4a3e] rounded-full flex items-center justify-center text-white font-semibold">
                    {news.author.split(' ').map(word => word[0]).join('')}
                  </div>
                  <div>
                    <div className="font-medium text-[#2d4a3e]">{news.author}</div>
                    <div className="text-xs text-[#5a7060]">Tăng sĩ Chùa Diệu Pháp</div>
                  </div>
                </div>
                <p className="text-xs text-[#5a7060] leading-relaxed">
                  Chư tôn đức chuyên về giáo lý và thực hành Phật pháp, có nhiều năm kinh nghiệm trong việc hướng dẫn Phật tử.
                </p>
              </div>

              {/* Back Button */}
              <button
                onClick={() => navigate('/news')}
                className="w-full bg-white border border-[#2d4a3e] text-[#2d4a3e] py-3 rounded-lg hover:bg-[#f5f0e8] transition-colors font-medium"
              >
                ← Quay lại danh sách
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
