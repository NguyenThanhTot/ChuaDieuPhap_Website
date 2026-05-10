import { useState } from "react";
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────
interface InfoRow {
  icon: string;
  label: string;
  value: React.ReactNode;
}

interface NoteItem {
  text: string;
}

interface QAItem {
  question: string;
  answer: React.ReactNode;
}

interface GuideLink {
  icon: string;
  label: string;
  href: string;
}

// ─────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────
const infoRows: InfoRow[] = [
  {
    icon: "🕐",
    label: "Thời gian",
    value: "Vào lúc 06:00 – 17:30, Chủ nhật, ngày 19/04/2026",
  },
  {
    icon: "📍",
    label: "Địa chỉ",
    value:
      "Chùa Diệu Pháp, hẻm 106/47/9 đường Bình Lợi, phường Bình Lợi Trung, Tp. HCM (Địa chỉ cũ 188 Nơ Trang Long)",
  },
  {
    icon: "🗺️",
    label: "Bản đồ chỉ dẫn",
    value: (
      <a href="https://tinyurl.com/v5kvqvv8" target="_blank" rel="noreferrer"
        style={{ color: "#3d6b5a", textDecoration: "underline" }}>
        https://tinyurl.com/v5kvqvv8
      </a>
    ),
  },
];

const notes: NoteItem[] = [
  { text: "Nhóm ưu tiên dành cho những Phật tử chưa tham dự khóa tu và có những thắc mắc cần giải đáp." },
  { text: "KHÔNG đăng tải và bàn luận những nội dung không liên quan đến khóa tu." },
  { text: "KHÔNG nhận tin sau 22 giờ để tránh làm phiền thời gian cá nhân của mọi người." },
  { text: "Nhóm sẽ được giải tán sau khi khóa tu kết thúc 3 ngày. Ban Tổ chức sẽ tạo một group mới cho khóa tu tiếp theo để hỗ trợ tu sinh tham gia khóa tu đó." },
];

const qaItems: QAItem[] = [
  {
    question: "Đối tượng tham gia khóa tu có bị giới hạn không?",
    answer: "Khóa tu dành cho tất cả mọi người, phù hợp với tu sinh có độ tuổi từ 18 trở lên.",
  },
  {
    question: "Tu sinh tham gia có mất phí không?",
    answer: "Khóa tu hoàn toàn miễn phí, tu sinh không tốn bất kì chi phí phát sinh nào.",
  },
  {
    question: "Trang phục đến tham dự khóa tu là gì?",
    answer:
      "Tu sinh tham dự mặc áo tràng lam. Nếu tu sinh không có áo tràng, sẽ được hướng dẫn làm thủ tục đăng ký mượn áo trực tiếp tại Văn phòng đạo tràng.",
  },
  {
    question: "Khi tham gia, tu sinh lần đầu đến khóa tu cần lưu ý những gì?",
    answer: (
      <>
        Clip hướng dẫn tho trại, quà đường:{" "}
        <a href="https://fb.watch/AQuQoG7SVv/" target="_blank" rel="noreferrer"
          style={{ color: "#3d6b5a" }}>https://fb.watch/AQuQoG7SVv/</a>
        <br />
        Clip hướng dẫn lễ lạy:{" "}
        <a href="https://www.youtube.com/watch?v=SMfb3d7GQSqM" target="_blank" rel="noreferrer"
          style={{ color: "#3d6b5a" }}>https://www.youtube.com/watch?v=SMfb3d7GQSqM</a>
      </>
    ),
  },
];

const guideLinks: GuideLink[] = [
  { icon: "🔶", label: "Clip hướng dẫn tho trại, quà đường", href: "https://fb.watch/AQuQoG7SVv/" },
  { icon: "🔶", label: "Clip hướng dẫn lễ lạy", href: "https://www.youtube.com/watch?v=SMfb3d7GQSqM" },
  { icon: "📘", label: "Facebook sự kiện", href: "https://www.facebook.com/share/p/1BtLDKqZ5z/" },
];

// ─────────────────────────────────────────────
// Sub-components
// ─────────────────────────────────────────────

interface SectionCardProps {
  title: string;
  accent?: string;
  children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, accent = "#2d4a3e", children }) => (
  <div
    style={{
      background: "#ffffff",
      border: "1px solid #e0dcd4",
      borderRadius: 12,
      overflow: "hidden",
      marginBottom: 20,
    }}
  >
    <div
      style={{
        background: accent,
        padding: "12px 24px",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ color: "#ffffff", fontWeight: 600, fontSize: 14, letterSpacing: 0.4 }}>{title}</span>
    </div>
    <div style={{ padding: "20px 24px" }}>{children}</div>
  </div>
);

interface QARowProps {
  item: QAItem;
  index: number;
}

const QARow: React.FC<QARowProps> = ({ item, index }) => {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <div
      style={{
        borderBottom: index !== qaItems.length - 1 ? "1px solid #f0ede8" : "none",
        paddingBottom: 14,
        marginBottom: 14,
      }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
          padding: 0,
          textAlign: "left",
        }}
      >
        <span style={{ color: "#e8a020", fontSize: 16, flexShrink: 0, marginTop: 1 }}>❓</span>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#1a1a1a", flex: 1, lineHeight: 1.5 }}>
          {item.question}
        </span>
        <span
          style={{
            color: "#3d6b5a",
            fontSize: 18,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.22s ease",
            flexShrink: 0,
          }}
        >
          ⌄
        </span>
      </button>

      {open && (
        <div
          style={{
            marginTop: 10,
            marginLeft: 26,
            fontSize: 13,
            color: "#4a4a4a",
            lineHeight: 1.65,
            padding: "12px 14px",
            background: "#f7f5f1",
            borderRadius: 8,
            borderLeft: "3px solid #3d6b5a",
          }}
        >
          <span style={{ color: "#3d6b5a", marginRight: 6 }}>✅</span>
          {item.answer}
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────
// Main Page
// ─────────────────────────────────────────────
const NotificationDetail: React.FC = () => {
  const zaloLink = "https://zalo.me/g/kdvzok275";
  
  useDocumentTitle('Chi tiết thông báo - Chùa Diệu Pháp');

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .detail-card {
          animation: fadeUp 0.4s ease both;
        }
        .detail-card:nth-child(1) { animation-delay: 0.05s; }
        .detail-card:nth-child(2) { animation-delay: 0.10s; }
        .detail-card:nth-child(3) { animation-delay: 0.15s; }
        .detail-card:nth-child(4) { animation-delay: 0.20s; }
        .detail-card:nth-child(5) { animation-delay: 0.25s; }

        a { transition: opacity 0.15s; }
        a:hover { opacity: 0.75; }
      `}</style>

      <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", background: "#f5f0e8", minHeight: "100vh" }}>

        {/* ── BREADCRUMB ── */}
        <div
          style={{
            background: "#ffffff",
            padding: "14px 48px",
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: 13,
            color: "#7a7a7a",
            borderBottom: "1px solid #e0dcd4",
          }}
        >
          <a href="/" style={{ color: "#7a7a7a", textDecoration: "none" }}>🏠 Trang chủ</a>
          <span style={{ opacity: 0.4 }}>›</span>
          <a href="/notifications" style={{ color: "#7a7a7a", textDecoration: "none" }}>Thông báo</a>
          <span style={{ opacity: 0.4 }}>›</span>
          <span style={{ color: "#1a1a1a", fontWeight: 600 }}>Chi tiết</span>
        </div>

        {/* ── MAIN ── */}
        <div style={{ maxWidth: 820, margin: "0 auto", padding: "40px 24px 60px" }}>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28,
              fontWeight: 600,
              color: "#1a1a1a",
              textAlign: "center",
              lineHeight: 1.3,
              marginBottom: 8,
              padding: "0 16px",
              animation: "fadeUp 0.4s ease both",
            }}
          >
            KHOÁ TU "MỘT NGÀY LY THAM" LẦN THỨ 01
          </h1>

          {/* Badge */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 32 }}>
            <span
              style={{
                background: "#2d4a3e",
                color: "#ffffff",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: 1.5,
                textTransform: "uppercase",
                padding: "5px 14px",
                borderRadius: 20,
              }}
            >
              Thông tin khoá tu
            </span>
          </div>

          {/* ── INFO CARD ── */}
          <div className="detail-card">
            <SectionCard title="*THÔNG TIN KHOÁ TU:">
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {infoRows.map((row, i) => (
                  <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <span style={{ fontSize: 18, flexShrink: 0 }}>{row.icon}</span>
                    <div>
                      <span style={{ fontSize: 13, color: "#7a7a7a", fontWeight: 500 }}>{row.label}: </span>
                      <span style={{ fontSize: 13, color: "#2a2a2a", lineHeight: 1.6 }}>{row.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>

          {/* ── TU SINH LẦN ĐẦU ── */}
          <div className="detail-card">
            <SectionCard title="TU SINH LẦN ĐẦU THAM GIA" accent="#3d6b5a">
              <p style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.7, marginBottom: 14 }}>
                Hãy vào nhóm <em>"Cùng đi khóa tu"</em> để cùng làm quen, chia sẻ, hỗ trợ nhau và lan tỏa niềm vui tu học với các bạn đồng tu:
              </p>
              <a
                href={zaloLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#0068ff",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "9px 18px",
                  fontSize: 13,
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                💬 Tham gia nhóm Zalo
              </a>
            </SectionCard>
          </div>

          {/* ── LƯU Ý ── */}
          <div className="detail-card">
            <SectionCard title="*Lưu ý:" accent="#5a4e2d">
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {notes.map((note, i) => (
                  <li key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ color: "#c0392b", fontSize: 14, flexShrink: 0, marginTop: 2 }}>–</span>
                    <span style={{ fontSize: 13, color: "#3a3a3a", lineHeight: 1.65 }}>{note.text}</span>
                  </li>
                ))}
              </ul>
            </SectionCard>
          </div>

          {/* ── Q&A ── */}
          <div className="detail-card">
            <SectionCard title="*MỘT SỐ CÂU HỎI THƯỜNG GẶP:">
              {qaItems.map((item, i) => (
                <QARow key={i} item={item} index={i} />
              ))}
            </SectionCard>
          </div>

          {/* ── HƯỚNG DẪN THAM GIA ── */}
          <div className="detail-card">
            <SectionCard title="*HƯỚNG DẪN THAM GIA" accent="#2d4a3e">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {guideLinks.map((g, i) => (
                  <a
                    key={i}
                    href={g.href}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      padding: "10px 14px",
                      background: "#f7f5f1",
                      borderRadius: 8,
                      textDecoration: "none",
                      color: "#1a1a1a",
                      fontSize: 13,
                      border: "1px solid #e8e4dc",
                      transition: "background 0.18s",
                    }}
                  >
                    <span>{g.icon}</span>
                    <span style={{ flex: 1 }}>{g.label}</span>
                    <span style={{ color: "#3d6b5a", fontSize: 16 }}>→</span>
                  </a>
                ))}
              </div>

              {/* Contact */}
              <div
                style={{
                  marginTop: 20,
                  padding: "14px 16px",
                  background: "#edf4f0",
                  borderRadius: 8,
                  fontSize: 13,
                  color: "#2a2a2a",
                  lineHeight: 1.65,
                  borderLeft: "3px solid #3d6b5a",
                }}
              >
                <span style={{ fontSize: 16 }}>✉️ </span>
                Mọi thông tin thắc mắc, quý vị có thể liên hệ trực tiếp qua fanpage{" "}
                <strong>Chùa Diệu Pháp – Bình Thạnh</strong> hoặc qua hotline của khóa tu:{" "}
                <strong>0943.780.701</strong>
              </div>

              {/* Closing */}
              <p
                style={{
                  marginTop: 18,
                  fontSize: 13,
                  color: "#4a4a4a",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  textAlign: "center",
                }}
              >
                Quý Phật tử hoan hỷ chia sẻ thông tin tạo điều kiện cho mọi người cùng tham gia.
                <br />
                <strong style={{ fontStyle: "normal", color: "#2d4a3e" }}>
                  Nam Mô Hoàn Hỷ Tạng Bồ Tát Ma Ha Tát.
                </strong>
              </p>
            </SectionCard>
          </div>

          {/* ── Back button ── */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 8 }}>
            <a
              href="/notifications"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                color: "#3d6b5a",
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              ← Quay lại danh sách thông báo
            </a>
          </div>

        </div>
      </div>
    </>
  );
};

export default NotificationDetail;
