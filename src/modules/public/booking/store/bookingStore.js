import { create } from "zustand";

/**
 * Zustand store quản lý trạng thái đặt lịch.
 * step: 'form' | 'confirm'
 * bookingData: object chứa dữ liệu form đã submit
 * bookingResult: object chứa kết quả từ API { bookingId, message }
 */
const useBookingStore = create((set) => ({
  step: "form",
  bookingData: null,
  bookingResult: null,

  setStep: (step) => set({ step }),

  setBookingData: (data) => set({ bookingData: data }),

  setBookingResult: (result) => set({ bookingResult: result }),

  confirmBooking: (data, result) =>
    set({
      step: "confirm",
      bookingData: data,
      bookingResult: result,
    }),

  resetBooking: () =>
    set({
      step: "form",
      bookingData: null,
      bookingResult: null,
    }),
}));

export default useBookingStore;
