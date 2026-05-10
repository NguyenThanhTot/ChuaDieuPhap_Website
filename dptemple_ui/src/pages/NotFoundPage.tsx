import { useNavigate } from 'react-router-dom'

export default function NotFoundPage() {
  const navigate = useNavigate()
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-3">
      <p className="text-7xl font-bold text-gray-100">404</p>
      <h2 className="text-gray-500 font-normal">Trang không tồn tại</h2>
      <button className="btn-primary mt-2" onClick={() => navigate('/')}>
        Về trang chủ
      </button>
    </div>
  )
}
