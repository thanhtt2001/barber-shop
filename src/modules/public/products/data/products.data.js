/**
 * Danh sách sản phẩm/phụ kiện bán tại BarberPro.
 * Mỗi sản phẩm có: id, name, description, price, category, image, rating, inStock, color.
 */
export const products = [
  {
    id: "sap-pomade-clay",
    name: "Sáp Pomade Clay BarberPro",
    description: "Sáp giữ nếp cực mạnh, hoàn thiện mờ tự nhiên, phù hợp với mọi chất tóc nam dày và trung bình.",
    price: 220000,
    category: "wax-pomade",
    image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?w=400&auto=format&fit=crop&q=80",
    color: "from-blue-400 to-indigo-500",
    inStock: true,
    rating: 4.8,
  },
  {
    id: "sap-pomade-matte",
    name: "Sáp Pomade Matte BarberPro",
    description: "Độ giữ nếp vừa phải, độ bóng mờ sang trọng, mùi hương vani nam tính cổ điển.",
    price: 180000,
    category: "wax-pomade",
    image: "https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=400&auto=format&fit=crop&q=80",
    color: "from-sky-400 to-blue-500",
    inStock: true,
    rating: 4.7,
  },
  {
    id: "gom-xit-silhouette",
    name: "Gôm Xịt Tóc Silhouette Super Hold",
    description: "Gôm xịt tóc giữ nếp khô nhanh tối đa suốt cả ngày dài, không để lại bụi trắng hại tóc.",
    price: 150000,
    category: "gom-xit",
    image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&auto=format&fit=crop&q=80",
    color: "from-purple-400 to-indigo-500",
    inStock: true,
    rating: 4.9,
  },
  {
    id: "dau-goi-duong-sinh",
    name: "Dầu Gội Dưỡng Sinh BarberPro",
    description: "Dầu gội chiết xuất bưởi & sả thảo dược tự nhiên, nuôi dưỡng chân tóc chắc khỏe, thơm mát da đầu.",
    price: 160000,
    category: "shampoo",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&auto=format&fit=crop&q=80",
    color: "from-emerald-400 to-teal-500",
    inStock: true,
    rating: 4.6,
  },
  {
    id: "luoc-chai-phong",
    name: "Lược Bán Nguyệt Chải Phồng",
    description: "Dụng cụ hỗ trợ sấy tạo phồng chân tóc chuyên nghiệp, chất liệu carbon chịu nhiệt cực bền.",
    price: 60000,
    category: "accessory",
    image: "https://images.unsplash.com/photo-1590156546746-c58a8f102120?w=400&auto=format&fit=crop&q=80",
    color: "from-amber-400 to-orange-500",
    inStock: true,
    rating: 4.5,
  },
];

export const PRODUCT_CATEGORIES = [
  { id: "all", label: "Tất cả" },
  { id: "wax-pomade", label: "Sáp & Pomade" },
  { id: "gom-xit", label: "Gôm xịt tóc" },
  { id: "shampoo", label: "Dầu gội & Chăm sóc" },
  { id: "accessory", label: "Phụ kiện tạo kiểu" },
];
