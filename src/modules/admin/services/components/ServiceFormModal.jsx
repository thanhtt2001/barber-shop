import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";

export default function ServiceFormModal({ isOpen, onClose, service, onSubmit }) {
  const isEdit = !!service;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      icon: "✂️",
      description: "",
      price: "",
      duration: "",
      popular: false,
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (service) {
        reset({
          name: service.name || "",
          icon: service.icon || "✂️",
          description: service.description || "",
          price: service.price || "",
          duration: service.duration || "",
          popular: !!service.popular,
        });
      } else {
        reset({
          name: "",
          icon: "✂️",
          description: "",
          price: "",
          duration: "",
          popular: false,
        });
      }
    }
  }, [isOpen, service, reset]);

  const onFormSubmit = async (data) => {
    const success = await onSubmit(data);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Chỉnh sửa dịch vụ" : "Thêm dịch vụ mới"}>
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-4 gap-4">
          <div className="col-span-3">
            <Input
              label="Tên dịch vụ"
              placeholder="Ví dụ: Cắt tóc layer"
              required
              error={errors.name?.message}
              {...register("name", { required: "Tên dịch vụ không được để trống" })}
            />
          </div>
          <div className="col-span-1">
            <Input
              label="Emoji Icon"
              placeholder="✂️"
              required
              error={errors.icon?.message}
              {...register("icon", { required: "Bắt buộc" })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="description" className="text-sm font-semibold text-gray-700">
            Mô tả dịch vụ <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            rows={3}
            placeholder="Mô tả tóm tắt về dịch vụ..."
            className={`w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand transition-all ${
              errors.description ? "border-red-400 focus:ring-red-400 focus:border-red-400" : "border-gray-200 hover:border-brand/50"
            }`}
            {...register("description", { required: "Mô tả không được để trống" })}
          />
          {errors.description && (
            <p className="text-xs text-red-500 font-medium flex items-center gap-1">
              <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Giá tiền (VNĐ)"
            type="number"
            placeholder="Ví dụ: 100000"
            required
            error={errors.price?.message}
            {...register("price", {
              required: "Giá tiền không được để trống",
              min: { value: 0, message: "Giá tiền phải lớn hơn hoặc bằng 0" },
            })}
          />
          <Input
            label="Thời gian (phút)"
            type="number"
            placeholder="Ví dụ: 30"
            required
            error={errors.duration?.message}
            {...register("duration", {
              required: "Thời gian không được để trống",
              min: { value: 1, message: "Thời gian tối thiểu là 1 phút" },
            })}
          />
        </div>

        <div className="flex items-center gap-2 py-2">
          <input
            id="popular"
            type="checkbox"
            className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
            {...register("popular")}
          />
          <label htmlFor="popular" className="text-sm font-semibold text-gray-700 select-none">
            Đánh dấu là Dịch vụ nổi bật
          </label>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Hủy
          </Button>
          <Button type="submit" variant="brand" loading={isSubmitting}>
            Lưu
          </Button>
        </div>
      </form>
    </Modal>
  );
}
