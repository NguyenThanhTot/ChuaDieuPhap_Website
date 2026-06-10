import { axiosInstance } from '@/lib/axios'
import type { ContactInfo } from '@/types'

export const contactInfoService = {
  // Get all active contact info
  findAllActive: () =>
    axiosInstance
      .get<ContactInfo[]>('/contact-info')
      .then((r) => r.data),

  // Create a new contact info
  create: (data: Omit<ContactInfo, 'id' | 'createdAt' | 'updatedAt'>) =>
    axiosInstance
      .post<ContactInfo>('/contact-info', data)
      .then((r) => r.data),

  // Get contact info by ID
  findById: (id: string) =>
    axiosInstance
      .get<ContactInfo>(`/contact-info/${id}`)
      .then((r) => r.data),

  // Update contact info
  update: (id: string, data: Partial<ContactInfo>) =>
    axiosInstance
      .put<ContactInfo>(`/contact-info/${id}`, data)
      .then((r) => r.data),

  // Delete contact info
  delete: (id: string) =>
    axiosInstance
      .delete(`/contact-info/${id}`)
      .then((r) => r.data),
}