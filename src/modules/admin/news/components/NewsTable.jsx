import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/Table";

export default function NewsTable({ news, loading, onEdit, onDelete }) {
  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bài viết</TableHead>
            <TableHead>Tác giả & Ngày đăng</TableHead>
            <TableHead>Danh mục</TableHead>
            <TableHead>Nổi bật</TableHead>
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
                <div className="h-4 w-24 bg-gray-105 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-20 bg-gray-105 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-12 bg-gray-105 rounded-full animate-pulse" />
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

  if (news.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">Chưa có bài viết nào được tạo.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Bài viết</TableHead>
          <TableHead>Tác giả & Ngày đăng</TableHead>
          <TableHead>Danh mục</TableHead>
          <TableHead>Nổi bật</TableHead>
          <TableHead>Trạng thái</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {news.map((post) => (
          <TableRow key={post.id}>
            <TableCell>
              <div className="flex items-start gap-4">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-10 object-cover bg-gray-100 rounded-lg flex-shrink-0 border border-gray-150 shadow-sm"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=80&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900 text-sm leading-snug line-clamp-1">{post.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 mt-1">{post.summary}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-xs text-gray-650">
              <div className="font-semibold text-gray-800">{post.author}</div>
              <div className="text-gray-400 mt-0.5">{post.publishedAt}</div>
            </TableCell>
            <TableCell className="text-xs font-semibold text-gray-650 whitespace-nowrap">
              <span className="px-2.5 py-1 bg-gray-100 text-gray-750 rounded-lg border border-gray-150">
                {post.category}
              </span>
            </TableCell>
            <TableCell>
              {post.isFeatured ? (
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase bg-amber-50 text-amber-700 border border-amber-200">
                  ★ Nổi bật
                </span>
              ) : (
                <span className="text-gray-300 font-medium">—</span>
              )}
            </TableCell>
            <TableCell>
              {post.status === "active" ? (
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
                  onClick={() => onEdit(post)}
                  aria-label={`Sửa bài viết ${post.title}`}
                  className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(post.id)}
                  aria-label={`Xoá bài viết ${post.title}`}
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
