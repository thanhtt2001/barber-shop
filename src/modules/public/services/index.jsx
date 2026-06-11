import { useState } from "react";
import ServiceCard from "./components/ServiceCard";
import PriceTable from "./components/PriceTable";
import { services } from "./data/services.data";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";

const TABS = [
  { id: "cards", label: "Xem thẻ dịch vụ" },
  { id: "table", label: "Bảng giá" },
];

export default function ServicesModule({ isSection = false }) {
  const [activeTab, setActiveTab] = useState("cards");
  useDocumentTitle(isSection ? null : "Dịch vụ");

  const Wrapper = isSection ? "section" : "main";

  return (
    <Wrapper
      id="services"
      className="section-padding bg-gray-50"
      aria-labelledby="services-heading"
    >
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 bg-brand/10 text-brand text-sm font-semibold rounded-full mb-4">
            Dịch vụ của chúng tôi
          </span>
          <h2
            id="services-heading"
            className="text-3xl md:text-4xl font-bold font-display text-gray-900 mb-4"
          >
            Trải nghiệm đẳng cấp{" "}
            <span className="text-gradient">barber chuyên nghiệp</span>
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto text-base">
            Từ cắt cơ bản đến tạo kiểu nâng cao — mỗi dịch vụ đều được thực hiện bởi thợ có tay nghề cao với dụng cụ hiện đại.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-white border border-gray-200 rounded-xl p-1 shadow-sm" role="tablist" aria-label="Chế độ xem dịch vụ">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`tabpanel-${tab.id}`}
                onClick={() => setActiveTab(tab.id)}
                className={[
                  "px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  activeTab === tab.id
                    ? "bg-brand text-white shadow-sm"
                    : "text-gray-500 hover:text-brand",
                ].join(" ")}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "cards" ? (
          <div
            id="tabpanel-cards"
            role="tabpanel"
            aria-labelledby="tab-cards"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        ) : (
          <div
            id="tabpanel-table"
            role="tabpanel"
            aria-labelledby="tab-table"
          >
            <PriceTable services={services} />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
