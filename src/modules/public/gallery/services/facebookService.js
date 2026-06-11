import axios from "axios";

const FB_API_BASE = "https://graph.facebook.com/v19.0";
const ACCESS_TOKEN = import.meta.env.VITE_FB_ACCESS_TOKEN;

/**
 * Lấy danh sách ảnh từ Facebook Graph API.
 * Endpoint: GET /me/media
 * @param {number} limit - Số lượng ảnh tối đa
 * @returns {Promise<Array>} - Mảng ảnh với { id, media_url, thumbnail_url, caption, timestamp }
 */
export async function fetchFacebookPhotos(limit = 12) {
  if (!ACCESS_TOKEN) {
    throw new Error("Thiếu VITE_FB_ACCESS_TOKEN trong file .env");
  }

  const response = await axios.get(`${FB_API_BASE}/me/media`, {
    params: {
      fields: "id,media_url,thumbnail_url,caption,timestamp,permalink",
      limit,
      access_token: ACCESS_TOKEN,
    },
  });

  return response.data.data || [];
}
