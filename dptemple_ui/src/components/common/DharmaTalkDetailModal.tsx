interface DharmaTalk {
  id: string
  title: string
  speaker: string
  date: string
  duration: string
  category: string
  excerpt: string
  content: string
  audioUrl?: string
  videoUrl?: string
  views?: number
  tags: string[]
  featured?: boolean
}

interface DharmaTalkDetailModalProps {
  isOpen: boolean
  onClose: () => void
  talk: DharmaTalk | null
}

export default function DharmaTalkDetailModal({
  isOpen,
  onClose,
  talk
}: DharmaTalkDetailModalProps) {
  if (!isOpen) return null
  if (!talk) return null

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  const formatContent = (content: string) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('# ')) {
        return <h2 key={index} className="text-2xl font-bold text-[#2d4a3e] mb-4 mt-6">{line.substring(2)}</h2>
      } else if (line.startsWith('## ')) {
        return <h3 key={index} className="text-xl font-semibold text-[#2d4a3e] mb-3 mt-4">{line.substring(3)}</h3>
      } else if (line.startsWith('### ')) {
        return <h4 key={index} className="text-lg font-medium text-[#2d4a3e] mb-2 mt-3">{line.substring(4)}</h4>
      } else if (line.trim() === '') {
        return <br key={index} />
      } else {
        return <p key={index} className="text-gray-700 mb-3 leading-relaxed">{line}</p>
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-xl">
        {/* Header */}
        <div className="border-b border-gray-200 p-6 bg-gradient-to-r from-[#2d4a3e] to-[#1a2e25] text-white">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Chi tiết bài giảng</h3>
            <button
              onClick={onClose}
              className="text-white/80 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              📢 {talk.category}
            </span>
            <span className="flex items-center gap-1">
              👤 {talk.speaker}
            </span>
            <span className="flex items-center gap-1">
              📅 {formatDate(talk.date)}
            </span>
            <span className="flex items-center gap-1">
              ⏱️ {talk.duration}
            </span>
            <span className="flex items-center gap-1">
              👁️ {talk.views} lượt nghe
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[60vh]">
          {/* Title and Excerpt */}
          <div className="p-6 border-b border-gray-100">
            <h1 className="text-3xl font-bold text-[#2d4a3e] mb-4 leading-tight">
              {talk.title}
            </h1>
            <p className="text-lg text-gray-600 italic">
              {talk.excerpt}
            </p>
          </div>

          {/* Tags */}
          <div className="px-6 py-4 border-b border-gray-100">
            <div className="flex flex-wrap gap-2">
              {talk.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="bg-[#f5f0e8] text-[#2d4a3e] px-3 py-1 rounded-full text-sm font-medium"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <div className="prose prose-lg max-w-none">
              {formatContent(talk.content)}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 p-6 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              {talk.audioUrl && (
                <a 
                  href={talk.audioUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-[#2d4a3e] text-white rounded-lg hover:bg-[#1a2e25] transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Nghe audio
                </a>
              )}
              {talk.videoUrl && (
                <a 
                  href={talk.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Xem video
                </a>
              )}
            </div>
            <div className="flex gap-3">
              <button 
                onClick={() => {
                  const text = `${talk.title} - ${talk.excerpt}`
                  navigator.clipboard.writeText(text)
                  alert('Đã sao chép vào bộ nhớ tạm')
                }}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326" />
                </svg>
                Chia sẻ
              </button>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
