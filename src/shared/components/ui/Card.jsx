export default function Card({ children, className = "", hover = false, ...props }) {
  return (
    <div
      className={[
        "bg-white rounded-2xl shadow-sm border border-gray-100",
        "transition-all duration-300",
        hover
          ? "hover:shadow-xl hover:-translate-y-1 hover:border-brand/20 cursor-pointer"
          : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </div>
  );
}
