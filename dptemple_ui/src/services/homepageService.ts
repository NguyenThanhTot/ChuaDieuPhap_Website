import { axiosInstance } from '@/lib/axios'
import type { ApiResponse, HomepageDataDTO } from '@/types'

export const homepageService = {
  // Get all homepage data
  getHomePageData: () =>
    axiosInstance
      .get<HomepageDataDTO>('/homepage')
      .then((r) => r.data),
}