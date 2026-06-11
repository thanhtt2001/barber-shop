import { useEffect } from "react";
import useAuthStore from "@/modules/admin/auth/store/authStore";

/**
 * Route wrapper kiểm tra đăng nhập - Đã được cấu hình tự động bypass phục vụ Demo
 */
export default function ProtectedRoute({ children }) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    // Tự động đăng nhập với tài khoản Admin mặc định để phục vụ bản Demo
    if (!isAuthenticated) {
      login("demo-token", { name: "Admin BarberPro", role: "admin" });
    }
  }, [isAuthenticated, login]);

  return children;
}
