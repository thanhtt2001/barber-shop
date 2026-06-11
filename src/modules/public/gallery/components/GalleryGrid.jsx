import { useState } from "react";
import GalleryItem from "./GalleryItem";
import GalleryModal from "./GalleryModal";
import { SlidersHorizontal } from "lucide-react";

const FACE_SHAPES = ["Tất cả", "Mặt tròn", "Mặt dài", "Mặt vuông", "Mặt trái xoan"];
const STYLISTS = ["Tất cả", "Alex Barber", "Huy Barber", "Hùng Barber"];

export default function GalleryGrid({ photos = [], loading = false, error = null, isSection = false }) {
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedFaceShape, setSelectedFaceShape] = useState("Tất cả");
  const [selectedStylist, setSelectedStylist] = useState("Tất cả");

  const handleOpen = (index) => {
    // We need to map the clicked filtered photo index back to the index in filteredPhotos list
    setActiveIndex(index);
  };
  
  const handleClose = () => setActiveIndex(null);

  // Apply filters
  const filteredPhotos = photos.filter((p) => {
    // Face shape filter matches either exact shape, or is "Tất cả" (from user select or data field)
    const matchFace =
      selectedFaceShape === "Tất cả" ||
      p.faceShape === "Tất cả" ||
      p.faceShape === selectedFaceShape;

    // Stylist filter
    const matchStylist =
      selectedStylist === "Tất cả" ||
      p.stylist === selectedStylist;

    return matchFace && matchStylist;
  });

  const handlePrev = () =>
    setActiveIndex((prev) => (prev > 0 ? prev - 1 : prev));

  const handleNext = () =>
    setActiveIndex((prev) => (prev < filteredPhotos.length - 1 ? prev + 1 : prev));

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4" aria-label="Đang tải ảnh...">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square rounded-2xl bg-gray-100 animate-pulse border border-gray-100"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  return (
    <>
      {/* Interactive Filters (Only shown in Lookbook page, not in home section) */}
      {!isSection && photos.length > 0 && (
        <div className="bg-gray-50 border border-gray-150 p-5 rounded-2xl mb-8 flex flex-col gap-4 shadow-sm animate-fade-in">
          <div className="flex items-center gap-2 text-gray-800 font-bold text-sm select-none">
            <SlidersHorizontal className="w-4 h-4 text-brand" />
            <span>Bộ lọc kiểu tóc phù hợp</span>
          </div>

          <div className="space-y-3 pt-2 border-t border-gray-200/50">
            {/* Face Shape Filter */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider w-full sm:w-auto sm:mr-3 select-none">
                Hình dáng khuôn mặt:
              </span>
              {FACE_SHAPES.map((shape) => (
                <button
                  key={shape}
                  type="button"
                  onClick={() => setSelectedFaceShape(shape)}
                  className={[
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150",
                    selectedFaceShape === shape
                      ? "bg-brand text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300",
                  ].join(" ")}
                >
                  {shape}
                </button>
              ))}
            </div>

            {/* Stylist Filter */}
            <div className="flex flex-wrap items-center gap-2 border-t border-gray-200/40 pt-3">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider w-full sm:w-auto sm:mr-3 select-none">
                Thợ cắt thực hiện:
              </span>
              {STYLISTS.map((stylist) => (
                <button
                  key={stylist}
                  type="button"
                  onClick={() => setSelectedStylist(stylist)}
                  className={[
                    "px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-150",
                    selectedStylist === stylist
                      ? "bg-brand text-white shadow-sm"
                      : "bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-300",
                  ].join(" ")}
                >
                  {stylist}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm" role="alert">
          {error}
        </div>
      )}

      {/* Grid List */}
      {filteredPhotos.length > 0 ? (
        <div
          className="columns-2 md:columns-3 gap-4 space-y-4"
          aria-label="Thư viện ảnh kiểu tóc BarberPro"
        >
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              className="break-inside-avoid animate-fade-in"
              style={{ animationDelay: `${index * 40}ms` }}
            >
              <GalleryItem
                photo={photo}
                index={index}
                onClick={handleOpen}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-gray-50 rounded-2xl border border-gray-150 p-12 text-center select-none">
          <p className="text-sm font-semibold text-gray-400">Không tìm thấy kiểu tóc nào phù hợp với bộ lọc</p>
          <button
            type="button"
            onClick={() => {
              setSelectedFaceShape("Tất cả");
              setSelectedStylist("Tất cả");
            }}
            className="text-xs font-bold text-brand hover:underline mt-2"
          >
            Đặt lại bộ lọc
          </button>
        </div>
      )}

      {/* Detail Modal Overlay */}
      <GalleryModal
        photos={filteredPhotos}
        activeIndex={activeIndex}
        onClose={handleClose}
        onPrev={handlePrev}
        onNext={handleNext}
      />
    </>
  );
}
