import { useState, useEffect } from "react";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import NewsCard from "./components/NewsCard";
import NewsDetailModal from "./components/NewsDetailModal";
import { fetchAdminNews } from "@/modules/admin/news/services/newsAdminService";
import { Search, Clock, Inbox, Sparkles, BookOpen } from "lucide-react";
import Loader from "@/shared/components/Loader";

const CATEGORIES = ["Tất cả", "Bí quyết tóc", "Xu hướng tóc", "Khuyến mãi", "Tin cửa hàng"];

export default function NewsPage() {
  useDocumentTitle("Tin tức & Bí quyết tạo kiểu");

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPost, setSelectedPost] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Load articles from localStorage
  useEffect(() => {
    const loadPublicNews = async () => {
      setLoading(true);
      try {
        const data = await fetchAdminNews();
        setPosts(data.filter((p) => p.status === "active"));
      } catch (e) {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };
    loadPublicNews();
  }, []);

  const handleCardClick = (post) => {
    setSelectedPost(post);
    setIsDetailOpen(true);
  };

  // Tính số lượng bài viết của từng danh mục
  const getCategoryCount = (catName) => {
    if (catName === "Tất cả") return posts.length;
    return posts.filter((p) => p.category === catName).length;
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      selectedCategory === "Tất cả" || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  // Sắp xếp bài viết: Featured bài viết lên đầu, sau đó theo ngày xuất bản giảm dần
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isFeatured && !b.isFeatured) return -1;
    if (!a.isFeatured && b.isFeatured) return 1;
    return new Date(b.publishedAt) - new Date(a.publishedAt);
  });

  // Chọn bài viết tiêu điểm (Spotlight) ở đầu trang
  // Spotlight là bài viết nổi bật (Featured) mới nhất, hoặc bài mới nhất nói chung
  const spotlightPost = sortedPosts.find((p) => p.isFeatured) || sortedPosts[0];

  // Nếu đang lọc hoặc tìm kiếm, chúng ta không hiển thị spotlight banner tách rời để tránh khó coi
  const showSpotlight =
    selectedCategory === "Tất cả" && searchQuery === "" && spotlightPost;

  // Danh sách các bài viết còn lại hiển thị ở Grid bên dưới
  const gridPosts = showSpotlight
    ? sortedPosts.filter((p) => p.id !== spotlightPost.id)
    : sortedPosts;

  return (
    <div className="container-custom">
      {/* Section Header */}
      <div className="text-center mb-10 select-none">
        <span className="inline-flex items-center gap-1 px-4 py-1.5 bg-brand/10 text-brand text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
          <BookOpen className="w-3.5 h-3.5" />
          Khám phá BarberPro
        </span>
        <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4 tracking-tight">
          Tin tức & <span className="text-gradient">Bí quyết chăm sóc tóc nam</span>
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-xs md:text-sm leading-relaxed">
          Cập nhật những xu hướng kiểu tóc thời thượng nhất, bí kíp giữ nếp bồng bềnh bằng sáp và các hoạt động cộng đồng nổi bật từ các stylist chuyên nghiệp của salon.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2.5 md:pb-0 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const count = getCategoryCount(cat);
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={[
                  "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5",
                  selectedCategory === cat
                    ? "bg-brand text-white shadow-md shadow-brand/20"
                    : "text-gray-550 hover:text-gray-900 hover:bg-gray-50/80 border border-transparent hover:border-gray-100",
                ].join(" ")}
              >
                <span>{cat}</span>
                <span
                  className={[
                    "text-[10px] px-1.5 py-0.2 rounded-md font-extrabold select-none",
                    selectedCategory === cat
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-500",
                  ].join(" ")}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:max-w-xs flex-shrink-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <Search className="w-4 h-4 text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết theo từ khóa..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-gray-50/60 border border-gray-250/70 rounded-xl focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 transition-all outline-none text-gray-700 hover:border-gray-300"
          />
        </div>
      </div>

      {/* Loading Skeletons */}
      {loading ? (
        <div className="space-y-10">
          {/* Spotlight Skeleton */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 animate-pulse shadow-sm">
            <div className="lg:col-span-7 aspect-[16/9] bg-gray-100 rounded-2xl"></div>
            <div className="lg:col-span-5 flex flex-col justify-between py-4 space-y-4">
              <div className="space-y-3">
                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                <div className="h-8 w-full bg-gray-200 rounded mt-4"></div>
                <div className="h-4 w-full bg-gray-150 rounded"></div>
                <div className="h-4 w-5/6 bg-gray-150 rounded"></div>
              </div>
              <div className="h-10 w-28 bg-gray-250 rounded mt-4"></div>
            </div>
          </div>

          {/* Grid Cards Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-gray-100 rounded-2xl p-5 space-y-4 animate-pulse">
                <div className="aspect-[16/10] bg-gray-100 rounded-xl"></div>
                <div className="space-y-2.5">
                  <div className="h-4 w-24 bg-gray-150 rounded"></div>
                  <div className="h-6 w-full bg-gray-200 rounded"></div>
                  <div className="h-4 w-full bg-gray-150 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* Spotlight Hero Section */}
          {showSpotlight && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 bg-white border border-gray-100 rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-300 mb-10 select-none">
              {/* Cover Image */}
              <div
                onClick={() => handleCardClick(spotlightPost)}
                className="lg:col-span-7 aspect-[16/9] lg:aspect-video rounded-2xl overflow-hidden bg-gray-50 relative cursor-pointer group flex-shrink-0 shadow-sm border border-gray-100"
              >
                <img
                  src={spotlightPost.image}
                  alt={spotlightPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80";
                  }}
                />
                <span className="absolute top-4 left-4 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md">
                  ★ Nổi bật
                </span>
              </div>

              {/* Spotlight Content */}
              <div className="lg:col-span-5 flex flex-col justify-between py-2">
                <div className="space-y-3.5">
                  {/* Category & Label */}
                  <span className="inline-block bg-brand/10 text-brand px-2.5 py-1 rounded-md text-[10px] font-extrabold uppercase tracking-wide">
                    {spotlightPost.category}
                  </span>
                  
                  {/* Title */}
                  <h2
                    onClick={() => handleCardClick(spotlightPost)}
                    className="text-xl md:text-2xl font-extrabold text-gray-900 leading-snug hover:text-brand cursor-pointer transition-colors tracking-tight mt-2"
                  >
                    {spotlightPost.title}
                  </h2>
                  
                  {/* Summary */}
                  <p className="text-gray-550 text-xs md:text-sm leading-relaxed">
                    {spotlightPost.summary}
                  </p>
                </div>

                {/* Footer details */}
                <div className="mt-6">
                  {/* Meta details */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 font-semibold mb-4">
                    <span className="text-gray-650">{spotlightPost.author}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span>{spotlightPost.publishedAt}</span>
                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                    <span className="flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-gray-400" />
                      {Math.max(1, Math.ceil((spotlightPost.content || "").split(/\s+/).length / 200))} phút đọc
                    </span>
                  </div>

                  {/* Read CTA Button */}
                  <button
                    onClick={() => handleCardClick(spotlightPost)}
                    className="bg-brand hover:bg-brand-dark text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-brand/10 hover:shadow-brand/25"
                  >
                    Đọc bài viết
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Remaining Articles Grid */}
          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {gridPosts.map((post) => (
                <div key={post.id} className="animate-fade-in h-full">
                  <NewsCard post={post} onClick={() => handleCardClick(post)} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-3xl border border-gray-100 shadow-sm select-none animate-fade-in flex flex-col items-center justify-center">
              <Inbox className="h-10 w-10 text-gray-300 mb-3" />
              <h3 className="text-base font-bold text-gray-900 mb-1">Không tìm thấy bài viết nào</h3>
              <p className="text-xs text-gray-500">Hãy thử đổi danh mục hoặc từ khóa tìm kiếm khác nhé.</p>
            </div>
          )}
        </>
      )}

      {/* Post Detail Modal */}
      <NewsDetailModal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        post={selectedPost}
      />
    </div>
  );
}
