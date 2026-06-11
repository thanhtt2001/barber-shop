import Card from "@/shared/components/ui/Card";
import { Clock } from "lucide-react";

export default function NewsCard({ post, onClick }) {
  // Tính toán thời gian đọc (trung bình 200 từ/phút)
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <Card
      onClick={onClick}
      className="group overflow-hidden border border-gray-100 bg-white hover:border-brand/30 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 rounded-2xl cursor-pointer flex flex-col h-full"
    >
      {/* Image Container with Zoom effect */}
      <div className="relative aspect-[16/10] overflow-hidden bg-gray-50 flex-shrink-0">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80";
          }}
        />

        {/* Featured / Highlight Badge */}
        {post.isFeatured && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm border border-amber-300/20">
            ★ Nổi bật
          </span>
        )}

        {/* Category tag */}
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-800 text-[10px] font-bold uppercase tracking-wide px-2.5 py-1 rounded-lg shadow-sm border border-gray-100/50 select-none">
          {post.category}
        </span>
      </div>

      {/* Info Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-2.5">
          {/* Metadata: Author + Date + Read Time */}
          <div className="flex items-center gap-2 text-[11px] text-gray-400 font-semibold select-none">
            <span className="truncate text-gray-500">{post.author}</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full flex-shrink-0" />
            <span className="flex-shrink-0">{post.publishedAt}</span>
            <span className="w-1 h-1 bg-gray-200 rounded-full flex-shrink-0" />
            <span className="flex items-center gap-1 text-gray-400 flex-shrink-0 font-medium">
              <Clock className="w-3.5 h-3.5 text-gray-400" />
              {readTime} phút đọc
            </span>
          </div>

          {/* Title */}
          <h3 className="font-extrabold text-gray-900 text-base leading-snug group-hover:text-brand transition-colors line-clamp-2">
            {post.title}
          </h3>

          {/* Summary */}
          <p className="text-gray-500 text-xs leading-relaxed line-clamp-3">
            {post.summary}
          </p>
        </div>

        {/* Read More link */}
        <div className="pt-4 mt-5 border-t border-gray-55/70 flex items-center justify-between text-xs font-bold text-gray-500 group-hover:text-brand transition-colors select-none">
          <span>Xem chi tiết bài viết</span>
          <span className="transform group-hover:translate-x-1.5 transition-transform">→</span>
        </div>
      </div>
    </Card>
  );
}
