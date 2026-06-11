const statusConfig = {
  pending: { label: "Chờ xác nhận", className: "bg-amber-100 text-amber-700 border-amber-200" },
  confirmed: { label: "Đã xác nhận", className: "bg-emerald-100 text-emerald-700 border-emerald-200" },
  cancelled: { label: "Đã huỷ", className: "bg-red-100 text-red-700 border-red-200" },
};

export default function BookingStatusBadge({ status }) {
  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-1 rounded-full border ${config.className}`}
    >
      {config.label}
    </span>
  );
}
