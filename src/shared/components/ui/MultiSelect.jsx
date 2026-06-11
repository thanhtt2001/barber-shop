import { useState, useEffect, useRef } from "react";
import { X, ChevronDown, Search, AlertCircle } from "lucide-react";

export default function MultiSelect({
  label,
  options = [],
  selected = [],
  onChange,
  placeholder = "Chọn nhiều mục...",
  error,
  required = false,
  disabled = false,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const containerRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    if (!disabled) setIsOpen((prev) => !prev);
  };

  const handleSelectOption = (value) => {
    let updated;
    if (selected.includes(value)) {
      updated = selected.filter((v) => v !== value);
    } else {
      updated = [...selected, value];
    }
    onChange(updated);
  };

  const handleRemoveTag = (e, value) => {
    e.stopPropagation();
    onChange(selected.filter((v) => v !== value));
  };

  const handleSelectAll = () => {
    const allValues = options.map((opt) => (typeof opt === "object" ? opt.value : opt));
    onChange(allValues);
  };

  const handleClearAll = () => {
    onChange([]);
  };

  // Filter options based on search query
  const filteredOptions = options.filter((opt) => {
    const lbl = typeof opt === "object" ? opt.label : opt;
    return lbl.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div ref={containerRef} className="flex flex-col gap-1.5 w-full relative">
      {label && (
        <span className="text-sm font-semibold text-gray-700 select-none">
          {label}
          {required && (
            <span className="ml-1 text-red-500" aria-hidden="true">
              *
            </span>
          )}
        </span>
      )}

      {/* Control Box */}
      <div
        onClick={toggleDropdown}
        className={[
          "min-h-[46px] w-full rounded-xl border px-3 py-2 text-sm bg-white cursor-pointer",
          "transition-all duration-150 flex flex-wrap gap-1.5 items-center justify-between",
          "focus-within:ring-2 focus-within:ring-brand focus-within:border-brand",
          isOpen ? "ring-2 ring-brand border-brand" : "",
          error
            ? "border-red-400 ring-red-400"
            : "border-gray-200 hover:border-brand/50",
          disabled ? "opacity-50 cursor-not-allowed bg-gray-50" : "",
          className,
        ].join(" ")}
      >
        <div className="flex flex-wrap gap-1 items-center flex-1 min-w-0">
          {selected.length === 0 ? (
            <span className="text-gray-400 select-none">{placeholder}</span>
          ) : (
            selected.map((val) => {
              const matchedOpt = options.find(
                (o) => (typeof o === "object" ? o.value === val : o === val)
              );
              const labelText = matchedOpt
                ? typeof matchedOpt === "object"
                  ? matchedOpt.label
                  : matchedOpt
                : val;

              return (
                <span
                  key={val}
                  className="inline-flex items-center gap-1 bg-brand-light text-brand-dark text-xs font-bold px-2 py-1 rounded-lg select-none flex-shrink-0"
                >
                  {labelText}
                  {!disabled && (
                    <button
                      type="button"
                      onClick={(e) => handleRemoveTag(e, val)}
                      className="hover:bg-brand/20 rounded-full p-0.5 transition-colors"
                      aria-label={`Bỏ chọn ${labelText}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </span>
              );
            })
          )}
        </div>

        {/* Arrow / Chevron */}
        <div className="text-gray-400 flex-shrink-0 ml-2">
          <ChevronDown
            className={["h-4 w-4 transition-transform duration-200", isOpen ? "rotate-180" : ""].join(" ")}
          />
        </div>
      </div>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div className="absolute top-[calc(100%+4px)] left-0 right-0 bg-white border border-gray-150 rounded-2xl shadow-xl z-50 flex flex-col max-h-60 animate-scale-in">
          {/* Search bar inside dropdown */}
          <div className="p-2 border-b border-gray-100 flex items-center gap-2">
            <span className="text-gray-400 pl-1.5">
              <Search className="w-3.5 h-3.5" />
            </span>
            <input
              type="text"
              placeholder="Tìm kiếm mục..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs outline-none bg-transparent py-1 text-gray-700"
            />
          </div>

          {/* Quick Select Buttons */}
          <div className="px-3 py-1.5 bg-gray-50 border-b border-gray-100 flex items-center justify-between text-[11px] font-semibold text-gray-500">
            <button type="button" onClick={handleSelectAll} className="hover:text-brand transition-colors">
              Chọn tất cả
            </button>
            <button type="button" onClick={handleClearAll} className="hover:text-red-500 transition-colors">
              Bỏ chọn tất cả
            </button>
          </div>

          {/* Options List */}
          <div className="overflow-y-auto flex-1 p-1">
            {filteredOptions.length === 0 ? (
              <div className="text-center py-4 text-xs text-gray-400">Không tìm thấy mục nào</div>
            ) : (
              filteredOptions.map((opt) => {
                const isObj = typeof opt === "object" && opt !== null;
                const val = isObj ? opt.value : opt;
                const lbl = isObj ? opt.label : opt;
                const isSelected = selected.includes(val);

                return (
                  <div
                    key={val}
                    onClick={() => handleSelectOption(val)}
                    className={[
                      "flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold cursor-pointer transition-colors",
                      isSelected
                        ? "bg-brand/5 text-brand"
                        : "text-gray-700 hover:bg-gray-50",
                    ].join(" ")}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      className="w-4 h-4 text-brand border-gray-300 rounded focus:ring-brand"
                    />
                    <span className="truncate">{lbl}</span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {error && (
        <p className="text-xs text-red-500 font-medium flex items-center gap-1 mt-0.5">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}
