import { useState } from "react";
import { createBooking } from "../services/bookingService";
import useBookingStore from "../store/bookingStore";

/**
 * Hook xử lý luồng đặt lịch:
 * 1. Validate dữ liệu form (React Hook Form đã xử lý)
 * 2. Gọi bookingService.createBooking
 * 3. Cập nhật store → chuyển sang màn confirm
 *
 * @returns {{ onSubmit: Function, isSubmitting: boolean, submitError: string|null }}
 */
export default function useBooking() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const confirmBooking = useBookingStore((state) => state.confirmBooking);

  const onSubmit = async (formData) => {
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const result = await createBooking(formData);
      confirmBooking(formData, result);
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Đặt lịch thất bại, vui lòng thử lại.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { onSubmit, isSubmitting, submitError };
}
