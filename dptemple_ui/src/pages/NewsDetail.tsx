
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface NewsDetail {
  id: number
  title: string
  excerpt: string
  content: string
  author: string
  date: string
  readTime: string
  category: string
  image: string
  tags: string[]
  featured?: boolean
  views?: number
  relatedNews?: { id: number; title: string; image: string; category: string }[]
}

const newsData: { [key: number]: NewsDetail } = {
  1: {
    id: 1,
    title: 'Khóa Tu Mùa Hè 2026: Cơ Hội Tu Học Cho Thanh Thiếu Niên',
    excerpt: 'Chùa Diệu Pháp tổ chức khóa tu mùa hè dành cho thanh thiếu niên, giúp các em tìm hiểu về Phật pháp và phát triển tâm hồn trong môi trường thanh tịnh.',
    content: `
# Khóa Tu Mùa Hè 2026: Cơ Hội Tu Học Cho Thanh Thiếu Niên

Chùa Diệu Pháp hân hoan thông báo về việc tổ chức Khóa tu Mùa hè 2026 dành cho thanh thiếu niên từ 12-18 tuổi. Đây là cơ hội quý báu để các em được tiếp cận với giáo lý nhà Phật và phát triển tâm hồn trong môi trường thanh tịnh.

## Mục đích khóa tu

Khóa tu được tổ chức với mục đích:
- Giúp thanh thiếu niên hiểu biết cơ bản về Phật giáo
- Hướng các em đến lối sống lành mạnh, có trách nhiệm
- Phát triển các kỹ năng sống và nhân cách tốt đẹp
- Tạo môi trường giao lưu, học hỏi cho các em

## Nội dung chương trình

Khóa tu kéo dài 5 ngày (15/06/2026 - 20/06/2026) với các hoạt động phong phú:

### Buổi sáng
- 06:00: Thực hành thiền định
- 07:00: Ăn ch sáng và dọn dẹp
- 08:00: Học về giới luật và giáo lý cơ bản
- 10:00: Hoạt động nhóm và thảo luận

### Buổi chiều
- 13:30: Học hỏi về kinh điển Phật giáo
- 15:00: Thực hành chánh niệm trong sinh hoạt
- 16:30: Hoạt động thể thao và giải trí

### Buổi tối
- 19:00: Giảng pháp và chia sẻ
- 20:30: Tổ đàn thảo luận
- 21:30: Thiền định trước khi ngủ

## Điều kiện tham gia

- Độ tuổi từ 12-18 tuổi
- Có giấy phép đồng ý của phụ huynh
- Sức khỏe tốt, có khả năng tham gia các hoạt động
- Mang theo y phục trang nhã (trắng, xám, nâu)

## Lợi ích khi tham gia

Các em sẽ nhận được:
- Kiến thức nền tảng về Phật giáo
- Kinh nghiệm thực hành thiền định
- Kỹ năng sống và giao tiếp
- Bạn bè cùng trang lứa có cùng hướng đi
- Chứng nhận hoàn thành khóa tu

## Đăng ký

Quý phụ huynh và các em quan tâm vui lòng đăng ký trước ngày 01/06/2026 tại:
- Văn phòng Chùa Diệu Pháp
- Online qua website: chuadieuphat.vn
- Hotline: 0943.780.701

Số lượng có hạn, ưu tiên những ai đăng ký sớm.

## Lời kết

Khóa tu mùa hè là món quà tinh thần quý giá mà Chùa Diệu Pháp muốn dành cho thế hệ trẻ. Chúng tôi tin rằng qua 5 ngày tu học, các em sẽ có những trải nghiệm ý nghĩa và mang về nhiều bài học quý giá cho cuộc sống.

Chư tôn đức và Ban tổ chức mong muốn được đón tiếp các em tại Chùa Diệu Pháp trong mùa hè năm nay.
    `,
    author: 'Thích Minh Tâm',
    date: '15/05/2026',
    readTime: '5 phút đọc',
    category: 'Khóa tu',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80',
    tags: ['khóa tu', 'thanh thiếu niên', 'mùa hè'],
    featured: true,
    views: 1250,
    relatedNews: [
      { id: 2, title: 'Lễ Vesak 2026: Ngày Hội Tự Biếc Vô Ngã', image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', category: 'Lễ hội' },
      { id: 4, title: 'Thực Hành Thiền Định: Hướng Dẫn Cho Người Mới Bắt Đầu', image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&q=80', category: 'Thiền' },
      { id: 8, title: 'Lễ Quy Y Tam Bảo: Đánh Dấu Bắt Đầu Con Đường Tu Tập', image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&q=80', category: 'Nghi lễ' }
    ]
  },
  2: {
    id: 2,
    title: 'Lễ Vesak 2026: Ngày Hội Tự Biếc Vô Ngã',
    excerpt: 'Chùa Diệu Pháp long trọng tổ chức Đại lễ Vesak kỷ niệm ngày sinh, thành đạo và nhập niết bàn của Đức Phật Thích Ca Mâu Ni.',
    content: `
# Lễ Vesak 2026: Ngày Hội Tự Biếc Vô Ngã

Chùa Diệu Pháp hân hoan mời quý Phật tử về tham dự Đại lễ Vesak 2026 để cùng nhau kỷ niệm ngày sinh, thành đạo và nhập niết bàn của Đức Phật Thích Ca Mâu Ni.

## Ý nghĩa ngày Vesak

Vesak là một trong những ngày lễ quan trọng nhất trong Phật giáo, đánh dấu ba sự kiện trọng đại trong cuộc đời Đức Phật:
- Ngày sinh của Đức Phật (lần sinh thứ nhất)
- Ngày Đức Phật thành đạo dưới cội Bồ đề
- Ngày Đức Phật nhập niết bàn

Đây là dịp để chúng con quy ngưỡng, tưởng nhớ công đức vô lượng của Đức Phật và phát nguyện tu tập theo chân lý của Ngài.

## Chương trình lễ hội

### Lễ chính (26/05/2026)
- 07:00: Tập trung và chuẩn bị nghi lễ
- 08:00: Lễ tắm Phật và dâng hoa
- 09:00: Nghi lễ chính thức
- 10:00: Pháp thoại: "Bài học từ cuộc đời Đức Phật"
- 11:30: Cúng dường và phát nguyện

### Hoạt động cộng đồng
- 13:30: Diễu hành rước đèn
- 15:00: Tổ chức các hoạt động văn nghệ
- 16:30: Trao quà cho người có hoàn cảnh khó khăn
- 18:00: Thắp nến cầu nguyện hòa bình

## Tham gia lễ hội

Quý Phật tử mong muốn tham gia vui lòng:
- Đến trước 15 phút để chuẩn bị
- Mang theo y phục trang nhã
- Chuẩn bị hoa tươi để dâng lên Phật
- Trao dồi lòng thành kính và tâm an tịnh

## Các hoạt động đặc biệt

Ngoài lễ chính, Chùa Diệu Pháp còn tổ chức:
- Triển lãm về cuộc đời Đức Phật
- Workshop làm đèn lồng Vesak
- Hoạt động cho trẻ em
- Phát sách Phật pháp miễn phí

## Lời mời

Chùa Diệu Pháp trân trọng kính mời quý Phật tử, quý vị thiện nam tín nữ về tham dự Đại lễ Vesak 2026 để cùng nhau tạo công đức và lan tỏa tinh thần từ bi, trí tuệ của Phật giáo.

Hòa bình và hạnh phúc sẽ đến với những ai có tâm an tịnh và lòng từ bi.

Thời gian: 08:00 - 18:00, ngày 26/05/2026
Địa điểm: Chùa Diệu Pháp, hẻm 106/47/9 đường Bình Lợi, phường Bình Lợi Trung, Tp. HCM
    `,
    author: 'Thích Nguyên An',
    date: '10/05/2026',
    readTime: '3 phút đọc',
    category: 'Lễ hội',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80',
    tags: ['vesak', 'đại lễ', 'phật giáo'],
    featured: true,
    views: 2100,
    relatedNews: [
      { id: 1, title: 'Khóa Tu Mùa Hè 2026: Cơ Hội Tu Học Cho Thanh Thiếu Niên', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80', category: 'Khóa tu' },
      { id: 5, title: 'Hoạt Động Từ Thiện: Trao Quà Cho Trẻ Em Vùng Cao', image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&q=80', category: 'Từ thiện' },
      { id: 3, title: 'Phật Pháp Trong Cuộc Sống: Bài Giảng Cuối Tuần', image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80', category: 'Pháp thoại' }
    ]
  }
}

export default function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  
  const newsId = parseInt(id || '1')
  const news = newsData[newsId] || newsData[1]
  
  useDocumentTitle(`${news.title} - Chùa Diệu Pháp`)

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

                {/* Tags */}
                <div className="mt-8 pt-6 border-t border-[#e8d5a3]">
                  <h3 className="text-sm font-semibold text-[#2d4a3e] mb-3">Tags:</h3>
                  <div className="flex flex-wrap gap-2">
                    {news.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-[#f5f0e8] text-[#2d4a3e] px-3 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
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

              {/* Related News */}
              {news.relatedNews && (
                <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                  <h3 className="font-semibold text-[#2d4a3e] mb-4">Bài viết liên quan</h3>
                  <div className="space-y-4">
                    {news.relatedNews.map((related) => (
                      <div
                        key={related.id}
                        onClick={() => navigate(`/news/${related.id}`)}
                        className="cursor-pointer group"
                      >
                        <div className="flex gap-3">
                          <img 
                            src={related.image} 
                            alt={related.title}
                            className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-[#2d4a3e] mb-1 line-clamp-2 group-hover:text-[#1a2e25] transition-colors">
                              {related.title}
                            </h4>
                            <span className="text-xs text-[#5a7060] bg-[#f5f0e8] px-2 py-1 rounded">
                              {related.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

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
