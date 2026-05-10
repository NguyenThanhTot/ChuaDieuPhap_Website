import { axiosInstance } from '@/lib/axios'
import type { ApiResponse, SocialLink } from '@/types'

export const socialLinkService = {
  // Get all active social links
  findAllActive: () =>
    axiosInstance
      .get<SocialLink[]>('/social-links')
      .then((r) => r.data),

  // Create a new social link
  create: (data: Omit<SocialLink, 'id' | 'createdAt' | 'updatedAt'>) =>
    axiosInstance
      .post<ApiResponse<SocialLink>>('/social-links', data)
      .then((r) => r.data),

  // Get social link by ID
  findById: (id: string) =>
    axiosInstance
      .get<SocialLink>(`/social-links/${id}`)
      .then((r) => r.data),

  // Update social link
  update: (id: string, data: Partial<SocialLink>) =>
    axiosInstance
      .put<SocialLink>(`/social-links/${id}`, data)
      .then((r) => r.data),

  // Delete social link
  delete: (id: string) =>
    axiosInstance
      .delete(`/social-links/${id}`)
      .then((r) => r.data),
}