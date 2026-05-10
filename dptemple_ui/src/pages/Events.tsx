import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface Event {
  id: number
  title: string
  description: string
  date: string
  endDate: string
  time: string
  location: string
  image: string
  badge: string
  category: string
  maxParticipants?: number
  currentParticipants?: number
  fee?: string
}

const events: Event[] = [
  {
    id: 1,
    title: 'KHOÁ TU "MỘT NGÀY LY THAM" LẦN THỨ 01',
    description: 'Khóa tu một ngày dành cho những ai muốn tìm hiểu và thực hành pháp môn Ly Tham, giúp gột rửa bụi trần và tìm lại sự an lạc trong tâm hồn.',
    date: '19/04/2026',
    endDate: '15/04/2026',
    time: '06:00-17:00',
    location: 'Chùa Diệu Pháp',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
    badge: 'SẮP DIỄN RA',
    category: 'Khóa tu',
    maxParticipants: 100,
    currentParticipants: 75,
    fee: 'Miễn phí'
  },
  {
    id: 2,
    title: 'BUỔI LỄ PHỤNG VẤNG PHẬT THÍCH CA',
    description: 'Buổi lễ phụng vọng Đức Phật Thích Ca Mâu Ni, cơ hội để chúng con thể hiện lòng thành kính và học hỏi những bài giáo lý sâu sắc từ Ngài.',
    date: '25/04/2026',
    endDate: '20/04/2026',
    time: '08:00-12:00',
    location: 'Chùa Diệu Pháp',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80',
    badge: 'ĐANG ĐĂNG KÝ',
    category: 'Lễ hội',
    maxParticipants: 200,
    currentParticipants: 120,
    fee: 'Miễn phí'
  },
  {
    id: 3,
    title: 'THIỀN ĐỊNH TÂM 7 NGÀY',
    description: 'Khóa thiền định tâm kéo dài 7 ngày, thực hành các phương pháp thiền căn bản để xây dựng nền tảng vững chắc cho con đường tu tập.',
    date: '01/05/2026 - 07/05/2026',
    endDate: '25/04/2026',
    time: '05:00-21:00',
    location: 'Chùa Diệu Pháp',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&q=80',
    badge: 'HẠN CHÓ',
    category: 'Thiền',
    maxParticipants: 30,
    currentParticipants: 28,
    fee: '500.000 VNĐ'
  },
  {
    id: 4,
    title: 'GIẢNG PHÁP CUỐI TUẦN',
    description: 'Buổi giảng pháp định kỳ cuối tuần, chia sẻ những kiến thức Phật pháp thiết yếu cho cuộc sống hàng ngày.',
    date: 'Mỗi Chủ Nhật',
    endDate: 'Không',
    time: '09:00-11:00',
    location: 'Chùa Diệu Pháp',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80',
    badge: 'ĐỊNH KỲ',
    category: 'Giảng pháp',
    maxParticipants: 150,
    currentParticipants: 80,
    fee: 'Miễn phí'
  },
  {
    id: 5,
    title: 'KHÓA TU THANH NIÊN MÙA HÈ',
    description: 'Khóa tu đặc biệt dành cho thanh thiếu niên, kết hợp học pháp và hoạt động thực tập trong môi trường thanh tịnh.',
    date: '15/06/2026 - 20/06/2026',
    endDate: '01/06/2026',
    time: '06:00-20:00',
    location: 'Chùa Diệu Pháp',
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=80',
    badge: 'SẮP MỞ ĐĂNG KÝ',
    category: 'Khóa tu',
    maxParticipants: 80,
    currentParticipants: 0,
    fee: '300.000 VNĐ'
  },
  {
    id: 6,
    title: 'LỄ VESAK 2026',
    description: 'Đại lễ Vesak kỷ niệm ngày sinh, thành đạo và nhập niết bàn của Đức Phật Thích Ca, ngày lễ Phật giáo quan trọng nhất trong năm.',
    date: '26/05/2026',
    endDate: '20/05/2026',
    time: '07:00-18:00',
    location: 'Chùa Diệu Pháp',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&q=80',
    badge: 'ĐẶC BIỆT',
    category: 'Lễ hội',
    maxParticipants: 500,
    currentParticipants: 350,
    fee: 'Miễn phí'
  }
]

const categories = ['Tất cả', 'Khóa tu', 'Lễ hội', 'Thiền', 'Giảng pháp']

export default function Events() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')
  const navigate = useNavigate()
  
  useDocumentTitle('Sự kiện - Chùa Diệu Pháp')

  const filteredEvents = events.filter(event => {
    const matchesCategory = selectedCategory === 'Tất cả' || event.category === selectedCategory
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleEventClick = (id: number) => {
    navigate(`/events/${id}`)
  }

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'SẮP DIỄN RA': return 'bg-green-100 text-green-700'
      case 'ĐANG ĐĂNG KÝ': return 'bg-blue-100 text-blue-700'
      case 'HẠN CHÓ': return 'bg-red-100 text-red-700'
      case 'ĐỊNH KỲ': return 'bg-purple-100 text-purple-700'
      case 'SẮP MỞ ĐĂNG KÝ': return 'bg-yellow-100 text-yellow-700'
      case 'ĐẶC BIỆT': return 'bg-orange-100 text-orange-700'
      default: return 'bg-gray-100 text-gray-700'
    }
  }

  const getProgressColor = (current: number, max: number) => {
    const percentage = (current / max) * 100
    if (percentage >= 90) return 'bg-red-500'
    if (percentage >= 70) return 'bg-yellow-500'
    return 'bg-green-500'
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

      {/* Events Grid */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map(event => (
              <div
                key={event.id}
                onClick={() => handleEventClick(event.id)}
                className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(event.badge)}`}>
                      {event.badge}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-[#2d4a3e]">
                    {event.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-[#2d4a3e] uppercase tracking-wide mb-3 leading-snug">
                    {event.title}
                  </h3>
                  
                  <p className="text-xs text-[#5a7060] mb-4 line-clamp-3">
                    {event.description}
                  </p>

                  {/* Event Info */}
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-xs text-[#5a7060]">
                      <span className="w-4">📅</span>
                      <span className="ml-2">{event.date}</span>
                    </div>
                    <div className="flex items-center text-xs text-[#5a7060]">
                      <span className="w-4">⏰</span>
                      <span className="ml-2">{event.time}</span>
                    </div>
                    <div className="flex items-center text-xs text-[#5a7060]">
                      <span className="w-4">📍</span>
                      <span className="ml-2">{event.location}</span>
                    </div>
                    {event.fee && (
                      <div className="flex items-center text-xs text-[#5a7060]">
                        <span className="w-4">💰</span>
                        <span className="ml-2">{event.fee}</span>
                      </div>
                    )}
                  </div>

                  {/* Participants Progress */}
                  {event.maxParticipants && (
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-[#5a7060] mb-1">
                        <span>Tham gia</span>
                        <span>{event.currentParticipants}/{event.maxParticipants}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(event.currentParticipants!, event.maxParticipants)}`}
                          style={{ width: `${(event.currentParticipants! / event.maxParticipants) * 100}%` }}
                        />
                      </div>
                    </div>
                  )}

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
        </div>
      </section>
    </div>
  )
}
