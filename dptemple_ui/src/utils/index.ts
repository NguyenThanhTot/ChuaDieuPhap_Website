// Classnames
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ')
}

// Format ngày
export function formatDate(date: string | Date, locale = 'vi-VN'): string {
  return new Date(date).toLocaleDateString(locale, {
    day: '2-digit', month: '2-digit', year: 'numeric',
  })
}

export function formatDateTime(date: string | Date, locale = 'vi-VN'): string {
  return new Date(date).toLocaleString(locale)
}

// Truncate
export function truncate(text: string, max: number): string {
  return text.length > max ? text.slice(0, max) + '...' : text
}

// Query string
export function buildQuery(params: Record<string, unknown>): string {
  const q = Object.entries(params)
    .filter(([, v]) => v !== undefined && v !== null && v !== '')
    .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`)
    .join('&')
  return q ? `?${q}` : ''
}

// Format số
export function formatNumber(n: number): string {
  return n.toLocaleString('vi-VN')
}
