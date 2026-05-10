import { axiosInstance } from '@/lib/axios'
import type { ApiResponse, LoginRequest, LoginResponse } from '@/types'

export const authService = {
  login: (data: LoginRequest) =>
    axiosInstance
      .post<ApiResponse<LoginResponse>>('/auth/login', data)
      .then((r) => r.data),

  logout: () =>
    axiosInstance.post('/auth/logout').then((r) => r.data),

  getProfile: () =>
    axiosInstance.get('/auth/me').then((r) => r.data),
}
