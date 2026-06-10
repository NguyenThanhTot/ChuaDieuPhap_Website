
function SectionHeader({ label, title, sub, light = false }: { label: string; title: string; sub: string; light?: boolean }) {
  return (
    <div className="text-center mb-10">
      <div className={`flex items-center justify-center gap-3 mb-2 text-xs font-medium tracking-[4px] uppercase ${light ? "text-[#b8cbb4]" : "text-[#7a9e7e]"}`}>
        <span className={`w-8 h-px ${light ? "bg-[#7a9e7e]" : "bg-[#7a9e7e]"}`} />
        {label}
        <span className={`w-8 h-px ${light ? "bg-[#7a9e7e]" : "bg-[#7a9e7e]"}`} />
      </div>
      <h2
        className="font-serif text-4xl md:text-5xl font-light mb-2"
        style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif", color: light ? "#f0ebe0" : "#2d4a3e" }}
      >
        {title}
      </h2>
      <p className={`text-sm font-light max-w-xl mx-auto leading-relaxed ${light ? "text-[rgba(232,235,228,0.6)]" : "text-[#7a9080]"}`}>
        {sub}
      </p>
    </div>
  )
}

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { useAuth } from '@/contexts/AuthContext'
import { homepageService } from '@/services/homepageService'
import type { HomepageDataDTO } from '@/types'

function MetaRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2 text-xs text-[#5a7060]">
      <span className="w-6 h-6 rounded bg-[#e8efe6] flex items-center justify-center text-[10px] flex-shrink-0">{icon}</span>
      <div>
        <div className="text-[9px] uppercase tracking-wider text-[#b8cbb4]">{label}</div>
        <div>{value}</div>
      </div>
    </div>
  )
}

export default function HomePage() {
  useDocumentTitle('Trang chủ - Chùa Diệu Pháp');
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [homepageData, setHomepageData] = useState<HomepageDataDTO | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomepageData = async () => {
      try {
        const response = await homepageService.getHomePageData()
        setHomepageData(response)
      } catch (error) {
        console.error('Failed to fetch homepage data:', error)
        // Fallback to static data if API fails
      } finally {
        setLoading(false)
      }
    }

    fetchHomepageData()
  }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <div className="font-sans bg-[#f5f0e8] text-[#1a2e25] overflow-x-hidden">
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300&family=Be+Vietnam+Pro:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />
      {/* HERO */}
      <section className="relative h-[70vh] min-h-[400px] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: homepageData?.config?.heroImageUrl
              ? `linear-gradient(to bottom, rgba(20,38,28,0.4), rgba(29,48,36,0.72)), url(${homepageData.config.heroImageUrl})`
              : "linear-gradient(to bottom, rgba(20,38,28,0.4), rgba(29,48,36,0.72)), url('src/assets/img/Banner.jpg')",
          }}
        />
        <div className="relative z-10 px-4">
          <div className="text-[#ffffff] text-2xl mb-4 tracking-widest">☸</div>
          <h1
            className="text-white text-4xl md:text-7xl font-light tracking-[0.15em] uppercase leading-tight"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {homepageData?.config?.heroTitle || 'CHÙA DIỆU PHÁP'}
          </h1>
          <p className="mt-4 text-xs md:text-sm text-[rgba(255,255,255,0.65)] tracking-[5px] uppercase font-light">
            {homepageData?.config?.heroDescription || 'Nơi hội tụ tâm linh và văn hoá Phật Giáo'}
          </p>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] text-[rgba(255,255,255,0.4)] tracking-[3px] uppercase">Cuộn xuống</span>
          <div className="w-px h-10 bg-gradient-to-b from-[#ffffff] to-transparent animate-pulse" />
        </div>
      </section>

      {/* THÔNG BÁO */}
      <section className="bg-[#f5f0e8] py-20 px-6 md:px-12">
        <SectionHeader
          label="Tin tức"
          title="THÔNG BÁO"
          sub="Những thông báo quan trọng và cập nhật mới nhất từ chùa Diệu Pháp."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {(homepageData?.featuredNotifications || homepageData?.notifications || []).slice(0, isAuthenticated ? 3 : 2).map((notification) => (
            <div key={notification.id} className="rounded-2xl border border-[#dde8da] p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
              <div className="text-xs uppercase tracking-[2px] text-[#7a9e7e] mb-3">Thông báo</div>
              <h3 className="text-lg font-semibold text-[#2d4a3e] mb-3">{notification.title}</h3>
              <p className="text-sm text-[#5a7060] leading-relaxed mb-4">
                {isAuthenticated ? notification.content || 'Nội dung thông báo chưa có.' : 'Đăng nhập để xem nội dung đầy đủ thông báo.'}
              </p>
              <div className="text-xs text-[#7a9e7e] uppercase tracking-[3px]">Ưu tiên: {notification.homepagePriority ?? 0}</div>
            </div>
          ))}
        </div>
        {!isAuthenticated && (
          <div className="mt-8 text-center">
            <p className="text-sm text-[#5a7060]">Đăng nhập để xem thêm thông báo và nội dung chi tiết.</p>
          </div>
        )}
      </section>

      {/* SỰ KIỆN */}
      <section className="bg-white py-20 px-6 md:px-12">
        <SectionHeader
          label="Nổi bật"
          title="SỰ KIỆN"
          sub="Những sự kiện và hoạt động Phật pháp nổi bật, thường xuyên diễn ra tại chùa Diệu Pháp để bạn tham gia, trải nghiệm và nuôi dưỡng tâm linh."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {(homepageData?.events || []).slice(0, isAuthenticated ? undefined : 2).map((ev) => (
            <div
              key={ev.id}
              className="rounded-2xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 bg-white"
            >
              <div className="relative h-44 overflow-hidden">
                <img src={ev.imageUrl || 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80'} alt={ev.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3 bg-[rgba(45,74,62,0.85)] text-[#ffffff] text-[10px] tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                  ☆ {ev.isFeatured ? 'NỔI BẬT' : 'SẮP DIỄN RA'}
                </div>
              </div>
              <div className="p-5">
                <h3 className="text-xs font-semibold text-[#2d4a3e] uppercase tracking-wide mb-4 leading-snug">
                  {ev.title}
                </h3>
                <div className="space-y-2">
                  <MetaRow icon="📅" label="Ngày diễn ra sự kiện" value={ev.startDate} />
                  <MetaRow icon="📋" label="Ngày kết thúc" value={ev.endDate} />
                  <MetaRow icon="⏰" label="Thời gian sự kiện" value={ev.eventTime || ''} />
                  <MetaRow icon="📍" label="Địa điểm" value={isAuthenticated ? ev.location || '' : 'Đăng nhập để xem địa điểm'} />
                </div>
                {!isAuthenticated && (
                  <p className="mt-4 text-sm text-[#7a9e7e]">Đăng nhập để xem chi tiết sự kiện đầy đủ.</p>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <button onClick={() => navigate('/events')} className="px-8 py-3 border-2 border-[#2d4a3e] text-[#2d4a3e] text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-[#2d4a3e] hover:text-[#ffffff] transition-all duration-200">
            Xem thêm sự kiện
          </button>
        </div>
      </section>

      {/* TIN TỨC */}
      <section className="bg-[#3d5a4a] py-20 px-6 md:px-12">
        <SectionHeader
          label="Mới nhất"
          title="TIN TỨC"
          sub="Bài viết mới nhất về các hoạt động, sự kiện và những chia sẻ Phật pháp tại chùa Diệu Pháp."
          light
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-3xl mx-auto">
          {(homepageData?.news || []).slice(0, isAuthenticated ? undefined : 2).map((n) => (
            <div
              key={n.id}
              className="rounded-xl overflow-hidden border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,0.07)] hover:bg-[rgba(255,255,255,0.12)] transition-colors"
            >
              <div className="h-32 overflow-hidden">
                <img src={n.thumbnailUrl || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80'} alt={n.title} className="w-full h-full object-cover" />
              </div>
              <div className="px-2 py-1 bg-[rgba(45,74,62,0.8)] text-[#ffffff] text-[10px] tracking-widest">
                {n.publishedDate}
              </div>
              <div className="p-4">
                <h3 className="text-xs font-medium text-[#f0ebe0] mb-3 uppercase tracking-wide">{n.title}</h3>
                <div className="flex items-center gap-2 text-[11px] text-[rgba(232,235,228,0.45)]">
                  <div className="w-5 h-5 rounded-full bg-[#4a6741] flex items-center justify-center text-[9px] text-[#ffffff]">
                    ✿
                  </div>
                  {isAuthenticated ? n.authorName : 'Đăng nhập để xem tác giả'}
                </div>
                <p className="text-[12px] text-[rgba(232,235,228,0.7)] mt-3">
                  {isAuthenticated ? 'Đọc tiếp để xem nội dung đầy đủ.' : 'Đăng nhập để xem nội dung đầy đủ bài viết.'}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center gap-4 mt-10">
          <button onClick={() => navigate('/news')} className="px-8 py-3 border border-[rgba(200,169,110,0.6)] text-[#ffffff] text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-[rgba(200,169,110,0.15)] transition-all duration-200">
            Xem tất cả bài viết
          </button>
          {!isAuthenticated && (
            <div className="text-sm text-[#5a7060]">Đăng nhập để xem thêm tin tức và bài viết chi tiết.</div>
          )}
        </div>
      </section>

      {/* GIỚI THIỆU */}
      <section className="bg-[#f5f0e8] py-20 px-6 md:px-12">
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="text-[10px] font-medium tracking-[4px] uppercase text-[#7a9e7e] mb-2">☸ Giới thiệu</div>
            <h2
              className="text-4xl font-light text-[#2d4a3e] leading-tight mb-1"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              GIỚI THIỆU
            </h2>
            <p
              className="text-lg text-[#7a9e7e] mb-5 italic font-light"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Chùa Diệu Pháp
            </p>
            <p className="text-sm text-[#5a7060] font-light leading-relaxed mb-7">
              {homepageData?.about?.introductionText || 'Tọa lạc yên bình tại vùng đất linh thiêng Đồng Nai, Chùa Diệu Pháp là không gian của sự bình yên và trí tuệ. Nơi đây hướng dẫn tu học và kết nối những tâm hồn tìm về với Phật pháp nhiệm màu. Ngôi chùa không chỉ là nơi thờ phụng mà còn là trung tâm văn hoá Phật giáo, nơi tổ chức nhiều khoá tu học và hoạt động cộng đồng ý nghĩa.'}
            </p>
            <button onClick={() => navigate('/about')} className="px-7 py-3 bg-[#2d4a3e] text-[#ffffff] text-xs font-medium tracking-widest uppercase rounded-lg hover:bg-[#1a2e25] transition-colors">
              Khám phá chi tiết
            </button>
          </div>
          <div className="rounded-2xl overflow-hidden h-72 md:h-80">
            <img
              src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80"
              alt="Chùa Diệu Pháp"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>
    </div>
  )
}