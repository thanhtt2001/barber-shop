/**
 * Định dạng đối tượng Date thành chuỗi tiếng Việt.
 * @param {Date|string} date - Đối tượng Date hoặc chuỗi ngày
 * @param {object} options - Tùy chọn Intl.DateTimeFormat
 * @returns {string}
 *
 * Ví dụ: formatDate(new Date()) => "Thứ Năm, 05 tháng 6, 2025"
 */
export function formatDate(date, options = {}) {
  if (!date) return "—";

  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return "—";

  const defaultOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "2-digit",
    ...options,
  };

  return new Intl.DateTimeFormat("vi-VN", defaultOptions).format(dateObj);
}

/**
 * Định dạng ngày dạng ngắn dd/MM/yyyy.
 * @param {Date|string} date
 * @returns {string}
 */
export function formatDateShort(date) {
  if (!date) return "—";

  const dateObj = date instanceof Date ? date : new Date(date);
  if (isNaN(dateObj.getTime())) return "—";

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(dateObj);
}

/**
 * Trả về chuỗi ngày tối thiểu cho input[type=date] (ngày hôm nay).
 * @returns {string} "YYYY-MM-DD"
 */
export function getTodayString() {
  return new Date().toISOString().split("T")[0];
}

/**
 * Trả về chuỗi ngày tối đa cho input[type=date] (30 ngày tới).
 * @returns {string} "YYYY-MM-DD"
 */
export function getMaxDateString(daysAhead = 30) {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split("T")[0];
}
