import { axiosInstance } from '@/lib/axios'
import type { HistoryMilestone } from '@/types'

export const historyMilestoneService = {
  // Create a new history milestone
  create: (data: Omit<HistoryMilestone, 'id' | 'createdAt' | 'updatedAt'>) =>
    axiosInstance
      .post<HistoryMilestone>('/history-milestones', data)
      .then((r) => r.data),

  // Get history milestone by ID
  findById: (id: string) =>
    axiosInstance
      .get<HistoryMilestone>(`/history-milestones/${id}`)
      .then((r) => r.data),

  // Update history milestone
  update: (id: string, data: Partial<HistoryMilestone>) =>
    axiosInstance
      .put<HistoryMilestone>(`/history-milestones/${id}`, data)
      .then((r) => r.data),

  // Delete history milestone
  delete: (id: string) =>
    axiosInstance
      .delete(`/history-milestones/${id}`)
      .then((r) => r.data),

  // Get history milestones by about ID
  findByAboutId: (aboutId: string) =>
    axiosInstance
      .get<HistoryMilestone[]>(`/history-milestones/by-about/${aboutId}`)
      .then((r) => r.data),
}