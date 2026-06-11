import { Link } from "react-router-dom";

const footerLinks = [
  {
    heading: "Điều hướng",
    links: [
      { label: "Trang chủ", to: "/" },
      { label: "Dịch vụ", to: "/services" },
      { label: "Mẫu tóc", to: "/gallery" },
      { label: "Cơ sở", to: "/branches" },
      { label: "Sản phẩm", to: "/products" },
      { label: "Đặt lịch", to: "/booking" },
    ],
  },
  {
    heading: "Dịch vụ",
    links: [
      { label: "Cắt cơ bản", to: "/booking" },
      { label: "Cắt + Uốn/Duỗi", to: "/booking" },
      { label: "Nhuộm màu", to: "/booking" },
      { label: "Cạo râu", to: "/booking" },
      { label: "Combo VIP", to: "/booking" },
    ],
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    label: "Zalo",
    href: "https://zalo.me/0866892060",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 16.293c-.21.583-1.197 1.077-1.853 1.147-.502.053-.997.074-5.023-2.064C6.553 13.11 4.68 9.453 4.527 9.253c-.153-.2-1.247-1.66-1.247-3.167 0-1.507.787-2.24 1.067-2.547.28-.307.613-.383.813-.383.2 0 .4.001.573.01.184.008.433-.07.678.517.253.607.86 2.1.933 2.253.073.153.12.333.013.533-.107.2-.16.327-.313.5-.154.173-.323.387-.463.52-.153.147-.313.307-.134.6.18.293.8 1.32 1.713 2.14 1.18 1.053 2.173 1.38 2.467 1.533.293.153.46.127.633-.08.173-.207.74-.86.94-1.153.2-.293.4-.247.673-.147.273.1 1.733.82 2.033.967.3.147.5.22.573.34.073.12.073.693-.137 1.283z"/>
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300" role="contentinfo">
      {/* Main Footer */}
      <div className="container-custom py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-brand to-brand-dark rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M9.5 5.5C9.5 4.12 10.62 3 12 3s2.5 1.12 2.5 2.5c0 1.2-.84 2.2-2 2.44V9h2v2h-2v1.56c1.16.24 2 1.24 2 2.44 0 1.38-1.12 2.5-2.5 2.5S9.5 16.38 9.5 15c0-1.2.84-2.2 2-2.44V11h-2V9h2V7.94C10.34 7.7 9.5 6.7 9.5 5.5z" />
                  <path d="M7 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h2V3zM17 3h2c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-2V3z" />
                </svg>
              </div>
              <span className="text-xl font-bold font-display text-white">
                Barber<span className="text-brand">Pro</span>
              </span>
            </Link>

            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-sm">
              Chuỗi barber shop chuyên nghiệp hàng đầu tại Hưng Yên. Nơi mỗi kiểu tóc là một tác phẩm nghệ thuật, mỗi khách hàng là một người bạn.
            </p>

            {/* Contact */}
            <div className="space-y-2 text-sm">
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:0901234567" className="hover:text-brand transition-colors">0901 234 567</a>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 text-brand flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Hưng Yên, Việt Nam</span>
              </p>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`BarberPro trên ${social.label}`}
                  className="w-9 h-9 bg-gray-800 hover:bg-brand rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {footerLinks.map((group) => (
            <div key={group.heading}>
              <h3 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
                {group.heading}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-sm text-gray-400 hover:text-brand transition-colors duration-150 inline-flex items-center gap-1.5 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-gray-600 group-hover:bg-brand transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {currentYear} BarberPro. Tất cả quyền được bảo lưu.</p>
          <p className="text-center sm:text-right">
            Website này được thực hiện bởi <span className="text-gray-400 font-semibold">Trần Tiến Thành</span> (Zalo: <a href="https://zalo.me/0866892060" target="_blank" rel="noopener noreferrer" className="hover:text-brand font-semibold text-gray-300 transition-colors">0866892060</a>)
          </p>
        </div>
      </div>
    </footer>
  );
}
