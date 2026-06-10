import { axiosInstance } from '@/lib/axios'
import type {
  Message,
  PageMessage,
  Pageable
} from '@/types'

export const messageService = {
  // Create a new message (public)
  create: (data: Omit<Message, 'id' | 'isRead' | 'createdAt' | 'updatedAt'>) =>
    axiosInstance
      .post<Message>('/messages', data)
      .then((r) => r.data),

  // Get message by ID
  findById: (id: string) =>
    axiosInstance
      .get<Message>(`/messages/${id}`)
      .then((r) => r.data),

  // Delete message
  delete: (id: string) =>
    axiosInstance
      .delete(`/messages/${id}`)
      .then((r) => r.data),

  // Mark message as read
  markAsRead: (id: string) =>
    axiosInstance
      .put<Message>(`/messages/${id}/mark-read`)
      .then((r) => r.data),

  // Get all unread messages
  findUnread: () =>
    axiosInstance
      .get<Message[]>('/messages/unread')
      .then((r) => r.data),

  // Get unread messages with pagination
  findAllUnread: (pageable: Pageable) =>
    axiosInstance
      .get<PageMessage>('/messages/unread/paged', { params: pageable })
      .then((r) => r.data),

  // Get read messages with pagination
  findAllRead: (pageable: Pageable) =>
    axiosInstance
      .get<PageMessage>('/messages/read/paged', { params: pageable })
      .then((r) => r.data),
}