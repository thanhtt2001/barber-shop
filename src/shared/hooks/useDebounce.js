import { useState, useEffect } from "react";

/**
 * Trì hoãn cập nhật giá trị sau một khoảng thời gian.
 * Hữu ích cho search input, API call debouncing.
 * @param {any} value - Giá trị cần debounce
 * @param {number} delay - Thời gian trì hoãn (ms)
 * @returns {any} - Giá trị sau khi debounce
 */
export default function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
