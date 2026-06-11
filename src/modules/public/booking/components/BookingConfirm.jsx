import Button from "@/shared/components/ui/Button";
import { services } from "@/modules/public/services/data/services.data";
import { branches } from "@/modules/public/branches/data/branches.data";
import { products } from "@/modules/public/products/data/products.data";
import useBookingStore from "../store/bookingStore";
import { formatDate } from "@/shared/utils/formatDate";
import { formatPrice } from "@/shared/utils/formatPrice";

export default function BookingConfirm() {
  const { bookingData, bookingResult, resetBooking } = useBookingStore();

  if (!bookingData) return null;

  const service = services.find((s) => s.id === bookingData.service);
  const branch = branches.find((b) => b.id === bookingData.branch);

  // Get selected products and calculate price
  const storedProductsData = localStorage.getItem("barberpro_admin_products");
  let allProducts = products;
  if (storedProductsData) {
    try {
      allProducts = JSON.parse(storedProductsData);
    } catch (e) {
      allProducts = products;
    }
  }

  const selectedProductIds = bookingData.selectedProducts || [];
  const selectedProducts = allProducts.filter((p) => selectedProductIds.includes(p.id));

  const servicePrice = service ? service.price : 0;
  const productsPrice = selectedProducts.reduce((sum, p) => sum + (p.price * 0.9), 0);
  const totalPrice = servicePrice + productsPrice;

  const infoRows = [
    {
      id: "confirm-name",
      label: "Họ và tên",
      value: bookingData.fullName,
      icon: "👤",
    },
    {
      id: "confirm-phone",
      label: "Số điện thoại",
      value: bookingData.phone,
      icon: "📞",
    },
    {
      id: "confirm-service",
      label: "Dịch vụ",
      value: service ? `${service.icon} ${service.name} — ${formatPrice(service.price)}` : bookingData.service,
      icon: "✂️",
    },
    ...(selectedProducts.length > 0
      ? [
          {
            id: "confirm-products",
            label: "Sản phẩm mua kèm (giảm 10%)",
            value: selectedProducts
              .map((p) => `${p.name} (${formatPrice(p.price * 0.9)})`)
              .join(", "),
            icon: "🧴",
          },
        ]
      : []),
    {
      id: "confirm-total",
      label: "Tổng thanh toán (tạm tính)",
      value: formatPrice(totalPrice),
      icon: "💳",
    },
    {
      id: "confirm-datetime",
      label: "Thời gian",
      value: `${bookingData.time} · ${formatDate(bookingData.date, { weekday: "long", year: "numeric", month: "long", day: "2-digit" })}`,
      icon: "📅",
    },
    {
      id: "confirm-branch",
      label: "Cơ sở",
      value: branch ? `${branch.name} — ${branch.address}` : bookingData.branch,
      icon: "📍",
    },
    ...(bookingData.note
      ? [
          {
            id: "confirm-note",
            label: "Ghi chú",
            value: bookingData.note,
            icon: "📝",
          },
        ]
      : []),
  ];

  return (
    <div className="text-center animate-scale-in">
      {/* Success Icon */}
      <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg
          className="w-10 h-10 text-emerald-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      </div>

      {/* Title */}
      <h2 className="text-2xl font-bold font-display text-gray-900 mb-2">
        Đặt lịch thành công! 🎉
      </h2>
      {bookingResult?.bookingId && (
        <p className="text-sm text-gray-500 mb-6">
          Mã đặt lịch:{" "}
          <strong className="text-brand font-mono text-base">
            #{bookingResult.bookingId}
          </strong>
        </p>
      )}

      {/* Info Card */}
      <div
        className="bg-gray-50 rounded-2xl border border-gray-200 text-left divide-y divide-gray-100 mb-6"
        aria-label="Thông tin đặt lịch"
      >
        {infoRows.map((row) => (
          <div key={row.id} id={row.id} className="flex items-start gap-3 px-5 py-3.5">
            <span className="text-lg flex-shrink-0 mt-0.5" aria-hidden="true">
              {row.icon}
            </span>
            <div className="min-w-0">
              <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                {row.label}
              </p>
              <p className="text-sm text-gray-800 font-medium mt-0.5 break-words">
                {row.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Notice */}
      <div className="bg-brand-light border border-brand/20 rounded-xl p-4 text-sm text-brand mb-6 text-left">
        <p className="font-semibold mb-1">📲 Xác nhận qua điện thoại</p>
        <p className="text-gray-600 text-xs leading-relaxed">
          Nhân viên sẽ gọi điện xác nhận lịch hẹn trong vòng <strong>30 phút</strong>.
          Vui lòng giữ máy trong giờ làm việc (08:00 — 18:00).
        </p>
      </div>

      {/* Action */}
      <Button
        id="new-booking-btn"
        variant="outline"
        size="lg"
        className="w-full"
        onClick={resetBooking}
      >
        Đặt lịch mới
      </Button>
    </div>
  );
}
