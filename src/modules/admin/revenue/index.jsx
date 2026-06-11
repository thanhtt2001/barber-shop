import { useState, useEffect, useCallback } from "react";
import { fetchAdminBookings } from "../bookings/services/bookingAdminService";
import Loader from "@/shared/components/Loader";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Search,
  DollarSign,
  CalendarCheck,
  TrendingUp,
  Percent,
  Sparkles,
  MapPin,
  Filter,
  RefreshCw,
  Clock,
  ArrowUpDown,
  Download,
} from "lucide-react";

// Bản đồ giá dịch vụ để tính doanh số
const SERVICE_PRICES = {
  "Cắt cơ bản": 50000,
  "Cắt + Uốn / Duỗi": 250000,
  "Nhuộm màu": 350000,
  "Cạo râu": 40000,
  "Gội đầu dưỡng sinh": 80000,
  "Combo VIP": 150000,
};

// Chi tiết các chi nhánh
const BRANCHES_MAP = [
  { id: "hung-yen-1", name: "Cơ sở 1 (Nguyễn Văn Linh)", color: "#0ea5e9" },
  { id: "hung-yen-2", name: "Cơ sở 2 (Phố Nối)", color: "#8b5cf6" },
  { id: "hung-yen-3", name: "Cơ sở 3 (Trần Phú)", color: "#10b981" },
];

function formatYAxis(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}tr`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
  return value;
}

export default function RevenuePage() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState("month"); // 'month' | 'prev-month' | 'all'
  const [trendDays, setTrendDays] = useState(7); // 7 | 30

  // Bộ lọc cho danh sách ledger giao dịch
  const [searchTerm, setSearchTerm] = useState("");
  const [branchFilter, setBranchFilter] = useState("all");
  const [serviceFilter, setServiceFilter] = useState("all");

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchAdminBookings();
      setBookings(data);
    } catch (err) {
      console.error("Lỗi tải dữ liệu doanh thu:", err);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Lấy danh sách lịch đã duyệt (Confirmed) mang lại doanh thu
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed");

  // 1. Xác định thời gian hệ thống
  const todayStr = new Date().toISOString().split("T")[0];
  const todayStrShort = todayStr.substring(0, 10);
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1;
  const currentMonthStr = `${currentYear}-${String(currentMonth).padStart(2, "0")}`;

  const prevMonthDate = new Date();
  prevMonthDate.setMonth(prevMonthDate.getMonth() - 1);
  const prevMonthStr = `${prevMonthDate.getFullYear()}-${String(
    prevMonthDate.getMonth() + 1
  ).padStart(2, "0")}`;

  // 2. Lọc danh sách giao dịch theo tab thời gian hiện tại
  const timeFilteredBookings = confirmedBookings.filter((b) => {
    if (timeRange === "month") {
      return b.date.substring(0, 7) === currentMonthStr;
    } else if (timeRange === "prev-month") {
      return b.date.substring(0, 7) === prevMonthStr;
    }
    return true; // all
  });

  // 3. Tính toán các chỉ số cho thẻ Analytics
  // Doanh thu hôm nay (luôn tính theo hôm nay)
  const revenueToday = confirmedBookings
    .filter((b) => b.date === todayStrShort)
    .reduce((sum, b) => sum + (SERVICE_PRICES[b.service] || 100000), 0);

  // Doanh thu trong khoảng thời gian được lọc
  const totalRevenueFiltered = timeFilteredBookings.reduce(
    (sum, b) => sum + (SERVICE_PRICES[b.service] || 100000),
    0
  );

  // Lịch hẹn thành công trong khoảng thời gian được lọc
  const successBookingsCount = timeFilteredBookings.length;

  // Giá trị giao dịch trung bình
  const avgOrderValue =
    successBookingsCount > 0 ? Math.round(totalRevenueFiltered / successBookingsCount) : 0;

  // 4. Chuẩn bị dữ liệu cho Biểu đồ Xu hướng (Revenue Trend Chart)
  // Tạo mảng N ngày gần đây
  const getTrendData = () => {
    const result = [];
    for (let i = trendDays - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];

      // Tính doanh thu ngày đó
      const dayRevenue = confirmedBookings
        .filter((b) => b.date === dateStr)
        .reduce((sum, b) => sum + (SERVICE_PRICES[b.service] || 100000), 0);

      const dayLabel = d.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
      });

      result.push({
        date: dateStr,
        dayLabel,
        revenue: dayRevenue,
      });
    }
    return result;
  };

  const trendChartData = getTrendData();

  // 5. Chuẩn bị dữ liệu cho Biểu đồ Chi nhánh (Branch Revenue Share)
  const branchChartData = BRANCHES_MAP.map((branch) => {
    const branchRevenues = timeFilteredBookings
      .filter((b) => b.branch === branch.id)
      .reduce((sum, b) => sum + (SERVICE_PRICES[b.service] || 100000), 0);

    return {
      name: branch.name,
      Doanh_thu: branchRevenues,
      fill: branch.color,
    };
  });

  // 6. Lọc danh sách nhật ký giao dịch ở bảng (Ledger)
  const ledgerData = confirmedBookings.filter((b) => {
    // Lọc theo tìm kiếm (Tên, SĐT)
    const matchesSearch =
      b.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.phone.includes(searchTerm);
    // Lọc theo chi nhánh
    const matchesBranch = branchFilter === "all" || b.branch === branchFilter;
    // Lọc theo dịch vụ
    const matchesService = serviceFilter === "all" || b.service === serviceFilter;
    // Lọc theo khoảng thời gian tab
    let matchesTime = true;
    if (timeRange === "month") {
      matchesTime = b.date.substring(0, 7) === currentMonthStr;
    } else if (timeRange === "prev-month") {
      matchesTime = b.date.substring(0, 7) === prevMonthStr;
    }

    return matchesSearch && matchesBranch && matchesService && matchesTime;
  });

  // Định dạng hiển thị tiền tệ
  const formatCurrency = (val) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader text="Đang phân tích số liệu tài chính..." />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Tiêu đề & Chọn khoảng thời gian nhanh */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 font-display">Báo cáo tài chính & Doanh số</h2>
          <p className="text-xs text-gray-500 mt-1">
            Dữ liệu doanh thu thực tế từ các lịch hẹn đã xác nhận thanh toán.
          </p>
        </div>

        {/* Nút lọc thời gian */}
        <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-gray-150 shadow-sm self-start">
          <button
            onClick={() => setTimeRange("month")}
            className={[
              "text-xs font-bold px-3-5 py-2 rounded-lg transition-all whitespace-nowrap",
              timeRange === "month"
                ? "bg-brand text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
            ].join(" ")}
          >
            Tháng này
          </button>
          <button
            onClick={() => setTimeRange("prev-month")}
            className={[
              "text-xs font-bold px-3-5 py-2 rounded-lg transition-all whitespace-nowrap",
              timeRange === "prev-month"
                ? "bg-brand text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
            ].join(" ")}
          >
            Tháng trước
          </button>
          <button
            onClick={() => setTimeRange("all")}
            className={[
              "text-xs font-bold px-3-5 py-2 rounded-lg transition-all whitespace-nowrap",
              timeRange === "all"
                ? "bg-brand text-white shadow-sm"
                : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
            ].join(" ")}
          >
            Toàn thời gian
          </button>
        </div>
      </div>

      {/* 4 Thẻ phân tích nhanh (Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: Doanh thu lọc */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 bg-sky-500/5 rounded-bl-full"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Doanh thu ({timeRange === "month" ? "Tháng này" : timeRange === "prev-month" ? "Tháng trước" : "Toàn bộ"})
              </span>
              <p className="text-2xl font-extrabold text-sky-600 font-mono tracking-tight">
                {formatCurrency(totalRevenueFiltered)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1.5 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-sky-500" />
            Đã đồng bộ hóa dữ liệu lịch đặt
          </p>
        </div>

        {/* Card 2: Doanh thu hôm nay */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 bg-emerald-500/5 rounded-bl-full"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Doanh thu hôm nay
              </span>
              <p className="text-2xl font-extrabold text-emerald-600 font-mono tracking-tight">
                {formatCurrency(revenueToday)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1.5 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-500" />
            Cập nhật trực tiếp thời gian thực
          </p>
        </div>

        {/* Card 3: Số đơn hàng */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 bg-violet-500/5 rounded-bl-full"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Lịch hẹn thành công
              </span>
              <p className="text-2xl font-extrabold text-violet-600 font-mono tracking-tight">
                {successBookingsCount} lịch
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-violet-50 flex items-center justify-center text-violet-500 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1.5 font-medium">
            <TrendingUp className="w-3.5 h-3.5 text-violet-500" />
            Các đơn hàng đã duyệt hoàn tất
          </p>
        </div>

        {/* Card 4: Giá trị trung bình */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow group relative overflow-hidden">
          <div className="absolute right-0 top-0 h-16 w-16 bg-amber-500/5 rounded-bl-full"></div>
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                Đơn giá trung bình
              </span>
              <p className="text-2xl font-extrabold text-amber-600 font-mono tracking-tight">
                {formatCurrency(avgOrderValue)}
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
              <Percent className="w-5 h-5" />
            </div>
          </div>
          <p className="text-[11px] text-gray-400 mt-4 flex items-center gap-1.5 font-medium">
            <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
            Tính trên số đơn thành công
          </p>
        </div>
      </div>

      {/* Phần đồ họa Biểu đồ (Charts) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Biểu đồ xu hướng (Area Chart) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">Biểu đồ tăng trưởng</h3>
              <p className="text-[11px] text-gray-400 mt-0.5">Xu hướng doanh thu qua các mốc ngày</p>
            </div>

            {/* Filter mốc ngày */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200">
              <button
                onClick={() => setTrendDays(7)}
                className={[
                  "text-[10px] font-bold px-2.5 py-1 rounded-md transition-all",
                  trendDays === 7 ? "bg-white text-sky-600 shadow-sm" : "text-gray-500 hover:text-gray-900",
                ].join(" ")}
              >
                7 ngày qua
              </button>
              <button
                onClick={() => setTrendDays(30)}
                className={[
                  "text-[10px] font-bold px-2.5 py-1 rounded-md transition-all",
                  trendDays === 30 ? "bg-white text-sky-600 shadow-sm" : "text-gray-500 hover:text-gray-900",
                ].join(" ")}
              >
                30 ngày qua
              </button>
            </div>
          </div>

          <div className="h-64 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenueTrend" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.01} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
                <XAxis
                  dataKey="dayLabel"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                  tickFormatter={formatYAxis}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "14px",
                    border: "1px solid #f1f5f9",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                    fontSize: "11px",
                  }}
                  formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                  cursor={{ stroke: "#0ea5e9", strokeWidth: 1.5, strokeDasharray: "4 4" }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#0ea5e9"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorRevenueTrend)"
                  activeDot={{ r: 5, strokeWidth: 0, fill: "#0ea5e9" }}
                  animationDuration={800}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Biểu đồ chi nhánh (Bar Chart) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-gray-100 p-5 shadow-sm">
          <div>
            <h3 className="font-bold text-gray-900 text-sm md:text-base">Hiệu suất chi nhánh</h3>
            <p className="text-[11px] text-gray-400 mt-0.5">So sánh doanh số thực tế giữa các cơ sở</p>
          </div>

          <div className="h-64 mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={branchChartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                  tickFormatter={(val) => val.split(" ")[0] + " " + val.split(" ")[1]}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 10, fontWeight: 500 }}
                  tickFormatter={formatYAxis}
                  width={50}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.95)",
                    borderRadius: "14px",
                    border: "1px solid #f1f5f9",
                    fontSize: "11px",
                  }}
                  formatter={(value) => [formatCurrency(value), "Doanh thu"]}
                  cursor={{ fill: "#f8fafc" }}
                />
                <Bar
                  dataKey="Doanh_thu"
                  radius={[8, 8, 0, 0]}
                  barSize={40}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Nhật ký doanh thu - Sổ giao dịch */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
        {/* Tiêu đề & Công cụ bộ lọc */}
        <div className="p-5 border-b border-gray-100 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-gray-900 text-base">Nhật ký giao dịch</h3>
              <p className="text-xs text-gray-400 mt-0.5">Chi tiết các khoản thu nhập từ dịch vụ hoàn thành</p>
            </div>

            {/* Thống kê lọc */}
            <div className="flex items-center gap-3">
              <span className="text-xs bg-slate-50 text-slate-600 px-3 py-1.5 rounded-lg border border-slate-100 font-semibold">
                Đang lọc: {ledgerData.length} giao dịch
              </span>
              <button
                onClick={loadData}
                className="p-2 bg-slate-50 hover:bg-slate-100 text-slate-500 rounded-xl transition-colors border border-slate-100"
                title="Làm mới dữ liệu"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Form bộ lọc tìm kiếm */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5">
            {/* Thanh tìm kiếm */}
            <div className="sm:col-span-6 relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Tìm khách hàng theo Tên hoặc Số điện thoại..."
                className="w-full pl-10 pr-4 py-2.5 text-xs text-gray-800 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all hover:border-gray-300"
              />
            </div>

            {/* Lọc cơ sở */}
            <div className="sm:col-span-3 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-brand focus-within:border-brand hover:border-gray-300 transition-all">
              <MapPin className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <select
                value={branchFilter}
                onChange={(e) => setBranchFilter(e.target.value)}
                className="w-full bg-transparent border-0 focus:ring-0 text-xs text-gray-700 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả Cơ sở</option>
                <option value="hung-yen-1">Cơ sở 1 (Nguyễn Văn Linh)</option>
                <option value="hung-yen-2">Cơ sở 2 (Phố Nối)</option>
                <option value="hung-yen-3">Cơ sở 3 (Trần Phú)</option>
              </select>
            </div>

            {/* Lọc dịch vụ */}
            <div className="sm:col-span-3 flex items-center bg-gray-50 border border-gray-200 rounded-xl px-3 focus-within:ring-2 focus-within:ring-brand focus-within:border-brand hover:border-gray-300 transition-all">
              <Filter className="w-4 h-4 text-gray-400 mr-2 flex-shrink-0" />
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full bg-transparent border-0 focus:ring-0 text-xs text-gray-700 py-2.5 focus:outline-none cursor-pointer"
              >
                <option value="all">Tất cả Dịch vụ</option>
                {Object.keys(SERVICE_PRICES).map((serviceName) => (
                  <option key={serviceName} value={serviceName}>
                    {serviceName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Bảng dữ liệu Ledger */}
        {ledgerData.length === 0 ? (
          <div className="p-10 text-center flex flex-col items-center justify-center">
            <DollarSign className="w-10 h-10 text-gray-300 mb-2" />
            <p className="text-sm text-gray-400 font-medium">Không tìm thấy giao dịch nào phù hợp</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-gray-150 text-gray-500 font-bold uppercase tracking-wider select-none">
                  <th className="px-6 py-4 text-center w-24">Mã số</th>
                  <th className="px-6 py-4">Khách hàng</th>
                  <th className="px-6 py-4">Số điện thoại</th>
                  <th className="px-6 py-4">Dịch vụ sử dụng</th>
                  <th className="px-6 py-4">Cơ sở thực hiện</th>
                  <th className="px-6 py-4">Thời gian</th>
                  <th className="px-6 py-4 text-right w-36">Doanh thu (VND)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {ledgerData.map((tx) => {
                  const amount = SERVICE_PRICES[tx.service] || 100000;
                  return (
                    <tr
                      key={tx.id}
                      className="hover:bg-slate-50/40 transition-colors text-gray-700 font-medium"
                    >
                      <td className="px-6 py-3.5 text-center font-mono text-[10px] text-gray-400">
                        BP{String(tx.id).padStart(5, "0")}
                      </td>
                      <td className="px-6 py-3.5 font-bold text-gray-900">{tx.fullName}</td>
                      <td className="px-6 py-3.5 font-mono text-[11px] text-gray-500">{tx.phone}</td>
                      <td className="px-6 py-3.5">
                        <span className="bg-sky-50/50 text-sky-600 px-2 py-0.5 rounded-md border border-sky-100/50 font-semibold">
                          {tx.service}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-gray-600">{tx.branchName}</td>
                      <td className="px-6 py-3.5 text-gray-500">
                        <div className="flex flex-col">
                          <span>{tx.date}</span>
                          <span className="text-[10px] text-gray-400 font-normal">{tx.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-3.5 text-right font-bold text-gray-900 font-mono">
                        {formatCurrency(amount)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
