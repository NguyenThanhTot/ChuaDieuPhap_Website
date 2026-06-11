import { axiosInstance } from '@/lib/axios'
import type {
  News,
  PageNews,
  Pageable
} from '@/types'

export const newsService = {
  // Get all published news with pagination
  findAllPublished: (pageable: Pageable) =>
    axiosInstance
      .get<PageNews>('/news', { params: pageable })
      .then((r) => r.data),

  // Create a new news article
  create: (data: Omit<News, 'id' | 'createdAt' | 'updatedAt'>) =>
    axiosInstance
      .post<News>('/news', data)
      .then((r) => r.data),

  // Get news by ID
  findById: async (id: string) => {
    // Directly request the news by id and let the caller handle errors.
    // Removing the fallback that queried `/news?arg0=...` because it can
    // cause unexpected extra requests and wrong backend routing.
    const response = await axiosInstance.get<News>(`/news/${id}`)
    return response.data
  },

  // Update news
  update: (id: string, data: Partial<News>) =>
    axiosInstance
      .put<News>(`/news/${id}`, data)
      .then((r) => r.data),

  // Soft delete news
  delete: (id: string, deletedById: string) =>
    axiosInstance
      .delete<void>(`/news/${id}`, { params: { arg1: deletedById } })
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