import { useEffect } from "react";

const BASE_TITLE = "BarberPro - Barber Shop Hưng Yên";

/**
 * Hook thay đổi document.title theo từng page.
 * Tự động reset về title gốc khi component unmount.
 *
 * @param {string} title - Tiêu đề trang (sẽ thêm suffix " | BarberPro")
 * @param {boolean} withSuffix - Có thêm suffix không (default: true)
 *
 * Ví dụ:
 *   useDocumentTitle("Đặt lịch") → "Đặt lịch | BarberPro - Barber Shop Hưng Yên"
 *   useDocumentTitle("BarberPro", false) → "BarberPro"
 */
export default function useDocumentTitle(title, withSuffix = true) {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = withSuffix && title
      ? `${title} | ${BASE_TITLE}`
      : title || BASE_TITLE;

    return () => {
      document.title = prevTitle;
    };
  }, [title, withSuffix]);
}
