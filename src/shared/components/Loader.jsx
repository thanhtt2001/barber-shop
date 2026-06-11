export default function Loader({ size = "md", text = "", className = "", fullScreen = false }) {
  const sizeClasses = {
    sm: "w-6 h-6 border-2",
    md: "w-10 h-10 border-4",
    lg: "w-14 h-14 border-4",
  };

  const spinner = (
    <div className={`flex flex-col items-center justify-center gap-3 ${className}`}>
      <div
        className={[
          "border-brand/20 border-t-brand rounded-full animate-spin",
          sizeClasses[size] || sizeClasses.md,
        ].join(" ")}
        role="status"
        aria-label="Loading"
      />
      {text && <p className="text-sm text-gray-400 font-medium">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        {spinner}
      </div>
    );
  }

  return spinner;
}
