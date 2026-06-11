import { lazy, Suspense } from "react";
import HeroSection from "./components/HeroSection";
import StatsBar from "./components/StatsBar";
import PromoBanner from "./components/PromoBanner";
import useDocumentTitle from "@/shared/hooks/useDocumentTitle";
import Loader from "@/shared/components/Loader";

// Lazy load heavy modules
const ServicesModule = lazy(() => import("@/modules/public/services/index"));
const GalleryModule = lazy(() => import("@/modules/public/gallery/index"));
const BranchesModule = lazy(() => import("@/modules/public/branches/index"));

export default function HomePage() {
  useDocumentTitle("Trang chủ");

  return (
    <main id="main-content">
      <HeroSection />
      <StatsBar />
      <PromoBanner />

      <Suspense fallback={<Loader className="py-12" />}>
        <ServicesModule isSection />
      </Suspense>

      <Suspense fallback={<Loader className="py-12" />}>
        <GalleryModule isSection />
      </Suspense>

      <Suspense fallback={<Loader className="py-12" />}>
        <BranchesModule isSection />
      </Suspense>
    </main>
  );
}
