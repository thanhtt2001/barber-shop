import { useEffect, useState } from "react";
import useNewsManager from "./hooks/useNewsManager";
import NewsTable from "./components/NewsTable";
import NewsFormModal from "./components/NewsFormModal";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";
import Select from "@/shared/components/ui/Select";
import { Plus, Search } from "lucide-react";

const CATEGORIES = ["Tất cả", "Xu hướng tóc", "Bí quyết tóc", "Khuyến mãi", "Tin cửa hàng"];

export default function NewsAdminPage() {
  const {
    news,
    loading,
    error,
    loadNews,
    createPost,
    editPost,
    removePost,
  } = useNewsManager();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("all");

  useEffect(() => {
    loadNews();
  }, [loadNews]);

  const handleCreateTrigger = () => {
    setSelectedPost(null);
    setIsModalOpen(true);
  };

  const handleEditTrigger = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleDeleteTrigger = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xoá bài viết này không?")) {
      await removePost(id);
    }
  };

  const handleSubmit = async (data) => {
    let result;
    if (selectedPost) {
      result = await editPost(selectedPost.id, data);
    } else {
      result = await createPost(data);
    }
    return !!result;
  };

  // Filter articles by category, status, and search query
  const filteredNews = news.filter((post) => {
    // Category filter
    const matchesCategory =
      selectedCategory === "Tất cả" || post.category === selectedCategory;

    // Status filter
    const matchesStatus =
      selectedStatus === "all" || post.status === selectedStatus;

    // Search query filter
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 font-display">Quản lý bài viết tin tức</h1>
          <p className="text-sm text-gray-500 mt-1">
            Đăng các bài viết chia sẻ bí quyết chăm sóc tóc, cập nhật xu hướng kiểu tóc nam và tin tức hoạt động của salon.
          </p>
        </div>
        <div>
          <Button
            onClick={handleCreateTrigger}
            variant="brand"
            className="inline-flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Viết bài mới
          </Button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm flex items-center justify-between">
          <span>{error}</span>
        </div>
      )}

      {/* Filter and Search Panel */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-stretch md:items-center bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        {/* Left: Category tabs & Status select */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={[
                "px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-150",
                selectedCategory === cat
                  ? "bg-brand text-white shadow-sm"
                  : "text-gray-500 hover:text-gray-900 hover:bg-gray-50",
              ].join(" ")}
            >
              {cat}
            </button>
          ))}

          <span className="h-4 w-px bg-gray-200 mx-1 hidden sm:block" />

          <div className="w-full sm:w-44">
            <Select
              placeholder=""
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              options={[
                { value: "all", label: "Tất cả trạng thái" },
                { value: "active", label: "Hoạt động" },
                { value: "inactive", label: "Tạm ngưng" },
              ]}
              className="py-1.5 px-3 text-xs rounded-lg border-gray-200 text-gray-600 bg-gray-50/80 focus:bg-white focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>

        {/* Right: Search Input */}
        <div className="relative w-full md:max-w-xs flex-shrink-0">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Tìm kiếm bài viết..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 text-xs bg-gray-50/70 border border-gray-250 rounded-full focus:border-brand focus:bg-white focus:ring-4 focus:ring-brand/10 transition-all outline-none text-gray-700"
          />
        </div>
      </div>

      {/* News Table Card */}
      <Card className="p-6">
        <NewsTable
          news={filteredNews}
          loading={loading}
          onEdit={handleEditTrigger}
          onDelete={handleDeleteTrigger}
        />
      </Card>

      {/* News Form Modal */}
      <NewsFormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        post={selectedPost}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
