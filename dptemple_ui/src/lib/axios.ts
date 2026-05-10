import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const BASE_URL = ((import.meta as any).env?.VITE_API_URL as string) ?? '/api'

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

// Gắn token vào mỗi request
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Xử lý response lỗi
axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
   if (error.response?.status === 401) {
      console.warn('Unauthorized')
    }
    return Promise.reject(error)
  }
)
