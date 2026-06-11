import { formatPrice } from "@/shared/utils/formatPrice";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/Table";

export default function ServiceTable({ services, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Dịch vụ</TableHead>
            <TableHead>Thời gian</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Đặc biệt</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-100 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-48 bg-gray-100 rounded animate-pulse" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-12 bg-gray-100 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-5 w-10 bg-gray-100 rounded-full animate-pulse" />
              </TableCell>
              <TableCell className="text-right">
                <div className="h-8 w-16 bg-gray-100 rounded ml-auto animate-pulse" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">Chưa có dịch vụ nào được tạo.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Dịch vụ</TableHead>
          <TableHead>Thời gian</TableHead>
          <TableHead>Giá</TableHead>
          <TableHead>Đặc biệt</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <span className="text-2xl w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {service.icon || "✂️"}
                </span>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{service.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{service.description}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-sm text-gray-700 font-medium">
              {service.duration} phút
            </TableCell>
            <TableCell className="text-sm text-gray-955 font-bold">
              {formatPrice(service.price)}
            </TableCell>
            <TableCell>
              {service.popular ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  Nổi bật
                </span>
              ) : (
                <span className="text-gray-350 text-xs">—</span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(service)}
                  aria-label={`Sửa dịch vụ ${service.name}`}
                  className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(service.id)}
                  aria-label={`Xoá dịch vụ ${service.name}`}
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
