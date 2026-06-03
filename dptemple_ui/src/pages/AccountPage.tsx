import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import { authService } from '@/services/authService'
import type { User } from '@/types'

export default function AccountPage() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<User | null>(user)
  const [loading, setLoading] = useState(!user)
  const [error, setError] = useState<string | null>(null)

  useDocumentTitle('Thông tin tài khoản - Chùa Diệu Pháp')

  useEffect(() => {
    if (user) {
      setProfile(user)
      return
    }

    const fetchProfile = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await authService.getProfile()
        setProfile(response.data)
      } catch (err) {
        console.error(err)
        setError('Không thể tải thông tin tài khoản. Vui lòng thử lại sau.')
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  if (loading) {
    return <div className="min-h-[60vh] flex items-center justify-center">Đang tải thông tin tài khoản...</div>
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-lg text-center">
          <p>{error}</p>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-900 p-6 rounded-lg text-center">
          <p>Không tìm thấy thông tin tài khoản.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-sm border border-[#e2e8f0] overflow-hidden">
      <div className="bg-[#2d4a3e] text-white px-8 py-10">
        <h1 className="text-3xl font-semibold">Thông tin tài khoản</h1>
        <p className="mt-2 text-sm text-[#d9d9d9]">Quản lý thông tin cơ bản và quyền truy cập của bạn.</p>
      </div>

      <div className="p-8 grid gap-6 md:grid-cols-2">
        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#71836b] mb-2">Họ và tên</div>
            <div className="text-lg text-[#1a2e25]">{profile.fullName}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#71836b] mb-2">Email</div>
            <div className="text-lg text-[#1a2e25]">{profile.email}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#71836b] mb-2">Vai trò</div>
            <div className="text-lg text-[#1a2e25]">{profile.role}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#71836b] mb-2">Trạng thái</div>
            <div className="text-lg text-[#1a2e25]">{profile.isActive ? 'Kích hoạt' : 'Không kích hoạt'}</div>
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#71836b] mb-2">Tên pháp danh</div>
            <div className="text-lg text-[#1a2e25]">{profile.dharmaName || 'Chưa cập nhật'}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#71836b] mb-2">Số điện thoại</div>
            <div className="text-lg text-[#1a2e25]">{profile.phone || 'Chưa cập nhật'}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#71836b] mb-2">Địa chỉ</div>
            <div className="text-lg text-[#1a2e25]">{profile.address || 'Chưa cập nhật'}</div>
          </div>

          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#71836b] mb-2">Ảnh đại diện</div>
            <div className="text-lg text-[#1a2e25]">{profile.avatarUrl ? <a className="text-[#2d4a3e] hover:underline" href={profile.avatarUrl} target="_blank" rel="noreferrer">Xem ảnh</a> : 'Chưa cập nhật'}</div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#e2e8f0] px-8 py-6 bg-[#f7faf7] text-[#4a5b4a] text-sm">
        <p>
          Nếu bạn muốn cập nhật thông tin tài khoản, vui lòng liên hệ quản trị viên hoặc vào mục cài đặt tài khoản khi có sẵn.
        </p>
      </div>
    </div>
  )
}
