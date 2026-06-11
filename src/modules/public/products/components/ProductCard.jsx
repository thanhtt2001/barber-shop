import { Link } from "react-router-dom";
import Card from "@/shared/components/ui/Card";
import Button from "@/shared/components/ui/Button";
import { formatPrice } from "@/shared/utils/formatPrice";

export default function ProductCard({ product, onBuyNow }) {
  const { id, name, description, price, category, image, rating, inStock, color } = product;

  // Render rating stars
  const renderStars = (ratingVal) => {
    const stars = [];
    const fullStars = Math.floor(ratingVal);
    const hasHalf = ratingVal % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      } else if (i === fullStars + 1 && hasHalf) {
        stars.push(
          <div key={i} className="relative w-4 h-4 text-gray-300">
            <svg className="absolute top-0 left-0 w-full h-full text-amber-400" fill="currentColor" viewBox="0 0 20 20" style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}>
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <svg className="w-full h-full" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          </div>
        );
      } else {
        stars.push(
          <svg key={i} className="w-4 h-4 text-gray-200" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        );
      }
    }
    return stars;
  };

  return (
    <Card hover className="relative overflow-hidden group p-5 flex flex-col h-full bg-white border border-gray-100 rounded-2xl shadow-sm">
      {/* Product Image */}
      <div className="relative aspect-square w-full bg-gray-50 rounded-xl overflow-hidden mb-4 border border-gray-100 flex items-center justify-center">
        <img
          src={image}
          alt={name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {!inStock && (
          <span className="absolute inset-0 bg-black/60 backdrop-blur-[1px] flex items-center justify-center text-white text-sm font-bold uppercase tracking-wider">
            Hết hàng
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col">
        {/* Rating & Stock Status */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-0.5" aria-label={`Đánh giá ${rating} sao`}>
            {renderStars(rating)}
            <span className="text-xs text-gray-400 font-semibold ml-1">{rating}</span>
          </div>
          {inStock ? (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Còn hàng
            </span>
          ) : (
            <span className="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
              Tạm hết
            </span>
          )}
        </div>

        {/* Name */}
        <h3 className="text-base font-bold text-gray-900 mb-1.5 font-display group-hover:text-brand transition-colors line-clamp-1">
          {name}
        </h3>

        {/* Description */}
        <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2 flex-1">
          {description}
        </p>

        {/* Price & CTA */}
        <div className="pt-3.5 border-t border-gray-150 flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider">Giá bán</p>
            <span className="text-lg font-bold text-brand font-display">{formatPrice(price)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 mt-auto">
          <Button
            onClick={() => onBuyNow(product)}
            disabled={!inStock}
            variant="primary"
            size="sm"
            className="w-full"
          >
            Mua ngay
          </Button>
          <Link to={`/booking?product=${id}`} className="w-full">
            <Button
              disabled={!inStock}
              variant="outline"
              size="sm"
              className="w-full text-xs font-semibold px-1"
            >
              Đặt lịch kèm
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}
