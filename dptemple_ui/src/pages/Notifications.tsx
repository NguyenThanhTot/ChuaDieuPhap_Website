import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from '@/hooks/useDocumentTitle';

interface Notification {
    id: number;
    title: string;
    date: string;
}

const notifications: Notification[] = [
    { id: 1, title: "Thông báo đăng ký Quy Y Tam Bảo", date: "08/05/2026" },
    { id: 2, title: "Thông báo đăng ký Quy Y Tam Bảo", date: "07/05/2026" },
    { id: 3, title: "Thông báo đăng ký Quy Y Tam Bảo", date: "06/05/2026" },
    { id: 4, title: "Thông báo đăng ký Quy Y Tam Bảo", date: "05/05/2026" },
    { id: 5, title: "Thông báo đăng ký Quy Y Tam Bảo", date: "04/05/2026" },
    { id: 6, title: "Thông báo đăng ký Quy Y Tam Bảo", date: "03/05/2026" },
];

const TOTAL_PAGES = 10;

// ─────────────────────────────────────────────
// BellIcon
// ─────────────────────────────────────────────
const BellIcon: React.FC = () => (
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="rgba(255,255,255,0.85)"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ width: 24, height: 24 }}
    >
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

// ─────────────────────────────────────────────
// NotifItem
// ─────────────────────────────────────────────
interface NotifItemProps {
    title: string;
    date: string;
    index: number;
    onClick?: () => void;
}

const NotifItem: React.FC<NotifItemProps> = ({ title, date, index, onClick }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                background: "#ffffff",
                border: `1px solid ${hovered ? "#b8cfc5" : "#e0dcd4"}`,
                borderRadius: 10,
                padding: "20px 24px",
                display: "flex",
                alignItems: "center",
                gap: 18,
                cursor: "pointer",
                transition: "all 0.22s ease",
                transform: hovered ? "translateY(-1px)" : "translateY(0)",
                boxShadow: hovered ? "0 4px 18px rgba(45,74,62,0.08)" : "none",
                animation: `fadeSlideIn 0.35s ease ${index * 0.05 + 0.05}s both`,
                position: "relative",
                overflow: "hidden",
            }}
        >
            {/* Left accent bar */}
            <div
                style={{
                    position: "absolute",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 3,
                    background: "#3d6b5a",
                    borderRadius: "0 2px 2px 0",
                    transform: hovered ? "scaleY(1)" : "scaleY(0)",
                    transition: "transform 0.22s ease",
                }}
            />

            {/* Bell icon */}
            <div
                style={{
                    width: 52,
                    height: 52,
                    background: "#2d4a3e",
                    borderRadius: 10,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                }}
            >
                <BellIcon />
            </div>

            {/* Text */}
            <div style={{ flex: 1 }}>
                <div style={{ fontSize: 15, fontWeight: 500, color: "#1a1a1a", lineHeight: 1.4 }}>
                    {title}
                </div>
                <div style={{ fontSize: 12, color: "#7a7a7a", marginTop: 4 }}>{date}</div>
            </div>

            {/* Arrow */}
            <div
                style={{
                    color: hovered ? "#3d6b5a" : "#7a7a7a",
                    fontSize: 20,
                    transform: hovered ? "translateX(4px)" : "translateX(0)",
                    transition: "transform 0.2s, color 0.2s",
                    flexShrink: 0,
                }}
            >
                ›
            </div>
        </div>
    );
};

// ─────────────────────────────────────────────
// PageBtn
// ─────────────────────────────────────────────
interface PageBtnProps {
    children: React.ReactNode;
    active?: boolean;
    onClick?: () => void;
}

const PageBtn: React.FC<PageBtnProps> = ({ children, active = false, onClick }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                height: 36,
                minWidth: 36,
                padding: "0 14px",
                border: `1px solid ${active ? "#2d4a3e" : hovered ? "#3d6b5a" : "#e0dcd4"}`,
                background: active ? "#2d4a3e" : hovered ? "#edf4f0" : "#ffffff",
                borderRadius: 7,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? "#ffffff" : hovered ? "#2d4a3e" : "#4a4a4a",
                cursor: "pointer",
                transition: "all 0.18s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {children}
        </button>
    );
};

// ─────────────────────────────────────────────
// Notifications (main page)
// ─────────────────────────────────────────────
const Notifications: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<number>(1);
    const navigate = useNavigate();
    
    useDocumentTitle('Thông báo - Chùa Diệu Pháp');

    const handlePrev = (): void => setCurrentPage((p) => Math.max(1, p - 1));
    const handleNext = (): void => setCurrentPage((p) => Math.min(TOTAL_PAGES, p + 1));
    const handleNotificationClick = (id: number): void => navigate(`/notifications/${id}`);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Playfair+Display:wght@600&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

            <div style={{ fontFamily: "'Be Vietnam Pro', sans-serif", background: "#f5f0e8", minHeight: "100vh" }}>

                {/* ── HERO ── */}
                <div
                    style={{
                        background: "#2d4a3e",
                        padding: "48px 24px 40px",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "radial-gradient(ellipse at 30% 50%, rgba(90,138,114,0.2) 0%, transparent 60%), " +
                                "radial-gradient(ellipse at 70% 30%, rgba(61,107,90,0.3) 0%, transparent 50%)",
                            pointerEvents: "none",
                        }}
                    />
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 16 }}>
                        <span style={{ fontSize: 28, opacity: 0.9 }}>📖</span>
                        <h1
                            style={{
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 32,
                                fontWeight: 600,
                                color: "#ffffff",
                                letterSpacing: 4,
                                textTransform: "uppercase",
                                margin: 0,
                            }}
                        >
                            Thông Báo
                        </h1>
                    </div>
                    <p
                        style={{
                            color: "rgba(255,255,255,0.75)",
                            fontSize: 14,
                            lineHeight: 1.6,
                            maxWidth: 560,
                            margin: "0 auto 20px",
                            fontWeight: 300,
                        }}
                    >
                        Các thông báo mới nhất từ Chùa Diệu Pháp về lịch hoạt động, sự kiện và các chương trình tu học.
                    </p>
                    <div
                        style={{
                            display: "inline-block",
                            border: "1px solid rgba(255,255,255,0.25)",
                            borderRadius: 6,
                            padding: "10px 20px",
                            color: "rgba(255,255,255,0.7)",
                            fontSize: 13,
                            fontStyle: "italic",
                            background: "rgba(255,255,255,0.06)",
                            maxWidth: 480,
                        }}
                    >
                        "Thông báo chính xác, kịp thời để Phật tử luôn nắm bắt được các hoạt động."
                    </div>
                </div>

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
                    <a href="/" style={{ color: "#7a7a7a", textDecoration: "none", display: "flex", alignItems: "center", gap: 4 }}>
                        🏠 Trang chủ
                    </a>
                    <span style={{ opacity: 0.4 }}>›</span>
                    <span style={{ color: "#1a1a1a", fontWeight: 600 }}>Thông báo</span>
                </div>

                {/* ── MAIN ── */}
                <div style={{ maxWidth: 880, margin: "0 auto", padding: "36px 24px 48px" }}>

                    {/* Notification list */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {notifications.map((n, i) => (
                            <NotifItem
                                key={n.id}
                                title={n.title}
                                date={n.date}
                                index={i}
                                onClick={() => handleNotificationClick(n.id)}
                            />
                        ))}
                    </div>

                    {/* Pagination */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 40 }}>
                        <PageBtn onClick={handlePrev}>← Lùi lại</PageBtn>

                        {[1, 2, 3].map((p) => (
                            <PageBtn key={p} active={currentPage === p} onClick={() => setCurrentPage(p)}>
                                {p}
                            </PageBtn>
                        ))}

                        <span style={{ color: "#7a7a7a", fontSize: 13, padding: "0 4px" }}>…</span>

                        <PageBtn active={currentPage === TOTAL_PAGES} onClick={() => setCurrentPage(TOTAL_PAGES)}>
                            {TOTAL_PAGES}
                        </PageBtn>

                        <PageBtn onClick={handleNext}>Tiếp theo →</PageBtn>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Notifications;
