import { Component } from "react";
import { Link } from "react-router-dom";

/**
 * Error Boundary — bắt render errors trong React tree.
 * Phải dùng Class component vì React chưa hỗ trợ hook cho error boundaries.
 *
 * Sử dụng:
 *   <ErrorBoundary>
 *     <YourComponent />
 *   </ErrorBoundary>
 *
 *   <ErrorBoundary fallback={<CustomError />}>
 *     <YourComponent />
 *   </ErrorBoundary>
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // Log lỗi — có thể gửi lên Sentry/LogRocket trong production
    console.error("[ErrorBoundary] Caught error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback nếu được truyền
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-[400px] flex items-center justify-center p-8">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2 font-display">
              Đã xảy ra lỗi
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Trang này gặp sự cố không mong muốn. Vui lòng thử tải lại hoặc quay về trang chủ.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="text-xs text-left bg-red-50 border border-red-200 rounded-xl p-4 mb-6 overflow-auto max-h-40 text-red-700">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={this.handleReset}
                className="px-5 py-2.5 bg-brand text-white font-semibold rounded-xl hover:bg-brand-dark transition-colors text-sm"
              >
                Thử lại
              </button>
              <Link
                to="/"
                className="px-5 py-2.5 border border-gray-200 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition-colors text-sm"
              >
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
