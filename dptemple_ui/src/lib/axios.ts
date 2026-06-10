import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'

const envBaseUrl = ((import.meta as any).env?.VITE_API_URL as string) ?? '/api'
const BASE_URL = import.meta.env.DEV ? '/api' : envBaseUrl

// Debug: show which base URL the app uses for API requests
if (import.meta.env.DEV) {
  // eslint-disable-next-line no-console
  console.log('[axios] BASE_URL=', BASE_URL)
}

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

    if (import.meta.env.DEV) {
      const requestUrl = `${config.baseURL ?? ''}${config.url ?? ''}`
      // eslint-disable-next-line no-console
      console.log('[axios] request', config.method, requestUrl)
    }

    return config
  },
  (error) => Promise.reject(error)
)

// Xử lý response lỗi
axiosInstance.interceptors.response.use(
  (response) => {
    const responseData = response.data
    if (
      responseData &&
      typeof responseData === 'object' &&
      'success' in responseData &&
      'data' in responseData
    ) {
      return responseData
    }
    return response
  },
  (error: AxiosError) => {
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log('[axios] error', error.message, error.config?.method, error.config?.url, error.code)
      if (error.response) {
        // eslint-disable-next-line no-console
        console.log('[axios] response error status=', error.response.status, 'data=', error.response.data)
      }
    }
    if (error.response?.status === 401) {
      console.log('Unauthorized')
    }
    return Promise.reject(error)
  }
)
