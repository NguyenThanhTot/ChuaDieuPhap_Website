import { useDocumentTitle } from '@/hooks/useDocumentTitle'

export default function About() {
  useDocumentTitle('Giới thiệu - Chùa Diệu Pháp')

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="text-4xl md:text-5xl mb-4">☸</div>
        <h1 
          className="text-3xl md:text-5xl font-light tracking-[0.15em] uppercase leading-tight mb-4"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Giới Thiệu
        </h1>
        <p className="text-[#5a7060] max-w-2xl mx-auto">
          Chùa Diệu Pháp là nơi hội tụ tâm linh, không gian của sự bình yên và trí tuệ
        </p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
        {/* Left Column - Text */}
        <div className="space-y-8">
          <div>
            <h2 
              className="text-3xl font-semibold text-[#2d4a3e] mb-6"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Chùa Diệu Pháp
            </h2>
            <p className="text-[#5a7060] leading-relaxed mb-6">
              Tọa lạc tại 109/67C Hoàng Minh Luỹ, TP. Hồ Chí Minh, Chùa Diệu Pháp là một trong những 
              ngôi chùa trang nghiêm và linh thiêng nhất khu vực. Với lịch sử hơn 30 năm xây dựng và phát triển, 
              chùa đã trở thành điểm đến tâm linh quan trọng cho Phật tử và những người tìm kiếm sự bình an.
            </p>
            <p className="text-[#5a7060] leading-relaxed">
              Dưới sự guidance của Thượng tọa Thích Minh Tâm, chùa không chỉ là nơi thờ phụng mà còn là 
              trung tâm giáo dục, văn hóa và hoạt động cộng đồng, mang lại giá trị thiết thực cho đời sống.
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="rounded-2xl overflow-hidden h-96">
          <img
            src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80"
            alt="Chùa Diệu Pháp"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Mission & Vision */}
      <div className="bg-white rounded-xl p-8 md:p-12 border border-[#dde8da] mb-12">
        <h2 
          className="text-2xl font-semibold text-[#2d4a3e] mb-8"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Sứ Mệnh & Tầm Nhìn
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="text-3xl mb-4">🎯</div>
            <h3 
              className="text-xl font-semibold text-[#2d4a3e] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Sứ Mệnh
            </h3>
            <p className="text-[#5a7060] leading-relaxed">
              Lan tỏa giáo lý nhà Phật, hướng dẫn con người sống tốt hơn, xây dựng xã hội hài hòa 
              và mang lại giá trị tinh thần cho cộng đồng.
            </p>
          </div>
          <div>
            <div className="text-3xl mb-4">👁️</div>
            <h3 
              className="text-xl font-semibold text-[#2d4a3e] mb-4"
              style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
            >
              Tầm Nhìn
            </h3>
            <p className="text-[#5a7060] leading-relaxed">
              Trở thành trung tâm Phật giáo hàng đầu, nơi hội tụ trí tuệ và lòng từ bi, 
              góp phần xây dựng một thế giới bình an và hạnh phúc.
            </p>
          </div>
        </div>
      </div>

      {/* Activities */}
      <div className="bg-white rounded-xl p-8 md:p-12 border border-[#dde8da] mb-12">
        <h2 
          className="text-2xl font-semibold text-[#2d4a3e] mb-8"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Hoạt Động Chính
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center p-6">
            <div className="text-4xl mb-4">🙏</div>
            <h3 className="font-semibold text-[#2d4a3e] mb-3">Ngày Phật</h3>
            <p className="text-[#5a7060] text-sm">
              Tổ chức các ngày lễ Phật đản, Vu Lan, 
              và các ngày lễ Phật giáo quan trọng.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📖</div>
            <h3 className="font-semibold text-[#2d4a3e] mb-3">Khoá Tu</h3>
            <p className="text-[#5a7060] text-sm">
              Các khoá tu cuối tuần, khoá tu hè, 
              và các lớp học giáo lý.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">👨‍👩‍👧‍👦</div>
            <h3 className="font-semibold text-[#2d4a3e] mb-3">Thanh Thiếu Niên</h3>
            <p className="text-[#5a7060] text-sm">
              Khóa tu mùa hè, các hoạt động hướng nghiệp, 
              phát triển kỹ năng sống cho thanh thiếu niên.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="font-semibold text-[#2d4a3e] mb-3">Nghiên Cứu</h3>
            <p className="text-[#5a7060] text-sm">
              Thư viện Phật pháp, các buổi nghiên cứu chuyên sâu, 
              xuất bản sách và tài liệu tu học.
            </p>
          </div>
        </div>
      </div>

      {/* Leadership */}
      <div className="bg-white rounded-xl p-8 md:p-12 border border-[#dde8da] mb-12">
        <h2 
          className="text-2xl font-semibold text-[#2d4a3e] mb-8"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Ban Trị Sự
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-24 h-24 bg-[#2d4a3e] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              TMT
            </div>
            <h3 className="font-semibold text-[#2d4a3e] mb-2">Thượng tọa Thích Minh Tâm</h3>
            <p className="text-[#5a7060] text-sm mb-2">Trụ trì</p>
            <p className="text-[#5a7060] text-xs">
              Có hơn 30 năm tu học, chuyên về Thiền tông và giáo lý Đại thừa.
            </p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-[#2d4a3e] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              TNA
            </div>
            <h3 className="font-semibold text-[#2d4a3e] mb-2">Thích Nguyên An</h3>
            <p className="text-[#5a7060] text-sm mb-2">Phó trụ trì</p>
            <p className="text-[#5a7060] text-xs">
              Chuyên về kinh điển Pali và các hoạt động giáo dục Phật giáo.
            </p>
          </div>
          <div className="text-center">
            <div className="w-24 h-24 bg-[#2d4a3e] rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
              TNH
            </div>
            <h3 className="font-semibold text-[#2d4a3e] mb-2">Thích Nguyên Hạnh</h3>
            <p className="text-[#5a7060] text-sm mb-2">Thư ký</p>
            <p className="text-[#5a7060] text-xs">
              Phụ trách các hoạt động đối ngoại và truyền thông của chùa.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-white rounded-xl p-8 md:p-12 border border-[#dde8da] mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div className="bg-white rounded-xl p-6 text-center border border-[#dde8da]">
            <div className="text-3xl font-bold text-[#2d4a3e] mb-2">30+</div>
            <p className="text-[#5a7060] text-sm">Năm hoạt động</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-[#dde8da]">
            <div className="text-3xl font-bold text-[#2d4a3e] mb-2">1000+</div>
            <p className="text-[#5a7060] text-sm">Phật tử</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-[#dde8da]">
            <div className="text-3xl font-bold text-[#2d4a3e] mb-2">50+</div>
            <p className="text-[#5a7060] text-sm">Khóa tu/năm</p>
          </div>
          <div className="bg-white rounded-xl p-6 text-center border border-[#dde8da]">
            <div className="text-3xl font-bold text-[#2d4a3e] mb-2">12</div>
            <p className="text-[#5a7060] text-sm">Ban ngành</p>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="bg-gradient-to-r from-[#2d4a3e] to-[#1a2e25] rounded-xl p-8 md:p-12 text-center text-white">
        <h2 
          className="text-2xl font-semibold mb-4"
          style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
        >
          Tham Gia Cộng Đồng Chùa Diệu Pháp
        </h2>
        <p className="mb-8 opacity-90 max-w-2xl mx-auto">
          Hãy đến với Chùa Diệu Pháp để tìm thấy sự bình an, học hỏi giáo lý nhà Phật 
          và kết nối với cộng đồng những người cùng hướng đi.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/contact" 
            className="inline-block px-8 py-3 bg-white text-[#2d4a3e] rounded-lg hover:bg-[#e8d5a3] transition-colors font-medium"
          >
            Liên Hệ Ngay
          </a>
          <a 
            href="/events" 
            className="inline-block px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-[#2d4a3e] transition-colors font-medium"
          >
            Xem Sự Kiện
          </a>
        </div>
      </div>
    </div>
  )
}
