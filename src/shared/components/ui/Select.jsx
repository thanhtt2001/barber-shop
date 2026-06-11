import { forwardRef, useState, useEffect, useRef } from "react";
import { ChevronDown, Check, AlertCircle } from "lucide-react";

const Select = forwardRef(function Select(
  {
    label,
    id,
    name,
    options = [],
    error,
    className = "",
    required = false,
    disabled = false,
    placeholder = "-- Chọn --",
    value,
    defaultValue,
    onChange,
    ...props
  },
  ref
) {
  const selectId = id || name;
  const containerRef = useRef(null);
  const nativeSelectRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [internalValue, setInternalValue] = useState("");

  // Determine current active value
  const currentValue = value !== undefined ? value : internalValue;

  // Find the selected option's label
  const activeOption = options.find((opt) => {
    const isObj = typeof opt === "object" && opt !== null;
    const val = isObj ? opt.value : opt;
    return String(val) === String(currentValue);
  });

  const activeLabel = activeOption
    ? (typeof activeOption === "object" ? activeOption.label : activeOption)
    : placeholder;

  // Sync internal value with value prop or defaultValue
  useEffect(() => {
    if (value !== undefined) {
      setInternalValue(value);
    } else if (defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [value, defaultValue]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelectOption = (optVal) => {
    setInternalValue(optVal);
    setIsOpen(false);

    // Update hidden native select
    if (nativeSelectRef.current) {
      nativeSelectRef.current.value = optVal;
      const event = new Event("change", { bubbles: true });
      nativeSelectRef.current.dispatchEvent(event);
    }

    // Call custom onChange handler
    if (onChange) {
      onChange({ target: { name, value: optVal } });
    }
  };

  // Keyboard accessibility
  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
      e.preventDefault();
      setIsOpen(true);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 w-full relative">
      {label && (
        <label htmlFor={selectId} className="text-sm font-semibold text-gray-700 select-none">
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </label>
      )}

      {/* Hidden native select for standard HTML validation and form submit */}
      <select
        ref={(el) => {
          nativeSelectRef.current = el;
          if (typeof ref === "function") {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        id={selectId}
        name={name}
        value={currentValue}
        disabled={disabled}
        required={required}
        onChange={(e) => {
          setInternalValue(e.target.value);
          if (onChange) onChange(e);
        }}
        className="sr-only"
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => {
          const isObj = typeof opt === "object" && opt !== null;
          const val = isObj ? opt.value : opt;
          const lbl = isObj ? opt.label : opt;
          return (
            <option key={val} value={val}>
              {lbl}
            </option>
          );
        })}
      </select>

      {/* Visual Custom Dropdown Trigger */}
      <div className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          onClick={() => !disabled && setIsOpen(!isOpen)}
          onKeyDown={handleKeyDown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          className={[
            "w-full rounded-xl border px-4 py-3 text-sm text-gray-800 bg-white text-left flex items-center justify-between transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-brand focus:border-brand",
            isOpen ? "ring-2 ring-brand border-brand" : "",
            error
              ? "border-red-400 focus:ring-red-400 focus:border-red-400"
              : "border-gray-200 hover:border-brand/50",
            disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer",
            className,
          ].join(" ")}
        >
          <span className={currentValue === "" ? "text-gray-400 truncate" : "truncate font-semibold"}>
            {activeLabel}
          </span>
          <span className="text-gray-400 flex-shrink-0 ml-2">
            <ChevronDown
              className={["h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : ""].join(" ")}
            />
          </span>
        </button>

        {/* Custom Dropdown Menu Panel */}
        {isOpen && (
          <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-150 rounded-2xl shadow-xl z-50 flex flex-col max-h-60 overflow-y-auto p-1 animate-scale-in">
            {placeholder && (
              <button
                type="button"
                onClick={() => handleSelectOption("")}
                className={[
                  "w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors text-gray-400 hover:bg-gray-50 flex items-center justify-between",
                  currentValue === "" ? "bg-gray-50 font-bold text-gray-500" : "",
                ].join(" ")}
              >
                <span>{placeholder}</span>
                {currentValue === "" && (
                  <Check className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                )}
              </button>
            )}
            {options.map((opt) => {
              const isObj = typeof opt === "object" && opt !== null;
              const val = isObj ? opt.value : opt;
              const lbl = isObj ? opt.label : opt;
              const isSelected = String(val) === String(currentValue);

              return (
                <button
                  type="button"
                  key={val}
                  onClick={() => handleSelectOption(val)}
                  className={[
                    "w-full text-left px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors flex items-center justify-between truncate",
                    isSelected
                      ? "bg-brand-light text-brand-dark font-bold"
                      : "text-gray-700 hover:bg-gray-50",
                  ].join(" ")}
                >
                  <span className="truncate">{lbl}</span>
                  {isSelected && (
                    <Check className="w-3.5 h-3.5 text-brand-dark flex-shrink-0" />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {error && (
        <p id={`${selectId}-error`} role="alert" className="text-xs text-red-500 font-medium flex items-center gap-1 mt-0.5 select-none animate-fade-in">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
});

export default Select;
