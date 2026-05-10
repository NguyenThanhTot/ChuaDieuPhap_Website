export default function Footer() {
  return (
    <footer className="bg-[#1a2e25] py-12 px-6 md:px-12 border-t border-[rgba(200,169,110,0.15)]">
      <div className="max-w-3xl mx-auto grid grid-cols-2 gap-10 mb-8">
        <div>
          <h4 className="text-[#ffffff] text-xs font-semibold tracking-wide mb-4">Liên kết</h4>
          <ul className="space-y-2">
            {["Trang chủ", "Sự kiện", "Tin tức", "Pháp thoại", "Liên hệ"].map((item) => (
              <li key={item}>
                <a href="#" className="text-xs text-[rgba(184,203,180,0.6)] hover:text-[#ffffff] transition-colors">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-[#ffffff] text-xs font-semibold tracking-wide mb-4">Thông tin liên hệ</h4>
          <p className="text-xs text-[rgba(184,203,180,0.6)] leading-7">
            109/67C Hoàng Minh Luỹ
            <br />
            TP. Hồ Chí Minh
            <br />
            chuadieuphap@gmail.com
            <br />
            0123456789
            <br />
            Giờ mở cửa: 06:00 – 17:00
          </p>
          <div className="mt-4 rounded-lg overflow-hidden h-20">
            <img
              src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=70"
              alt="footer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(255,255,255,0.07)] pt-5 text-center text-[10px] text-[rgba(184,203,180,0.3)] tracking-widest max-w-3xl mx-auto">
        © 2026 CHÙA DIỆU PHÁP · Nơi hội tụ tâm linh và văn hoá Phật Giáo
      </div>
    </footer>
  )
}
