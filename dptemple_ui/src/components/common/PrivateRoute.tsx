import { ReactNode } from 'react'

export default function PrivateRoute({ children }: { children: ReactNode }) {
  // Cho phép truy cập tất cả các trang mà không cần xác thực
  return <>{children}</>
}
