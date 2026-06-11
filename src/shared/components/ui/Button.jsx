const variantClasses = {
  primary:
    "bg-brand hover:bg-brand-dark text-white shadow-md hover:shadow-lg shadow-brand/30 hover:shadow-brand/40",
  brand:
    "bg-gradient-to-r from-brand to-brand-dark text-white shadow-md hover:shadow-lg shadow-brand/30 hover:shadow-brand/40 hover:from-brand-dark hover:to-brand",
  outline:
    "border-2 border-brand text-brand hover:bg-brand hover:text-white",
  ghost:
    "text-brand hover:bg-brand-light",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  loading = false,
  type = "button",
  onClick,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl font-semibold",
        "transition-all duration-200 ease-out",
        "focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2",
        "active:scale-95",
        "disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100",
        variantClasses[variant] || variantClasses.primary,
        sizeClasses[size] || sizeClasses.md,
        className,
      ].join(" ")}
      {...props}
    >
      {loading && (
        <svg
          className="animate-spin h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          />
        </svg>
      )}
      {children}
    </button>
  );
}
