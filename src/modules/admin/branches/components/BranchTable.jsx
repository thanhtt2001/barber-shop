import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/Table";

export default function BranchTable({ branches, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Chi nhánh</TableHead>
            <TableHead>Địa chỉ</TableHead>
            <TableHead>Điện thoại</TableHead>
            <TableHead>Giờ mở cửa</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 3 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                  <div className="h-3 w-16 bg-gray-100 rounded animate-pulse" />
                </div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-28 bg-gray-100 rounded animate-pulse" />
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

  if (branches.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">Chưa có chi nhánh nào.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Chi nhánh</TableHead>
          <TableHead>Địa chỉ</TableHead>
          <TableHead>Điện thoại</TableHead>
          <TableHead>Giờ mở cửa</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {branches.map((branch) => (
          <TableRow key={branch.id}>
            <TableCell>
              <div className="flex flex-col gap-1">
                <span className="font-semibold text-gray-900 text-sm">{branch.name}</span>
                {branch.badge && (
                  <span className="inline-flex items-center self-start px-2 py-0.5 rounded text-[10px] font-medium bg-brand/10 text-brand-dark border border-brand/20">
                    {branch.badge}
                  </span>
                )}
              </div>
            </TableCell>
            <TableCell className="text-sm text-gray-650 max-w-xs truncate">
              {branch.address}
            </TableCell>
            <TableCell className="text-sm text-gray-700 font-medium">
              {branch.phone}
            </TableCell>
            <TableCell className="text-sm text-gray-500">
              <div>{branch.openHours}</div>
              <div className="text-xs text-gray-400">{branch.openDays}</div>
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(branch)}
                  aria-label={`Sửa chi nhánh ${branch.name}`}
                  className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(branch.id)}
                  aria-label={`Xoá chi nhánh ${branch.name}`}
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
