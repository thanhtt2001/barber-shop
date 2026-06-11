import { branches } from "@/modules/public/branches/data/branches.data";
import useBookingAdminStore from "../store/bookingAdminStore";
import Select from "@/shared/components/ui/Select";
import DateInput from "@/shared/components/ui/DateInput";

const statusOptions = [
  { value: "all", label: "Tất cả trạng thái" },
  { value: "pending", label: "Chờ xác nhận" },
  { value: "confirmed", label: "Đã xác nhận" },
  { value: "cancelled", label: "Đã huỷ" },
];

export default function BookingFilter() {
  const { filters, setFilter, resetFilters } = useBookingAdminStore();

  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 flex flex-col sm:flex-row gap-4 items-end">
      {/* Cơ sở */}
      <div className="flex-1 w-full sm:w-auto">
        <Select
          label="Cơ sở"
          id="filter-branch"
          placeholder="Tất cả cơ sở"
          value={filters.branch}
          onChange={(e) => setFilter("branch", e.target.value)}
          options={branches.map((b) => ({ value: b.id, label: b.name }))}
        />
      </div>

      {/* Ngày */}
      <div className="flex-1 w-full sm:w-auto">
        <DateInput
          label="Ngày"
          id="filter-date"
          value={filters.date}
          onChange={(e) => setFilter("date", e.target.value)}
        />
      </div>

      {/* Trạng thái */}
      <div className="flex-1 w-full sm:w-auto">
        <Select
          label="Trạng thái"
          id="filter-status"
          placeholder=""
          value={filters.status}
          onChange={(e) => setFilter("status", e.target.value)}
          options={statusOptions}
        />
      </div>

      {/* Reset */}
      <button
        onClick={resetFilters}
        className="text-sm font-semibold text-gray-400 hover:text-brand transition-colors whitespace-nowrap px-4 py-3 mb-0.5"
      >
        Xoá bộ lọc
      </button>
    </div>
  );
}
