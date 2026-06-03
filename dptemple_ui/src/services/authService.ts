import { axiosInstance } from '@/lib/axios'
import type { ApiResponse, LoginRequest, LoginResponse, RegisterRequest, ForgetPasswordRequest, ResetPasswordRequest } from '@/types'

export const authService = {
  login: (data: LoginRequest) =>
    axiosInstance
      .post<ApiResponse<LoginResponse>>('/auth/login', data)
      .then((r) => r.data),

  register: (data: RegisterRequest) =>
    axiosInstance
      .post<ApiResponse<LoginResponse>>('/auth/register', data)
      .then((r) => r.data),

  resendVerificationEmail: (email: string) =>
    axiosInstance
      .post<ApiResponse<void>>('/auth/resend-verification', null, { params: { email } })
      .then((r) => r.data),

  verifyEmail: (token: string) =>
    axiosInstance
      .post<ApiResponse<void>>('/auth/verify-email', null, { params: { token } })
      .then((r) => r.data),

  forgetPassword: (data: ForgetPasswordRequest) =>
    axiosInstance
      .post<ApiResponse<void>>('/auth/forget-password', data)
      .then((r) => r.data),

  resetPassword: (data: ResetPasswordRequest) =>
    axiosInstance
      .post<ApiResponse<void>>('/auth/reset-password', data)
      .then((r) => r.data),

  logout: () =>
    axiosInstance.post('/auth/logout').then((r) => r.data),

  getProfile: () =>
    axiosInstance.get('/auth/me').then((r) => r.data),
}
