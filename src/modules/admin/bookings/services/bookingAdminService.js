

// Mock data 20 lịch hẹn ban đầu để làm biểu đồ 7 ngày
const mockBookingsTemplate = [
  { id: 1, fullName: "Nguyễn Văn An", phone: "0901234567", service: "Cắt cơ bản", dateOffset: 0, time: "08:00", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "pending", note: "" },
  { id: 2, fullName: "Trần Minh Tuấn", phone: "0912345678", service: "Combo VIP", dateOffset: 0, time: "09:00", branch: "hung-yen-2", branchName: "BarberPro — Cơ sở 2", status: "confirmed", note: "Muốn kiểu tóc undercut" },
  { id: 3, fullName: "Lê Hoàng Duy", phone: "0923456789", service: "Nhuộm màu", dateOffset: 0, time: "10:30", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "confirmed", note: "" },
  { id: 4, fullName: "Phạm Thành Long", phone: "0934567890", service: "Cắt + Uốn/Duỗi", dateOffset: 0, time: "13:00", branch: "hung-yen-3", branchName: "BarberPro — Cơ sở 3", status: "pending", note: "" },
  { id: 5, fullName: "Hoàng Đức Anh", phone: "0945678901", service: "Gội đầu dưỡng sinh", dateOffset: 0, time: "14:00", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "cancelled", note: "Hẹn lại ngày khác" },
  { id: 6, fullName: "Vũ Quang Huy", phone: "0956789012", service: "Cạo râu", dateOffset: 0, time: "15:30", branch: "hung-yen-2", branchName: "BarberPro — Cơ sở 2", status: "pending", note: "" },
  { id: 7, fullName: "Đặng Quốc Khánh", phone: "0967890123", service: "Combo VIP", dateOffset: -1, time: "08:30", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "confirmed", note: "" },
  { id: 8, fullName: "Bùi Hải Nam", phone: "0978901234", service: "Cắt cơ bản", dateOffset: -1, time: "10:00", branch: "hung-yen-3", branchName: "BarberPro — Cơ sở 3", status: "confirmed", note: "" },
  { id: 9, fullName: "Ngô Thanh Sơn", phone: "0989012345", service: "Nhuộm màu", dateOffset: -1, time: "14:30", branch: "hung-yen-2", branchName: "BarberPro — Cơ sở 2", status: "cancelled", note: "" },
  { id: 10, fullName: "Lý Minh Đức", phone: "0990123456", service: "Cắt + Uốn/Duỗi", dateOffset: -1, time: "16:00", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "pending", note: "" },
  { id: 11, fullName: "Trương Quốc Bảo", phone: "0981112223", service: "Combo VIP", dateOffset: -2, time: "09:00", branch: "hung-yen-2", branchName: "BarberPro — Cơ sở 2", status: "confirmed", note: "" },
  { id: 12, fullName: "Nguyễn Hải Đăng", phone: "0982223334", service: "Gội đầu dưỡng sinh", dateOffset: -2, time: "11:00", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "confirmed", note: "" },
  { id: 13, fullName: "Phùng Gia Bảo", phone: "0983334445", service: "Cắt cơ bản", dateOffset: -3, time: "14:00", branch: "hung-yen-3", branchName: "BarberPro — Cơ sở 3", status: "confirmed", note: "" },
  { id: 14, fullName: "Đỗ Mạnh Hùng", phone: "0984445556", service: "Nhuộm màu", dateOffset: -3, time: "15:30", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "confirmed", note: "" },
  { id: 15, fullName: "Võ Hoàng Nam", phone: "0985556667", service: "Combo VIP", dateOffset: -4, time: "10:30", branch: "hung-yen-2", branchName: "BarberPro — Cơ sở 2", status: "confirmed", note: "" },
  { id: 16, fullName: "Cao Văn Quyết", phone: "0986667778", service: "Cạo râu", dateOffset: -4, time: "13:30", branch: "hung-yen-3", branchName: "BarberPro — Cơ sở 3", status: "confirmed", note: "" },
  { id: 17, fullName: "Trần Thế Anh", phone: "0987778889", service: "Cắt + Uốn/Duỗi", dateOffset: -5, time: "09:30", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "confirmed", note: "" },
  { id: 18, fullName: "Nguyễn Tiến Đạt", phone: "0988889990", service: "Combo VIP", dateOffset: -5, time: "15:00", branch: "hung-yen-2", branchName: "BarberPro — Cơ sở 2", status: "confirmed", note: "" },
  { id: 19, fullName: "Lê Hữu Phước", phone: "0989990001", service: "Gội đầu dưỡng sinh", dateOffset: -6, time: "08:30", branch: "hung-yen-3", branchName: "BarberPro — Cơ sở 3", status: "confirmed", note: "" },
  { id: 20, fullName: "Đặng Minh Triết", phone: "0990001112", service: "Cắt cơ bản", dateOffset: -6, time: "14:30", branch: "hung-yen-1", branchName: "BarberPro — Cơ sở 1", status: "confirmed", note: "" },
];

const STORAGE_KEY = "barberpro_admin_bookings";

const getRelativeDate = (offsetDays) => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split("T")[0];
};

const getInitialBookings = () => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error("Failed to parse bookings from localStorage:", e);
    }
  }

  // Khởi tạo dữ liệu mẫu với ngày tương đối
  const initialized = mockBookingsTemplate.map((b) => {
    const { dateOffset, ...rest } = b;
    return {
      ...rest,
      date: getRelativeDate(dateOffset),
    };
  });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialized));
  return initialized;
};

let bookingsData = getInitialBookings();

/**
 * Lấy danh sách booking (admin).
 * @param {object} filters - { branch, date, status }
 */
export async function fetchAdminBookings(filters = {}) {
  await new Promise((r) => setTimeout(r, 400));

  // Luôn đọc lại dữ liệu mới nhất từ localStorage để cập nhật đồng bộ
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      bookingsData = JSON.parse(stored);
    } catch (e) {
      console.error(e);
    }
  }

  let result = [...bookingsData];

  if (filters.branch) {
    result = result.filter((b) => b.branch === filters.branch);
  }
  if (filters.date) {
    result = result.filter((b) => b.date === filters.date);
  }
  if (filters.status && filters.status !== "all") {
    result = result.filter((b) => b.status === filters.status);
  }

  return result;
}

/**
 * Cập nhật trạng thái booking.
 * @param {number} id
 * @param {string} status - "confirmed" | "cancelled"
 */
export async function updateBookingStatus(id, status) {
  await new Promise((r) => setTimeout(r, 300));

  const index = bookingsData.findIndex((b) => b.id === Number(id) || b.id === id);
  if (index === -1) throw new Error("Không tìm thấy lịch hẹn");

  bookingsData[index] = { ...bookingsData[index], status };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingsData));
  return bookingsData[index];
}
