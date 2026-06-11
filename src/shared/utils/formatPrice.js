/**
 * Định dạng số thành chuỗi giá tiền Việt Nam.
 * @param {number} amount - Số tiền (VNĐ)
 * @param {boolean} showUnit - Có hiển thị "đ" không
 * @returns {string}
 *
 * Ví dụ: formatPrice(50000) => "50.000đ"
 */
export function formatPrice(amount, showUnit = true) {
  if (typeof amount !== "number" || isNaN(amount)) return "—";

  const formatted = new Intl.NumberFormat("vi-VN").format(amount);
  return showUnit ? `${formatted}đ` : formatted;
}

/**
 * Định dạng số thành chuỗi giá tiền dạng rút gọn.
 * @param {number} amount
 * @returns {string}
 *
 * Ví dụ: formatPriceShort(350000) => "350k"
 */
export function formatPriceShort(amount) {
  if (typeof amount !== "number" || isNaN(amount)) return "—";

  if (amount >= 1_000_000) {
    return `${(amount / 1_000_000).toFixed(1).replace(/\.0$/, "")}tr`;
  }
  if (amount >= 1_000) {
    return `${(amount / 1_000).toFixed(0)}k`;
  }
  return `${amount}đ`;
}
