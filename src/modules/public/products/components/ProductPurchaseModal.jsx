import { useState } from "react";
import { useForm } from "react-hook-form";
import Modal from "@/shared/components/ui/Modal";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";
import { Check } from "lucide-react";
import { formatPrice } from "@/shared/utils/formatPrice";
import { branches } from "@/modules/public/branches/data/branches.data";
import { fullNameValidation, phoneValidation } from "@/shared/utils/validators";

export default function ProductPurchaseModal({ isOpen, onClose, product }) {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup"); // "pickup" | "shipping"

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      branch: "",
      address: "",
      note: "",
    },
  });

  if (!product) return null;

  const handleClose = () => {
    setIsSuccess(false);
    setQuantity(1);
    setDeliveryMethod("pickup");
    reset();
    onClose();
  };

  const handleQuantityChange = (amount) => {
    setQuantity((prev) => Math.max(1, prev + amount));
  };

  const onSubmit = async (data) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsLoading(false);
    setIsSuccess(true);
  };

  const totalPrice = product.price * quantity;

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={isSuccess ? null : "Mua hàng nhanh"}>
      {isSuccess ? (
        <div className="text-center py-6 animate-scale-in">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-500" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 font-display">Đặt hàng thành công!</h3>
          <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">
            Mã đơn hàng: <strong className="text-brand">#BP{Date.now().toString().slice(-6)}</strong>.
            Cảm ơn bạn đã tin tưởng BarberPro. Nhân viên sẽ liên hệ xác nhận đơn hàng sớm nhất!
          </p>
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-150 text-left text-xs space-y-2 mb-6">
            <p className="text-gray-700"><strong>Sản phẩm:</strong> {product.name}</p>
            <p className="text-gray-700"><strong>Số lượng:</strong> {quantity}</p>
            <p className="text-gray-700"><strong>Tổng cộng:</strong> {formatPrice(totalPrice)}</p>
          </div>
          <Button onClick={handleClose} variant="primary" className="w-full">
            Đóng
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Product Info Summary */}
          <div className="flex gap-4 p-3 bg-gray-50 rounded-xl border border-gray-150 items-center">
            <img
              src={product.image}
              alt={product.name}
              className="w-14 h-14 object-cover rounded-lg border border-gray-150 flex-shrink-0"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-gray-900 truncate">{product.name}</h4>
              <p className="text-xs text-brand font-semibold">{formatPrice(product.price)}</p>
            </div>
            {/* Quantity Controls */}
            <div className="flex items-center border border-gray-200 rounded-lg bg-white overflow-hidden">
              <button
                type="button"
                onClick={() => handleQuantityChange(-1)}
                className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors font-bold text-sm"
              >
                -
              </button>
              <span className="px-3 py-1 font-semibold text-sm text-gray-800 bg-gray-50/50">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => handleQuantityChange(1)}
                className="px-2 py-1 text-gray-500 hover:bg-gray-100 transition-colors font-bold text-sm"
              >
                +
              </button>
            </div>
          </div>

          {/* Customer Contacts */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Họ và tên"
              id="purchase-fullname"
              name="fullName"
              placeholder="Nguyễn Văn A"
              required
              error={errors.fullName?.message}
              {...register("fullName", fullNameValidation)}
            />
            <Input
              label="Số điện thoại"
              id="purchase-phone"
              name="phone"
              type="tel"
              placeholder="0901 234 567"
              required
              error={errors.phone?.message}
              {...register("phone", phoneValidation)}
            />
          </div>

          {/* Delivery Method Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Phương thức nhận hàng</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeliveryMethod("pickup")}
                className={[
                  "p-3 rounded-xl border-2 text-sm font-semibold transition-all text-center flex flex-col items-center justify-center gap-1",
                  deliveryMethod === "pickup"
                    ? "border-brand bg-brand-light text-brand"
                    : "border-gray-200 text-gray-600 hover:border-gray-300",
                ].join(" ")}
              >
                <span>📍 Nhận tại cơ sở</span>
                <span className="text-[10px] text-gray-400 font-normal">Đến lấy trực tiếp</span>
              </button>
              <button
                type="button"
                onClick={() => setDeliveryMethod("shipping")}
                className={[
                  "p-3 rounded-xl border-2 text-sm font-semibold transition-all text-center flex flex-col items-center justify-center gap-1",
                  deliveryMethod === "shipping"
                    ? "border-brand bg-brand-light text-brand"
                    : "border-gray-200 text-gray-600 hover:border-gray-300",
                ].join(" ")}
              >
                <span>🚚 Giao hàng tận nơi</span>
                <span className="text-[10px] text-gray-400 font-normal">Giao tận địa chỉ của bạn</span>
              </button>
            </div>
          </div>

          {deliveryMethod === "pickup" ? (
            <Select
              label="Chọn cơ sở nhận hàng"
              id="purchase-branch"
              placeholder="-- Chọn chi nhánh --"
              required
              options={branches.map((b) => ({
                value: b.id,
                label: `${b.name} — ${b.address}`,
              }))}
              error={errors.branch?.message}
              {...register("branch", {
                required: deliveryMethod === "pickup" ? "Vui lòng chọn cơ sở nhận hàng" : false,
              })}
            />
          ) : (
            <Input
              label="Địa chỉ giao hàng"
              id="purchase-address"
              name="address"
              placeholder="Số nhà, tên đường, phường/xã, quận/huyện..."
              required
              error={errors.address?.message}
              {...register("address", {
                required: deliveryMethod === "shipping" ? "Vui lòng nhập địa chỉ giao hàng" : false,
              })}
            />
          )}

          {/* Note */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="purchase-note" className="text-sm font-semibold text-gray-700">
              Ghi chú <span className="text-gray-400 font-normal text-xs">(tùy chọn)</span>
            </label>
            <textarea
              id="purchase-note"
              rows={2}
              placeholder="Lời nhắn cho shipper, cơ sở nhận hoặc lưu ý đặc biệt..."
              className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-800 bg-white resize-none focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand hover:border-brand/50"
              {...register("note")}
            />
          </div>

          {/* Pricing Summary */}
          <div className="pt-3 border-t border-gray-150 flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-600">Tổng thanh toán:</span>
            <span className="text-xl font-bold text-brand font-display">{formatPrice(totalPrice)}</span>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            variant="primary"
            className="w-full py-3"
            loading={isLoading}
          >
            {isLoading ? "Đang xử lý..." : "Xác nhận mua hàng"}
          </Button>
        </form>
      )}
    </Modal>
  );
}
