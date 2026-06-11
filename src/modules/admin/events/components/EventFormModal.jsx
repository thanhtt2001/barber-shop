import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";

export default function EventFormModal({ isOpen, onClose, event, onSubmit }) {
  const isEdit = !!event;
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      timeText: "",
      image: "",
      badgeText: "",
      isHot: false,
      isUpcoming: false,
      status: "active",
      description: "",
    },
  });

  // Watch image field to show live preview
  const watchedImage = watch("image");

  // Sync form values when the event prop changes (for edit action)
  useEffect(() => {
    if (event) {
      reset({
        title: event.title,
        timeText: event.timeText,
        image: event.image,
        badgeText: event.badgeText,
        isHot: !!event.isHot,
        isUpcoming: !!event.isUpcoming,
        status: event.status || "active",
        description: event.description,
      });
    } else {
      reset({
        title: "",
        timeText: "",
        image: "",
        badgeText: "",
        isHot: false,
        isUpcoming: false,
        status: "active",
        description: "",
      });
    }
  }, [event, reset, isOpen]);

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    setFormError(null);

    // Fallback image if empty
    if (!data.image) {
      data.image = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80";
    }

    try {
      const success = await onSubmit(data);
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
      <Button type="submit" form="event-form" variant="brand" loading={submitting}>
        {isEdit ? "Cập nhật" : "Thêm mới"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Chỉnh sửa sự kiện" : "Thêm sự kiện mới"}
      size="lg"
      footer={footerContent}
    >
      <form id="event-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
            <span>{formError}</span>
          </div>
        )}

        <Input
          label="Tiêu đề sự kiện"
          id="event-form-title"
          name="title"
          placeholder="Ví dụ: Giảm Ngay 20% Tổng Hóa Đơn Khi Đặt Lịch Online Cuối Tuần"
          required
          error={errors.title?.message}
          {...register("title", { required: "Vui lòng nhập tiêu đề sự kiện" })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Thời gian diễn ra (Text)"
            id="event-form-timetext"
            name="timeText"
            placeholder="Ví dụ: Thứ Bảy - Chủ Nhật tuần này"
            error={errors.timeText?.message}
            {...register("timeText")}
          />

          <Input
            label="Nhãn hiển thị nổi bật (Badge Text)"
            id="event-form-badgetext"
            name="badgeText"
            placeholder="Ví dụ: Khuyến Mãi Hot, Sắp Diễn Ra"
            error={errors.badgeText?.message}
            {...register("badgeText")}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2">
            <Input
              label="Đường dẫn ảnh sự kiện (Image URL)"
              id="event-form-image"
              name="image"
              placeholder="https://images.unsplash.com/photo-..."
              error={errors.image?.message}
              {...register("image")}
            />
          </div>
          <div>
            <Select
              label="Trạng thái hiển thị"
              id="event-form-status"
              placeholder=""
              options={[
                { value: "active", label: "Hoạt động" },
                { value: "inactive", label: "Tạm ngưng" },
              ]}
              {...register("status")}
            />
          </div>
        </div>

        {/* Image Live Preview */}
        {watchedImage && (
          <div className="mt-2 border border-gray-150 rounded-xl p-2 bg-gray-50 flex items-center gap-3">
            <img
              src={watchedImage}
              alt="Xem trước ảnh"
              className="w-24 h-15 object-cover rounded-lg border border-gray-200"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            <div>
              <span className="text-xs text-gray-400 font-semibold block uppercase">Live Preview ảnh</span>
              <span className="text-xs text-gray-500 line-clamp-1 break-all max-w-sm">{watchedImage}</span>
            </div>
          </div>
        )}

        {/* Checkbox tags */}
        <div className="flex flex-wrap gap-6 py-2 border-t border-b border-gray-100 bg-gray-50/50 p-4 rounded-xl">
          <div className="flex items-center gap-2 select-none">
            <input
              type="checkbox"
              id="event-form-ishot"
              className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
              {...register("isHot")}
            />
            <label htmlFor="event-form-ishot" className="text-sm font-semibold text-gray-700 cursor-pointer">
              Sự kiện Hot (Có nhãn Hot nổi bật và được ưu tiên trên trang chủ)
            </label>
          </div>

          <div className="flex items-center gap-2 select-none">
            <input
              type="checkbox"
              id="event-form-isupcoming"
              className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
              {...register("isUpcoming")}
            />
            <label htmlFor="event-form-isupcoming" className="text-sm font-semibold text-gray-700 cursor-pointer">
              Sắp diễn ra (Có nhãn Sắp diễn ra hiển thị ngoài trang chủ)
            </label>
          </div>
        </div>

        {/* Mô tả */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="event-form-desc" className="text-sm font-semibold text-gray-700">
            Mô tả chi tiết sự kiện <span className="text-red-500">*</span>
          </label>
          <textarea
            id="event-form-desc"
            rows={4}
            placeholder="Nhập chi tiết ưu đãi, điều kiện áp dụng, các dịch vụ áp dụng..."
            className={[
              "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
              errors.description ? "border-red-400 focus:ring-red-400" : "border-gray-200",
            ].join(" ")}
            {...register("description", { required: "Vui lòng nhập mô tả sự kiện" })}
          />
          {errors.description && (
            <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>
          )}
        </div>
      </form>
    </Modal>
  );
}
