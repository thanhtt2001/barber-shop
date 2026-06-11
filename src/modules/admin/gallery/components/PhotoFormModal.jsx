import { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";
import { fileToBase64 } from "../services/galleryAdminService";
import { Upload } from "lucide-react";

const STYLISTS = ["Alex Barber", "Huy Barber", "Hùng Barber"];
const FACE_SHAPES = ["Tất cả", "Mặt tròn", "Mặt dài", "Mặt vuông", "Mặt trái xoan"];
const HAIR_TYPES = ["Tất cả", "Tóc dày", "Tóc mỏng", "Tóc cứng", "Tóc xoăn"];

export default function PhotoFormModal({ isOpen, onClose, photo, onSubmit }) {
  const isEdit = !!photo;
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fileLoading, setFileLoading] = useState(false);
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      stylist: "Alex Barber",
      faceShape: "Tất cả",
      hairType: "Tất cả",
      url: "",
      description: "",
    },
  });

  const watchedUrl = watch("url");

  // Sync form values when the photo prop changes
  useEffect(() => {
    if (photo) {
      reset({
        title: photo.title || "",
        stylist: photo.stylist || "Alex Barber",
        faceShape: photo.faceShape || "Tất cả",
        hairType: photo.hairType || "Tất cả",
        url: photo.url || "",
        description: photo.description || "",
      });
    } else {
      reset({
        title: "",
        stylist: "Alex Barber",
        faceShape: "Tất cả",
        hairType: "Tất cả",
        url: "",
        description: "",
      });
    }
  }, [photo, reset, isOpen]);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Chỉ chấp nhận các tệp hình ảnh!");
      return;
    }

    setFileLoading(true);
    try {
      const base64 = await fileToBase64(file);
      setValue("url", base64);
    } catch (err) {
      alert("Lỗi khi đọc file ảnh. Vui lòng thử lại.");
    } finally {
      setFileLoading(false);
    }
  };

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    setFormError(null);

    // Fallback default image if empty
    if (!data.url) {
      data.url = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=600&auto=format&fit=crop&q=80";
    }

    try {
      const success = await onSubmit({
        ...photo,
        ...data,
      });
      if (success) {
        onClose();
      }
    } catch (err) {
      setFormError(err?.message || "Đã xảy ra lỗi, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  const footerContent = (
    <div className="flex justify-end gap-3 w-full">
      <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
        Hủy
      </Button>
      <Button type="submit" form="photo-form" variant="brand" loading={submitting}>
        {isEdit ? "Cập nhật" : "Thêm mới"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Chỉnh sửa thông tin kiểu tóc" : "Thêm mẫu kiểu tóc mới"}
      size="lg"
      footer={footerContent}
    >
      <form id="photo-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {formError}
          </div>
        )}

        <Input
          label="Tên kiểu tóc"
          id="photo-form-title"
          name="title"
          placeholder="Ví dụ: Modern Pompadour"
          required
          error={errors.title?.message}
          {...register("title", { required: "Vui lòng nhập tên kiểu tóc" })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select
            label="Barber thực hiện"
            id="photo-form-stylist"
            placeholder=""
            options={STYLISTS}
            error={errors.stylist?.message}
            {...register("stylist")}
          />

          <Select
            label="Dáng mặt phù hợp"
            id="photo-form-faceshape"
            placeholder=""
            options={FACE_SHAPES}
            error={errors.faceShape?.message}
            {...register("faceShape")}
          />

          <Select
            label="Chất tóc phù hợp"
            id="photo-form-hairtype"
            placeholder=""
            options={HAIR_TYPES}
            error={errors.hairType?.message}
            {...register("hairType")}
          />
        </div>

        {/* Image Source Selection */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-gray-50/50 p-4 rounded-xl border border-gray-150">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-1.5 select-none">
              Tải ảnh lên từ máy tính
            </label>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={fileLoading}
              className="w-full flex items-center justify-center gap-2 py-3 bg-white"
            >
              <Upload className="w-4 h-4" />
              {fileLoading ? "Đang xử lý ảnh..." : "Chọn ảnh từ máy..."}
            </Button>
          </div>

          <div className="w-full">
            <Input
              label="Hoặc liên kết ảnh ngoài (Image URL)"
              id="photo-form-url"
              name="url"
              placeholder="https://images.unsplash.com/photo-..."
              error={errors.url?.message}
              {...register("url")}
            />
          </div>
        </div>

        {/* Live Image Preview */}
        {watchedUrl && (
          <div className="mt-2 border border-gray-150 rounded-xl p-2 bg-gray-50 flex items-center gap-3">
            <img
              src={watchedUrl}
              alt="Xem trước mẫu tóc"
              className="w-24 h-24 object-cover rounded-lg border border-gray-200 bg-white"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div className="min-w-0 flex-1">
              <span className="text-xs text-gray-400 font-semibold block uppercase">Xem trước hình ảnh</span>
              <span className="text-xs text-gray-500 line-clamp-2 break-all max-w-lg mt-0.5">{watchedUrl}</span>
            </div>
          </div>
        )}

        {/* Description */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="photo-form-desc" className="text-sm font-semibold text-gray-700">
            Mô tả kiểu tóc và cách tạo kiểu
          </label>
          <textarea
            id="photo-form-desc"
            rows={3}
            placeholder="Mô tả phong cách, lợi thế dáng mặt, cách chăm sóc hoặc hướng dẫn vuốt sáp..."
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand hover:border-brand/50 transition-all duration-150"
            {...register("description")}
          />
        </div>
      </form>
    </Modal>
  );
}
