import { useState, useEffect, useCallback } from "react";
import { fetchAdminBookings } from "../bookings/services/bookingAdminService";
import QuickStats from "./components/QuickStats";
import BookingToday from "./components/BookingToday";
import RevenueChart from "./components/RevenueChart";
import { Sparkles, Calendar, Clock } from "lucide-react";

export default function DashboardPage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Tải danh sách bookings tập trung để đồng bộ các widget
  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminBookings();
      setBookings(data);
    } catch (err) {
      console.error("Lỗi tải dữ liệu Dashboard:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Đồng hồ thời gian thực tế chạy mỗi giây
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const formattedDate = currentTime.toLocaleDateString("vi-VN", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="space-y-6">
      {/* Banner Chào mừng Cao cấp */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-700 p-6 md:p-8 text-white shadow-lg shadow-sky-500/10 transition-all duration-300">
        {/* Hình tròn trang trí mờ phía sau */}
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-xl"></div>
        <div className="absolute -left-10 -bottom-10 h-40 w-40 rounded-full bg-black/10 blur-xl"></div>

        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center justify-center p-1.5 rounded-lg bg-white/20 backdrop-blur-md">
                <Sparkles className="h-5 w-5 text-amber-300 fill-amber-300" />
              </span>
              <span className="text-xs md:text-sm font-bold uppercase tracking-widest text-sky-100">
                Khu vực Quản trị BarberPro
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Xin chào, BarberPro Admin! 👋
            </h1>
            <p className="text-sm md:text-base text-sky-100/90 max-w-xl">
              Hệ thống quản lý salon tóc nam cao cấp. Dưới đây là hiệu suất doanh thu và các lịch hẹn khách đặt ngày hôm nay của bạn.
            </p>
          </div>

          {/* Widget Thời gian / Lịch thực tế */}
          <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-5 py-3.5 rounded-xl border border-white/10 self-start md:self-auto min-w-[240px]">
            <div className="flex flex-col items-end flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-lg font-bold tracking-wider font-mono">
                <Clock className="h-4 w-4 text-sky-200" />
                {formattedTime}
              </div>
              <div className="text-xs text-sky-100/80 truncate capitalize">
                {formattedDate}
              </div>
            </div>
            <div className="h-8 w-px bg-white/20"></div>
            <Calendar className="h-7 w-7 text-sky-200 flex-shrink-0" />
          </div>
        </div>
      </div>

      {/* Thống kê nhanh */}
      <QuickStats bookings={bookings} loading={loading} />

      {/* Grid Biểu đồ & Lịch hẹn */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <RevenueChart bookings={bookings} loading={loading} />
        </div>
        <div className="lg:col-span-5">
          <BookingToday bookings={bookings} loading={loading} onStatusChange={loadData} />
        </div>
      </div>
    </div>
  );
}
