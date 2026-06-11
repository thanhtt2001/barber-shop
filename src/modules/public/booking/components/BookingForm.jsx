import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Input from "@/shared/components/ui/Input";
import Button from "@/shared/components/ui/Button";
import Select from "@/shared/components/ui/Select";
import DateInput from "@/shared/components/ui/DateInput";
import { AlertCircle } from "lucide-react";
import { services } from "@/modules/public/services/data/services.data";
import { branches } from "@/modules/public/branches/data/branches.data";
import { products } from "@/modules/public/products/data/products.data";
import useBooking from "../hooks/useBooking";
import {
  fullNameValidation,
  phoneValidation,
  serviceValidation,
  branchValidation,
  dateValidation,
  timeValidation,
  noteValidation,
} from "@/shared/utils/validators";
import { getTodayString, getMaxDateString } from "@/shared/utils/formatDate";

const TIME_SLOTS = [
  "08:00", "08:30", "09:00", "09:30", "10:00", "10:30",
  "11:00", "13:00", "13:30", "14:00", "14:30", "15:00",
  "15:30", "16:00", "16:30", "17:00", "17:30",
];

export default function BookingForm() {
  const [searchParams] = useSearchParams();
  const defaultService = searchParams.get("service") || "";
  const [productsList, setProductsList] = useState([]);
  const defaultProduct = searchParams.get("product") || "";

  useEffect(() => {
    const data = localStorage.getItem("barberpro_admin_products");
    if (data) {
      try {
        setProductsList(JSON.parse(data));
      } catch (e) {
        setProductsList(products);
      }
    } else {
      setProductsList(products);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phone: "",
      service: defaultService,
      date: "",
      time: "",
      branch: "",
      note: "",
      selectedProducts: defaultProduct ? [defaultProduct] : [],
    },
  });

  const { onSubmit, isSubmitting, submitError } = useBooking();

  return (
    <form
      id="booking-form"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-5"
      aria-label="Form đặt lịch"
    >
      {/* Row: Họ tên + SĐT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Input
          label="Họ và tên"
          id="booking-fullname"
          name="fullName"
          placeholder="Nguyễn Văn A"
          required
          error={errors.fullName?.message}
          {...register("fullName", fullNameValidation)}
        />

        <Input
          label="Số điện thoại"
          id="booking-phone"
          name="phone"
          type="tel"
          placeholder="0901 234 567"
          required
          error={errors.phone?.message}
          {...register("phone", phoneValidation)}
        />
      </div>

      {/* Dịch vụ */}
      <Select
        label="Dịch vụ"
        id="booking-service"
        placeholder="-- Chọn dịch vụ --"
        required
        options={services.map((s) => ({
          value: s.id,
          label: `${s.icon} ${s.name} — ${s.price.toLocaleString("vi-VN")}đ`,
        }))}
        error={errors.service?.message}
        {...register("service", serviceValidation)}
      />

      {/* Row: Ngày + Giờ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <DateInput
          label="Ngày"
          id="booking-date"
          name="date"
          required
          min={getTodayString()}
          max={getMaxDateString(30)}
          error={errors.date?.message}
          {...register("date", dateValidation)}
        />

        {/* Giờ - Custom select */}
        <Select
          label="Giờ"
          id="booking-time"
          placeholder="-- Chọn giờ --"
          required
          options={TIME_SLOTS}
          error={errors.time?.message}
          {...register("time", timeValidation)}
        />
      </div>

      {/* Cơ sở */}
      <Select
        label="Cơ sở"
        id="booking-branch"
        placeholder="-- Chọn cơ sở --"
        required
        options={branches.map((b) => ({
          value: b.id,
          label: `${b.name} — ${b.address}`,
        }))}
        error={errors.branch?.message}
        {...register("branch", branchValidation)}
      />

      {/* Ghi chú */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="booking-note" className="text-sm font-semibold text-gray-700">
          Ghi chú <span className="text-gray-400 font-normal text-xs">(tùy chọn)</span>
        </label>
        <textarea
          id="booking-note"
          rows={3}
          placeholder="Yêu cầu đặc biệt, mẫu tóc mong muốn..."
          aria-invalid={!!errors.note}
          aria-describedby={errors.note ? "booking-note-error" : undefined}
          className={[
            "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white resize-none",
            "transition-all duration-150",
            "focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
            errors.note
              ? "border-red-400 focus:ring-red-400"
              : "border-gray-200 hover:border-brand/50",
          ].join(" ")}
          {...register("note", noteValidation)}
        />
        {errors.note && (
          <p id="booking-note-error" role="alert" className="text-xs text-red-500 font-medium">
            {errors.note.message}
          </p>
        )}
      </div>

      {/* Mua kèm sản phẩm */}
      {productsList.length > 0 && (
        <div className="flex flex-col gap-3 p-4 bg-gray-50 rounded-xl border border-gray-150">
          <div>
            <h4 className="text-sm font-bold text-gray-800 flex items-center gap-1.5">
              <span>🧴</span> Mua kèm phụ kiện chăm sóc tóc <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">Giảm 10% khi đặt trước</span>
            </h4>
            <p className="text-xs text-gray-400 mt-0.5">Đặt mua ngay cùng lịch hẹn để nhận giá ưu đãi và chuẩn bị sẵn tại quầy.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
            {productsList.map((p) => {
              if (!p.inStock) return null;
              return (
                <label
                  key={p.id}
                  className="flex items-center gap-3 p-3 rounded-xl border border-gray-200 bg-white cursor-pointer hover:border-brand/40 transition-all select-none"
                >
                  <input
                    type="checkbox"
                    value={p.id}
                    className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
                    {...register("selectedProducts")}
                  />
                  <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-gray-100 flex-shrink-0" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-gray-800 truncate">{p.name}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      <span className="text-brand font-semibold">{(p.price * 0.9).toLocaleString("vi-VN")}đ</span>{" "}
                      <span className="line-through text-[10px]">{p.price.toLocaleString("vi-VN")}đ</span>
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </div>
      )}

      {/* Submit Error */}
      {submitError && (
        <div role="alert" className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm flex items-center gap-2">
          <AlertCircle className="w-5 h-5 flex-shrink-0" />
          {submitError}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        variant="primary"
        loading={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Đang xử lý..." : "Xác nhận đặt lịch"}
      </Button>

      <p className="text-xs text-gray-400 text-center">
        Bằng cách đặt lịch, bạn đồng ý với{" "}
        <a href="#" className="text-brand hover:underline">chính sách</a> của BarberPro.
      </p>
    </form>
  );
}
