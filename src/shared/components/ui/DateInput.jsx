import { forwardRef } from "react";
import { Calendar, AlertCircle } from "lucide-react";

const DateInput = forwardRef(function DateInput(
  {
    label,
    id,
    name,
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
    <div className="flex flex-col gap-1.5 w-full">
      {label && (
        <label htmlFor={inputId} className="text-sm font-semibold text-gray-700 select-none">
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      <div className="relative w-full">
        <input
          ref={ref}
          id={inputId}
          name={name}
          type="date"
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          className={[
            "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white custom-date-picker pr-10 font-semibold relative",
            "transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
            error
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-gray-200 hover:border-brand/50",
            disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer",
            className,
          ].join(" ")}
          style={{
            colorScheme: "light",
          }}
          {...props}
        />

        {/* Custom Calendar Icon */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400">
          <Calendar className="h-4 w-4" />
        </div>
      </div>

      {error && (
        <p id={`${inputId}-error`} role="alert" className="text-xs text-red-500 font-medium flex items-center gap-1 mt-0.5 select-none animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});

export default DateInput;
