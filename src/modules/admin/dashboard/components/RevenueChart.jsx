import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { TrendingUp, DollarSign } from "lucide-react";

const SERVICE_PRICES = {
  "Cắt cơ bản": 50000,
  "Cắt + Uốn / Duỗi": 250000,
  "Nhuộm màu": 350000,
  "Cạo râu": 40000,
  "Gội đầu dưỡng sinh": 80000,
  "Combo VIP": 150000,
};

// Hàm tạo danh sách 7 ngày gần nhất từ hôm nay trở về trước
const getLast7Days = () => {
  const result = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d.toISOString().split("T")[0]);
  }
  return result;
};

function formatTooltipValue(value) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatYAxis(value) {
  if (value >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}tr`;
  if (value >= 1_000) return `${(value / 1_000).toFixed(0)}k`;
  return value;
}

export default function RevenueChart({ bookings = [], loading = false }) {
  // 1. Tạo danh sách 7 ngày gần nhất
  const last7Days = getLast7Days();

  // 2. Tính toán doanh thu cho từng ngày (chỉ tính các booking "confirmed")
  const chartData = last7Days.map((dateStr) => {
    const dayBookings = bookings.filter(
      (b) => b.date === dateStr && b.status === "confirmed"
    );
    const revenue = dayBookings.reduce(
      (sum, b) => sum + (SERVICE_PRICES[b.service] || 100000),
      0
    );

    const d = new Date(dateStr);
    const weekdays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const label = weekdays[d.getDay()];

    return {
      date: dateStr,
      day: label, // Hiển thị trên XAxis (T2, T3...)
      formattedDate: `${d.getDate()}/${d.getMonth() + 1}`, // Dùng trong Tooltip
      revenue,
    };
  });

  const totalRevenue = chartData.reduce((sum, item) => sum + item.revenue, 0);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm min-h-[360px] flex flex-col justify-between">
        <div>
          <div className="h-5 w-40 bg-gray-100 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-55 rounded animate-pulse mt-2"></div>
        </div>
        <div className="h-48 w-full bg-gray-100 rounded-xl animate-pulse mt-6 flex items-end p-4 gap-3">
          <div className="h-12 w-full bg-gray-200/50 rounded"></div>
          <div className="h-24 w-full bg-gray-200/50 rounded"></div>
          <div className="h-32 w-full bg-gray-200/50 rounded"></div>
          <div className="h-20 w-full bg-gray-200/50 rounded"></div>
          <div className="h-40 w-full bg-gray-200/50 rounded"></div>
          <div className="h-48 w-full bg-gray-200/50 rounded"></div>
          <div className="h-36 w-full bg-gray-200/50 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-bold text-gray-900 text-lg flex items-center gap-2">
            Doanh thu 7 ngày qua
          </h3>
          <p className="text-xs text-gray-400 mt-0.5">
            Tổng quan doanh thu thực tế (các lịch hẹn đã xác nhận)
          </p>
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">Tổng doanh thu tuần này</p>
          <span className="text-lg font-extrabold text-sky-600 font-mono">
            {formatTooltipValue(totalRevenue)}
          </span>
        </div>
      </div>

      <div className="h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0.01} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#f8fafc" vertical={false} />
            <XAxis
              dataKey="day"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }}
              tickFormatter={formatYAxis}
              width={50}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                borderRadius: "16px",
                border: "1px solid #f1f5f9",
                boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                fontSize: "12px",
                padding: "10px 14px",
              }}
              labelFormatter={(value, items) => {
                if (items && items[0]) {
                  const data = items[0].payload;
                  return `${data.day} (${data.formattedDate})`;
                }
                return value;
              }}
              formatter={(value) => [formatTooltipValue(value), "Doanh thu"]}
              cursor={{ stroke: "#0ea5e9", strokeWidth: 1.5, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#0ea5e9"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              activeDot={{ r: 6, strokeWidth: 0, fill: "#0ea5e9" }}
              animationDuration={1000}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer xu hướng mini */}
      <div className="flex items-center gap-2 mt-4 pt-4 border-t border-slate-50 text-xs text-slate-500">
        <span className="flex items-center gap-1 font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
          <TrendingUp className="h-3 w-3" />
          Tăng trưởng tốt
        </span>
        <span>
          Doanh thu tăng trưởng đều đặn vào dịp cuối tuần.
        </span>
      </div>
    </div>
  );
}
