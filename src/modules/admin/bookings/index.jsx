import BookingFilter from "./components/BookingFilter";
import BookingTable from "./components/BookingTable";
import useBookingList from "./hooks/useBookingList";

export default function BookingAdminPage() {
  const { bookings, loading, error, confirmBooking, cancelBooking } = useBookingList();

  return (
    <div className="space-y-4">
      <BookingFilter />

      {error && (
        <div role="alert" className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
          {error}
        </div>
      )}

      <BookingTable
        bookings={bookings}
        loading={loading}
        onConfirm={confirmBooking}
        onCancel={cancelBooking}
      />
    </div>
  );
}
