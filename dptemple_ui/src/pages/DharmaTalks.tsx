import { useState } from 'react'
import { useDocumentTitle } from '@/hooks/useDocumentTitle'
import DharmaTalkDetailModal from '@/components/common/DharmaTalkDetailModal'

interface DharmaTalk {
  id: number
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

const dharmaTalksData: DharmaTalk[] = [
  {
    id: 1,
    title: 'Phật Pháp Trong Cuộc Sống: Bài Giảng Cuối Tuần',
    speaker: 'Thượng tọa Thích Minh Tâm',
    date: '08/05/2026',
    duration: '45 phút',
    category: 'Pháp thoại cuối tuần',
    excerpt: 'Chư tôn đức chia sẻ về cách áp dụng giáo lý nhà Phật vào cuộc sống hiện đại để tìm thấy bình an và hạnh phúc.',
    content: `
# Phật Pháp Trong Cuộc Sống: Bài Giảng Cuối Tuần

Kính thưa quý vị,

Hôm nay chúng ta cùng nhau tìm hiểu về cách áp dụng Phật pháp vào cuộc sống hàng ngày. Nhiều người nghĩ rằng Phật pháp chỉ dành cho những người xuất gia hoặc những người lớn tuổi, nhưng thực ra giáo lý của Đức Phật có thể áp dụng cho tất cả mọi người, trong mọi hoàn cảnh của cuộc sống.

## Tại sao cần áp dụng Phật pháp trong cuộc sống?

Cuộc sống hiện đại đầy áp lực, căng thẳng. Chúng ta luôn chạy theo những mục tiêu vật chất, những thành công bên ngoài mà quên mất sự bình an bên trong. Phật pháp dạy chúng ta cách tìm lại sự cân bằng, cách sống một cuộc đời ý nghĩa.

## Bốn phương pháp thực hành cơ bản

### 1. Chánh niệm trong sinh hoạt hàng ngày

Chánh niệm là sự tỉnh thức trong từng khoảnh khắc. Khi ăn, hãy tập trung vào việc ăn. Khi đi, hãy tập trung vào việc đi. Khi làm việc, hãy tập trung vào công việc. Đừng để tâm trí lang thang trong quá khứ hoặc tương lai.

### 2. Từ bi trong giao tiếp

Hãy thực hành lòng từ bi với mọi người chúng ta gặp. Một lời nói tử tế, một hành động giúp đỡ có thể tạo ra sự khác biệt lớn trong cuộc sống của người khác và cả của chính chúng ta.

### 3. Trí tuệ trong quyết định

Khi đối mặt với khó khăn, hãy dùng trí tuệ để phân tích thay vì để cảm xúc chi phối. Hãy tự hỏi: "Điều gì sẽ mang lại lợi ích lâu dài? Điều gì chỉ là thỏa mãn nhất thời?"

### 4. Tinh tấn trong nỗ lực

Cuộc sống cần nỗ lực, nhưng nỗ lực đó phải đi đôi với sự tỉnh thức. Làm việc hết mình nhưng không bị ám ảnh bởi kết quả.

## Kết luận

Phật pháp không phải là thứ gì đó cao siêu xa vời. Nó nằm ngay trong cuộc sống hàng ngày của chúng ta. Bằng cách thực hành chánh niệm, từ bi, trí tuệ và tinh tấn, chúng ta có thể xây dựng một cuộc đời bình an và ý nghĩa.

Nam mô Bổn Sư Thích Ca Mâu Ni Phật.
    `,
    audioUrl: 'https://example.com/audio/dharma-talk-1.mp3',
    videoUrl: 'https://example.com/video/dharma-talk-1.mp4',
    views: 890,
    tags: ['pháp thoại', 'chánh niệm', 'cuộc sống'],
    featured: true
  },
  {
    id: 2,
    title: 'Kinh Kim Cang: Bài Học Về Tính Không',
    speaker: 'Thích Nguyên An',
    date: '01/05/2026',
    duration: '60 phút',
    category: 'Kinh điển',
    excerpt: 'Phân tích sâu sắc về Kinh Kim Cang và bài học thực tiễn về tính không và vô ngã trong cuộc sống hiện đại.',
    content: `
# Kinh Kim Cang: Bài Học Về Tính Không

Kính thưa quý vị,

Hôm nay chúng ta cùng nhau tìm hiểu Kinh Kim Cang, một trong những bộ kinh quan trọng nhất của Đại thừa Phật giáo. Kinh này dạy về sự trống không của tất cả các pháp và tính vô ngã.

## Bối cảnh ra đời của Kinh Kim Cang

Kinh Kim Cang được Đức Phật thuyết tại vườn Cưu-la-đần, khi Ngài cùng với đại chúng Tăng-khê và Bồ-tát. Tên "Kim Cang" tượng trưng cho sự bất hoại, không thể phá vỡ của trí tuệ Bát-nhã.

## Bài học cốt lõi

### 1. "Phàm tất cả pháp đều là vọng tưởng"

Kinh dạy rằng tất cả những gì chúng ta nhận thức qua năm giác quan đều là vọng tưởng, không có thực chất. Chúng ta thường bị mắc kẹt trong những khái niệm và danh từ mà quên mất bản chất thật sự.

### 2. "Vô ngã là giải thoát"

Khi hiểu rằng không có cái "tôi" cố định, chúng ta sẽ giải thoát khỏi sự chấp trước, giận hờn, sợ hãi. Đây là con đường dẫn đến sự bình an thực sự.

### 3. "Bồ đề tâm không thể nắm bắt"

Tâm giác ngộ cũng không phải là thứ gì đó có thể nắm bắt, nắm giữ. Nó hiện hữu khi chúng ta buông bỏ tất cả.

## Áp dụng vào cuộc sống

### Trong công việc
Đừng quá chấp vào thành công hay thất bại. Cả hai đều là vọng tưởng, đến rồi đi.

### Trong relationships
Hiểu rằng không có cái "tôi" và cái "người" cố định giúp chúng ta buông bỏ sự đòi hỏi và chấp trước.

### Trong khó khăn
Nhìn nhận khó khăn cũng là vọng tưởng, sẽ qua đi, giúp chúng ta vượt qua một cách nhẹ nhàng hơn.

## Kết luận

Kinh Kim Cang không dạy chúng ta trốn tránh cuộc sống, mà dạy chúng ta sống một cách tự do, không bị ràng buộc bởi những chấp trước vô minh.

Nam mô Bổn Sư Thích Ca Mâu Ni Phật.
    `,
    audioUrl: 'https://example.com/audio/dharma-talk-2.mp3',
    views: 1560,
    tags: ['kinh kim cang', 'vô ngã', 'bát nhã'],
    featured: true
  },
  {
    id: 3,
    title: 'Thực Hành Thiền Định Cho Người Mới Bắt Đầu',
    speaker: 'Thích Quảng Chiếu',
    date: '24/04/2026',
    duration: '30 phút',
    category: 'Thiền',
    excerpt: 'Hướng dẫn chi tiết các bước thực hành thiền định cơ bản cho những ai mới bắt đầu con đường tu tập.',
    content: `
# Thực Hành Thiền Định Cho Người Mới Bắt Đầu

Kính thưa quý vị,

Thiền định là phương pháp tu tập căn bản giúp tâm trí an định và sáng suốt. Hôm nay tôi sẽ hướng dẫn các bước cơ bản cho những ai mới bắt đầu.

## Chuẩn bị

### 1. Không gian
- Chọn nơi yên tĩnh, thoáng đãng
- Ánh sáng vừa phải, không quá sáng cũng không quá tối
- Nhiệt độ mát mẻ

### 2. Thời gian
- Bắt đầu với 5-10 phút mỗi ngày
- Tăng dần lên 20-30 phút
- Quan trọng nhất là sự đều đặn

### 3. Tư thế
- Ngồi trên gối mềm, hai chân bắt crosses
- Lưng thẳng nhưng không cứng
- Hai tay đặt nhẹ trên đùi
- Mắt nhắm hờ hoặc nhìn xuống đất cách 1-2 mét

## Các bước thực hành

### Bước 1: Thả lỏng cơ thể (2 phút)
Bắt đầu từ chân, thả lỏng từng bộ phận cơ thể. Cảm nhận sự nặng nhẹ, nóng lạnh của từng phần.

### Bước 2: Tập trung vào hơi thở (3 phút)
Để ý hơi thở tự nhiên. Không cố gắng điều khiển. Chỉ quan sát hơi thở đi vào, đi ra.

### Bước 3: Đếm hơi thở (5 phút)
Khi hít vào, đếm 1. Khi thở ra, đếm 2. Đếm đến 10 rồi quay lại 1. Nếu tâm lạc, nhẹ nhàng quay lại đếm.

### Bước 4: Quan sát tâm (5 phút)
Mở rộng sự chú ý. Quan sát các suy nghĩ đến đi như mây. Không theo đuổi, không đẩy đi.

### Bước 5: Từ bi (5 phút)
Gửi lời yêu thương đến bản thân, gia đình, bạn bè và tất cả chúng sinh.

## Những khó khăn thường gặp

### Tâm không yên
Đây là bình thường. Mục tiêu không phải là không có suy nghĩ, mà là nhận biết khi có suy nghĩ.

### Ngủ gật
Nếu ngủ gật, hãy mở mắt ra hoặc thay đổi tư thế. Có thể do mệt mỏi.

### Đau lưng
Điều chỉnh tư thế. Có thể ngồi trên ghế nếu cần.

## Lợi ích của thiền định

- Giảm căng thẳng, lo âu
- Tăng sự tập trung
- Cải thiện giấc ngủ
- Tăng sự tự nhận thức
- Phát triển lòng từ bi

## Kết luận

Thiền định là hành trình, không phải đích đến. Quan trọng nhất là sự kiên nhẫn và từ bi với chính bản thân.

Nam mô Bổn Sư Thích Ca Mâu Ni Phật.
    `,
    audioUrl: 'https://example.com/audio/dharma-talk-3.mp3',
    views: 2100,
    tags: ['thiền', 'hướng dẫn', 'người mới'],
    featured: false
  },
  {
    id: 4,
    title: 'Tứ Diệu Đế: Con Đường Chấm Dứt Khổ Đau',
    speaker: 'Thích Minh Tâm',
    date: '17/04/2026',
    duration: '50 phút',
    category: 'Cơ bản',
    excerpt: 'Phân tích Tứ Diệu Đế - bốn chân lý cao quý mà Đức Phật khám phá và con đường chấm dứt khổ đau.',
    content: `
# Tứ Diệu Đế: Con Đường Chấm Dứt Khổ Đau

Kính thưa quý vị,

Tứ Diệu Đế là giáo lý nền tảng của Phật giáo, là con đường mà Đức Phật đã khám phá để chấm dứt khổ đau. Hôm nay chúng ta cùng nhau tìm hiểu sâu hơn về bốn chân lý này.

## Khổ Đế (Sự thật về khổ đau)

Đây là chân lý đầu tiên và quan trọng nhất. Đức Phật dạy rằng cuộc đời là khổ. Nhưng "khổ" ở đây không chỉ là đau đớn thể xác, mà còn là:

### Các loại khổ
1. **Khổ khổ**: Đau đớn thể xác và tinh thần
2. **Hoại khổ**: Niềm vui cũng là khổ vì nó không bền vững
3. **Hành khổ**: Sự vận động không ngừng của năm uẩn tạo ra khổ

### Nhận diện khổ trong cuộc sống
- Khổ khi không được điều mình muốn
- Khổ khi mất đi điều mình yêu quý
- Khổ khi phải sống với điều mình không thích
- Khổ khi không thể tránh khỏi sinh lão bệnh tử

## Tập Đế (Nguyên nhân của khổ đau)

Nguyên nhân sâu xa của khổ đau là "tham" (tham muốn), "sân" (giận hờn), "si" (si mê).

### Tham muốn
- Tham muốn có được
- Tham muốn được là
- Tham muốn được không

### Giận hờn
- Khi không được như ý muốn
- Khi bị mất mát
- Khi bị xúc phạm

### Si mê
- Không hiểu rõ bản chất của cuộc sống
- Chấp vào những gì không bền vững
- Quên mất sự thật của vạn pháp

## Diệt Đế (Chấm dứt khổ đau)

Khi chấm dứt tham, sân, si thì khổ đau sẽ chấm dứt. Đây là Niết bàn - trạng thái an lạc, giải thoát.

### Niết bàn không phải là nơi nào xa xôi
Niết bàn là trạng thái tâm trí:
- An lạc ngay tại đây
- Tự do khỏi chấp trước
- Sáng suốt về bản chất

### Làm thế nào để đạt được?
- Thực hành chánh niệm
- Phát triển trí tuệ
- Tuân thủ giới luật

## Đạo Đế (Con đường chấm dứt khổ đau)

Đây là Bát Chánh Đạo - con đường có tám nhánh:

### Chánh kiến
Hiểu đúng về bản chất của cuộc sống

### Chánh tư duy
Suy nghĩ đúng đắn, không tham sân si

### Chánh ngữ
Nói lời chân thật, không nói lời gây thương tổn

### Chánh nghiệp
Hành động đúng đắn, không gây hại

### Chánh mạng
Sinh sống đúng đắn, không làm nghề nghiệp gây khổ

### Chánh tinh tấn
Nỗ lực đúng đắn trên con đường tu tập

### Chánh niệm
Luôn giữ tâm tỉnh thức

### Chánh định
Tâm trí an định, không dao động

## Áp dụng vào đời sống

### Hàng ngày
- Bắt đầu ngày với chánh niệm
- Thực hành từ bi trong giao tiếp
- Duy trì chánh nghiệp trong công việc

### Khi đối mặt khó khăn
- Nhận diện khổ (khổ đế)
- Tìm hiểu nguyên nhân (tập đế)
- Tin tưởng có thể vượt qua (diệt đế)
- Thực hành giải pháp (đạo đế)

## Kết luận

Tứ Diệu Đế không phải là triết học trừu tượng. Nó là con đường thực hành mà mỗi người chúng ta có thể áp dụng ngay trong cuộc sống. Bằng cách thực hành Bát Chánh Đạo, chúng ta có thể từng bước giảm bớt khổ đau và tìm thấy an lạc.

Nam mô Bổn Sư Thích Ca Mâu Ni Phật.
    `,
    audioUrl: 'https://example.com/audio/dharma-talk-4.mp3',
    views: 1230,
    tags: ['tứ diệu đế', 'bát chánh đạo', 'cơ bản'],
    featured: false
  }
]

const categories = ['Tất cả', 'Pháp thoại cuối tuần', 'Kinh điển', 'Thiền', 'Cơ bản']

export default function DharmaTalks() {
  const [selectedCategory, setSelectedCategory] = useState('Tất cả')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTalk, setSelectedTalk] = useState<DharmaTalk | null>(null)
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false)
  
  useDocumentTitle('Pháp thoại - Chùa Diệu Pháp')

  const filteredTalks = dharmaTalksData.filter(talk => {
    const matchesCategory = selectedCategory === 'Tất cả' || talk.category === selectedCategory
    const matchesSearch = talk.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talk.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         talk.content.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredTalks = filteredTalks.filter(talk => talk.featured)
  const regularTalks = filteredTalks.filter(talk => !talk.featured)

  const handleTalkClick = (talk: DharmaTalk) => {
    setSelectedTalk(talk)
    setIsDetailModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-[#f5f0e8]">
      {/* Hero Section */}
      <section className="relative h-64 md:h-80 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "linear-gradient(to bottom, rgba(45,74,62,0.7), rgba(26,46,37,0.85)), url('/src/assets/img/Banner.jpg')"
          }}
        />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-white px-4">
          <div className="text-4xl md:text-5xl mb-4">🎙️</div>
          <h1 
            className="text-3xl md:text-5xl font-light tracking-[0.15em] uppercase leading-tight mb-4"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Pháp Thoại
          </h1>
          <p className="text-center max-w-2xl opacity-90">
            Các bài giảng pháp từ chư tôn đức Chùa Diệu Pháp, giúp chúng ta tìm hiểu và thực hành giáo lý nhà Phật.
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="bg-white py-8 px-6 md:px-12 border-b border-[#e8d5a3]">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="w-full md:w-96">
              <input
                type="text"
                placeholder="Tìm kiếm bài giảng..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-[#d4d4aa] rounded-lg focus:ring-2 focus:ring-[#2d4a3e] focus:border-[#2d4a3e] outline-none text-sm"
              />
            </div>
            
            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#2d4a3e] text-white'
                      : 'bg-[#f5f0e8] text-[#2d4a3e] hover:bg-[#e8d5a3]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Talks */}
      {featuredTalks.length > 0 && (
        <section className="py-12 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <h2 
              className="text-2xl font-semibold text-[#2d4a3e] mb-8"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Nổi bật
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {featuredTalks.map(talk => (
                <div
                  key={talk.id}
                  onClick={() => handleTalkClick(talk)}
                  className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#2d4a3e] to-[#1a2e25] flex items-center justify-center">
                    <div className="text-6xl text-white/20">🎙️</div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#2d4a3e] text-white px-3 py-1 rounded-full text-xs font-medium">
                        Nổi bật
                      </span>
                    </div>
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-[#2d4a3e]">
                      {talk.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-[#2d4a3e] mb-3 leading-tight">
                      {talk.title}
                    </h3>
                    
                    <p className="text-sm text-[#5a7060] mb-4 line-clamp-3">
                      {talk.excerpt}
                    </p>

                    <div className="flex items-center justify-between text-xs text-[#5a7060] mb-4">
                      <div className="flex items-center gap-4">
                        <span>👤 {talk.speaker}</span>
                        <span>📅 {talk.date}</span>
                      </div>
                      <span>⏱️ {talk.duration}</span>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {talk.tags.map((tag, index) => (
                        <span 
                          key={index}
                          className="bg-[#f5f0e8] text-[#2d4a3e] px-2 py-1 rounded text-xs"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-[#5a7060]">👁️ {talk.views} lượt nghe</span>
                      <button className="text-[#2d4a3e] hover:text-[#1a2e25] font-medium text-sm transition-colors">
                        Nghe ngay →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Regular Talks Grid */}
      <section className="py-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <h2 
            className="text-2xl font-semibold text-[#2d4a3e] mb-8"
            style={{ fontFamily: "'Cormorant Garamond', 'Georgia', serif" }}
          >
            Tất cả bài giảng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regularTalks.map(talk => (
              <div
                key={talk.id}
                onClick={() => handleTalkClick(talk)}
                className="bg-white rounded-xl border border-[#dde8da] overflow-hidden hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Audio Visual */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-[#2d4a3e] to-[#1a2e25] flex items-center justify-center">
                  <div className="text-5xl text-white/20">🎙️</div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-[#2d4a3e]">
                    {talk.category}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-[#2d4a3e]">
                    ⏱️ {talk.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold text-[#2d4a3e] uppercase tracking-wide mb-3 leading-snug">
                    {talk.title}
                  </h3>
                  
                  <p className="text-xs text-[#5a7060] mb-4 line-clamp-3">
                    {talk.excerpt}
                  </p>

                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-xs text-[#5a7060] mb-3">
                    <div className="flex items-center gap-3">
                      <span>👤 {talk.speaker.split(' ').pop()}</span>
                      <span>📅 {talk.date}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mb-3">
                    {talk.tags.slice(0, 2).map((tag, index) => (
                      <span 
                        key={index}
                        className="bg-[#f5f0e8] text-[#2d4a3e] px-2 py-1 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                    {talk.tags.length > 2 && (
                      <span className="bg-[#f5f0e8] text-[#2d4a3e] px-2 py-1 rounded text-xs">
                        +{talk.tags.length - 2}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#5a7060]">👁️ {talk.views} lượt nghe</span>
                    <button className="text-[#2d4a3e] hover:text-[#1a2e25] font-medium text-xs transition-colors">
                      Nghe ngay →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredTalks.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-[#2d4a3e] mb-2">Không tìm thấy bài giảng</h3>
              <p className="text-sm text-[#5a7060]">
                Không có bài giảng nào phù hợp với tìm kiếm của bạn.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Dharma Talk Detail Modal */}
      <DharmaTalkDetailModal
        isOpen={isDetailModalOpen}
        onClose={() => {
          setIsDetailModalOpen(false)
          setSelectedTalk(null)
        }}
        talk={selectedTalk}
      />
    </div>
  )
}
