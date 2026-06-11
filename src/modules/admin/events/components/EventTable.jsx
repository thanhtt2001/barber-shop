import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/Table";

export default function EventTable({ events, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sự kiện</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Nhãn hiển thị</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-10 rounded-lg bg-gray-105 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-48 bg-gray-105 rounded animate-pulse" />
                    <div className="h-3 w-64 bg-gray-105 rounded animate-pulse" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-28 bg-gray-105 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-5 w-20 bg-gray-105 rounded-full animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-5 w-16 bg-gray-105 rounded-full animate-pulse" />
              </TableCell>
              <TableCell className="text-right">
                <div className="h-8 w-16 bg-gray-105 rounded ml-auto animate-pulse" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">Chưa có sự kiện nào được tạo.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sự kiện</TableHead>
          <TableHead>Thời gian</TableHead>
          <TableHead>Phân loại & Nhãn</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {events.map((event) => (
          <TableRow key={event.id}>
            <TableCell>
              <div className="flex items-start gap-4">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-10 object-cover bg-gray-100 rounded-lg flex-shrink-0 border border-gray-150 shadow-sm"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=80&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1">{event.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{event.description}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-xs text-gray-650 font-semibold whitespace-nowrap">
              {event.timeText || "N/A"}
            </TableCell>
            <TableCell>
              <div className="flex flex-wrap gap-1 items-center">
                {event.isHot && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-red-50 text-red-700 border border-red-200">
                    Hot
                  </span>
                )}
                {event.isUpcoming && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-sky-50 text-sky-700 border border-sky-200">
                    Sắp diễn ra
                  </span>
                )}
                {event.badgeText && (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-medium bg-gray-100 text-gray-750">
                    {event.badgeText}
                  </span>
                )}
                {!event.isHot && !event.isUpcoming && !event.badgeText && (
                  <span className="text-xs text-gray-400 font-medium">—</span>
                )}
              </div>
            </TableCell>
            <TableCell>
              {event.status === "active" ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-250">
                  Hoạt động
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                  Tạm ngưng
                </span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(event)}
                  aria-label={`Sửa sự kiện ${event.title}`}
                  className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(event.id)}
                  aria-label={`Xoá sự kiện ${event.title}`}
                  className="p-1.5 hover:bg-red-50 text-red-500 hover:text-red-700 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
