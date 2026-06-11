/**
 * Danh sách dịch vụ của BarberPro.
 * Mỗi dịch vụ có: id, icon (emoji), tên, mô tả, giá (VNĐ), thời gian (phút), và tag nổi bật.
 */
export const services = [
  {
    id: "cat-co-ban",
    icon: "✂️",
    name: "Cắt cơ bản",
    description:
      "Cắt tóc nam theo yêu cầu với kỹ thuật chuẩn, gội đầu và sấy tạo kiểu hoàn chỉnh.",
    price: 50000,
    duration: 30,
    popular: false,
    color: "from-sky-400 to-blue-500",
  },
  {
    id: "cat-uon-duoi",
    icon: "💫",
    name: "Cắt + Uốn / Duỗi",
    description:
      "Cắt tóc kết hợp uốn hoặc duỗi tóc, giúp tạo phong cách năng động và cá tính.",
    price: 250000,
    duration: 90,
    popular: true,
    color: "from-violet-400 to-purple-500",
  },
  {
    id: "nhuom-mau",
    icon: "🎨",
    name: "Nhuộm màu",
    description:
      "Nhuộm tóc theo xu hướng mới nhất, sử dụng thuốc nhuộm cao cấp, bảo vệ tóc chắc khoẻ.",
    price: 350000,
    duration: 120,
    popular: true,
    color: "from-pink-400 to-rose-500",
  },
  {
    id: "cao-rau",
    icon: "🪒",
    name: "Cạo râu",
    description:
      "Cạo râu truyền thống bằng dao cạo chuyên dụng, đắp khăn nóng, dưỡng da sau cạo.",
    price: 40000,
    duration: 20,
    popular: false,
    color: "from-emerald-400 to-teal-500",
  },
  {
    id: "goi-dau",
    icon: "💆",
    name: "Gội đầu dưỡng sinh",
    description:
      "Gội đầu với dầu dưỡng sinh cao cấp, massage da đầu thư giãn, giảm stress hiệu quả.",
    price: 80000,
    duration: 45,
    popular: false,
    color: "from-amber-400 to-orange-500",
  },
  {
    id: "combo-vip",
    icon: "👑",
    name: "Combo VIP",
    description:
      "Trọn gói cắt + tạo kiểu + gội dưỡng sinh + cạo râu — trải nghiệm đẳng cấp quý ông.",
    price: 150000,
    duration: 75,
    popular: false,
    badge: "Tiết kiệm nhất",
    color: "from-brand to-brand-dark",
  },
];
