import { axiosInstance } from '@/lib/axios'
import type { ApiResponse, HomeConfig } from '@/types'

export const homeConfigService = {
  // Get home config
  findActive: () =>
    axiosInstance
      .get<ApiResponse<HomeConfig>>('/home-config')
      .then((r) => r.data),

  // Update home config
  update: (data: Partial<HomeConfig>) =>
    axiosInstance
      .put<ApiResponse<HomeConfig>>('/home-config', data)
      .then((r) => r.data),

  // Create or update home config
  createOrUpdate: (data: Partial<HomeConfig>) =>
    axiosInstance
      .post<ApiResponse<HomeConfig>>('/home-config', data)
      .then((r) => r.data),
}