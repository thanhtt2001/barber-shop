import { Suspense } from "react";
import { useRoutes, Link } from "react-router-dom";
import { publicRoutes } from "./publicRoutes";
import { adminRoutes } from "./adminRoutes";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import Loader from "@/shared/components/Loader";

function NotFoundPage() {
  return (
    <main className="min-h-screen flex items-center justify-center pt-20 pb-16 bg-gray-50">
      <div className="text-center px-4">
        <div className="text-8xl font-bold font-display text-brand mb-4">404</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Trang không tìm thấy</h1>
        <p className="text-gray-500 mb-8">Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand text-white font-semibold px-6 py-3 rounded-xl hover:bg-brand-dark transition-colors"
        >
          ← Về trang chủ
        </Link>
      </div>
    </main>
  );
}

export default function AppRouter() {
  const routes = useRoutes([
    ...publicRoutes,
    ...adminRoutes,
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ]);

  return (
    <ErrorBoundary>
      <Suspense fallback={<Loader fullScreen text="Đang tải..." />}>{routes}</Suspense>
    </ErrorBoundary>
  );
}
