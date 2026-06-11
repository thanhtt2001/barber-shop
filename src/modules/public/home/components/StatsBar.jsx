const stats = [
  {
    id: "years",
    icon: "🏆",
    value: "5+",
    label: "Năm kinh nghiệm",
    suffix: "năm",
  },
  {
    id: "customers",
    icon: "👤",
    value: "3.000+",
    label: "Khách hàng hài lòng",
    suffix: "khách",
  },
  {
    id: "branches",
    icon: "📍",
    value: "3",
    label: "Cơ sở tại Hưng Yên",
    suffix: "cơ sở",
  },
  {
    id: "rating",
    icon: "⭐",
    value: "4.9",
    label: "Điểm đánh giá trung bình",
    suffix: "/ 5",
  },
];

export default function StatsBar() {
  return (
    <section
      aria-label="Thống kê BarberPro"
      className="bg-gradient-to-r from-brand-dark via-brand to-sky-400 py-10 relative overflow-hidden"
    >
      {/* Subtle pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
          backgroundSize: "24px 24px",
        }}
        aria-hidden="true"
      />

      <div className="container-custom relative z-10">
        <dl className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={stat.id}
              className={[
                "flex flex-col items-center text-center text-white",
                "animate-fade-in",
              ].join(" ")}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="text-3xl mb-2" aria-hidden="true">
                {stat.icon}
              </span>
              <dd className="text-3xl md:text-4xl font-bold font-display leading-none mb-1">
                {stat.value}
              </dd>
              <dt className="text-sm text-sky-100 font-medium">{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
