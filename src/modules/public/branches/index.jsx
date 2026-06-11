import BranchCard from "./components/BranchCard";
import { branches } from "./data/branches.data";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

export default function BranchesModule({ isSection = false }) {
  useDocumentTitle(isSection ? null : "Hệ thống cơ sở");

  const Wrapper = isSection ? "section" : "main";

  return (
    <Wrapper
      id="branches"
      className="section-padding bg-gray-50"
      aria-labelledby="branches-heading"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-3">
            Hệ thống cơ sở
          </span>
          <h2
            id="branches-heading"
            className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4"
          >
            3 cơ sở tại{" "}
            <span className="text-gradient">Hưng Yên</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Chúng tôi có mặt ở 3 địa điểm thuận tiện tại Hưng Yên — luôn ở gần bạn để phục vụ tốt nhất.
          </p>
        </div>

        {/* Branch Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {branches.map((branch) => (
            <BranchCard key={branch.id} branch={branch} />
          ))}
        </div>

        {/* Contact Banner */}
        <div className="mt-12 bg-gradient-to-r from-brand-dark to-brand rounded-2xl p-6 md:p-8 text-white text-center">
          <h3 className="text-xl font-bold font-display mb-2">
            Cần tư vấn chọn cơ sở?
          </h3>
          <p className="text-sky-100 text-sm mb-4">
            Gọi ngay hotline để được hỗ trợ chọn cơ sở và khung giờ phù hợp nhất.
          </p>
          <a
            href="tel:0901234567"
            className="inline-flex items-center gap-2 bg-white text-brand font-bold px-6 py-3 rounded-xl hover:bg-brand-light transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            0901 234 567
          </a>
        </div>
      </div>
    </Wrapper>
  );
}
