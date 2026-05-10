import { useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'

interface EventDetail {
  id: number
  title: string
  description: string
  fullDescription: string
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
  requirements?: string[]
  schedule?: { time: string; activity: string }[]
  contactInfo?: {
    phone: string
    email: string
    zalo: string
  }
  benefits?: string[]
  whatToBring?: string[]
}

const eventData: { [key: number]: EventDetail } = {
  1: {
    id: 1,
    title: 'KHOÁ TU "MỘT NGÀY LY THAM" LẦN THỨ 01',
    description: 'Khóa tu một ngày dành cho những ai muốn tìm hiểu và thực hành pháp môn Ly Tham, giúp gột rửa bụi trần và tìm lại sự an lạc trong tâm hồn.',
    fullDescription: 'Khóa tu "Một Ngày Ly Tham" là cơ hội quý báu để chúng ta tạm gác lại những bộn bề của cuộc sống, quay về với chính mình và thực hành pháp môn Ly Tham dưới sự guidance của chư tôn đức. Trong một ngày trọn vẹn, chúng ta sẽ cùng nhau học hỏi, thực hành và trải nghiệm những phương pháp tu tập căn bản giúp tâm hồn được thanh lọc và an lạc.',
    date: '19/04/2026',
    endDate: '15/04/2026',
    time: '06:00-17:00',
    location: 'Chùa Diệu Pháp, hẻm 106/47/9 đường Bình Lợi, phường Bình Lợi Trung, Tp. HCM',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=800&q=80',
    badge: 'SẮP DIỄN RA',
    category: 'Khóa tu',
    maxParticipants: 100,
    currentParticipants: 75,
    fee: 'Miễn phí',
    requirements: [
      'Tuổi từ 18 trở lên',
      'Mang theo y phục trang nhã (trắng, xám, nâu)',
      'Đến trước 15 phút để chuẩn bị',
      'Cam kết tham gia trọn vẹn khóa tu'
    ],
    schedule: [
      { time: '06:00', activity: 'Tập trung, làm lễ sáng' },
      { time: '07:00', activity: 'Ăn ch sáng' },
      { time: '08:00', activity: 'Giảng pháp: "Nghệ thuật sống ly tham"' },
      { time: '10:00', activity: 'Thực hành thiền định' },
      { time: '11:30', activity: 'Ăn trưa (chay)' },
      { time: '13:30', activity: 'Tổ đàn thảo luận' },
      { time: '15:00', activity: 'Thực hành chánh niệm' },
      { time: '16:30', activity: 'Tổng kết và phát nguyện' },
      { time: '17:00', activity: 'Kết thúc khóa tu' }
    ],
    contactInfo: {
      phone: '0943.780.701',
      email: 'chuadieuphaphcm@gmail.com',
      zalo: 'https://zalo.me/g/kdvzok275'
    },
    benefits: [
      'Hiểu rõ về pháp môn Ly Tham',
      'Trải nghiệm thực hành thiền định',
      'Gặp gỡ và kết nối đồng tu',
      'Nhận được tài liệu tu học',
      'Được chư tôn đức chỉ dạy'
    ],
    whatToBring: [
      'Y phục trang nhã (trắng, xám, nâu)',
      'Gối thiền (nếu có)',
      'Sổ tay và bút',
      'Tâm hồn an tịnh và sẵn sàng học hỏi'
    ]
  },
  2: {
    id: 2,
    title: 'BUỔI LỄ PHỤNG VẤNG PHẬT THÍCH CA',
    description: 'Buổi lễ phụng vọng Đức Phật Thích Ca Mâu Ni, cơ hội để chúng con thể hiện lòng thành kính và học hỏi những bài giáo lý sâu sắc từ Ngài.',
    fullDescription: 'Buổi lễ Phục Vọng Đức Phật Thích Ca là dịp để chúng con cùng nhau quy ngưỡng và tưởng nhớ công đức vô lượng của Đức Phật. Trong không trang nghiêm và thành kính, chúng ta sẽ cùng nhau thực hành các nghi lễ Phật giáo, lắng nghe pháp thoại và phát nguyện tu tập theo chân lý của Ngài.',
    date: '25/04/2026',
    endDate: '20/04/2026',
    time: '08:00-12:00',
    location: 'Chùa Diệu Pháp, hẻm 106/47/9 đường Bình Lợi, phường Bình Lợi Trung, Tp. HCM',
    image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=800&q=80',
    badge: 'ĐANG ĐĂNG KÝ',
    category: 'Lễ hội',
    maxParticipants: 200,
    currentParticipants: 120,
    fee: 'Miễn phí',
    requirements: [
      'Mang theo y phục trang nhã',
      'Đến trước 15 phút để chuẩn bị',
      'Trao dồi lòng thành kính'
    ],
    schedule: [
      { time: '08:00', activity: 'Tập trung và chuẩn bị' },
      { time: '08:30', activity: 'Lễ quy y và làm lễ' },
      { time: '09:30', activity: 'Pháp thoại: "Đạo lý của Đức Phật"' },
      { time: '10:30', activity: 'Cúng dường và phát nguyện' },
      { time: '11:00', activity: 'Trao quà và thăm hỏi' },
      { time: '12:00', activity: 'Ăn chồng cùng nhau' }
    ],
    contactInfo: {
      phone: '0943.780.701',
      email: 'chuadieuphaphcm@gmail.com',
      zalo: 'https://zalo.me/g/kdvzok275'
    },
    benefits: [
      'Tích lây công đức',
      'Lắng nghe pháp thoại quý báu',
      'Gặp gỡ cộng đồng Phật tử',
      'Nhận được phước lành'
    ],
    whatToBring: [
      'Y phục trang nhã',
      'Lòng thành kính',
      'Trái tim mở rộng'
    ]
  }
}

export default function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [showRegistrationForm, setShowRegistrationForm] = useState(false)
  
  const eventId = parseInt(id || '1')
  const event = eventData[eventId] || eventData[1]
  
  useDocumentTitle(`${event.title} - Chùa Diệu Pháp`)

  const handleRegistration = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock registration
    alert('Đăng ký thành công! Chúng tôi sẽ liên hệ với bạn sớm.')
    setShowRegistrationForm(false)
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

  const isFullyBooked = event.maxParticipants && event.currentParticipants && event.currentParticipants >= event.maxParticipants

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-[#e8d5a3] px-6 md:px-12 py-3">
        <div className="max-w-6xl mx-auto flex items-center text-sm">
          <Link to="/home" className="text-[#5a7060] hover:text-[#2d4a3e] transition-colors">
            Trang chủ
          </Link>
          <span className="mx-2 text-[#5a7060]">›</span>
          <Link to="/events" className="text-[#5a7060] hover:text-[#2d4a3e] transition-colors">
            Sự kiện
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
            backgroundImage: `linear-gradient(to bottom, rgba(45,74,62,0.6), rgba(26,46,37,0.8)), url('${event.image}')`
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4 text-center">
          <div className="text-4xl md:text-5xl mb-4">☸</div>
          <h1 
            className="text-2xl md:text-4xl font-light tracking-[0.15em] uppercase leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            {event.title}
          </h1>
          <div className="flex flex-wrap gap-2 justify-center">
            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getBadgeColor(event.badge)}`}>
              {event.badge}
            </span>
            <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#2d4a3e]">
              {event.category}
            </span>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                <h2 
                  className="text-xl font-semibold text-[#2d4a3e] mb-4"
                  style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                >
                  Giới thiệu sự kiện
                </h2>
                <p className="text-[#5a7060] leading-relaxed mb-4">
                  {event.fullDescription}
                </p>
                <p className="text-[#5a7060] leading-relaxed">
                  {event.description}
                </p>
              </div>

              {/* Schedule */}
              {event.schedule && (
                <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                  <h2 
                    className="text-xl font-semibold text-[#2d4a3e] mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    Lịch trình
                  </h2>
                  <div className="space-y-3">
                    {event.schedule.map((item, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-20 text-sm font-medium text-[#2d4a3e]">
                          {item.time}
                        </div>
                        <div className="flex-1 text-sm text-[#5a7060]">
                          {item.activity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Benefits */}
              {event.benefits && (
                <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                  <h2 
                    className="text-xl font-semibold text-[#2d4a3e] mb-4"
                    style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
                  >
                    Lợi ích tham gia
                  </h2>
                  <ul className="space-y-2">
                    {event.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-[#5a7060]">
                        <span className="text-[#2d4a3e] mt-0.5">✓</span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                <h3 className="font-semibold text-[#2d4a3e] mb-4">Thông tin nhanh</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="text-[#2d4a3e]">📅</span>
                    <div>
                      <div className="text-sm font-medium text-[#2d4a3e]">Ngày diễn ra</div>
                      <div className="text-xs text-[#5a7060]">{event.date}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2d4a3e]">⏰</span>
                    <div>
                      <div className="text-sm font-medium text-[#2d4a3e]">Thời gian</div>
                      <div className="text-xs text-[#5a7060]">{event.time}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2d4a3e]">📍</span>
                    <div>
                      <div className="text-sm font-medium text-[#2d4a3e]">Địa điểm</div>
                      <div className="text-xs text-[#5a7060]">{event.location}</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-[#2d4a3e]">💰</span>
                    <div>
                      <div className="text-sm font-medium text-[#2d4a3e]">Phí tham gia</div>
                      <div className="text-xs text-[#5a7060]">{event.fee}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Participants */}
              {event.maxParticipants && (
                <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                  <h3 className="font-semibold text-[#2d4a3e] mb-4">Số lượng tham gia</h3>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#2d4a3e]">Đã đăng ký</span>
                      <span className="text-[#2d4a3e]">{event.currentParticipants}/{event.maxParticipants}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(event.currentParticipants!, event.maxParticipants)}`}
                        style={{ width: `${(event.currentParticipants! / event.maxParticipants) * 100}%` }}
                      />
                    </div>
                  </div>
                  {isFullyBooked && (
                    <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded-lg text-sm">
                      Đã đủ số lượng
                    </div>
                  )}
                </div>
              )}

              {/* Requirements */}
              {event.requirements && (
                <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                  <h3 className="font-semibold text-[#2d4a3e] mb-4">Yêu cầu</h3>
                  <ul className="space-y-2">
                    {event.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-[#5a7060]">
                        <span className="text-[#2d4a3e] mt-0.5">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* What to Bring */}
              {event.whatToBring && (
                <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                  <h3 className="font-semibold text-[#2d4a3e] mb-4">Chuẩn bị</h3>
                  <ul className="space-y-2">
                    {event.whatToBring.map((item, index) => (
                      <li key={index} className="flex items-start gap-2 text-xs text-[#5a7060]">
                        <span className="text-[#2d4a3e] mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Contact */}
              {event.contactInfo && (
                <div className="bg-white rounded-xl p-6 border border-[#dde8da]">
                  <h3 className="font-semibold text-[#2d4a3e] mb-4">Liên hệ</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs text-[#5a7060]">
                      <span>📞</span>
                      <span>{event.contactInfo.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5a7060]">
                      <span>✉️</span>
                      <span>{event.contactInfo.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#5a7060]">
                      <span>Zalo</span>
                      <a href={event.contactInfo.zalo} className="text-[#2d4a3e] hover:underline">
                        Tham gia nhóm Zalo
                      </a>
                    </div>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="space-y-3">
                {!isFullyBooked ? (
                  <button
                    onClick={() => setShowRegistrationForm(true)}
                    className="w-full bg-[#2d4a3e] text-white py-3 rounded-lg hover:bg-[#1a2e25] transition-colors font-medium"
                  >
                    Đăng ký tham gia
                  </button>
                ) : (
                  <button
                    disabled
                    className="w-full bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed font-medium"
                  >
                    Đã đủ số lượng
                  </button>
                )}
                
                <button
                  onClick={() => navigate('/events')}
                  className="w-full bg-white border border-[#2d4a3e] text-[#2d4a3e] py-3 rounded-lg hover:bg-[#f5f0e8] transition-colors font-medium"
                >
                  Quay lại danh sách
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Modal */}
      {showRegistrationForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#2d4a3e] mb-4">Đăng ký tham gia</h3>
            <form onSubmit={handleRegistration} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
                  Họ và tên
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  required
                  className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#2d4a3e] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  required
                  className="w-full px-3 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none text-sm"
                />
              </div>
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-[#2d4a3e] text-white py-2 rounded-lg hover:bg-[#1a2e25] transition-colors font-medium text-sm"
                >
                  Xác nhận đăng ký
                </button>
                <button
                  type="button"
                  onClick={() => setShowRegistrationForm(false)}
                  className="flex-1 bg-gray-200 text-[#2d4a3e] py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm"
                >
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
