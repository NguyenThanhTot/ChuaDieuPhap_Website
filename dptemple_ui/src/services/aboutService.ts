import { axiosInstance } from '@/lib/axios'
import type { About } from '@/types'

export const aboutService = {
  // Get about content
  findActive: () =>
    axiosInstance
      .get<About>('/about')
      .then((r) => r.data),

  // Update about content
  update: (data: Partial<About>) =>
    axiosInstance
      .put<About>('/about', data)
      .then((r) => r.data),

  // Create or update about content
  createOrUpdate: (data: Partial<About>) =>
    axiosInstance
      .post<About>('/about', data)
      .then((r) => r.data),
}