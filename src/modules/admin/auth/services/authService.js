import api from "@/shared/utils/axiosInstance";
import {
  MOCK_ENABLED,
  MOCK_ADMIN_CREDENTIALS,
  MOCK_ADMIN_USER,
  MOCK_DELAY_MS,
} from "@/config/mockConfig";

/**
 * Đăng nhập admin.
 * Nếu MOCK_ENABLED → kiểm tra credentials mock.
 * Nếu production → gọi API thực.
 * @param {{ email: string, password: string }} credentials
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function loginAdmin({ email, password }) {
  if (MOCK_ENABLED) {
    await new Promise((r) => setTimeout(r, MOCK_DELAY_MS));

    if (
      email === MOCK_ADMIN_CREDENTIALS.email &&
      password === MOCK_ADMIN_CREDENTIALS.password
    ) {
      return {
        token: "mock-jwt-token-" + Date.now(),
        user: { ...MOCK_ADMIN_USER },
      };
    }

    throw new Error("Email hoặc mật khẩu không đúng");
  }

  // --- Production ---
  const res = await api.post("/api/admin/login", { email, password });
  return res.data;
}

/**
 * Đăng xuất admin.
 */
export async function logoutAdmin() {
  if (MOCK_ENABLED) {
    return { success: true };
  }

  const res = await api.post("/api/admin/logout");
  return res.data;
}
