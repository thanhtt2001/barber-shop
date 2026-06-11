import BookingForm from "./components/BookingForm";
import BookingConfirm from "./components/BookingConfirm";
import useBookingStore from "./store/bookingStore";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

export default function BookingPage() {
  const step = useBookingStore((state) => state.step);
  useDocumentTitle("Đặt lịch");

  return (
    <main className="min-h-screen pt-20 pb-16 bg-gray-50" id="booking-page">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 pt-8">
            <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-3">
              Đặt lịch online
            </span>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-3">
              Đặt lịch{" "}
              <span className="text-gradient">nhanh chóng</span>
            </h1>
            <p className="text-gray-500 max-w-md mx-auto">
              Chọn dịch vụ, thời gian và cơ sở phù hợp — chúng tôi sẽ xác nhận trong 30 phút.
            </p>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center justify-center gap-3 mb-8" aria-label="Tiến trình đặt lịch">
            <div
              className={[
                "flex items-center gap-2 text-sm font-semibold",
                step === "form" ? "text-brand" : "text-gray-400",
              ].join(" ")}
            >
              <span
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                  step === "form"
                    ? "bg-brand text-white"
                    : "bg-emerald-500 text-white",
                ].join(" ")}
                aria-current={step === "form" ? "step" : undefined}
              >
                {step === "confirm" ? "✓" : "1"}
              </span>
              Điền thông tin
            </div>

            <div className="w-12 h-px bg-gray-300" aria-hidden="true" />

            <div
              className={[
                "flex items-center gap-2 text-sm font-semibold",
                step === "confirm" ? "text-brand" : "text-gray-400",
              ].join(" ")}
            >
              <span
                className={[
                  "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold",
                  step === "confirm"
                    ? "bg-brand text-white"
                    : "bg-gray-200 text-gray-500",
                ].join(" ")}
                aria-current={step === "confirm" ? "step" : undefined}
              >
                2
              </span>
              Xác nhận
            </div>
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8">
            {step === "form" ? <BookingForm /> : <BookingConfirm />}
          </div>

          {/* Contact fallback */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Cần hỗ trợ?{" "}
            <a href="tel:0901234567" className="text-brand hover:underline font-medium">
              Gọi ngay: 0901 234 567
            </a>
          </p>
        </div>
      </div>
    </main>
  );
}
