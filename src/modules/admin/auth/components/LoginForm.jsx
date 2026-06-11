import { useForm } from "react-hook-form";
import Button from "@/shared/components/ui/Button";
import Input from "@/shared/components/ui/Input";
import useAuth from "../hooks/useAuth";

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const { onLogin, isLoading, loginError } = useAuth();

  return (
    <form
      id="admin-login-form"
      onSubmit={handleSubmit(onLogin)}
      noValidate
      className="space-y-5"
      aria-label="Đăng nhập quản trị"
    >
      <Input
        label="Email"
        id="login-email"
        name="email"
        type="email"
        placeholder="admin@barberpro.vn"
        required
        error={errors.email?.message}
        {...register("email", {
          required: "Vui lòng nhập email",
          pattern: {
            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
            message: "Email không hợp lệ",
          },
        })}
      />

      <Input
        label="Mật khẩu"
        id="login-password"
        name="password"
        type="password"
        placeholder="••••••••"
        required
        error={errors.password?.message}
        {...register("password", {
          required: "Vui lòng nhập mật khẩu",
          minLength: {
            value: 4,
            message: "Mật khẩu ít nhất 4 ký tự",
          },
        })}
      />

      {loginError && (
        <div
          role="alert"
          className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm flex items-center gap-2"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {loginError}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        variant="primary"
        loading={isLoading}
        className="w-full"
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>

      {import.meta.env.DEV && (
        <p className="text-xs text-gray-400 text-center mt-4">
          Chế độ phát triển — mock login được bật.
        </p>
      )}
    </form>
  );
}
