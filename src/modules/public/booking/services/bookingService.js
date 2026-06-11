import { services } from "../../services/data/services.data";
import { branches } from "../../branches/data/branches.data";

/**
 * Gửi yêu cầu đặt lịch tới backend.
 * Hiện tại mock bằng Promise timeout 1s để giả lập API call.
 * Đồng bộ lưu lịch hẹn vào localStorage cho trang quản trị Admin.
 *
 * @param {object} bookingData - Dữ liệu đặt lịch từ form
 * @returns {Promise<{success: boolean, bookingId: string, message: string}>}
 */
export async function createBooking(bookingData) {
  // --- Mock implementation (xóa khi backend thực có) ---
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Giả lập lỗi 10% để test error state
  if (Math.random() < 0.0) {
    throw new Error("Hệ thống bận, vui lòng thử lại sau.");
  }

  const bookingId = `BP${Date.now().toString().slice(-6)}`;

  // Lưu trữ cục bộ để hiển thị lên Dashboard và quản lý lịch hẹn Admin
  try {
    const STORAGE_KEY = "barberpro_admin_bookings";
    const stored = localStorage.getItem(STORAGE_KEY);
    let currentBookings = [];
    if (stored) {
      currentBookings = JSON.parse(stored);
    }

    const serviceObj = services.find((s) => s.id === bookingData.service);
    const branchObj = branches.find((b) => b.id === bookingData.branch);

    const newId = currentBookings.length > 0 ? Math.max(...currentBookings.map((b) => b.id)) + 1 : 1;

    const newBooking = {
      id: newId,
      fullName: bookingData.fullName,
      phone: bookingData.phone,
      service: serviceObj ? serviceObj.name : bookingData.service,
      date: bookingData.date,
      time: bookingData.time,
      branch: bookingData.branch,
      branchName: branchObj ? branchObj.name : "Cơ sở 1",
      status: "pending",
      note: bookingData.note || "",
    };

    currentBookings.unshift(newBooking); // Đẩy lịch mới lên đầu tiên
    localStorage.setItem(STORAGE_KEY, JSON.stringify(currentBookings));
  } catch (err) {
    console.error("Lỗi đồng bộ lịch hẹn vào localStorage:", err);
  }

  return {
    success: true,
    bookingId,
    message: "Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận sớm.",
  };

  // --- Production implementation (bỏ comment khi có backend) ---
  // const response = await axios.post(`${API_BASE}/api/bookings`, bookingData);
  // return response.data;
}

/**
 * Lấy danh sách khung giờ còn trống cho một ngày + cơ sở.
 * @param {string} date - "YYYY-MM-DD"
 * @param {string} branchId - id cơ sở
 * @returns {Promise<string[]>} - Mảng giờ, VD: ["08:00", "09:00", ...]
 */
export async function getAvailableSlots(date, branchId) {
  // Mock: trả về các khung giờ mặc định
  await new Promise((resolve) => setTimeout(resolve, 300));

  return [
    "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
    "11:00", "13:00", "13:30", "14:00", "14:30", "15:00",
    "15:30", "16:00", "16:30", "17:00", "17:30",
  ];
}
