import { useState } from "react";
import { updateBookingStatus } from "@/modules/admin/bookings/services/bookingAdminService";
import { Check, X, Phone, MessageSquare, Clock, AlertCircle } from "lucide-react";
import Loader from "@/shared/components/Loader";

const statusMap = {
  pending: { label: "Chờ xác nhận", className: "bg-amber-50 text-amber-600 border border-amber-100" },
  confirmed: { label: "Đã xác nhận", className: "bg-emerald-50 text-emerald-600 border border-emerald-100" },
  cancelled: { label: "Đã huỷ", className: "bg-red-50 text-red-600 border border-red-100" },
};

export default function BookingToday({ bookings = [], loading = false, onStatusChange }) {
  const [filter, setFilter] = useState("all"); // 'all' | 'pending' | 'confirmed'
  const [actionLoadingId, setActionLoadingId] = useState(null);

  // 1. Lọc các lịch hẹn ngày hôm nay
  const todayStr = new Date().toISOString().split("T")[0];
  const todayBookings = bookings.filter((b) => b.date === todayStr);

  // 2. Lọc theo tab trạng thái đang chọn
  const filteredBookings = todayBookings
    .filter((b) => {
      if (filter === "all") return true;
      return b.status === filter;
    })
    // Sắp xếp theo giờ đặt hẹn tăng dần
    .sort((a, b) => a.time.localeCompare(b.time));

  // 3. Hàm tạo chữ viết tắt cho Avatar
  const getInitials = (name) => {
    if (!name) return "KH";
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return (parts[parts.length - 2][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  };

  // 4. Lấy màu ngẫu nhiên nhưng cố định theo tên khách
  const getAvatarBg = (name) => {
    const colors = [
      "bg-gradient-to-tr from-sky-400 to-blue-500 text-white",
      "bg-gradient-to-tr from-emerald-400 to-teal-500 text-white",
      "bg-gradient-to-tr from-violet-400 to-purple-500 text-white",
      "bg-gradient-to-tr from-rose-400 to-pink-500 text-white",
      "bg-gradient-to-tr from-amber-400 to-orange-500 text-white",
    ];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash += name.charCodeAt(i);
    }
    return colors[hash % colors.length];
  };

  // 5. Cập nhật trạng thái trực tiếp
  const handleStatusUpdate = async (id, status) => {
    setActionLoadingId(id);
    try {
      await updateBookingStatus(id, status);
      if (onStatusChange) {
        await onStatusChange(); // Tải lại dữ liệu ở cấp cha để đồng bộ biểu đồ/chỉ số
      }
    } catch (err) {
      alert(err.message || "Không thể cập nhật trạng thái.");
    } finally {
      setActionLoadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm min-h-[300px] flex items-center justify-center">
        <Loader text="Đang tải danh sách lịch hôm nay..." />
      </div>
    );
  }

  // Đếm số lượng theo trạng thái để hiển thị trên Tab
  const countAll = todayBookings.length;
  const countPending = todayBookings.filter((b) => b.status === "pending").length;
  const countConfirmed = todayBookings.filter((b) => b.status === "confirmed").length;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">Lịch hẹn hôm nay</h3>
          <p className="text-xs text-gray-400 mt-0.5">Danh sách lịch khách đặt ngày hôm nay</p>
        </div>
        <span className="text-xs bg-sky-50 text-sky-600 font-extrabold px-2.5 py-1 rounded-full border border-sky-100">
          {countAll} lịch hẹn
        </span>
      </div>

      {/* Bộ lọc trạng thái (Tab) */}
      <div className="px-5 py-2.5 bg-gray-50/50 border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto">
        <button
          onClick={() => setFilter("all")}
          className={[
            "text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all",
            filter === "all"
              ? "bg-white text-sky-600 shadow-sm border border-gray-200/50"
              : "text-gray-500 hover:bg-gray-100",
          ].join(" ")}
        >
          Tất cả ({countAll})
        </button>
        <button
          onClick={() => setFilter("pending")}
          className={[
            "text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1",
            filter === "pending"
              ? "bg-white text-amber-600 shadow-sm border border-gray-200/50"
              : "text-gray-500 hover:bg-gray-100",
          ].join(" ")}
        >
          Chờ duyệt ({countPending})
        </button>
        <button
          onClick={() => setFilter("confirmed")}
          className={[
            "text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all flex items-center gap-1",
            filter === "confirmed"
              ? "bg-white text-emerald-600 shadow-sm border border-gray-200/50"
              : "text-gray-500 hover:bg-gray-100",
          ].join(" ")}
        >
          Đã duyệt ({countConfirmed})
        </button>
      </div>

      {/* Danh sách lịch hẹn */}
      {filteredBookings.length === 0 ? (
        <div className="px-5 py-12 text-center flex flex-col items-center justify-center">
          <AlertCircle className="h-8 w-8 text-gray-300 mb-2" />
          <p className="text-sm text-gray-400 font-medium">
            {filter === "all"
              ? "Không có lịch hẹn nào hôm nay"
              : filter === "pending"
              ? "Không có lịch chờ xác nhận"
              : "Không có lịch đã xác nhận"}
          </p>
        </div>
      ) : (
        <div className="divide-y divide-gray-50 max-h-[380px] overflow-y-auto">
          {filteredBookings.map((booking) => {
            const status = statusMap[booking.status] || statusMap.pending;
            const initials = getInitials(booking.fullName);
            const avatarColorClass = getAvatarBg(booking.fullName);
            const isPending = booking.status === "pending";
            const isUpdating = actionLoadingId === booking.id;

            return (
              <div
                key={booking.id}
                className={[
                  "px-5 py-4 flex items-center justify-between gap-4 transition-colors relative group",
                  isUpdating ? "opacity-60 bg-gray-50/50" : "hover:bg-slate-50/40",
                ].join(" ")}
              >
                {/* Thông tin khách hàng & Avatar */}
                <div className="flex items-center gap-3.5 min-w-0">
                  <div
                    className={[
                      "w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs tracking-wider flex-shrink-0 shadow-sm",
                      avatarColorClass,
                    ].join(" ")}
                  >
                    {initials}
                  </div>
                  <div className="min-w-0 space-y-0.5">
                    <p className="text-sm font-bold text-gray-900 truncate">
                      {booking.fullName}
                    </p>
                    <div className="flex flex-col text-[11px] text-gray-400 space-y-0.5">
                      <span className="font-semibold text-gray-600 truncate">
                        {booking.service} · {booking.branchName}
                      </span>
                      <a
                        href={`tel:${booking.phone}`}
                        className="flex items-center gap-1 hover:text-sky-600 transition-colors self-start"
                      >
                        <Phone className="w-3 h-3" />
                        {booking.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Giờ hẹn, ghi chú & Nút bấm thao tác */}
                <div className="flex flex-col items-end gap-2 flex-shrink-0">
                  {/* Khung thời gian đặt lịch */}
                  <div className="flex items-center gap-1 bg-slate-50 border border-slate-100 text-slate-700 text-xs font-semibold px-2 py-0.5 rounded-lg">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    {booking.time}
                  </div>

                  {/* Nút hành động duyệt nhanh */}
                  <div className="flex items-center gap-1.5">
                    {isUpdating ? (
                      <span className="text-[10px] text-gray-400 animate-pulse font-medium">
                        Đang xử lý...
                      </span>
                    ) : isPending ? (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, "confirmed")}
                          className="p-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors border border-emerald-150"
                          title="Xác nhận lịch hẹn"
                        >
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                          className="p-1 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors border border-red-150"
                          title="Hủy lịch hẹn"
                        >
                          <X className="w-3.5 h-3.5 stroke-[2.5]" />
                        </button>
                      </>
                    ) : (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${status.className}`}>
                        {status.label}
                      </span>
                    )}

                    {/* Nút Hủy phụ cho lịch đã confirmed để chỉnh lại nếu cần */}
                    {booking.status === "confirmed" && !isUpdating && (
                      <button
                        onClick={() => handleStatusUpdate(booking.id, "cancelled")}
                        className="opacity-0 group-hover:opacity-100 p-1 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-all border border-red-100"
                        title="Hủy lịch hẹn đã duyệt"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>

                {/* Note hiển thị dạng hàng phụ nếu có */}
                {booking.note && (
                  <div className="absolute left-18 bottom-1 max-w-[200px] flex items-center gap-1 text-[9px] text-amber-600 bg-amber-50/50 px-1.5 py-0.2 rounded border border-amber-100/30 truncate">
                    <MessageSquare className="w-2.5 h-2.5 flex-shrink-0" />
                    <span>Lưu ý: {booking.note}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
