import { useRef, useState } from "react";
import usePhotoManager from "./hooks/usePhotoManager";
import PhotoTable from "./components/PhotoTable";
import PhotoFormModal from "./components/PhotoFormModal";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";
import { Plus, UploadCloud } from "lucide-react";

const MAX_FILE_SIZE_MB = 10;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export default function GalleryAdminPage() {
  const {
    photos,
    loading,
    error,
    removePhoto,
    addPhoto,
    createPhoto,
    editPhoto
  } = usePhotoManager();

  const fileInputRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleFileChange = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Validate loại file
      if (!ALLOWED_TYPES.includes(file.type)) {
        alert(`File "${file.name}" không hợp lệ. Chỉ chấp nhận JPEG, PNG, WebP, GIF.`);
        continue;
      }

      // Validate kích thước file
      if (file.size > MAX_FILE_SIZE_BYTES) {
        alert(`File "${file.name}" quá lớn (${(file.size / 1024 / 1024).toFixed(1)}MB). Tối đa ${MAX_FILE_SIZE_MB}MB.`);
        continue;
      }

      await addPhoto(file);
    }

    // Reset input so user can choose same file again if they want
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleCreateTrigger = () => {
    setSelectedPhoto(null);
    setIsModalOpen(true);
  };

  const handleEditTrigger = (photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá ảnh kiểu tóc này khỏi bộ sưu tập?")) {
      await removePhoto(id);
    }
  };

  const handleSubmit = async (data) => {
    let result;
    if (selectedPhoto) {
      result = await editPhoto(data);
    } else {
      result = await createPhoto(data);
    }
    return !!result;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Quản lý bộ sưu tập (Lookbook)</h1>
          <p className="text-sm text-gray-500 mt-1">
            Quản lý các hình ảnh kiểu tóc thực tế làm thương hiệu tại salon, hiển thị ở Lookbook công khai.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            multiple
            accept="image/jpeg,image/png,image/webp,image/gif"
            className="hidden"
          />
          <Button
            onClick={triggerFileInput}
            variant="outline"
            className="inline-flex items-center gap-2 bg-white border-gray-200"
          >
            <UploadCloud className="w-4.5 h-4.5" />
            Tải nhanh hàng loạt
          </Button>
          <Button
            onClick={handleCreateTrigger}
            variant="brand"
            className="inline-flex items-center gap-2"
          >
            <Plus className="w-4.5 h-4.5" />
            Thêm kiểu tóc mới
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
          <span>{error}</span>
        </div>
      )}

      <Card className="p-6">
        <PhotoTable
          photos={photos}
          loading={loading}
          onEdit={handleEditTrigger}
          onDelete={handleDeleteTrigger}
        />
      </Card>

      <PhotoFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        photo={selectedPhoto}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
