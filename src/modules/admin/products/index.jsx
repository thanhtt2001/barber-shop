import { useEffect, useState } from "react";
import useProductManager from "./hooks/useProductManager";
import ProductTable from "./components/ProductTable";
import ProductFormModal from "./components/ProductFormModal";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";
import { PRODUCT_CATEGORIES } from "@/modules/public/products/data/products.data";

export default function ProductsAdminPage() {
  const {
    products,
    loading,
    error,
    loadProducts,
    createProduct,
    editProduct,
    removeProduct,
  } = useProductManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  const handleCreateTrigger = () => {
    setSelectedProduct(null);
    setIsModalOpen(true);
  };

  const handleEditTrigger = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá sản phẩm này không?")) {
      await removeProduct(id);
    }
  };

  const handleSubmit = async (data) => {
    let result;
    if (selectedProduct) {
      result = await editProduct(selectedProduct.id, data);
    } else {
      result = await createProduct(data);
    }
    return !!result;
  };

  // Filter products by category and search query
  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Quản lý sản phẩm</h1>
          <p className="text-sm text-gray-500 mt-1">
            Xem, thêm mới, sửa đổi hoặc xóa các phụ kiện sáp, gôm xịt, dụng cụ tạo kiểu bán kèm của salon.
          </p>
        </div>
        <div>
          <Button
            onClick={handleCreateTrigger}
            variant="brand"
            className="inline-flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Thêm sản phẩm
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Panel */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        {/* Category Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={[
                "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150",
                selectedCategory === cat.id
                  ? "bg-brand text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
              ].join(" ")}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:max-w-xs flex-shrink-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50/70 border border-gray-250 rounded-full focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 transition-all outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Products Table Card */}
      <Card className="p-6">
        <ProductTable
          products={filteredProducts}
          loading={loading}
          onEdit={handleEditTrigger}
          onDelete={handleDeleteTrigger}
        />
      </Card>

      {/* Product Create/Edit Form Modal */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={selectedProduct}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
