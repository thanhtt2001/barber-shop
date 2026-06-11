import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginAdmin } from "../services/authService";
import useAuthStore from "../store/authStore";

/**
 * Hook xử lý đăng nhập admin.
 * Hỗ trợ redirect về trang trước sau khi login thành công.
 * @returns {{ onLogin: Function, isLoading: boolean, loginError: string|null }}
 */
export default function useAuth() {
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();

  const onLogin = async (formData) => {
    setIsLoading(true);
    setLoginError(null);

    try {
      const { token, user } = await loginAdmin(formData);
      login(token, user);

      // Redirect về trang trước nếu có, ngược lại về dashboard
      const returnUrl = location.state?.from || "/admin/dashboard";
      navigate(returnUrl, { replace: true });
    } catch (err) {
      setLoginError(err?.message || "Đăng nhập thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return { onLogin, isLoading, loginError };
}
