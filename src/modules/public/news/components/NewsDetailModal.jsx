import { useState } from "react";
import { Link } from "react-router-dom";
import Modal from "@/shared/components/ui/Modal";
import Button from "@/shared/components/ui/Button";
import { Clock, Facebook, Twitter, Share2, Calendar, User, Check, Scissors } from "lucide-react";

export default function NewsDetailModal({ isOpen, onClose, post }) {
  const [copied, setCopied] = useState(false);
  if (!post) return null;

  // Tính toán thời gian đọc (200 từ/phút)
  const wordCount = post.content ? post.content.split(/\s+/).length : 0;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Phân tách nội dung thành các đoạn văn riêng biệt để định dạng đẹp hơn
  const paragraphs = post.content ? post.content.split("\n\n") : [];

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const footer = (
    <div className="flex items-center justify-between w-full">
      <span className="text-xs text-gray-400 font-semibold hidden sm:inline select-none">
        BarberPro Cẩm nang bí quyết chăm sóc tóc
      </span>
      <Button variant="outline" size="sm" onClick={onClose}>
        Đóng bài viết
      </Button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={post.category}
      size="lg"
      footer={footer}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cột trái: Thông tin tác giả & Chia sẻ (Chỉ hiển thị cố định ở bên trái trên màn hình lớn) */}
        <div className="lg:col-span-3 lg:border-r lg:border-gray-100 lg:pr-6 flex flex-col justify-between h-full space-y-6">
          <div className="space-y-6">
            {/* Tác giả Card */}
            <div className="flex items-center lg:flex-col lg:items-start gap-3 p-3 bg-gray-50/50 rounded-2xl border border-gray-100">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-blue-500 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 shadow-sm">
                {post.author ? post.author.slice(0, 2).toUpperCase() : "BB"}
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Tác giả</span>
                <p className="text-xs font-bold text-gray-900 truncate mt-0.5">{post.author || "BarberPro Stylist"}</p>
                <span className="text-[9px] text-gray-400 font-semibold">Chuyên gia tạo mẫu</span>
              </div>
            </div>

            {/* Thông tin bài viết */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4 lg:space-y-4 text-xs font-semibold text-gray-500">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Ngày đăng</span>
                <div className="flex items-center gap-1.5 text-gray-700 mt-0.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-400" />
                  {post.publishedAt}
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Thời gian đọc</span>
                <div className="flex items-center gap-1.5 text-gray-700 mt-0.5">
                  <Clock className="w-3.5 h-3.5 text-gray-400" />
                  {readTime} phút đọc
                </div>
              </div>
            </div>
          </div>

          {/* Social Share Buttons */}
          <div className="space-y-2.5 pt-4 border-t border-gray-100">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block select-none">Chia sẻ bài viết</span>
            <div className="flex items-center gap-2">
              <button
                className="w-8 h-8 rounded-lg bg-sky-50 text-sky-600 hover:bg-sky-100 hover:text-sky-700 transition-colors flex items-center justify-center border border-sky-100/50"
                title="Chia sẻ Facebook"
              >
                <Facebook className="w-4 h-4" />
              </button>
              <button
                className="w-8 h-8 rounded-lg bg-sky-55/10 text-sky-500 hover:bg-sky-100 hover:text-sky-600 transition-colors flex items-center justify-center border border-sky-100"
                title="Chia sẻ Twitter"
              >
                <Twitter className="w-4 h-4" />
              </button>
              <button
                onClick={handleShareClick}
                className={[
                  "h-8 px-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 border",
                  copied
                    ? "bg-emerald-50 text-emerald-600 border-emerald-150"
                    : "bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-900 border-gray-200",
                ].join(" ")}
                title="Sao chép đường dẫn"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>Đã sao chép</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Cột phải: Ảnh bìa, Tiêu đề & Nội dung bài đọc */}
        <div className="lg:col-span-9 space-y-6">
          {/* Cover Image */}
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-gray-100 shadow-sm bg-gray-50 flex-shrink-0">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1621605815971-fbc98d665033?w=800&auto=format&fit=crop&q=80";
              }}
            />
          </div>

          {/* Tiêu đề & Danh mục */}
          <div className="space-y-2">
            <span className="inline-block text-xs font-extrabold uppercase tracking-widest text-brand bg-brand/10 px-2.5 py-1 rounded-md">
              {post.category}
            </span>
            <h1 className="text-xl md:text-2xl lg:text-3xl font-extrabold text-gray-950 font-display leading-snug tracking-tight">
              {post.title}
            </h1>
          </div>

          {/* Nội dung bài viết */}
          <div className="text-slate-700 space-y-5">
            {paragraphs.map((p, idx) => {
              const lines = p.split("\n");
              const isFirstParagraph = idx === 0;

              if (lines.length > 1) {
                return (
                  <div key={idx} className="space-y-3">
                    {lines.map((line, lIdx) => {
                      const trimmed = line.trim();
                      const isNumbered = /^\d+\.\s/.test(trimmed);
                      const isBulleted = /^[-•*]\s/.test(trimmed);

                      if (isNumbered) {
                        const numMatch = trimmed.match(/^(\d+)\.\s(.*)/);
                        return (
                          <div key={lIdx} className="flex gap-2 pl-3 items-start">
                            <span className="font-extrabold text-brand text-sm min-w-[20px] mt-0.5">{numMatch[1]}.</span>
                            <span className="text-slate-700 text-sm md:text-base leading-relaxed flex-1">{numMatch[2]}</span>
                          </div>
                        );
                      }

                      if (isBulleted) {
                        const textContent = trimmed.replace(/^[-•*]\s/, "");
                        return (
                          <div key={lIdx} className="flex gap-2 pl-3 items-start">
                            <span className="text-brand text-base leading-none mt-0.5">•</span>
                            <span className="text-slate-700 text-sm md:text-base leading-relaxed flex-1">{textContent}</span>
                          </div>
                        );
                      }

                      return (
                        <p key={lIdx} className="text-slate-700 text-sm md:text-base leading-relaxed">
                          {line}
                        </p>
                      );
                    })}
                  </div>
                );
              }

              return (
                <p
                  key={idx}
                  className={[
                    "text-slate-700 text-sm md:text-base leading-relaxed whitespace-pre-line",
                    isFirstParagraph
                      ? "first-letter:text-4xl first-letter:font-extrabold first-letter:text-brand first-letter:mr-2.5 first-letter:float-left first-letter:leading-none"
                      : "",
                  ].join(" ")}
                >
                  {p}
                </p>
              );
            })}
          </div>

          {/* CTA Banner ở cuối bài đọc */}
          <div className="bg-gradient-to-r from-sky-500/10 via-blue-600/5 to-transparent border border-sky-100 rounded-2xl p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4 mt-10">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5 justify-center sm:justify-start">
                <Scissors className="w-4 h-4 text-brand" />
                <span>Bạn muốn sở hữu kiểu tóc này?</span>
              </h4>
              <p className="text-xs text-gray-500 max-w-md">
                Đặt lịch hẹn ngay hôm nay để được stylist {post.author || "chuyên nghiệp"} tư vấn và thiết kế phom dáng phù hợp nhất với khuôn mặt bạn!
              </p>
            </div>
            <Link
              to="/booking"
              onClick={onClose}
              className="bg-brand hover:bg-brand-dark text-white text-xs font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-brand/10 hover:shadow-brand/20 flex-shrink-0 flex items-center justify-center w-full sm:w-auto"
            >
              Đặt lịch hẹn ngay
            </Link>
          </div>
        </div>
      </div>
    </Modal>
  );
}
