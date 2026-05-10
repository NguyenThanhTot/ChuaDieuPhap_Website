import { useNavigate } from 'react-router-dom'

interface AdminHeaderProps {
  showBackButton?: boolean
}

export default function AdminHeader({ showBackButton = true }: AdminHeaderProps) {
  const navigate = useNavigate()

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <button
                onClick={() => navigate('/admin')}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                ← Quay lại trang chủ
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">Xin chào, Admin</span>
            <button 
              onClick={() => navigate('/')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Đăng xuất
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
