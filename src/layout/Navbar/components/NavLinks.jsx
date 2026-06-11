import { NavLink, useLocation } from "react-router-dom";

const links = [
  { to: "/", label: "Trang chủ", sectionId: "hero" },
  { to: "/services", label: "Dịch vụ", sectionId: "services" },
  { to: "/gallery", label: "Mẫu tóc", sectionId: "gallery" },
  { to: "/branches", label: "Cơ sở", sectionId: "branches" },
  { to: "/products", label: "Sản phẩm", sectionId: null },
  { to: "/news", label: "Tin tức", sectionId: null },
];

export default function NavLinks({ activeSection, onLinkClick }) {
  const location = useLocation();

  const handleLinkClick = (e, link) => {
    if (location.pathname === "/" && link.sectionId) {
      e.preventDefault();
      const element = document.getElementById(link.sectionId);
      if (element) {
        const headerOffset = window.innerWidth >= 768 ? 80 : 64;
        const elementPosition = element.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    }
    if (onLinkClick) {
      onLinkClick();
    }
  };

  return (
    <nav aria-label="Điều hướng chính">
      <ul className="flex items-center gap-1">
        {links.map((link) => {
          const isActive =
            location.pathname === "/"
              ? (link.sectionId ? activeSection === link.sectionId : false)
              : location.pathname === link.to;

          return (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={(e) => handleLinkClick(e, link)}
                className={[
                  "relative px-4 py-2.5 text-sm transition-all duration-200 block outline-none select-none",
                  "focus:outline-none focus-visible:outline-none focus:text-brand",
                  isActive
                    ? "text-brand font-semibold"
                    : "text-gray-600 hover:text-brand font-medium",
                ].join(" ")}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 inset-x-4 h-[2px] bg-brand rounded-full shadow-sm shadow-brand/20 animate-fade-in" />
                )}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
