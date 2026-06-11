import { formatPrice } from "@/shared/utils/formatPrice";
import { Link } from "react-router-dom";

export default function PriceTable({ services }) {
  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm"
      role="table"
      aria-label="Bảng giá dịch vụ"
    >
      {/* Table Header */}
      <div
        className="grid grid-cols-1 sm:grid-cols-3 bg-gradient-to-r from-brand-dark to-brand text-white px-6 py-4 gap-4"
        role="row"
      >
        <div role="columnheader" className="font-semibold text-sm uppercase tracking-wider">
          Dịch vụ
        </div>
        <div role="columnheader" className="font-semibold text-sm uppercase tracking-wider hidden sm:block">
          Thời gian
        </div>
        <div role="columnheader" className="font-semibold text-sm uppercase tracking-wider hidden sm:block text-right">
          Giá
        </div>
      </div>

      {/* Table Body */}
      <div className="divide-y divide-gray-100">
        {services.map((service, index) => (
          <div
            key={service.id}
            role="row"
            className={[
              "grid grid-cols-1 sm:grid-cols-3 px-6 py-4 gap-2 sm:gap-4 items-center",
              "hover:bg-brand-light/30 transition-colors duration-150",
              index % 2 === 0 ? "bg-white" : "bg-gray-50/50",
            ].join(" ")}
          >
            {/* Service Name */}
            <div role="cell" className="flex items-center gap-3">
              <span className="text-xl flex-shrink-0" aria-hidden="true">
                {service.icon}
              </span>
              <div>
                <p className="font-semibold text-gray-900 text-sm">{service.name}</p>
                {service.popular && (
                  <span className="text-xs text-brand font-medium">⭐ Phổ biến</span>
                )}
                {service.badge && (
                  <span className="text-xs text-emerald-600 font-medium">✅ {service.badge}</span>
                )}
              </div>
            </div>

            {/* Duration */}
            <div role="cell" className="hidden sm:flex items-center gap-1.5 text-gray-500 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {service.duration} phút
            </div>

            {/* Price + CTA */}
            <div role="cell" className="flex items-center justify-between sm:justify-end gap-4">
              <span className="text-lg font-bold text-brand">
                {formatPrice(service.price)}
              </span>
              <Link
                to={`/booking?service=${service.id}`}
                className="text-xs font-semibold text-brand hover:text-brand-dark underline underline-offset-2 transition-colors whitespace-nowrap"
              >
                Đặt ngay
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div className="bg-brand-light px-6 py-3 text-xs text-gray-500 text-center">
        * Giá có thể thay đổi theo từng cơ sở. Liên hệ để biết thêm chi tiết.
      </div>
    </div>
  );
}
