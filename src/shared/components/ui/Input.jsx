import { forwardRef } from "react";

const Input = forwardRef(function Input(
  {
    label,
    id,
    name,
    type = "text",
    placeholder,
    error,
    className = "",
    required = false,
    disabled = false,
    ...props
  },
  ref
) {
  const inputId = id || name;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-sm font-semibold text-gray-700"
        >
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        name={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${inputId}-error` : undefined}
        className={[
          "w-full rounded-xl border px-4 py-3 text-sm text-gray-800",
          "bg-white placeholder-gray-400",
          "transition-all duration-150",
          "focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
          error
            ? "border-red-400 focus:ring-red-400 focus:border-red-400"
            : "border-gray-200 hover:border-brand/50",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
          className,
        ].join(" ")}
        {...props}
      />

      {error && (
        <p
          id={`${inputId}-error`}
          role="alert"
          className="text-xs text-red-500 font-medium flex items-center gap-1"
        >
          <svg
            className="w-3.5 h-3.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
