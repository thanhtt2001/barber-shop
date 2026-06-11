import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Theo dõi section nào đang visible trong viewport khi scroll.
 * @param {string[]} sectionIds - Mảng các id của section cần theo dõi
 * @param {number} offset - Offset tính từ top (px)
 * @returns {string} - Id của section đang active
 */
export default function useScrollSpy(sectionIds = [], offset = 80) {
  const { pathname } = useLocation();
  const [activeId, setActiveId] = useState(sectionIds[0] || "");

  useEffect(() => {
    if (pathname !== "/") return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset + 10; // Thêm 10px buffer
      let currentActiveId = sectionIds[0] || "";

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            currentActiveId = id;
          }
        }
      }
      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Chạy lần đầu tiên để xác định active section ngay khi load
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionIds, offset, pathname]);

  return activeId;
}
