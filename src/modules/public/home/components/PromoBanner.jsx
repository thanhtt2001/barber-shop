import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "@/shared/components/ui/Button";
import Card from "@/shared/components/ui/Card";
import promoImage from "@/assets/barber_weekend_promo.png";
import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";

const LOCAL_STORAGE_KEY = "barberpro_admin_events";

const fallbackEvents = [
  {
    id: "default-promo",
    title: "Giảm Ngay 20% Tổng Hóa Đơn Khi Đặt Lịch Online Cuối Tuần",
    description: "Chuẩn bị cho một tuần mới đầy hứng khởi! Nhận ngay ưu đãi giảm giá 20% cho tất cả các dịch vụ (bao gồm cả Combo VIP và các dịch vụ hóa chất uốn/nhuộm) khi quý khách đặt lịch trước trên website. Hệ thống sẽ tự động áp dụng chiết khấu tại quầy thanh toán.",
    image: promoImage,
    badgeText: "Khuyến Mãi Hot",
    isHot: true,
    isUpcoming: false,
    timeText: "Thứ Bảy - Chủ Nhật tuần này",
    status: "active",
  }
];

export default function PromoBanner() {
  const [events, setEvents] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const timerRef = useRef(null);

  // Load active events from localStorage
  useEffect(() => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let list = [];
    if (data) {
      try {
        const parsed = JSON.parse(data);
        list = parsed.filter((e) => e.status === "active");
      } catch (e) {
        list = [];
      }
    }
    // Fallback if no active events found
    if (list.length === 0) {
      setEvents(fallbackEvents);
    } else {
      setEvents(list);
    }
  }, []);

  // Slide transition function
  const changeSlide = (newIndex) => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsFading(false);
    }, 250); // duration of half fade out
  };

  const nextSlide = () => {
    const nextIndex = (currentIndex + 1) % events.length;
    changeSlide(nextIndex);
  };

  const prevSlide = () => {
    const prevIndex = (currentIndex - 1 + events.length) % events.length;
    changeSlide(prevIndex);
  };

  // Autoplay functionality
  useEffect(() => {
    if (events.length <= 1) return;

    timerRef.current = setInterval(nextSlide, 7000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [events, currentIndex]);

  const handleMouseEnter = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handleMouseLeave = () => {
    if (events.length <= 1) return;
    timerRef.current = setInterval(nextSlide, 7000);
  };

  if (events.length === 0) return null;

  const currentEvent = events[currentIndex];

  return (
    <section className="py-12 bg-white" aria-labelledby="promo-heading">
      <div className="container-custom">
        <Card
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="relative overflow-hidden border border-brand/10 bg-gradient-to-br from-white to-sky-50/20 shadow-lg shadow-brand/5 rounded-3xl p-6 md:p-8 transition-all duration-300"
        >
          <div
            className={[
              "grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-opacity duration-300",
              isFading ? "opacity-0" : "opacity-100",
            ].join(" ")}
          >
            {/* Left: Banner Image */}
            <div className="lg:col-span-5 relative group overflow-hidden rounded-2xl border border-gray-100 aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-[260px] flex-shrink-0">
              <img
                src={currentEvent.image}
                alt={currentEvent.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?w=800&auto=format&fit=crop&q=80";
                }}
              />
              {currentEvent.isHot && (
                <span className="absolute top-4 left-4 bg-red-650 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-pulse">
                  HOT
                </span>
              )}
              {currentEvent.isUpcoming && !currentEvent.isHot && (
                <span className="absolute top-4 left-4 bg-sky-500 text-white text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full shadow-md animate-pulse">
                  SẮP DIỄN RA
                </span>
              )}
            </div>

            {/* Right: Info Content */}
            <div className="lg:col-span-7 space-y-4 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-2">
                {currentEvent.badgeText && (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-650 text-xs font-bold rounded-full uppercase tracking-wider border border-red-105">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-ping" />
                    {currentEvent.badgeText}
                  </span>
                )}
                {currentEvent.timeText && (
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">
                    Thời gian: {currentEvent.timeText}
                  </span>
                )}
              </div>

              <h2
                id="promo-heading"
                className="text-xl md:text-2xl lg:text-3xl font-extrabold font-display text-gray-900 leading-tight"
              >
                {currentEvent.title}
              </h2>

              <p className="text-gray-500 text-sm leading-relaxed">
                {currentEvent.description}
              </p>

              <div className="pt-2 flex flex-wrap gap-4 items-center justify-between">
                <div className="flex flex-wrap gap-4 items-center">
                  <Link to="/booking">
                    <Button variant="brand" size="md" className="shadow-md shadow-brand/20">
                      <Calendar className="w-4 h-4 mr-2" />
                      Đặt lịch giữ chỗ ngay
                    </Button>
                  </Link>
                  <Link to="/products" className="text-xs font-bold text-gray-500 hover:text-brand transition-colors underline underline-offset-4">
                    Xem thêm phụ kiện tóc →
                  </Link>
                </div>

                {/* Slider Navigation (only shown if there are multiple events) */}
                {events.length > 1 && (
                  <div className="flex items-center gap-2 mt-2 sm:mt-0 select-none">
                    <button
                      onClick={prevSlide}
                      className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-150 rounded-xl transition-all"
                      aria-label="Sự kiện trước"
                    >
                      <ChevronLeft className="w-3.5 h-3.5" />
                    </button>
                    <div className="flex items-center gap-1">
                      {events.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => changeSlide(idx)}
                          className={[
                            "w-2 h-2 rounded-full transition-all duration-200",
                            currentIndex === idx ? "w-5 bg-brand" : "bg-gray-300 hover:bg-gray-400",
                          ].join(" ")}
                          aria-label={`Chuyển tới slide ${idx + 1}`}
                        />
                      ))}
                    </div>
                    <button
                      onClick={nextSlide}
                      className="p-2 bg-gray-50 hover:bg-gray-100 text-gray-600 hover:text-gray-900 border border-gray-150 rounded-xl transition-all"
                      aria-label="Sự kiện tiếp theo"
                    >
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
