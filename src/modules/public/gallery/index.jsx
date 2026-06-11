import { useEffect, useState } from "react";
import GalleryGrid from "./components/GalleryGrid";
import { fetchAdminPhotos } from "@/modules/admin/gallery/services/galleryAdminService";
import { Link } from "react-router-dom";
import Button from "@/shared/components/ui/Button";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

export default function GalleryModule({ isSection = false }) {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useDocumentTitle(isSection ? null : "Mẫu tóc");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchAdminPhotos();
        setPhotos(data);
      } catch (err) {
        setError("Không thể tải hình ảnh mẫu tóc");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const Wrapper = isSection ? "section" : "main";

  return (
    <Wrapper
      id="gallery"
      className="section-padding bg-white"
      aria-labelledby="gallery-heading"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-3">
              Thư viện ảnh
            </span>
            <h2
              id="gallery-heading"
              className="text-3xl md:text-4xl font-bold font-display text-gray-900"
            >
              Mẫu tóc{" "}
              <span className="text-gradient">mới nhất</span>
            </h2>
            <p className="text-gray-500 mt-2 max-w-md">
              Khám phá các kiểu tóc nam đẹp thực tế được thiết kế bởi các barber hàng đầu tại BarberPro.
            </p>
          </div>

          {isSection && (
            <Link to="/gallery">
              <Button variant="outline" size="sm">
                Xem tất cả ảnh →
              </Button>
            </Link>
          )}
        </div>

        {/* Gallery Grid */}
        <GalleryGrid
          photos={isSection ? photos.slice(0, 6) : photos}
          loading={loading}
          error={error}
          isSection={isSection}
        />
      </div>
    </Wrapper>
  );
}
