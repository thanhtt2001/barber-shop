import { useCallback, useEffect } from "react";
import { fetchAdminBookings, updateBookingStatus } from "../services/bookingAdminService";
import useBookingAdminStore from "../store/bookingAdminStore";

export default function useBookingList() {
  const { bookings, filters, loading, error, setBookings, setLoading, setError, updateBookingInList } =
    useBookingAdminStore();

  const loadBookings = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAdminBookings(filters);
      setBookings(data);
    } catch (err) {
      setError(err?.message || "Không thể tải danh sách lịch hẹn");
    } finally {
      setLoading(false);
    }
    // Zustand store functions are stable references — chỉ cần watch `filters`
  }, [filters]);

  useEffect(() => {
    loadBookings();
  }, [loadBookings]);

  const confirmBooking = async (id) => {
    try {
      await updateBookingStatus(id, "confirmed");
      updateBookingInList(id, { status: "confirmed" });
    } catch (err) {
      setError(err?.message || "Cập nhật thất bại");
    }
  };

  const cancelBooking = async (id) => {
    try {
      await updateBookingStatus(id, "cancelled");
      updateBookingInList(id, { status: "cancelled" });
    } catch (err) {
      setError(err?.message || "Cập nhật thất bại");
    }
  };

  return { bookings, loading, error, refetch: loadBookings, confirmBooking, cancelBooking };
}
