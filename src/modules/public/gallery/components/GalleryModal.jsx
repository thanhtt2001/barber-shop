import { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { X, ChevronLeft, ChevronRight, User, Scissors, Smile, Calendar, Image as ImageIcon } from "lucide-react";
import Button from "@/shared/components/ui/Button";

export default function GalleryModal({ photos, activeIndex, onClose, onPrev, onNext }) {
  const isOpen = activeIndex !== null && activeIndex >= 0;
  const photo = isOpen ? photos[activeIndex] : null;
  const imageUrl = photo?.url || photo?.media_url || null;
  const titleText = photo?.title || photo?.caption || `Ảnh mẫu tóc ${(activeIndex ?? 0) + 1}`;
  const stylistName = photo?.stylist || "";

  const handleKeyDown = useCallback(
    (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [isOpen, onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    if (isOpen) document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const placeholderColors = [
    "from-sky-300 to-blue-500",
    "from-violet-300 to-purple-500",
    "from-pink-300 to-rose-500",
    "from-emerald-300 to-teal-500",
    "from-amber-300 to-orange-500",
    "from-indigo-300 to-blue-600",
  ];
  const colorClass = placeholderColors[activeIndex % placeholderColors.length];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm transition-all duration-300"
      role="dialog"
      aria-modal="true"
      aria-label="Xem chi tiết kiểu tóc"
    >
      {/* Backdrop click to close */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Main Frame */}
      <div className="relative z-10 bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] animate-scale-in">
        
        {/* Left Side: Image display + Navigation buttons */}
        <div className="relative flex-1 bg-black/95 flex items-center justify-center min-h-[300px] sm:min-h-[400px] md:max-h-[85vh] p-2 select-none group">
          {imageUrl ? (
            <img
              key={activeIndex}
              src={imageUrl}
              alt={titleText}
              className="w-full h-full object-contain max-h-[50vh] md:max-h-[80vh] transition-transform duration-300"
            />
          ) : (
            <div
              className={`w-full h-full min-h-[300px] bg-gradient-to-br ${colorClass} flex flex-col items-center justify-center text-white`}
            >
              <ImageIcon className="w-16 h-16 opacity-50 mb-3" />
              <span className="font-semibold text-lg">Chưa tải ảnh kiểu tóc</span>
            </div>
          )}

          {/* Left Arrow */}
          <button
            onClick={onPrev}
            disabled={activeIndex === 0}
            aria-label="Ảnh trước"
            className="absolute left-4 p-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10 shadow-md flex items-center justify-center"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={onNext}
            disabled={activeIndex === photos.length - 1}
            aria-label="Ảnh tiếp theo"
            className="absolute right-4 p-2.5 rounded-xl bg-black/40 hover:bg-black/60 text-white disabled:opacity-20 disabled:cursor-not-allowed transition-all border border-white/10 shadow-md flex items-center justify-center"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Slide counter (bottom center of image) */}
          <span className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 text-xs font-bold text-white/80 bg-black/35 rounded-full select-none">
            {activeIndex + 1} / {photos.length}
          </span>
        </div>

        {/* Right Side: Hairstyle metadata sidebar */}
        <div className="w-full md:w-80 p-6 sm:p-8 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 bg-white max-h-[40vh] md:max-h-[85vh] overflow-y-auto">
          <div className="space-y-5">
            {/* Header info */}
            <div>
              <span className="inline-block px-2.5 py-0.5 bg-brand-light text-brand-dark text-[10px] font-bold rounded-lg uppercase tracking-wider mb-2 select-none">
                {photo?.source === "facebook" ? "Facebook Feed" : "Hairstyle Lookbook"}
              </span>
              <h3 className="text-lg md:text-xl font-bold text-gray-900 leading-tight">
                {titleText}
              </h3>
            </div>

            {/* Stylist & Badges */}
            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              {stylistName && (
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <User className="w-4 h-4 text-brand-dark" />
                  <span>Người thực hiện: <strong className="text-gray-900 font-bold">{stylistName}</strong></span>
                </div>
              )}

              {photo?.faceShape && (
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <Smile className="w-4 h-4 text-emerald-600" />
                  <span>Dáng mặt phù hợp: <strong className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">{photo.faceShape}</strong></span>
                </div>
              )}

              {photo?.hairType && (
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-600">
                  <Scissors className="w-4 h-4 text-amber-600" />
                  <span>Chất tóc phù hợp: <strong className="text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded border border-amber-100">{photo.hairType}</strong></span>
                </div>
              )}

              {photo?.uploadDate && (
                <div className="flex items-center gap-2 text-xs font-semibold text-gray-400 select-none">
                  <Calendar className="w-4 h-4" />
                  <span>Ngày đăng: {photo.uploadDate}</span>
                </div>
              )}
            </div>

            {/* Description */}
            {photo?.description && (
              <div className="pt-4 border-t border-gray-100">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1.5 select-none">
                  Mô tả phong cách
                </h4>
                <p className="text-xs text-gray-600 leading-relaxed max-h-32 overflow-y-auto">
                  {photo.description}
                </p>
              </div>
            )}
          </div>

          {/* Call-to-action booking button */}
          <div className="pt-6 mt-6 border-t border-gray-100 flex flex-col gap-3">
            <Link to="/booking" onClick={onClose} className="w-full">
              <Button variant="brand" className="w-full py-3 text-xs font-bold shadow-md shadow-brand/20">
                Đặt lịch kiểu tóc này
              </Button>
            </Link>
            <button
              onClick={onClose}
              className="text-xs font-semibold text-gray-400 hover:text-gray-600 transition-colors py-1 block text-center"
            >
              Đóng Lookbook
            </button>
          </div>
        </div>

        {/* Global Close Button (top-right of screen) */}
        <button
          onClick={onClose}
          aria-label="Đóng ảnh"
          className="absolute top-4 right-4 p-2.5 rounded-xl bg-black/10 hover:bg-black/20 text-gray-800 hover:text-gray-900 transition-all z-20 shadow-sm md:bg-white/80 md:hover:bg-white border border-gray-150"
        >
          <X className="w-4.5 h-4.5" />
        </button>

      </div>
    </div>
  );
}
