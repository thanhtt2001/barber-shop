import { useState, Suspense, useEffect } from "react";
import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuthStore from "@/modules/admin/auth/store/authStore";
import Loader from "@/shared/components/Loader";
import {
  LayoutDashboard,
  Calendar,
  Image as ImageIcon,
  Sparkles,
  MapPin,
  Package,
  Megaphone,
  FileText,
  LogOut,
  Menu,
  Bell,
  Moon,
  Scissors,
  TrendingUp,
  ExternalLink,
  Inbox
} from "lucide-react";

const sidebarLinks = [
  {
    to: "/admin/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    to: "/admin/bookings",
    label: "Lịch hẹn",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    to: "/admin/revenue",
    label: "Doanh thu",
    icon: <TrendingUp className="w-5 h-5" />,
  },
  {
    to: "/admin/gallery",
    label: "Ảnh mẫu tóc",
    icon: <ImageIcon className="w-5 h-5" />,
  },
  {
    to: "/admin/services",
    label: "Dịch vụ",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    to: "/admin/branches",
    label: "Cơ sở",
    icon: <MapPin className="w-5 h-5" />,
  },
  {
    to: "/admin/products",
    label: "Sản phẩm",
    icon: <Package className="w-5 h-5" />,
  },
  {
    to: "/admin/events",
    label: "Sự kiện",
    icon: <Megaphone className="w-5 h-5" />,
  },
  {
    to: "/admin/news",
    label: "Bài viết",
    icon: <FileText className="w-5 h-5" />,
  },
];

const pageTitles = {
  "/admin/dashboard": "Dashboard",
  "/admin/bookings": "Quản lý lịch hẹn",
  "/admin/revenue": "Quản lý doanh thu",
  "/admin/gallery": "Quản lý ảnh mẫu tóc",
  "/admin/services": "Quản lý dịch vụ",
  "/admin/branches": "Quản lý cơ sở",
  "/admin/products": "Quản lý sản phẩm",
  "/admin/events": "Quản lý sự kiện",
  "/admin/news": "Quản lý bài viết",
};

function SidebarContent({ user, onLogout, onLinkClick }) {
  return (
    <div className="flex flex-col h-full bg-white text-gray-800">
      {/* Brand */}
      <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-3 hover:opacity-85 transition-opacity" title="Quay về trang chủ">
          <div className="w-9 h-9 bg-gradient-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center shadow-sm">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold font-display text-sm block text-gray-900 leading-none">
              Barber<span className="text-brand">Pro</span>
            </span>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider uppercase mt-1 block select-none">
              Hệ quản trị CMS
            </span>
          </div>
        </NavLink>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-1.5 overflow-y-auto" aria-label="Menu quản trị">
        {sidebarLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onLinkClick}
            className={({ isActive }) =>
              [
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 group outline-none select-none focus:outline-none focus-visible:outline-none",
                isActive
                  ? "bg-brand text-white shadow-md shadow-brand/20"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
              ].join(" ")
            }
          >
            {link.icon}
            {link.label}
          </NavLink>
        ))}
      </nav>

      {/* User Profile Section at bottom of Sidebar */}
      <div className="p-4 border-t border-gray-100 flex items-center justify-between gap-3 bg-gray-50/50">
        <div className="flex items-center gap-3 min-w-0">
          {/* Avatar */}
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-light to-brand flex items-center justify-center text-brand font-bold text-sm shadow-sm flex-shrink-0 border border-brand/10">
            {(user?.name || "A").charAt(0).toUpperCase()}
          </div>
          {/* User Info */}
          <div className="min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate leading-tight">
              {user?.name || "Admin BarberPro"}
            </p>
            <p className="text-xs text-gray-400 font-medium truncate mt-0.5 select-none">
              {user?.role === "admin" ? "Quản trị viên" : "Nhân viên"}
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          title="Đăng xuất"
          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-200 flex-shrink-0"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [pendingBookings, setPendingBookings] = useState([]);

  const loadNotifications = () => {
    const stored = localStorage.getItem("barberpro_admin_bookings");
    if (stored) {
      try {
        const list = JSON.parse(stored);
        // Lấy các lịch pending xếp mới nhất lên đầu
        const pending = list.filter((b) => b.status === "pending");
        setPendingBookings(pending);
      } catch (e) {
        console.error("Lỗi đọc thông báo đặt lịch:", e);
      }
    }
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(loadNotifications, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentTitle = pageTitles[location.pathname] || "Admin";

  const handleLogout = () => {
    logout();
    navigate("/admin/login", { replace: true });
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] grid grid-cols-1 lg:grid-cols-[260px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col bg-white border-r border-gray-100 h-screen sticky top-0" aria-label="Sidebar quản trị">
        <SidebarContent user={user} onLogout={handleLogout} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
            onClick={closeMobileMenu}
            aria-hidden="true"
          />

          {/* Drawer */}
          <aside
            className="absolute left-0 top-0 bottom-0 w-72 bg-white flex flex-col shadow-2xl animate-slide-in-left"
            aria-label="Menu quản trị di động"
          >
            <SidebarContent user={user} onLogout={handleLogout} onLinkClick={closeMobileMenu} />
          </aside>
        </div>
      )}

      {/* Main content area */}
      <div className="flex flex-col min-h-screen">
        {/* TopBar */}
        <header className="bg-white border-b border-gray-100 px-4 sm:px-6 py-4 flex items-center justify-between gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            {/* Hamburger button (mobile only) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors flex-shrink-0"
              aria-label="Mở menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Current Page Title */}
            <h2 className="text-base sm:text-lg font-bold text-gray-800 font-display truncate select-none">
              {currentTitle}
            </h2>
          </div>

          <div className="flex items-center gap-3.5 flex-shrink-0">
            {/* View Homepage Button */}
            <NavLink
              to="/"
              className="flex items-center gap-1.5 text-xs font-bold text-gray-600 hover:text-brand hover:bg-brand/5 border border-gray-150 rounded-xl px-3 py-2 transition-all shadow-sm"
              title="Quay lại trang chủ website"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Xem trang chủ</span>
            </NavLink>

            {/* Notification Icon & Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  loadNotifications();
                  setIsNotificationsOpen(!isNotificationsOpen);
                }}
                className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all outline-none focus:outline-none"
                aria-label="Thông báo"
              >
                <Bell className="w-5 h-5" />
                {pendingBookings.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 min-w-[15px] h-3.5 bg-red-500 rounded-full border border-white text-[8px] text-white font-extrabold flex items-center justify-center px-0.5">
                    {pendingBookings.length}
                  </span>
                )}
              </button>

              {/* Backdrop đóng dropdown khi click ngoài */}
              {isNotificationsOpen && (
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsNotificationsOpen(false)}
                />
              )}

              {/* Dropdown thông báo */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl border border-gray-150 shadow-xl z-50 py-1 origin-top-right transition-all">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-sm">Lịch hẹn chờ duyệt</span>
                    {pendingBookings.length > 0 && (
                      <span className="text-[10px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold">
                        {pendingBookings.length} mới
                      </span>
                    )}
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-gray-50">
                    {pendingBookings.length === 0 ? (
                      <div className="px-4 py-8 text-center flex flex-col items-center justify-center text-gray-400 gap-1.5">
                        <Inbox className="w-8 h-8 text-gray-300" />
                        <p className="text-xs font-semibold">Tuyệt vời! Không có lịch chờ duyệt.</p>
                      </div>
                    ) : (
                      pendingBookings.slice(0, 5).map((booking) => (
                        <div
                          key={booking.id}
                          onClick={() => {
                            setIsNotificationsOpen(false);
                            navigate("/admin/bookings");
                          }}
                          className="px-4 py-3 hover:bg-slate-50/60 transition-colors cursor-pointer flex gap-3 text-left"
                        >
                          <div className="w-8 h-8 rounded-lg bg-sky-55/10 text-sky-600 font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5 border border-sky-100">
                            {booking.fullName.slice(0, 2).toUpperCase()}
                          </div>
                          <div className="min-w-0 flex-1 space-y-0.5">
                            <p className="text-xs text-gray-800 leading-normal">
                              Khách hàng <span className="font-bold text-gray-900">{booking.fullName}</span> đặt lịch <span className="font-semibold text-sky-600">{booking.service}</span>.
                            </p>
                            <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                              <span className="font-semibold text-slate-500">{booking.time} · {booking.date}</span>
                              <span>·</span>
                              <span className="truncate">{booking.branchName.split("—")[1] || booking.branchName}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  {pendingBookings.length > 0 && (
                    <div className="p-2 border-t border-gray-100 text-center">
                      <button
                        onClick={() => {
                          setIsNotificationsOpen(false);
                          navigate("/admin/bookings");
                        }}
                        className="w-full text-xs font-bold text-sky-600 hover:text-sky-700 py-1.5 hover:bg-sky-50/50 rounded-lg transition-colors"
                      >
                        Xem tất cả lịch hẹn
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Dark Mode Icon */}
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-xl transition-all" aria-label="Chế độ tối">
              <Moon className="w-5 h-5" />
            </button>

            {/* Vertical Divider */}
            <span className="h-5 w-px bg-gray-200" aria-hidden="true" />

            {/* CMS Title */}
            <span className="text-sm font-semibold text-gray-600 tracking-wide select-none">
              BarberPro CMS
            </span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          <Suspense fallback={<Loader className="h-64" text="Đang tải nội dung..." />}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
