import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import ProductCard from "./components/ProductCard";
import ProductPurchaseModal from "./components/ProductPurchaseModal";
import { products as defaultProducts, PRODUCT_CATEGORIES } from "./data/products.data";

const LOCAL_STORAGE_KEY = "barberpro_admin_products";

export default function ProductsPage() {
  useDocumentTitle("Sản phẩm & Phụ kiện");

  const [searchParams] = useSearchParams();
  const queryCategory = searchParams.get("category") || "all";

  const [productsList, setProductsList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(queryCategory);
  const [searchQuery, setSearchQuery] = useState("");

  // Direct purchase modal state
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Initialize data from localStorage (or fallback to default list)
  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!data) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultProducts));
      setProductsList(defaultProducts);
    } else {
      try {
        setProductsList(JSON.parse(data));
      } catch (e) {
        setProductsList(defaultProducts);
      }
    }
  }, []);

  // Sync category state with search query param if changed
  useEffect(() => {
    setSelectedCategory(queryCategory);
  }, [queryCategory]);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setIsPurchaseModalOpen(true);
  };

  // Filter products by category & search query
  const filteredProducts = productsList.filter((product) => {
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container-custom">
      {/* Section Header */}
      <div className="text-center mb-10">
        <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-3">
          Cửa hàng BarberPro
        </span>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4">
          Sản phẩm & <span className="text-gradient">Phụ kiện chăm sóc tóc</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-sm md:text-base">
          Các dòng sáp, gôm xịt chính hãng và phụ kiện tạo kiểu cao cấp được các barber khuyên dùng. Giữ nếp hoàn hảo, chăm sóc mái tóc của bạn mỗi ngày.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
          {PRODUCT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={[
                "px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200",
                selectedCategory === cat.id
                  ? "bg-brand text-white shadow-md shadow-brand/10"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
              ].join(" ")}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs flex-shrink-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-gray-50/70 border border-gray-200 rounded-xl focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 transition-all outline-none text-gray-700"
          />
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="animate-fade-in">
              <ProductCard product={product} onBuyNow={handleBuyNow} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 shadow-sm">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-base font-bold text-gray-900 mb-1">Không tìm thấy sản phẩm nào</h3>
          <p className="text-xs text-gray-500">Hãy thử đổi bộ lọc hoặc từ khoá tìm kiếm khác nhé.</p>
        </div>
      )}

      {/* Direct purchase modal */}
      <ProductPurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        product={selectedProduct}
      />
    </div>
  );
}
