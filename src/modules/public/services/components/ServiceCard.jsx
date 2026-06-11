import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import { formatPrice } from "@/shared/utils/formatPrice";

export default function ServiceCard({ service }) {
  const { icon, name, description, price, duration, popular, badge, color } = service;

  return (
    <Card
      hover
      className="relative overflow-hidden group p-6 flex flex-col h-full"
    >
      {/* Popular / Badge */}
      {(popular || badge) && (
        <span className="absolute top-4 right-4 text-xs font-bold px-2.5 py-1 bg-brand text-white rounded-full shadow-sm">
          {badge || "Phổ biến"}
        </span>
      )}

      {/* Icon with gradient background */}
      <div
        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-2xl mb-4 shadow-md group-hover:scale-110 transition-transform duration-300`}
        aria-hidden="true"
      >
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-gray-900 mb-2 font-display">{name}</h3>
      <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-4">{description}</p>

      {/* Price + Duration */}
      <div className="flex items-center justify-between mb-4 pt-4 border-t border-gray-100">
        <span className="text-2xl font-bold text-brand">{formatPrice(price)}</span>
        <div className="flex items-center gap-1 text-xs text-gray-400">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{duration} phút</span>
        </div>
      </div>

      {/* CTA */}
      <Link to={`/booking?service=${service.id}`}>
        <Button variant="outline" size="sm" className="w-full">
          Đặt lịch dịch vụ này
        </Button>
      </Link>
    </Card>
  );
}
