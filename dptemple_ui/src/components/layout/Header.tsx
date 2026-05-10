import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { cn } from '@/utils'

interface NavItem {
  label: string
  path: string
}

const navItems: NavItem[] = [
  { label: 'Trang chủ',  path: '/home' },
  { label: 'Thông báo',  path: '/notifications' },
  { label: 'Sự kiện',    path: '/events' },
  { label: 'Tin tức',    path: '/news' },
  { label: 'Pháp thoại', path: '/dharma-talks' },
  { label: 'Giới thiệu', path: '/about' },
  { label: 'Liên hệ',    path: '/contact' },
  { label: 'Admin',      path: '/admin' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const navigate = useNavigate()

  return (
    <nav className="bg-[#2d4a3e] sticky top-0 z-50 border-b border-[rgba(200,169,110,0.2)]">
      <div className="flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            className="w-8 h-8 justify-center text-[#ffffff] bg-cover bg-center"
            style={{ backgroundImage: "url('/src/assets/img/logo.png')" }}
          />
          <span
            className="text-[#ffffff] text-base font-semibold tracking-widest"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            CHÙA DIỆU PHÁP
          </span>
        </div>

        {/* Desktop menu */}
        <ul className="hidden md:flex gap-7">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  cn(
                    'text-xs tracking-wide transition-colors',
                    isActive
                      ? 'text-[#ffffff]'
                      : 'text-[#d9d9d9] hover:text-[#ffffff]'
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Auth buttons (Desktop) */}
        <div className="hidden md:flex items-center gap-2">
          {isLoggedIn ? (
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-xs tracking-wide px-4 py-1.5 rounded border border-[#ffffff] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#2d4a3e] transition-colors"
            >
              Đăng xuất
            </button>
          ) : (
            <button
              onClick={() => navigate('/auth/login')}
              className="text-xs tracking-wide px-4 py-1.5 rounded bg-[#ffffff] text-[#2d4a3e] hover:bg-[#e8d5a3] transition-colors font-semibold"
            >
              Đăng nhập
            </button>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-[#e8d5a3]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
            />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <ul className="md:hidden flex flex-col py-2 border-t border-[rgba(200,169,110,0.2)]">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  cn(
                    'block px-6 py-2.5 text-sm transition-colors',
                    isActive
                      ? 'text-[#ffffff]'
                      : 'text-[#d9d9d9] hover:text-[#ffffff]'
                  )
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}

          {/* Auth buttons (Mobile) */}
          <li className="px-6 pt-3 pb-1">
            {isLoggedIn ? (
              <button
                onClick={() => { setIsLoggedIn(false); setMenuOpen(false) }}
                className="w-full text-sm py-2 rounded border border-[#ffffff] text-[#ffffff] hover:bg-[#ffffff] hover:text-[#2d4a3e] transition-colors"
              >
                Đăng xuất
              </button>
            ) : (
              <button
                onClick={() => { navigate('/auth/login'); setMenuOpen(false) }}
                className="w-full text-sm py-2 rounded bg-[#ffffff] text-[#2d4a3e] hover:bg-[#e8d5a3] transition-colors font-semibold"
              >
                Đăng nhập
              </button>
            )}
          </li>
        </ul>
      )}
    </nav>
  )
}