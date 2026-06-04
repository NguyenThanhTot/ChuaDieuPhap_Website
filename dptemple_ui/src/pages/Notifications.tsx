import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDocumentTitle } from '@/hooks/useDocumentTitle';
import { notificationService } from '@/services/notificationService';
import type { Notification, Pageable } from '@/types';

const formatDate = (dateString: string) => {
  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('vi-VN')
  } catch {
    return dateString
  }
}

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
    disabled?: boolean;
    onClick?: () => void;
}

const PageBtn: React.FC<PageBtnProps> = ({ children, active = false, disabled = false, onClick }) => {
    const [hovered, setHovered] = useState<boolean>(false);

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                height: 36,
                minWidth: 36,
                padding: "0 14px",
                border: `1px solid ${active ? "#2d4a3e" : hovered && !disabled ? "#3d6b5a" : "#e0dcd4"}`,
                background: active ? "#2d4a3e" : hovered && !disabled ? "#edf4f0" : "#ffffff",
                borderRadius: 7,
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontSize: 13,
                fontWeight: active ? 600 : 400,
                color: active ? "#ffffff" : disabled ? "#ccc" : hovered ? "#2d4a3e" : "#4a4a4a",
                cursor: disabled ? "not-allowed" : "pointer",
                transition: "all 0.18s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: disabled ? 0.5 : 1,
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
    const [notifications, setNotifications] = useState<Notification[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(1)
    const [loading, setLoading] = useState<boolean>(true)
    const navigate = useNavigate();
    
    useDocumentTitle('Thông báo - Chùa Diệu Pháp');

    useEffect(() => {
        fetchNotifications()
    }, [currentPage])

    const fetchNotifications = async () => {
        try {
            setLoading(true)
            const pageable: Pageable = {
                page: currentPage,
                size: 12
            }
            const response = await notificationService.findAllPublished(pageable)
            if (response) {
                setNotifications(response.content || [])
                setTotalPages(response.totalPages || 1)
            }
        } catch (error) {
            console.error('Failed to fetch notifications:', error)
        } finally {
            setLoading(false)
        }
    }

    const handlePrev = (): void => setCurrentPage((p) => Math.max(0, p - 1));
    const handleNext = (): void => setCurrentPage((p) => Math.min(totalPages - 1, p + 1));
    const handleNotificationClick = (id: string): void => navigate(`/notifications/${id}`);

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@300;400;500;600;700&family=Playfair+Display:wght@600&display=swap');
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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
                    {loading ? (
                        <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                            <div style={{ display: 'inline-block', animation: 'spin 1s linear infinite' }}>⏳</div>
                            <p style={{ color: '#7a7a7a', marginTop: 12 }}>Đang tải thông báo...</p>
                        </div>
                    ) : (
                        <>
                            {/* Notification list */}
                            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                                {notifications.map((n, i) => (
                                    <NotifItem
                                        key={n.id}
                                        title={n.title}
                                        date={formatDate(n.createdAt || n.updatedAt)}
                                        index={i}
                                        onClick={() => handleNotificationClick(n.id)}
                                    />
                                ))}
                            </div>

                            {notifications.length === 0 && (
                                <div style={{ textAlign: 'center', padding: '40px 24px' }}>
                                    <p style={{ color: '#7a7a7a', fontSize: 14 }}>Không có thông báo nào.</p>
                                </div>
                            )}

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 40, flexWrap: 'wrap' }}>
                                    <PageBtn onClick={handlePrev} disabled={currentPage === 0}>← Lùi lại</PageBtn>

                                    <span style={{ color: "#7a7a7a", fontSize: 13, padding: "0 8px" }}>
                                        Trang {currentPage + 1} / {totalPages}
                                    </span>

                                    <PageBtn onClick={handleNext} disabled={currentPage >= totalPages - 1}>Tiếp theo →</PageBtn>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Notifications;
