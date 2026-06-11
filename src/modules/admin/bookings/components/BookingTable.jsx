import BookingRow from "./BookingRow";
import Loader from "@/shared/components/Loader";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/Table";

export default function BookingTable({ bookings, loading, onConfirm, onCancel }) {
  const columns = ["STT", "Khách", "SĐT", "Dịch vụ", "Giờ", "Cơ sở", "Trạng thái", "Hành động"];

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-8 text-center">
        <Loader text="Đang tải lịch hẹn..." />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <Table aria-label="Bảng lịch hẹn">
        <TableHeader>
          <TableRow>
            {columns.map((col) => (
              <TableHead key={col}>
                {col}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length} className="px-4 py-12 text-center">
                <p className="text-sm text-gray-400">Không có lịch hẹn nào</p>
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((booking, i) => (
              <BookingRow
                key={booking.id}
                booking={booking}
                index={i}
                onConfirm={onConfirm}
                onCancel={onCancel}
              />
            ))
          )}
        </TableBody>
      </Table>

      {bookings.length > 0 && (
        <div className="px-4 py-3 border-t border-gray-100 text-xs text-gray-400">
          Hiển thị {bookings.length} lịch hẹn
        </div>
      )}
    </div>
  );
}
