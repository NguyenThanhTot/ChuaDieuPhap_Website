import { axiosInstance } from '@/lib/axios'
import type {
  ApiResponse,
  News,
  PageNews,
  Pageable
} from '@/types'

export const newsService = {
  // Get all published news with pagination
  findAllPublished: (pageable: Pageable) =>
    axiosInstance
      .get<ApiResponse<PageNews>>('/news', { params: pageable })
      .then((r) => r.data),

  // Create a new news article
  create: (data: Omit<News, 'id' | 'createdAt' | 'updatedAt' | 'author'>) =>
    axiosInstance
      .post<ApiResponse<News>>('/news', data)
      .then((r) => r.data),

  // Get news by ID
  findById: (id: string) =>
    axiosInstance
      .get<ApiResponse<News>>(`/news/${id}`)
      .then((r) => r.data),

  // Update news
  update: (id: string, data: Partial<News>) =>
    axiosInstance
      .put<ApiResponse<News>>(`/news/${id}`, data)
      .then((r) => r.data),

  // Soft delete news
  delete: (id: string, deletedById: string) =>
    axiosInstance
      .delete<ApiResponse<void>>(`/news/${id}`, { params: { deletedById } })
      .then((r) => r.data),

  // Get homepage news
  findHomepage: () =>
    axiosInstance
      .get<News[]>('/news/homepage')
      .then((r) => r.data),

  // Get featured news
  findFeatured: () =>
    axiosInstance
      .get<News[]>('/news/featured')
      .then((r) => r.data),

  // Get all deleted news
  findAllDeleted: (pageable: Pageable) =>
    axiosInstance
      .get<PageNews>('/news/deleted', { params: pageable })
      .then((r) => r.data),
}