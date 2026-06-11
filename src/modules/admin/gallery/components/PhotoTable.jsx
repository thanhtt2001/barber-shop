import { Edit2, Trash2, Image as ImageIcon } from "lucide-react";

export default function PhotoTable({ photos, loading, onDelete, onEdit }) {
  const placeholderColors = [
    "from-sky-300 to-blue-500",
    "from-violet-300 to-purple-500",
    "from-pink-300 to-rose-500",
    "from-emerald-300 to-teal-500",
    "from-amber-300 to-orange-500",
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="aspect-square rounded-2xl bg-gray-100 animate-pulse border border-gray-100" />
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
          <ImageIcon className="w-8 h-8 text-gray-400" />
        </div>
        <p className="text-sm font-semibold text-gray-500">Chưa có ảnh kiểu tóc nào trong bộ sưu tập</p>
        <p className="text-xs text-gray-400 mt-1">Hãy thêm các mẫu kiểu tóc đầu tiên để bắt đầu xây dựng lookbook.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {photos.map((photo, i) => {
        const titleText = photo.title || photo.name?.split(".")[0]?.replace(/[-_]/g, " ") || "Mẫu tóc";
        const hasBadges = photo.faceShape && photo.hairType;

        return (
          <div
            key={photo.id}
            className="group relative rounded-2xl overflow-hidden border border-gray-150 bg-white shadow-sm hover:shadow-md hover:border-brand/40 transition-all duration-200 flex flex-col h-full"
          >
            {/* Image or placeholder */}
            <div className="relative w-full aspect-square overflow-hidden bg-gray-50 flex-shrink-0">
              {photo.url ? (
                <img
                  src={photo.url}
                  alt={titleText}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              ) : (
                <div
                  className={`w-full h-full bg-gradient-to-br ${placeholderColors[i % placeholderColors.length]} flex items-center justify-center`}
                >
                  <ImageIcon className="w-12 h-12 text-white/50" />
                </div>
              )}

              {/* Floating Action Overlay (shown on hover) */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(photo)}
                  aria-label={`Sửa ảnh ${titleText}`}
                  className="w-10 h-10 bg-white hover:bg-brand hover:text-white text-gray-800 rounded-xl shadow-lg transition-all flex items-center justify-center transform scale-90 group-hover:scale-100 duration-200"
                >
                  <Edit2 className="w-4.5 h-4.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(photo.id)}
                  aria-label={`Xoá ảnh ${titleText}`}
                  className="w-10 h-10 bg-white hover:bg-red-500 hover:text-white text-red-500 rounded-xl shadow-lg transition-all flex items-center justify-center transform scale-90 group-hover:scale-100 duration-200"
                >
                  <Trash2 className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Source Badge (top left) */}
              <span className={`absolute top-3 left-3 text-[10px] font-bold px-2 py-0.5 rounded-lg border shadow-sm ${
                photo.source === "facebook"
                  ? "bg-blue-50 border-blue-100 text-blue-600"
                  : "bg-gray-50 border-gray-150 text-gray-600"
              }`}>
                {photo.source === "facebook" ? "FB Feed" : "Lookbook"}
              </span>
            </div>

            {/* Info details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h4 className="text-sm font-bold text-gray-800 line-clamp-1 group-hover:text-brand transition-colors">
                  {titleText}
                </h4>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1 font-semibold">
                  <span>✂️</span> Barber: <span className="text-gray-600 font-bold">{photo.stylist || "Chưa rõ"}</span>
                </p>
                
                {/* Custom Metadata Badges */}
                {hasBadges && (
                  <div className="flex flex-wrap gap-1.5 mt-3 select-none">
                    <span className="text-[10px] font-bold bg-sky-50 text-sky-700 px-2 py-0.5 rounded-md border border-sky-100">
                      👤 {photo.faceShape}
                    </span>
                    <span className="text-[10px] font-bold bg-amber-50 text-amber-700 px-2 py-0.5 rounded-md border border-amber-100">
                      💈 {photo.hairType}
                    </span>
                  </div>
                )}
              </div>

              {/* Upload Date */}
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400 font-semibold select-none">
                <span>Ngày đăng:</span>
                <span>{photo.uploadDate}</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
