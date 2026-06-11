import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavLinks from "./components/NavLinks";
import Button from "@/shared/components/ui/Button";
import useScrollSpy from "@/shared/hooks/useScrollSpy";

const SECTION_IDS = ["hero", "services", "gallery", "branches"];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS, 80);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Đóng mobile menu khi resize về desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-40 transition-all duration-300",
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent",
      ].join(" ")}
      role="banner"
    >
      <div className="container-custom">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2.5 group"
            aria-label="BarberPro - Trang chủ"
          >
            <div className="w-9 h-9 bg-gradient-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center shadow-md shadow-brand/30 group-hover:scale-105 transition-transform">
              <svg
                className="w-5 h-5 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M9.5 5.5C9.5 4.12 10.62 3 12 3s2.5 1.12 2.5 2.5c0 1.2-.84 2.2-2 2.44V9h2v2h-2v1.56c1.16.24 2 1.24 2 2.44 0 1.38-1.12 2.5-2.5 2.5S9.5 16.38 9.5 15c0-1.2.84-2.2 2-2.44V11h-2V9h2V7.94C10.34 7.7 9.5 6.7 9.5 5.5z" />
                <path d="M7 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h2V3zM17 3h2c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-2V3z" />
              </svg>
            </div>
            <span
              className={[
                "text-xl font-bold font-display transition-colors",
                isScrolled ? "text-gray-900" : "text-gray-900",
              ].join(" ")}
            >
              Barber<span className="text-brand">Pro</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-4">
            <NavLinks
              activeSection={activeSection}
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
            <Link to="/booking">
              <Button size="sm" variant="primary">
                Đặt lịch ngay
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-white border-t border-gray-100 shadow-lg animate-fade-in"
        >
          <div className="container-custom py-4 flex flex-col gap-2">
            <NavLinks
              activeSection={activeSection}
              onLinkClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="pt-2 border-t border-gray-100">
              <Link
                to="/booking"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button size="sm" variant="primary" className="w-full">
                  Đặt lịch ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
