import { useState, useEffect } from "react";

/**
 * Kiểm tra media query có khớp không.
 * @param {string} query - CSS media query string
 * @returns {boolean}
 *
 * Ví dụ:
 *   const isMobile = useMediaQuery("(max-width: 768px)");
 *   const isDesktop = useMediaQuery("(min-width: 1024px)");
 */
export default function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQueryList = window.matchMedia(query);
    setMatches(mediaQueryList.matches);

    const listener = (event) => {
      setMatches(event.matches);
    };

    mediaQueryList.addEventListener("change", listener);

    return () => {
      mediaQueryList.removeEventListener("change", listener);
    };
  }, [query]);

  return matches;
}
