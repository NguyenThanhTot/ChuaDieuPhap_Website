import { axiosInstance } from '@/lib/axios'
import type { ApiResponse, About } from '@/types'

export const aboutService = {
  // Get about content
  findActive: () =>
    axiosInstance
      .get<ApiResponse<About>>('/about')
      .then((r) => r.data),

  // Update about content
  update: (data: Partial<About>) =>
    axiosInstance
      .put<ApiResponse<About>>('/about', data)
      .then((r) => r.data),

  // Create or update about content
  createOrUpdate: (data: Partial<About>) =>
    axiosInstance
      .post<ApiResponse<About>>('/about', data)
      .then((r) => r.data),
}