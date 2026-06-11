import axios from "axios";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "";

/**
 * Axios instance cấu hình sẵn:
 * - Base URL từ env
 * - Auto-attach Authorization header từ localStorage
 * - Auto-handle 401 → logout + redirect login
 */
const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

// --- Request interceptor: gắn token ---
api.interceptors.request.use(
  (config) => {
    try {
      const stored = localStorage.getItem("barberpro-auth");
      if (stored) {
        const { state } = JSON.parse(stored);
        if (state?.token) {
          config.headers.Authorization = `Bearer ${state.token}`;
        }
      }
    } catch {
      // localStorage parse error — bỏ qua
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// --- Response interceptor: xử lý lỗi ---
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      // Token expired hoặc invalid → clear auth và redirect login
      try {
        localStorage.removeItem("barberpro-auth");
      } catch {
        // ignore
      }
      window.location.href = "/admin/login";
      return Promise.reject(new Error("Phiên đăng nhập đã hết hạn"));
    }

    if (status === 403) {
      return Promise.reject(new Error("Bạn không có quyền thực hiện thao tác này"));
    }

    if (status >= 500) {
      return Promise.reject(new Error("Lỗi máy chủ, vui lòng thử lại sau"));
    }

    return Promise.reject(error);
  }
);

export default api;
