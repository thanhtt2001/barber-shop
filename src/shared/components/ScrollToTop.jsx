import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Component tự động cuộn trang lên đầu khi chuyển route (thay đổi pathname).
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
