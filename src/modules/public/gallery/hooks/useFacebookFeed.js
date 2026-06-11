import { useState, useEffect, useCallback } from "react";
import { fetchFacebookPhotos } from "../services/facebookService";

/**
 * Hook lấy ảnh từ Facebook feed.
 * @param {number} limit - Số ảnh tối đa
 * @returns {{ photos: Array, loading: boolean, error: string|null, refetch: Function }}
 */
export default function useFacebookFeed(limit = 12) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPhotos = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchFacebookPhotos(limit);
      setPhotos(data);
    } catch (err) {
      const message =
        err?.response?.data?.error?.message ||
        err?.message ||
        "Không thể tải ảnh từ Facebook";
      setError(message);
      setPhotos([]);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPhotos();
  }, [fetchPhotos]);

  return { photos, loading, error, refetch: fetchPhotos };
}
