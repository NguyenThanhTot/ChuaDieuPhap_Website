import { useNavigate } from 'react-router-dom'

interface NavItem {
  id: string
  label: string
  path?: string
  icon: string
  active?: boolean
}

interface AdminNavbarProps {
  currentPage?: string
  onNavigate?: (page: string) => void
}

export default function AdminNavbar({ currentPage = 'dashboard', onNavigate }: AdminNavbarProps) {
  const navigate = useNavigate()

  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Bảng điều khiển', path: '/admin', icon: '📊' },
    { id: 'events', label: 'Sự kiện', path: '/admin/events', icon: '📅' },
    { id: 'news', label: 'Tin tức', path: '/admin/news', icon: '📰' },
    { id: 'videos', label: 'Video', path: '/admin/videos', icon: '🎥' },
    { id: 'contact', label: 'Liên hệ', path: '/admin/contact', icon: '📞' },
    { id: 'notifications', label: 'Thông báo', path: '/admin/notifications', icon: '🔔' },
    { id: 'categories', label: 'Loại tin tức', path: '/admin/categories', icon: '📂' },
    { id: 'tags', label: 'Tags', path: '/admin/tags', icon: '🏷️' },
    { id: 'logout', label: 'Đăng xuất', icon: '🚪' }
  ]

  const handleNavClick = (item: NavItem) => {
    if (item.id === 'logout') {
      // Handle logout logic
      navigate('/')
      return
    }

    if (item.path) {
      navigate(item.path)
    }

    if (onNavigate) {
      onNavigate(item.id)
    }
  }

  return (
    <div className="w-64 bg-white shadow-sm">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                (currentPage === item.id) || (item.path && window.location.pathname === item.path)
                  ? 'bg-green-100 text-green-700 font-medium'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <span className="text-lg">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}
