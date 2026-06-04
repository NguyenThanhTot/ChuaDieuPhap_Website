import { axiosInstance } from '@/lib/axios'
import type {
  ApiResponse,
  Notification,
  PageNotification,
  Pageable
} from '@/types'

export const notificationService = {
  // Get all published notifications with pagination
  findAllPublished: (pageable: Pageable) =>
    axiosInstance
      .get<PageNotification>('/notifications', { params: pageable })
      .then((r) => r.data),

  // Create a new notification
  create: (data: Omit<Notification, 'id' | 'createdAt' | 'updatedAt'>) =>
    axiosInstance
      .post<ApiResponse<Notification>>('/notifications', data)
      .then((r) => r.data),

  // Get notification by ID
  findById: (id: string) =>
    axiosInstance
      .get<ApiResponse<Notification>>(`/notifications/${id}`)
      .then((r) => r.data),

  // Update notification
  update: (id: string, data: Partial<Notification>) =>
    axiosInstance
      .put<ApiResponse<Notification>>(`/notifications/${id}`, data)
      .then((r) => r.data),

  // Soft delete notification
  delete: (id: string, deletedById: string) =>
    axiosInstance
      .delete<ApiResponse<void>>(`/notifications/${id}`, { params: { deletedById } })
      .then((r) => r.data),

  // Get homepage notifications
  findHomepage: () =>
    axiosInstance
      .get<Notification[]>('/notifications/homepage')
      .then((r) => r.data),

  // Get featured notifications
  findFeatured: () =>
    axiosInstance
      .get<Notification[]>('/notifications/featured')
      .then((r) => r.data),

  // Get all deleted notifications
  findAllDeleted: (pageable: Pageable) =>
    axiosInstance
      .get<PageNotification>('/notifications/deleted', { params: pageable })
      .then((r) => r.data),
}