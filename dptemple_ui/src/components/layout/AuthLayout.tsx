import { Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export default function AuthLayout() {
  const { isAuthenticated } = useAuth()
  if (isAuthenticated) return <Navigate to="/home" replace />
  
  return (
    <div className="min-h-screen bg-[#f5f0e8] flex">
      {/* Left side - Image/Branding */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(45,74,62,0.8), rgba(26,46,37,0.9)), url('/src/assets/img/Banner.jpg')"
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-12">
          <div className="text-6xl mb-6">☸</div>
          <h1 
            className="text-5xl font-light tracking-[0.15em] uppercase leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Chùa Diệu Pháp
          </h1>
          <p className="text-lg text-center max-w-md opacity-90 leading-relaxed">
            Nơi hội tụ tâm linh và văn hoá Phật Giáo. Hãy cùng nhau thực hành pháp môn và xây dựng cộng đồng từ bi.
          </p>
          
          <div className="mt-12 space-y-4 text-center">
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-[#e8d5a3] rounded-full"></span>
              <span>Cùng nhau tu học</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-[#e8d5a3] rounded-full"></span>
              <span>Thực hành Phật pháp</span>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="w-2 h-2 bg-[#e8d5a3] rounded-full"></span>
              <span>Xây dựng cộng đồng</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 lg:p-12">
        <div className="w-full max-w-md">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
