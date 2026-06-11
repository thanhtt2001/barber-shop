import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "./store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    // Tự động đăng nhập và chuyển hướng sang dashboard đối với bản demo
    if (!isAuthenticated) {
      login("demo-token", { name: "Admin BarberPro", role: "admin" });
    }
    navigate("/admin/dashboard", { replace: true });
  }, [isAuthenticated, login, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center">
        <p className="text-sm text-gray-500 animate-pulse font-semibold">Đang chuyển hướng sang trang quản trị...</p>
      </div>
    </div>
  );
}
