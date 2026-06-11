/**
 * Mock configuration — CHỈ dùng trong development.
 * File này sẽ KHÔNG được import trong production build.
 *
 * Khi chuyển sang production:
 * - Xoá file này hoặc đảm bảo không import.
 * - Thay thế bằng API call thực trong các service files.
 */

const IS_MOCK = !import.meta.env.VITE_API_BASE_URL;

export const MOCK_ENABLED = IS_MOCK;

export const MOCK_ADMIN_CREDENTIALS = {
  email: "admin@barberpro.vn",
  password: "admin123",
};

export const MOCK_ADMIN_USER = {
  id: 1,
  name: "Admin BarberPro",
  email: "admin@barberpro.vn",
  role: "admin",
};

export const MOCK_DELAY_MS = 1000;
