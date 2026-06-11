import { Link } from "react-router-dom";
import Button from "@/shared/components/ui/Button";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-brand" aria-hidden="true" />

      {/* Decorative blobs */}
      <div
        className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-brand/10 rounded-full blur-3xl -translate-y-1/4 translate-x-1/3"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-200/30 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"
        aria-hidden="true"
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0ea5e9 1px, transparent 1px), linear-gradient(to bottom, #0ea5e9 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10 pt-28 md:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="animate-slide-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand/10 border border-brand/20 rounded-full mb-6">
              <span className="w-2 h-2 bg-brand rounded-full animate-pulse" />
              <span className="text-sm font-medium text-brand">
                Hưng Yên · 3 Cơ sở · Đặt lịch Online
              </span>
            </div>

            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold font-display text-gray-900 leading-tight mb-6"
            >
              Phong cách{" "}
              <span className="text-gradient">đỉnh cao</span>
              <br />
              dành cho{" "}
              <span className="relative inline-block">
                quý ông
                <svg
                  className="absolute -bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M2 9C50 3 150 3 198 9"
                    stroke="#0ea5e9"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-lg text-gray-600 leading-relaxed mb-8 max-w-lg">
              BarberPro — chuỗi barber shop chuyên nghiệp với hơn{" "}
              <strong className="text-gray-800">5 năm kinh nghiệm</strong> tại Hưng Yên.
              Đội ngũ thợ tay nghề cao, không gian hiện đại, trải nghiệm đẳng cấp.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/booking" id="hero-cta-booking">
                <Button size="lg" variant="primary" className="w-full sm:w-auto group">
                  <svg
                    className="w-5 h-5 group-hover:rotate-12 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Đặt lịch ngay
                </Button>
              </Link>

              <Link to="/gallery" id="hero-cta-gallery">
                <Button size="lg" variant="outline" className="w-full sm:w-auto group">
                  <svg
                    className="w-5 h-5 group-hover:scale-110 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  Xem mẫu tóc
                </Button>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center gap-6 mt-10 pt-8 border-t border-gray-200">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full bg-gradient-to-br from-brand to-brand-dark border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                    aria-hidden="true"
                  >
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div>
                <div className="flex items-center gap-1 mb-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg
                      key={star}
                      className="w-4 h-4 text-amber-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  <strong className="text-gray-700">4.9/5</strong> từ 500+ đánh giá
                </p>
              </div>
            </div>
          </div>

          {/* Hero Image / Illustration */}
          <div className="hidden lg:flex justify-center items-center animate-fade-in">
            <div className="relative w-96 h-96">
              {/* Main circle */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-sky-300/20 rounded-full" />
              <div className="absolute inset-8 bg-gradient-to-br from-brand/30 to-sky-400/30 rounded-full" />

              {/* Center icon */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-40 bg-white rounded-3xl shadow-2xl shadow-brand/20 flex items-center justify-center">
                  <svg
                    className="w-20 h-20 text-brand"
                    fill="currentColor"
                    viewBox="0 0 64 64"
                    aria-hidden="true"
                  >
                    <path d="M32 4C18.745 4 8 14.745 8 28c0 7.732 3.74 14.598 9.5 18.928V56a2 2 0 002 2h5a2 2 0 002-2v-4h11v4a2 2 0 002 2h5a2 2 0 002-2v-9.072C52.26 42.598 56 35.732 56 28 56 14.745 45.255 4 32 4zm0 4c11.046 0 20 8.954 20 20s-8.954 20-20 20S12 39.046 12 28 20.954 8 32 8zm-8 14a2 2 0 00-2 2v4a2 2 0 104 0v-4a2 2 0 00-2-2zm16 0a2 2 0 00-2 2v4a2 2 0 104 0v-4a2 2 0 00-2-2zm-9 10a1 1 0 00-1 1c0 1.654 1.346 3 3 3s3-1.346 3-3a1 1 0 10-2 0c0 .551-.449 1-1 1s-1-.449-1-1a1 1 0 00-1-1z" />
                  </svg>
                </div>
              </div>

              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2">
                <span className="text-2xl">✂️</span>
                <div>
                  <p className="text-xs text-gray-500">Khách hàng</p>
                  <p className="text-sm font-bold text-gray-900">3.000+</p>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-lg px-4 py-2 flex items-center gap-2">
                <span className="text-2xl">⭐</span>
                <div>
                  <p className="text-xs text-gray-500">Đánh giá</p>
                  <p className="text-sm font-bold text-gray-900">4.9 / 5</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce" aria-hidden="true">
        <span className="text-xs text-gray-400">Cuộn xuống</span>
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
