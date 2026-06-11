import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";
import { PRODUCT_CATEGORIES } from "@/modules/public/products/data/products.data";

export default function ProductFormModal({ isOpen, onClose, product, onSubmit }) {
  const isEdit = !!product;
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState(null);

  const categoriesList = PRODUCT_CATEGORIES.filter((c) => c.id !== "all");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      category: "",
      price: "",
      image: "",
      inStock: true,
      description: "",
    },
  });

  // Sync form values when the product prop changes (for edit action)
  useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        category: product.category,
        price: product.price,
        image: product.image,
        inStock: !!product.inStock,
        description: product.description,
      });
    } else {
      reset({
        name: "",
        category: "",
        price: "",
        image: "",
        inStock: true,
        description: "",
      });
    }
  }, [product, reset, isOpen]);

  const handleFormSubmit = async (data) => {
    setSubmitting(true);
    setFormError(null);

    // Fallback image if empty
    if (!data.image) {
      data.image = "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&auto=format&fit=crop&q=80";
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4" noValidate>
        {formError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs">
            {formError}
          </div>
        )}

        <Input
          label="Tên sản phẩm"
          id="product-form-name"
          name="name"
          placeholder="Ví dụ: Sáp Wax Pomade BarberPro"
          required
          error={errors.name?.message}
          {...register("name", { required: "Vui lòng nhập tên sản phẩm" })}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Phân loại */}
          <Select
            label="Phân loại"
            id="product-form-category"
            required
            placeholder="-- Chọn phân loại --"
            options={categoriesList.map((c) => ({ value: c.id, label: c.label }))}
            error={errors.category?.message}
            {...register("category", { required: "Vui lòng chọn phân loại" })}
          />

          <Input
            label="Giá bán (VNĐ)"
            id="product-form-price"
            name="price"
            type="number"
            placeholder="Ví dụ: 150000"
            required
            error={errors.price?.message}
            {...register("price", {
              required: "Vui lòng nhập giá bán",
              min: { value: 1000, message: "Giá bán tối thiểu 1.000₫" },
            })}
          />
        </div>

        <Input
          label="Đường dẫn ảnh đại diện (Image URL)"
          id="product-form-image"
          name="image"
          placeholder="https://images.unsplash.com/photo-..."
          error={errors.image?.message}
          {...register("image")}
        />

        {/* Tồn kho Checkbox */}
        <div className="flex items-center gap-2 py-1 select-none">
          <input
            type="checkbox"
            id="product-form-instock"
            className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
            {...register("inStock")}
          />
          <label htmlFor="product-form-instock" className="text-sm font-semibold text-gray-700 cursor-pointer">
            Còn hàng (Nếu tích chọn, sản phẩm sẽ được hiển thị bán trên catalog)
          </label>
        </div>

        {/* Mô tả */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="product-form-desc" className="text-sm font-semibold text-gray-700">
            Mô tả sản phẩm <span className="text-red-500">*</span>
          </label>
          <textarea
            id="product-form-desc"
            rows={3}
            placeholder="Nhập công dụng, độ giữ nếp, mùi hương và cách sử dụng sản phẩm..."
            className={[
              "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
              errors.description ? "border-red-400 focus:ring-red-400" : "border-gray-200",
            ].join(" ")}
            {...register("description", { required: "Vui lòng nhập mô tả sản phẩm" })}
          />
          {errors.description && (
            <p className="text-xs text-red-500 font-medium">{errors.description.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
          <Button type="button" variant="outline" onClick={onClose} disabled={submitting}>
            Hủy
          </Button>
          <Button type="submit" variant="brand" loading={submitting}>
            {isEdit ? "Cập nhật" : "Thêm mới"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
