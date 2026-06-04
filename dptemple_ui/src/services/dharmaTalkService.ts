import { axiosInstance } from '@/lib/axios'
import type {
  ApiResponse,
  DharmaTalk,
  PageDharmaTalk,
  Pageable
} from '@/types'

export const dharmaTalkService = {
  // Get all published dharma talks with pagination
  findAllPublished: (pageable: Pageable): Promise<PageDharmaTalk> =>
    axiosInstance
      .get<PageDharmaTalk>('/dharma-talks', { params: pageable })
      .then((r) => r.data),

  // Create a new dharma talk
  create: (data: Omit<DharmaTalk, 'id' | 'createdAt' | 'updatedAt'>) =>
    axiosInstance
      .post<ApiResponse<DharmaTalk>>('/dharma-talks', data)
      .then((r) => r.data),

  // Get dharma talk by ID
  findById: (id: string) =>
    axiosInstance
      .get<ApiResponse<DharmaTalk>>(`/dharma-talks/${id}`)
      .then((r) => r.data),

  // Update dharma talk
  update: (id: string, data: Partial<DharmaTalk>) =>
    axiosInstance
      .put<ApiResponse<DharmaTalk>>(`/dharma-talks/${id}`, data)
      .then((r) => r.data),

  // Soft delete dharma talk
  delete: (id: string, deletedById: string) =>
    axiosInstance
      .delete<ApiResponse<void>>(`/dharma-talks/${id}`, { params: { deletedById } })
      .then((r) => r.data),

  // Get homepage dharma talks
  findHomepage: () =>
    axiosInstance
      .get<DharmaTalk[]>('/dharma-talks/homepage')
      .then((r) => r.data),

  // Get all deleted dharma talks
  findAllDeleted: (pageable: Pageable) =>
    axiosInstance
      .get<PageDharmaTalk>('/dharma-talks/deleted', { params: pageable })
      .then((r) => r.data),
}