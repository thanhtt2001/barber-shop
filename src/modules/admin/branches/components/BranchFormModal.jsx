import { useEffect } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";

export default function BranchFormModal({ isOpen, onClose, branch, onSubmit }) {
  const isEdit = !!branch;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      name: "",
      address: "",
      phone: "",
      openHours: "08:00 — 20:00",
      openDays: "Thứ 2 — Chủ nhật",
      googleMapsEmbedUrl: "",
      googleMapsUrl: "https://maps.google.com",
      badge: "",
      color: "from-brand to-sky-600",
    },
  });

  useEffect(() => {
    if (isOpen) {
      if (branch) {
        reset({
          name: branch.name || "",
          address: branch.address || "",
          phone: branch.phone || "",
          openHours: branch.openHours || "08:00 — 20:00",
          openDays: branch.openDays || "Thứ 2 — Chủ nhật",
          googleMapsEmbedUrl: branch.googleMapsEmbedUrl || "",
          googleMapsUrl: branch.googleMapsUrl || "https://maps.google.com",
          badge: branch.badge || "",
          color: branch.color || "from-brand to-sky-600",
        });
      } else {
        reset({
          name: "",
          address: "",
          phone: "",
          openHours: "08:00 — 20:00",
          openDays: "Thứ 2 — Chủ nhật",
          googleMapsEmbedUrl: "",
          googleMapsUrl: "https://maps.google.com",
          badge: "",
          color: "from-brand to-sky-600",
        });
      }
    }
  }, [isOpen, branch, reset]);

  const onFormSubmit = async (data) => {
    const success = await onSubmit(data);
    if (success) {
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={isEdit ? "Chỉnh sửa chi nhánh" : "Thêm chi nhánh mới"} size="lg">
      <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Tên chi nhánh"
            placeholder="Ví dụ: BarberPro — Cơ sở 4"
            required
            error={errors.name?.message}
            {...register("name", { required: "Tên chi nhánh không được để trống" })}
          />
          <Input
            label="Số điện thoại hotline"
            placeholder="Ví dụ: 0901 234 567"
            required
            error={errors.phone?.message}
            {...register("phone", { required: "Số điện thoại không được để trống" })}
          />
        </div>

        <Input
          label="Địa chỉ chi nhánh"
          placeholder="Ví dụ: 12 Đường Điện Biên Phủ, TP. Hưng Yên"
          required
          error={errors.address?.message}
          {...register("address", { required: "Địa chỉ không được để trống" })}
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Giờ hoạt động"
            placeholder="Ví dụ: 08:00 — 21:30"
            required
            error={errors.openHours?.message}
            {...register("openHours", { required: "Giờ hoạt động không được để trống" })}
          />
          <Input
            label="Ngày hoạt động"
            placeholder="Ví dụ: Thứ 2 — Chủ nhật"
            required
            error={errors.openDays?.message}
            {...register("openDays", { required: "Ngày hoạt động không được để trống" })}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Nhãn nổi bật (Badge)"
            placeholder="Ví dụ: Cơ sở chính, Mới nhất (không bắt buộc)"
            error={errors.badge?.message}
            {...register("badge")}
          />
          <Input
            label="Màu gradient header (Tailwind classes)"
            placeholder="from-brand to-sky-600"
            error={errors.color?.message}
            {...register("color")}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Google Maps Embed URL"
            placeholder="https://www.google.com/maps/embed?pb=..."
            error={errors.googleMapsEmbedUrl?.message}
            {...register("googleMapsEmbedUrl")}
          />
          <Input
            label="Google Maps Link Chỉ Đường"
            placeholder="https://maps.app.goo.gl/..."
            error={errors.googleMapsUrl?.message}
            {...register("googleMapsUrl")}
          />
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
