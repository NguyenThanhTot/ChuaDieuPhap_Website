# React Base

**Vite + React 18 + TypeScript + Tailwind CSS + Axios + React Router v6**

> Không dùng state management nặng — Auth quản lý bằng React Context + localStorage.

## Cấu trúc

```
src/
├── components/
│   ├── common/        # PrivateRoute
│   ├── layout/        # MainLayout, Sidebar, Header, AuthLayout
│   └── ui/            # (thêm Button, Modal, Table... tại đây)
├── contexts/          # AuthContext — quản lý auth toàn app
├── hooks/             # useApi — generic async hook
├── lib/               # axios instance + interceptors
├── pages/             # LoginPage, HomePage, NotFoundPage...
├── services/          # authService — gọi API
├── types/             # TypeScript interfaces
└── utils/             # cn, formatDate, truncate...
```

## Cài đặt & chạy

```bash
npm install
cp .env.example .env   # chỉnh VITE_API_URL cho đúng backend
npm run dev            # http://localhost:3000
```

## Thêm trang mới

```
1. Tạo src/pages/TenTrang.tsx
2. Thêm route vào src/App.tsx  →  { path: 'ten-trang', element: <TenTrang /> }
3. Thêm menu vào src/components/layout/Sidebar.tsx  →  navItems[]
```

## Thêm API mới

```ts
// src/services/userService.ts
import { axiosInstance } from '@/lib/axios'
export const userService = {
  getList: () => axiosInstance.get('/users').then(r => r.data),
}

// Dùng trong component
const { data, loading, error, execute } = useApi(userService.getList)
useEffect(() => { execute(undefined) }, [])
```

## Proxy API (dev)

Sửa `vite.config.ts` → `server.proxy`:
```ts
'/api': { target: 'http://your-backend:port', changeOrigin: true }
```
