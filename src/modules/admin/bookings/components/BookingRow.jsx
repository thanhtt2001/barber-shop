import { useState } from "react";
import { Check, X } from "lucide-react";
import BookingStatusBadge from "./BookingStatusBadge";
import { TableRow, TableCell } from "@/shared/components/ui/Table";

export default function BookingRow({ booking, index, onConfirm, onCancel }) {
  const isPending = booking.status === "pending";
  const [actionLoading, setActionLoading] = useState(null); // "confirm" | "cancel" | null

  const handleConfirm = async () => {
    setActionLoading("confirm");
    try {
      await onConfirm(booking.id);
    } finally {
      setActionLoading(null);
    }
  };

  const handleCancel = async () => {
    setActionLoading("cancel");
    try {
      await onCancel(booking.id);
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <TableRow>
      <TableCell className="text-gray-500">{index + 1}</TableCell>
      <TableCell>
        <p className="text-sm font-semibold text-gray-900">{booking.fullName}</p>
      </TableCell>
      <TableCell className="text-gray-650">{booking.phone}</TableCell>
      <TableCell className="text-gray-650">{booking.service}</TableCell>
      <TableCell className="text-gray-650 whitespace-nowrap">{booking.time}</TableCell>
      <TableCell className="text-gray-650">{booking.branchName}</TableCell>
      <TableCell>
        <BookingStatusBadge status={booking.status} />
      </TableCell>
      <TableCell>
        {isPending && (
          <div className="flex items-center gap-2">
            <button
              onClick={handleConfirm}
              disabled={actionLoading !== null}
              className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center border border-emerald-100"
              title="Xác nhận lịch hẹn"
            >
              {actionLoading === "confirm" ? (
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <Check className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
            </button>
            <button
              onClick={handleCancel}
              disabled={actionLoading !== null}
              className="p-1.5 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center border border-red-100"
              title="Hủy lịch hẹn"
            >
              {actionLoading === "cancel" ? (
                <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              ) : (
                <X className="w-3.5 h-3.5 stroke-[2.5]" />
              )}
            </button>
          </div>
        )}
      </TableCell>
    </TableRow>
  );
}
