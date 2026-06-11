import { formatPrice } from "@/shared/utils/formatPrice";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/components/ui/Table";
import { PRODUCT_CATEGORIES } from "@/modules/public/products/data/products.data";

export default function ProductTable({ products, loading, onEdit, onDelete }) {
  const getCategoryLabel = (catId) => {
    const cat = PRODUCT_CATEGORIES.find((c) => c.id === catId);
    return cat ? cat.label : catId;
  };

  if (loading) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sản phẩm</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Phân loại</TableHead>
            <TableHead>Tồn kho</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 4 }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gray-105 animate-pulse" />
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-105 rounded animate-pulse" />
                    <div className="h-3 w-48 bg-gray-105 rounded animate-pulse" />
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="h-4 w-16 bg-gray-105 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-4 w-20 bg-gray-105 rounded animate-pulse" />
              </TableCell>
              <TableCell>
                <div className="h-5 w-14 bg-gray-105 rounded-full animate-pulse" />
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

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-sm">Chưa có sản phẩm nào được tạo.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sản phẩm</TableHead>
          <TableHead>Giá</TableHead>
          <TableHead>Phân loại</TableHead>
          <TableHead>Tồn kho</TableHead>
          <TableHead className="text-right">Hành động</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {products.map((product) => (
          <TableRow key={product.id}>
            <TableCell>
              <div className="flex items-center gap-3">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-10 h-10 object-cover bg-gray-100 rounded-lg flex-shrink-0 border border-gray-150"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=40&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="min-w-0">
                  <h3 className="font-semibold text-gray-900 text-sm truncate">{product.name}</h3>
                  <p className="text-xs text-gray-500 line-clamp-1 mt-0.5">{product.description}</p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-sm text-gray-955 font-bold">
              {formatPrice(product.price)}
            </TableCell>
            <TableCell className="text-sm text-gray-650 font-medium">
              {getCategoryLabel(product.category)}
            </TableCell>
            <TableCell>
              {product.inStock ? (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-250">
                  Còn hàng
                </span>
              ) : (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-red-50 text-red-700 border border-red-200">
                  Hết hàng
                </span>
              )}
            </TableCell>
            <TableCell className="text-right">
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(product)}
                  aria-label={`Sửa sản phẩm ${product.name}`}
                  className="p-1.5 hover:bg-gray-100 text-gray-500 hover:text-gray-900 rounded-lg transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(product.id)}
                  aria-label={`Xoá sản phẩm ${product.name}`}
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
