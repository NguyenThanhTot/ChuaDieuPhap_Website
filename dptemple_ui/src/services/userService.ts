import { axiosInstance } from '@/lib/axios'
import type {
  UserResponse,
  UserRequest,
  PageUserResponse,
  Pageable
} from '@/types'

export const userService = {
  // Get all active users with pagination
  findAllActive: (pageable: Pageable) =>
    axiosInstance
      .get<PageUserResponse>('/users', { params: pageable })
      .then((r) => r.data),

  // Create a new user
  create: (data: UserRequest) =>
    axiosInstance
      .post<UserResponse>('/users', data)
      .then((r) => r.data),

  // Get user by ID
  findById: (id: string) =>
    axiosInstance
      .get<UserResponse>(`/users/${id}`)
      .then((r) => r.data),

  // Update user
  update: (id: string, data: Partial<UserRequest>) =>
    axiosInstance
      .put<UserResponse>(`/users/${id}`, data)
      .then((r) => r.data),

  // Soft delete user
  delete: (id: string, deletedById: string) =>
    axiosInstance
      .delete<void>(`/users/${id}`, { params: { arg1: deletedById } })
      .then((r) => r.data),

  // Get user by email
  findByEmail: (email: string) =>
    axiosInstance
      .get<UserResponse>(`/users/email/${email}`)
      .then((r) => r.data),

  // Get all deleted users
  findAllDeleted: (pageable: Pageable) =>
    axiosInstance
      .get<PageUserResponse>('/users/deleted', { params: pageable })
      .then((r) => r.data),

  // Check if email exists
  checkEmail: (email: string) =>
    axiosInstance
      .get<Record<string, boolean>>('/users/check-email', { params: { arg0: email } })
      .then((r) => r.data),
}