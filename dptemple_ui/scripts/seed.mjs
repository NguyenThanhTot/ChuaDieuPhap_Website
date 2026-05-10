import axios from 'axios'
import http from 'http'
import https from 'https'

const BASE_URL = process.env.API_URL || 'http://localhost:8080/api'
const AUTH_TOKEN = process.env.ADMIN_TOKEN || process.env.AUTH_TOKEN

const client = axios.create({
  baseURL: BASE_URL,
  timeout: 60000,
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true }),
  headers: {
    'Content-Type': 'application/json',
    ...(AUTH_TOKEN ? { Authorization: `Bearer ${AUTH_TOKEN}` } : {}),
  },
})

const log = (...args) => console.log('[seed]', ...args)

const normalizeResponse = (response) => response?.data ?? response
const extractId = (response) => normalizeResponse(response)?.id ?? normalizeResponse(response)?.data?.id

const RETRY_DELAY_MS = 600
const MAX_RETRIES = 3
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

const isRetryableError = (error) => {
  if (error?.code && ['ECONNRESET', 'ECONNABORTED', 'ETIMEDOUT', 'EPIPE', 'ENOTFOUND'].includes(error.code)) {
    return true
  }
  if (error?.response && error.response.status >= 500) {
    return true
  }
  return false
}

const postWithRetry = async (url, body, attempt = 1) => {
  try {
    const response = await client.post(url, body)
    return response.data
  } catch (error) {
    if (attempt < MAX_RETRIES && isRetryableError(error)) {
      log(`Retrying ${url} (attempt ${attempt + 1})`, error.code || error.response?.status || error.message)
      await delay(RETRY_DELAY_MS * attempt)
      return postWithRetry(url, body, attempt + 1)
    }
    throw error
  }
}

const createHomeConfig = async () => {
  log('Creating home config...')
  const body = {
    heroImageUrl: 'https://images.unsplash.com/photo-1501769214405-5e1c36566d5e?w=1200&q=80',
    heroTitle: 'Chùa Diệu Pháp - Nơi An Lạc',
    heroDescription: 'Hành trình tâm linh, giáo dục và phục vụ cộng đồng tại Chùa Diệu Pháp.',
    introductionText: 'Chùa Diệu Pháp mở rộng cánh cửa để chào đón mọi người tìm về sự an yên và chuyển hóa.',
  }
  return postWithRetry('/home-config', body)
}

const createAbout = async () => {
  log('Creating about content...')
  const body = {
    yearsEstablished: 12,
    totalBuddhists: 8500,
    annualEvents: 18,
    charityActivities: 26,
    introductionText:
      'Chùa Diệu Pháp đồng hành cùng cộng đồng trong việc truyền bá kinh pháp, tu học và hoạt động thiện nguyện.',
  }
  return postWithRetry('/about', body)
}

const createAdminUser = async () => {
  log('Creating default admin user...')
  const body = {
    fullName: 'Admin Diệu Pháp',
    dharmaName: 'Thích Minh Quang',
    phone: '+84 912 111 222',
    dateOfBirth: '1980-01-01',
    email: 'admin@dieuphap.org',
    password: '123456',
    gender: 'other',
    occupation: 'Quản trị',
    address: 'Chùa Diệu Pháp, TP.HCM',
    role: 'admin',
    avatarUrl: '',
    isActive: true,
  }
  return postWithRetry('/users', body)
}

const createSocialLinks = async () => {
  log('Creating social links...')
  const links = [
    { platform: 'Facebook', url: 'https://www.facebook.com/chuadieuphap', icon: 'facebook', isActive: true },
    { platform: 'YouTube', url: 'https://www.youtube.com/chuadieuphap', icon: 'youtube', isActive: true },
    { platform: 'Instagram', url: 'https://www.instagram.com/chuadieuphap', icon: 'instagram', isActive: true },
    { platform: 'Website', url: 'https://dieuphap.org', icon: 'globe', isActive: true },
  ]
  const results = []
  for (const link of links) {
    results.push(await postWithRetry('/social-links', link))
  }
  return results
}

const createContactInfo = async () => {
  log('Creating contact info...')
  const items = [
    {
      label: 'Văn phòng chính',
      address: '123 Đường Hòa Bình, Quận 1, TP.HCM',
      phone: '+84 912 345 678',
      email: 'info@dieuphap.org',
      openTime: '07:00',
      closeTime: '21:00',
      isActive: true,
    },
    {
      label: 'Ban tổ chức',
      address: 'Chùa Diệu Pháp, Phường An Lạc, TP.HCM',
      phone: '+84 987 654 321',
      email: 'contact@dieuphap.org',
      openTime: '08:00',
      closeTime: '18:00',
      isActive: true,
    },
  ]
  const results = []
  for (const item of items) {
    results.push(await postWithRetry('/contact-info', item))
  }
  return results
}

const createNotifications = async () => {
  log('Creating notifications...')
  const items = [
    {
      title: 'Lễ Vu Lan báo hiếu',
      content: 'Mời quý Phật tử tham dự lễ Vu Lan vào ngày 25/08 tại Chùa Diệu Pháp.',
      isPublished: true,
      isFeatured: true,
      homepagePriority: 1,
    },
    {
      title: 'Khóa tu một ngày',
      content: 'Thực tập chánh niệm và an lạc trong khóa tu một ngày cho người mới.',
      isPublished: true,
      isFeatured: false,
      homepagePriority: 2,
    },
  ]
  const results = []
  for (const item of items) {
    results.push(await postWithRetry('/notifications', item))
  }
  return results
}

const createNews = async () => {
  log('Creating news...')
  const items = [
    {
      title: 'Chùa Diệu Pháp tổ chức đêm hoa đăng',
      publishedDate: '2026-04-10',
      thumbnailUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      content: 'Đêm hoa đăng tưởng niệm chư vị tiền bối và cầu an cho quốc thái dân an.',
      isFeatured: true,
      isPublished: true,
      homepagePriority: 1,
    },
    {
      title: 'Giới thiệu chương trình thiền định cuối tuần',
      publishedDate: '2026-04-05',
      thumbnailUrl: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
      content: 'Chương trình thiền định cho người bận rộn vào mỗi thứ bảy.',
      isFeatured: false,
      isPublished: true,
      homepagePriority: 2,
    },
  ]
  const results = []
  for (const item of items) {
    results.push(await postWithRetry('/news', item))
  }
  return results
}

const createEvents = async () => {
  log('Creating events...')
  const items = [
    {
      title: 'Khóa tu một ngày ly tham',
      imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80',
      startDate: '2026-05-19',
      endDate: '2026-05-19',
      eventTime: '06:00',
      location: 'Chùa Diệu Pháp',
      description: 'Tu học, thiền định và lắng nghe pháp thoại trong một ngày.',
      isFeatured: true,
      isPublished: true,
      homepagePriority: 1,
    },
    {
      title: 'Lễ cầu an mùa hè',
      imageUrl: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=600&q=80',
      startDate: '2026-06-12',
      endDate: '2026-06-12',
      eventTime: '09:00',
      location: 'Chùa Diệu Pháp',
      description: 'Lễ cầu an cho gia đình và cộng đồng.',
      isFeatured: false,
      isPublished: true,
      homepagePriority: 2,
    },
  ]
  const results = []
  for (const item of items) {
    results.push(await postWithRetry('/events', item))
  }
  return results
}

const createDharmaTalks = async () => {
  log('Creating dharma talks...')
  const items = [
    {
      title: 'Hạnh phúc và buông bỏ',
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnailUrl: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=400&q=80',
      description: 'Pháp thoại về cách rèn luyện tâm buông bỏ trong đời sống hàng ngày.',
      isPublished: true,
      homepagePriority: 1,
    },
    {
      title: 'Tâm từ bi trong giao tiếp',
      youtubeUrl: 'https://www.youtube.com/watch?v=V-_O7nl0Ii0',
      thumbnailUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=400&q=80',
      description: 'Cách nuôi dưỡng tâm từ bi trong mọi mối quan hệ.',
      isPublished: true,
      homepagePriority: 2,
    },
  ]
  const results = []
  for (const item of items) {
    results.push(await postWithRetry('/dharma-talks', item))
  }
  return results
}

const createHistoryMilestones = async (aboutId) => {
  log('Creating history milestones...')
  const items = [
    {
      about: { id: aboutId },
      title: 'Thành lập chùa',
      year: 2014,
      description: 'Chùa Diệu Pháp chính thức được thành lập và mở cửa phục vụ tín đồ.',
      displayOrder: 1,
    },
    {
      about: { id: aboutId },
      title: 'Khởi công xây dựng giảng đường mới',
      year: 2018,
      description: 'Xây dựng giảng đường mới để phục vụ tu học và sinh hoạt cộng đồng.',
      displayOrder: 2,
    },
  ]
  const results = []
  for (const item of items) {
    results.push(await postWithRetry('/history-milestones', item))
  }
  return results
}

const run = async () => {
  try {
    const homeConfig = await createHomeConfig()
    log('Home config created:', extractId(homeConfig) || JSON.stringify(normalizeResponse(homeConfig)))

    const about = await createAbout()
    const aboutId = extractId(about)
    log('About created:', aboutId)

    await createAdminUser()
    await createSocialLinks()
    await createContactInfo()
    await createNotifications()
    await createNews()
    await createEvents()
    await createDharmaTalks()

    if (aboutId) {
      await createHistoryMilestones(aboutId)
    } else {
      log('Skipping history milestones because about ID could not be determined.')
    }

    log('Database seed completed successfully.')
  } catch (error) {
    if (error.response) {
      console.error('[seed] API error', error.response.status, error.response.data)
    } else {
      console.error('[seed] Error', error.message)
    }
    process.exit(1)
  }
}

run()
