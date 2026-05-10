import { axiosInstance } from '@/lib/axios'
import type {
  ApiResponse,
  Event,
  PageEvent,
  Pageable
} from '@/types'

export const eventService = {
  // Get all published events with pagination
  findAllPublished: (pageable: Pageable) =>
    axiosInstance
      .get<ApiResponse<PageEvent>>('/events', { params: pageable })
      .then((r) => r.data),

  // Create a new event
  create: (data: Omit<Event, 'id' | 'createdAt' | 'updatedAt'>) =>
    axiosInstance
      .post<ApiResponse<Event>>('/events', data)
      .then((r) => r.data),

  // Get event by ID
  findById: (id: string) =>
    axiosInstance
      .get<ApiResponse<Event>>(`/events/${id}`)
      .then((r) => r.data),

  // Update event
  update: (id: string, data: Partial<Event>) =>
    axiosInstance
      .put<ApiResponse<Event>>(`/events/${id}`, data)
      .then((r) => r.data),

  // Soft delete event
  delete: (id: string, deletedById: string) =>
    axiosInstance
      .delete<ApiResponse<void>>(`/events/${id}`, { params: { deletedById } })
      .then((r) => r.data),

  // Get upcoming events
  findUpcoming: (fromDate?: string) =>
    axiosInstance
      .get<Event[]>('/events/upcoming', { params: { fromDate } })
      .then((r) => r.data),

  // Get homepage events
  findHomepage: () =>
    axiosInstance
      .get<Event[]>('/events/homepage')
      .then((r) => r.data),

  // Get featured events
  findFeatured: () =>
    axiosInstance
      .get<Event[]>('/events/featured')
      .then((r) => r.data),

  // Get all deleted events
  findAllDeleted: (pageable: Pageable) =>
    axiosInstance
      .get<ApiResponse<PageEvent>>('/events/deleted', { params: pageable })
      .then((r) => r.data),
}