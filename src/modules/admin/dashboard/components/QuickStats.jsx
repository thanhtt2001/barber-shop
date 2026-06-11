import { CalendarDays, TrendingUp, Coins, Users } from "lucide-react";

const SERVICE_PRICES = {
  "Cắt cơ bản": 50000,
  "Cắt + Uốn / Duỗi": 250000,
  "Nhuộm màu": 350000,
  "Cạo râu": 40000,
  "Gội đầu dưỡng sinh": 80000,
  "Combo VIP": 150000,
};

export default function QuickStats({ bookings = [], loading = false }) {
  // 1. Ngày hiện tại & Tháng hiện tại
  const todayStr = new Date().toISOString().split("T")[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split("T")[0];
  const currentMonthStr = todayStr.substring(0, 7); // YYYY-MM

  // 2. Tính toán Lịch hôm nay
  const todayBookings = bookings.filter((b) => b.date === todayStr);
  const todayCount = todayBookings.length;
  const yesterdayCount = bookings.filter((b) => b.date === yesterdayStr).length;
  const todayDiff = todayCount - yesterdayCount;
  const todayTrendText =
    todayDiff > 0
      ? `↗ +${todayDiff} so với hôm qua`
      : todayDiff < 0
      ? `↘ ${todayDiff} so với hôm qua`
      : "✔ Bằng hôm qua";
  const todayTrendType = todayDiff > 0 ? "up" : todayDiff < 0 ? "down" : "neutral";

  // 3. Tính toán Lịch tháng này
  const monthBookings = bookings.filter(
    (b) => b.date.substring(0, 7) === currentMonthStr
  );
  const monthCount = monthBookings.length;
  // Giả lập xu hướng dựa trên số lượng bookings
  const monthTrendText =
    monthCount > 10 ? `↗ +18% tháng này` : `✔ Hoạt động ổn định`;

  // 4. Tính toán Doanh thu tháng này (chỉ tính lịch confirmed)
  const monthConfirmedBookings = monthBookings.filter(
    (b) => b.status === "confirmed"
  );
  const monthRevenue = monthConfirmedBookings.reduce((sum, b) => {
    const price = SERVICE_PRICES[b.service] || 100000; // Mặc định 100k nếu không khớp
    return sum + price;
  }, 0);

  const formatRevenue = (val) => {
    if (val >= 1_000_000) {
      return `${(val / 1_000_000).toFixed(1)}M`;
    }
    return `${val.toLocaleString("vi-VN")}đ`;
  };
  const fullRevenueStr = `${monthRevenue.toLocaleString("vi-VN")}đ`;

  // 5. Tính toán Khách hàng mới (Unique phones đặt lịch thành công/confirmed)
  const uniquePhones = new Set(
    monthBookings
      .filter((b) => b.status !== "cancelled")
      .map((b) => b.phone)
  );
  const newCustomersCount = uniquePhones.size;

  const statsList = [
    {
      id: "today-bookings",
      label: "Lịch hẹn hôm nay",
      value: todayCount,
      trendText: todayTrendText,
      trendType: todayTrendType,
      icon: CalendarDays,
      iconColor: "text-sky-500",
      bgColor: "bg-sky-50",
      borderColor: "hover:border-sky-300/60",
    },
    {
      id: "month-bookings",
      label: "Tổng lịch tháng này",
      value: monthCount,
      trendText: monthTrendText,
      trendType: "up",
      icon: TrendingUp,
      iconColor: "text-violet-500",
      bgColor: "bg-violet-50",
      borderColor: "hover:border-violet-300/60",
    },
    {
      id: "month-revenue",
      label: "Doanh thu tháng",
      value: formatRevenue(monthRevenue),
      subValue: fullRevenueStr,
      trendText: `Doanh thu thực tế (đã duyệt)`,
      trendType: "up",
      icon: Coins,
      iconColor: "text-emerald-500",
      bgColor: "bg-emerald-50",
      borderColor: "hover:border-emerald-300/60",
    },
    {
      id: "new-customers",
      label: "Số khách hàng",
      value: newCustomersCount,
      trendText: `Khách hoạt động tháng này`,
      trendType: "neutral",
      icon: Users,
      iconColor: "text-rose-500",
      bgColor: "bg-rose-50",
      borderColor: "hover:border-rose-300/60",
    },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm min-h-[140px] flex flex-col justify-between"
          >
            <div>
              <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mt-3"></div>
            </div>
            <div className="h-4 w-32 bg-gray-100 rounded animate-pulse mt-4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {statsList.map((stat) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.id}
            id={stat.id}
            className={[
              "bg-white rounded-2xl border border-gray-100 p-6 shadow-sm",
              "hover:shadow-md hover:-translate-y-0.5 transition-all duration-300",
              "flex flex-col justify-between min-h-[140px] relative overflow-hidden group",
              stat.borderColor,
            ].join(" ")}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  {stat.label}
                </p>
                <div className="flex items-baseline gap-1 mt-2">
                  <p className="text-3xl font-extrabold text-gray-900 leading-none">
                    {stat.value}
                  </p>
                  {stat.subValue && stat.value.includes("M") && (
                    <span className="text-xs text-gray-400 font-medium hidden sm:inline">
                      ({stat.subValue})
                    </span>
                  )}
                </div>
              </div>

              {/* Icon container */}
              <div
                className={[
                  "w-10 h-10 rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110",
                  stat.bgColor,
                  stat.iconColor,
                ].join(" ")}
              >
                <IconComponent className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-4 flex items-center">
              <span
                className={[
                  "text-xs font-semibold px-2 py-0.5 rounded-md",
                  stat.trendType === "up"
                    ? "bg-emerald-50 text-emerald-600"
                    : stat.trendType === "down"
                    ? "bg-red-50 text-red-600"
                    : "bg-sky-50 text-sky-600",
                ].join(" ")}
              >
                {stat.trendText}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
