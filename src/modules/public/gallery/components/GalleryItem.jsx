import { Eye, Image as ImageIcon } from "lucide-react";

export default function GalleryItem({ photo, index, onClick }) {
  const imageUrl = photo?.url || photo?.media_url || null;
  const titleText = photo?.title || photo?.caption || `Ảnh mẫu tóc ${index + 1}`;
  const stylistName = photo?.stylist || "";

  // Placeholder colors for demo
  const placeholderColors = [
    "from-sky-300 to-blue-500",
    "from-violet-300 to-purple-500",
    "from-pink-300 to-rose-500",
    "from-emerald-300 to-teal-500",
    "from-amber-300 to-orange-500",
    "from-indigo-300 to-blue-600",
  ];
  const colorClass = placeholderColors[index % placeholderColors.length];

  return (
    <button
      type="button"
      onClick={() => onClick(index)}
      aria-label={`Xem ảnh: ${titleText}`}
      className="relative w-full overflow-hidden rounded-2xl group cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 border border-gray-100 shadow-sm block text-left"
    >
      {/* Aspect ratio container */}
      <div className="relative aspect-square">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={titleText}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* Placeholder */
          <div
            className={`w-full h-full bg-gradient-to-br ${colorClass} flex flex-col items-center justify-center`}
            aria-hidden="true"
          >
            <ImageIcon className="w-12 h-12 text-white/50 mb-2" />
            <span className="text-white/70 text-xs font-semibold">BarberPro</span>
          </div>
        )}

        {/* Hover overlay with style info */}
        <div className="absolute inset-0 bg-brand-dark/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-center select-none">
          <Eye className="w-8 h-8 text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300" />
          <h4 className="text-white font-bold text-sm md:text-base line-clamp-1 px-2">
            {titleText}
          </h4>
          {stylistName && (
            <p className="text-sky-200 text-[11px] font-semibold mt-1">
              ✂️ {stylistName}
            </p>
          )}
          
          {/* Metadata attributes badges */}
          {(photo.faceShape || photo.hairType) && (
            <div className="flex flex-wrap items-center justify-center gap-1 mt-2.5">
              {photo.faceShape && photo.faceShape !== "Tất cả" && (
                <span className="text-[9px] font-bold bg-white/10 text-white border border-white/10 px-1.5 py-0.5 rounded">
                  {photo.faceShape}
                </span>
              )}
              {photo.hairType && photo.hairType !== "Tất cả" && (
                <span className="text-[9px] font-bold bg-white/10 text-white border border-white/10 px-1.5 py-0.5 rounded">
                  {photo.hairType}
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </button>
  );
}
