import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface News {
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
}

const newsData: News[] = [
  {
    id: 1,
    title: 'Khóa Tu Mùa Hè 2026: Cơ Hội Tu Học Cho Thanh Thiếu Niên',
    excerpt: 'Chùa Diệu Pháp tổ chức khóa tu mùa hè dành cho thanh thiếu niên, giúp các em tìm hiểu về Phật pháp và phát triển tâm hồn trong môi trường thanh tịnh.',
    content: 'Khóa tu mùa hè 2026 tại Chùa Diệu Pháp là cơ hội quý báu cho thanh thiếu niên từ 12-18 tuổi được tiếp cận với giáo lý nhà Phật. Trong 5 ngày tu học, các em sẽ được học về giới luật, thực hành thiền định, và tham gia các hoạt động tập thể giúp phát triển nhân cách và tâm hồn.',
    author: 'Thích Minh Tâm',
    date: '15/05/2026',
    readTime: '5 phút đọc',
    category: 'Khóa tu',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80',
    tags: ['khóa tu', 'thanh thiếu niên', 'mùa hè'],
    featured: true,
    views: 1250
  },
  {
    id: 2,
    title: 'Lễ Vesak 2026: Ngày Hội Tự Biếc Vô Ngã',
    excerpt: 'Chùa Diệu Pháp long trọng tổ chức Đại lễ Vesak kỷ niệm ngày sinh, thành đạo và nhập niết bàn của Đức Phật Thích Ca Mâu Ni.',
    content: 'Đại lễ Vesak 2026 sẽ được tổ chức vào ngày 26/05/2026 tại Chùa Diệu Pháp với nhiều hoạt động ý nghĩa: lễ tắm Phật, rước đèn, giảng pháp, và các hoạt động từ thiện. Đây là dịp để cộng đồng Phật tử cùng nhau quy ngưỡng và thực hành lòng từ bi.',
    author: 'Thích Nguyên An',
    date: '10/05/2026',
    readTime: '3 phút đọc',
    category: 'Lễ hội',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    tags: ['vesak', 'đại lễ', 'phật giáo'],
    featured: true,
    views: 2100
  },
  {
    id: 3,
    title: 'Phật Pháp Trong Cuộc Sống: Bài Giảng Cuối Tuần',
    excerpt: 'Chư tôn đức chia sẻ những bài giảng thiết yếu về việc áp dụng Phật pháp vào cuộc sống hàng ngày để tìm thấy bình an và hạnh phúc.',
    content: 'Trong buổi giảng pháp cuối tuần vừa qua, Thượng tọa Thích Minh Tâm đã chia sẻ về cách áp dụng giáo lý nhà Phật vào cuộc sống hiện đại. Ngài nhấn mạnh tầm quan trọng của việc thực hành chánh niệm trong mọi hoạt động hàng ngày để giữ tâm an tịnh.',
    author: 'Thích Minh Tâm',
    date: '08/05/2026',
    readTime: '7 phút đọc',
    category: 'Pháp thoại',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    tags: ['pháp thoại', 'chánh niệm', 'cuộc sống'],
    views: 890
  },
  {
    id: 4,
    title: 'Thực Hành Thiền Định: Hướng Dẫn Cho Người Mới Bắt Đầu',
    excerpt: 'Bài viết hướng dẫn chi tiết các bước thực hành thiền định cơ bản cho những ai mới bắt đầu con đường tu tập.',
    content: 'Thiền định là phương pháp tu tập căn bản trong Phật pháp giúp tâm trí an định và sáng suốt. Bài viết này sẽ hướng dẫn chi tiết các bước thực hành thiền từ cơ bản đến nâng cao, giúp người mới bắt đầu có thể thực hành đúng phương pháp.',
    author: 'Thích Quảng Chiếu',
    date: '05/05/2026',
    readTime: '10 phút đọc',
    category: 'Thiền',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    tags: ['thiền', 'hướng dẫn', 'người mới'],
    views: 1560
  },
  {
    id: 5,
    title: 'Hoạt Động Từ Thiện: Trao Quà Cho Trẻ Em Vùng Cao',
    excerpt: 'Chùa Diệu Pháp tổ chức chương trình từ thiện trao quà cho trẻ em khó khăn tại vùng cao, lan tỏa tình yêu thương của Phật giáo.',
    content: 'Chương trình từ thiện "Trao yêu thương - Gieo mầm hạnh phúc" đã được tổ chức thành công tại các tỉnh vùng cao. Hơn 500 phần quà gồm sách vở, quần áo và nhu yếu phẩm đã được trao tận tay các em nhỏ có hoàn cảnh khó khăn.',
    author: 'Ban Từ Thiện',
    date: '01/05/2026',
    readTime: '4 phút đọc',
    category: 'Từ thiện',
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80',
    tags: ['từ thiện', 'trẻ em', 'vùng cao'],
    views: 3200
  },
  {
    id: 6,
    title: 'Kinh Kim Cang: Bài Học Về Vô Ngã',
    excerpt: 'Phân tích sâu sắc về Kinh Kim Cang và bài học thực tiễn về tính không và vô ngã trong cuộc sống hiện đại.',
    content: 'Kinh Kim Cang là một trong những bộ kinh quan trọng nhất của Đại thừa Phật giáo, dạy về sự trống không của tất cả các pháp và tính vô ngã. Bài viết này phân tích các khái niệm cốt lõi trong kinh và cách áp dụng vào đời sống.',
    author: 'Thích Nguyên An',
    date: '28/04/2026',
    readTime: '12 phút đọc',
    category: 'Kinh điển',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80',
    tags: ['kinh kim cang', 'vô ngã', 'phật học'],
    views: 980
  },
  {
    id: 7,
    title: 'Chùa Diệu Pháp Khai Trương Thư Viện Phật Pháp',
    excerpt: 'Thư viện Phật Pháp Chùa Diệu Pháp chính thức khai trương với hơn 5.000 đầu sách về Phật giáo và các lĩnh vực liên quan.',
    content: 'Thư viện Phật Pháp Chùa Diệu Pháp đã chính thức khai trương vào ngày 20/04/2026, trở thành không gian học thuật quan trọng cho Phật tử và những ai quan tâm đến nghiên cứu Phật giáo. Thư viện sở hữu hơn 5.000 đầu sách quý giá.',
    author: 'Thích Quảng Chiếu',
    date: '25/04/2026',
    readTime: '6 phút đọc',
    category: 'Cơ sở vật chất',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    tags: ['thư viện', 'sách', 'phật pháp'],
    views: 1450
  },
  {
    id: 8,
    title: 'Lễ Quy Y Tam Bảo: Đánh Dấu Bắt Đầu Con Đường Tu Tập',
    excerpt: 'Lễ quy y tam bảo là nghi lễ quan trọng đánh dấu bước đầu trên con đường tu tập của một Phật tử.',
    content: 'Lễ quy y tam bảo là nghi lễ quan trọng mà một người muốn trở thành Phật tử cần thực hành. Qua lễ quy y, chúng ta refuge vào Phật, Pháp, Tăng - ba bảo quý cao nhất và phát nguyện tu tập theo giáo lý của Đức Phật.',
    author: 'Thích Minh Tâm',
    date: '22/04/2026',
    readTime: '8 phút đọc',
    category: 'Nghi lễ',
    image: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80',
    tags: ['quy y', 'tam bảo', 'nghi lễ'],
    views: 1890
  }
]

const categories = ['Tất cả', 'Khóa tu', 'Lễ hội', 'Pháp thoại', 'Thiền', 'Từ thiện', 'Kinh điển', 'Cơ sở vật chất', 'Nghi lễ']

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  
  useDocumentTitle('Tin tức - Chùa Diệu Pháp')

  const filteredNews = newsData.filter(news => {
    const matchesCategory = selectedCategory === 'Tất cả' || news.category === selectedCategory
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleNewsClick = (id: number) => {
    navigate(`/news/${id}`)
  }

  const featuredNews = filteredNews.filter(news => news.featured)
  const regularNews = filteredNews.filter(news => !news.featured)

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
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#2d4a3e] text-white'
                      : 'bg-[#f5f0e8] text-[#2d4a3e] hover:bg-[#e8d5a3]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

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
              {featuredNews.map(news => (
                <div
                  key={news.id}
                  onClick={() => handleNewsClick(news.id)}
                  className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2d4a3e] text-white px-3 py-1 rounded-full text-xs font-medium">
                        Nổi bật
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#2d4a3e]">
                      {news.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#2d4a3e] mb-3 leading-tight">
                      {news.title}
                    </h3>
                    
                    <p className="text-sm text-[#5a7060] mb-4 line-clamp-3">
                      {news.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#5a7060] mb-4">
                      <div className="flex items-center gap-4">
                        <span>👤 {news.author}</span>
                        <span>📅 {news.date}</span>
                      </div>
                      <span>⏱️ {news.readTime}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {news.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-[#f5f0e8] text-[#2d4a3e] px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#5a7060]">👁️ {news.views} lượt xem</span>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularNews.map(news => (
              <div
                key={news.id}
                onClick={() => handleNewsClick(news.id)}
                className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-[#2d4a3e]">
                    {news.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-[#2d4a3e] uppercase tracking-wide mb-3 leading-snug">
                    {news.title}
                  </h3>
                  
                  <p className="text-xs text-[#5a7060] mb-4 line-clamp-3">
                    {news.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-[#5a7060] mb-3">
                    <div className="flex items-center gap-3">
                      <span>👤 {news.author}</span>
                      <span>📅 {news.date}</span>
                    </div>
                    <span>⏱️ {news.readTime}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {news.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-[#f5f0e8] text-[#2d4a3e] px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {news.tags.length > 2 && (
                      <span className="bg-[#f5f0e8] text-[#2d4a3e] px-2 py-1 rounded text-xs">
                        +{news.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#5a7060]">👁️ {news.views} lượt xem</span>
                    <button className="text-[#2d4a3e] hover:text-[#1a2e25] font-medium text-xs transition-colors">
                      Đọc thêm →
                    </button>
                  </div>
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

          {/* Load More Button */}
          {filteredNews.length > 0 && (
            <div className="text-center mt-12">
              <button className="px-8 py-3 border-2 border-[#2d4a3e] text-[#2d4a3e] text-sm font-medium tracking-widest uppercase rounded-lg hover:bg-[#2d4a3e] hover:text-[#ffffff] transition-all duration-200">
                Xem thêm bài viết
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
