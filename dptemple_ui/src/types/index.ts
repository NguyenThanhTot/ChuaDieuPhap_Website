// API
export interface ApiResponse<T = unknown> {
  success: boolean
  message: string
  data: T
  timestamp: string
}

export interface PaginatedData<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export interface PaginationParams {
  page?: number
  pageSize?: number
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

// Auth
export interface User {
  id: string
  fullName: string
  dharmaName?: string
  phone?: string
  dateOfBirth?: string
  email: string
  gender?: 'male' | 'female' | 'other'
  occupation?: string
  address?: string
  role: 'admin' | 'moderator' | 'member' | 'user'
  avatarUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface UserRequest {
  fullName: string
  dharmaName?: string
  phone?: string
  dateOfBirth?: string
  email: string
  password: string
  gender?: 'male' | 'female' | 'other'
  occupation?: string
  address?: string
  role: 'admin' | 'moderator' | 'member'
  avatarUrl?: string
  isActive?: boolean
}

export interface UserResponse {
  id: string
  fullName: string
  dharmaName?: string
  phone?: string
  dateOfBirth?: string
  email: string
  gender?: 'male' | 'female' | 'other'
  occupation?: string
  address?: string
  role: 'admin' | 'moderator' | 'member' | 'user'
  avatarUrl?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  token: string
  id: string
  fullName: string
  dharmaName?: string
  email: string
  role: 'admin' | 'moderator' | 'member' | 'user'
  avatarUrl?: string
  loginTime: string
}

export interface RegisterRequest {
  fullName: string
  email: string
  password: string
  dharmaName?: string
  phone?: string
  occupation?: string
  address?: string
}

export interface ForgetPasswordRequest {
  email: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
}

// Context
export interface AuthContextType {
  user: User | null
  accessToken: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (data: LoginRequest) => Promise<void>
  logout: () => void
}

// Content Types
export interface SocialLink {
  id: string
  platform: string
  url: string
  icon?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Notification {
  id: string
  title: string
  content: string
  type?: 'general' | 'event' | 'course' | 'urgent'
  targetAudience?: 'all' | 'phat_tu' | 'tu_sinh' | 'ban_to_chuc'
  status?: 'published' | 'draft' | 'expired'
  publishDate?: string
  expiryDate?: string
  views?: number
  attachments?: number
  isActive?: boolean
  isPublished: boolean
  isFeatured: boolean
  homepagePriority?: number
  createdAt: string
  updatedAt: string
}

export interface News {
  id: string
  title: string
  publishedDate: string
  author: User
  thumbnailUrl?: string
  content: string
  isFeatured: boolean
  isPublished: boolean
  homepagePriority?: number
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  senderName: string
  senderEmail: string
  senderPhone?: string
  content: string
  channel: 'web' | 'email' | 'facebook'
  isRead: boolean
  createdAt: string
  updatedAt: string
}

export interface HomeConfig {
  id: string
  heroImageUrl?: string
  heroTitle?: string
  heroDescription?: string
  introductionText?: string
  createdAt: string
  updatedAt: string
}

export interface About {
  id: string
  yearsEstablished?: number
  totalBuddhists?: number
  annualEvents?: number
  charityActivities?: number
  introductionText?: string
  createdAt: string
  updatedAt: string
}

export interface HistoryMilestone {
  id: string
  about: About
  title: string
  year: number
  description: string
  displayOrder?: number
  createdAt: string
  updatedAt: string
}

export interface Event {
  id: string
  title: string
  imageUrl?: string
  startDate: string
  endDate: string
  eventTime?: string
  location?: string
  description?: string
  isFeatured: boolean
  isPublished: boolean
  homepagePriority?: number
  createdAt: string
  updatedAt: string
}

export interface DharmaTalk {
  id: string
  title: string
  youtubeUrl?: string
  thumbnailUrl?: string
  description?: string
  isPublished: boolean
  homepagePriority?: number
  createdAt: string
  updatedAt: string
}

export interface ContactInfo {
  id: string
  label: string
  address?: string
  phone?: string
  email?: string
  openTime?: string
  closeTime?: string
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Page Types
export interface Pageable {
  page: number
  size: number
  sort?: string[]
}

export interface PageUserResponse {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: any
  size: number
  content: UserResponse[]
  number: number
  sort: any
  empty: boolean
}

export interface PageNotification {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: any
  size: number
  content: Notification[]
  number: number
  sort: any
  empty: boolean
}

export interface PageNews {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: any
  size: number
  content: News[]
  number: number
  sort: any
  empty: boolean
}

export interface PageEvent {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: any
  size: number
  content: Event[]
  number: number
  sort: any
  empty: boolean
}

export interface PageDharmaTalk {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: any
  size: number
  content: DharmaTalk[]
  number: number
  sort: any
  empty: boolean
}

export interface PageMessage {
  totalPages: number
  totalElements: number
  first: boolean
  last: boolean
  numberOfElements: number
  pageable: any
  size: number
  content: Message[]
  number: number
  sort: any
  empty: boolean
}

// Homepage DTOs
export interface AboutDTO {
  id: string
  yearsEstablished?: number
  totalBuddhists?: number
  annualEvents?: number
  charityActivities?: number
  introductionText?: string
}

export interface ContactInfoDTO {
  id: string
  label: string
  address?: string
  phone?: string
  email?: string
  openTime?: string
  closeTime?: string
}

export interface DharmaTalkDTO {
  id: string
  title: string
  youtubeUrl?: string
  thumbnailUrl?: string
  description?: string
}

export interface EventDTO {
  id: string
  title: string
  imageUrl?: string
  startDate: string
  endDate: string
  eventTime?: string
  location?: string
  description?: string
  isFeatured: boolean
}

export interface HomeConfigDTO {
  id: string
  heroImageUrl?: string
  heroTitle?: string
  heroDescription?: string
  introductionText?: string
}

export interface NewsDTO {
  id: string
  title: string
  publishedDate: string
  authorName: string
  thumbnailUrl?: string
  isFeatured: boolean
}

export interface NotificationDTO {
  id: string
  title: string
  content: string
  isFeatured: boolean
  homepagePriority?: number
}

export interface SocialLinkDTO {
  id: string
  platform: string
  url: string
  icon?: string
}

export interface HomepageDataDTO {
  config: HomeConfigDTO
  notifications: NotificationDTO[]
  featuredNotifications: NotificationDTO[]
  events: EventDTO[]
  featuredEvents: EventDTO[]
  news: NewsDTO[]
  featuredNews: NewsDTO[]
  dharmaTalks: DharmaTalkDTO[]
  about: AboutDTO
  contactInfo: ContactInfoDTO[]
  socialLinks: SocialLinkDTO[]
}
