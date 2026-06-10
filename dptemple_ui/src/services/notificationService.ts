import { axiosInstance } from '@/lib/axios'
import type {
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
      .post<Notification>('/notifications', data)
      .then((r) => r.data),

  // Get notification by ID
  findById: (id: string) =>
    axiosInstance
      .get<Notification>(`/notifications/${id}`)
      .then((r) => r.data),

  // Update notification
  update: (id: string, data: Partial<Notification>) =>
    axiosInstance
      .put<Notification>(`/notifications/${id}`, data)
      .then((r) => r.data),

  // Soft delete notification
  delete: (id: string, deletedById: string) =>
    axiosInstance
      .delete<void>(`/notifications/${id}`, { params: { arg1: deletedById } })
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