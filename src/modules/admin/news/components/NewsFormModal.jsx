import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";

const CATEGORIES = ["Xu hướng tóc", "Bí quyết tóc", "Khuyến mãi", "Tin cửa hàng"];

export default function NewsFormModal({ isOpen, onClose, post, onSubmit }) {
  const isEdit = !!post;
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
      category: "Xu hướng tóc",
      author: "Admin BarberPro",
      image: "",
      summary: "",
      content: "",
      isFeatured: false,
      status: "active",
    },
  });

  // Watch image URL field to show preview
  const watchedImage = watch("image");

  // Sync form values when the post prop changes
  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        category: post.category || "Xu hướng tóc",
        author: post.author || "Admin BarberPro",
        image: post.image,
        summary: post.summary,
        content: post.content,
        isFeatured: !!post.isFeatured,
        status: post.status || "active",
      });
    } else {
      reset({
        title: "",
        category: "Xu hướng tóc",
        author: "Admin BarberPro",
        image: "",
        summary: "",
        content: "",
        isFeatured: false,
        status: "active",
      });
    }
  }, [post, reset, isOpen]);

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    setFormError(null);

    // Fallback image if empty
    if (!data.image) {
      data.image = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80";
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
      <Button type="submit" form="news-form" variant="brand" loading={submitting}>
        {isEdit ? "Cập nhật" : "Thêm mới"}
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Chỉnh sửa bài viết" : "Viết bài mới"}
      size="lg"
      footer={footerContent}
    >
      <form id="news-form" onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
            {formError}
          </div>
        )}

        <Input
          label="Tiêu đề bài viết"
          id="news-form-title"
          name="title"
          placeholder="Ví dụ: Top 5 kiểu tóc nam Undercut đẹp nhất xu hướng 2026"
          required
          error={errors.title?.message}
          {...register("title", { required: "Vui lòng nhập tiêu đề bài viết" })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Category */}
          <Select
            label="Danh mục bài viết"
            id="news-form-category"
            required
            placeholder="-- Chọn danh mục --"
            options={CATEGORIES}
            error={errors.category?.message}
            {...register("category", { required: "Vui lòng chọn danh mục" })}
          />

          <Input
            label="Tác giả"
            id="news-form-author"
            name="author"
            placeholder="Ví dụ: Minh Trí Barber"
            required
            error={errors.author?.message}
            {...register("author", { required: "Vui lòng nhập tên tác giả" })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-end">
          <div className="sm:col-span-2">
            <Input
              label="Ảnh đại diện bài viết (Image URL)"
              id="news-form-image"
              name="image"
              placeholder="https://images.unsplash.com/photo-..."
              error={errors.image?.message}
              {...register("image")}
            />
          </div>
          <div>
            <Select
              label="Trạng thái bài viết"
              id="news-form-status"
              placeholder=""
              options={[
                { value: "active", label: "Hoạt động" },
                { value: "inactive", label: "Tạm ngưng" },
              ]}
              {...register("status")}
            />
          </div>
        </div>

        {/* Live Image Preview */}
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

        {/* Checkbox Featured */}
        <div className="flex items-center gap-2 py-2 border-t border-b border-gray-100 bg-gray-50/50 p-4 rounded-xl select-none">
          <input
            type="checkbox"
            id="news-form-isfeatured"
            className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
            {...register("isFeatured")}
          />
          <label htmlFor="news-form-isfeatured" className="text-sm font-semibold text-gray-700 cursor-pointer">
            Đánh dấu là bài viết nổi bật (Hiển thị ưu tiên hàng đầu ngoài trang tin tức)
          </label>
        </div>

        {/* Summary */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="news-form-summary" className="text-sm font-semibold text-gray-700">
            Tóm tắt ngắn bài viết <span className="text-red-500">*</span>
          </label>
          <textarea
            id="news-form-summary"
            rows={2}
            placeholder="Mô tả tóm tắt nội dung bài viết hiển thị ở danh sách bài viết..."
            className={[
              "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
              errors.summary ? "border-red-400 focus:ring-red-400" : "border-gray-200",
            ].join(" ")}
            {...register("summary", { required: "Vui lòng nhập tóm tắt bài viết" })}
          />
          {errors.summary && (
            <p className="text-xs text-red-500 font-medium">{errors.summary.message}</p>
          )}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="news-form-content" className="text-sm font-semibold text-gray-700">
            Nội dung chi tiết bài viết <span className="text-red-500">*</span>
          </label>
          <textarea
            id="news-form-content"
            rows={8}
            placeholder="Nhập nội dung chi tiết bài viết, hỗ trợ định dạng xuống dòng..."
            className={[
              "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
              errors.content ? "border-red-400 focus:ring-red-400" : "border-gray-200",
            ].join(" ")}
            {...register("content", { required: "Vui lòng nhập nội dung chi tiết" })}
          />
          {errors.content && (
            <p className="text-xs text-red-500 font-medium">{errors.content.message}</p>
          )}
        </div>
      </form>
    </Modal>
  );
}
