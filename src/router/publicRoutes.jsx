import { lazy, Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "@/layout/Navbar/Navbar";
import Footer from "@/layout/Footer/Footer";
import Loader from "@/shared/components/Loader";

// Lazy load pages for code splitting
const HomePage = lazy(() => import("@/modules/public/home/index"));
const BookingPage = lazy(() => import("@/modules/public/booking/index"));
const GalleryPage = lazy(() => import("@/modules/public/gallery/index"));
const BranchesPage = lazy(() => import("@/modules/public/branches/index"));
const ServicesPage = lazy(() => import("@/modules/public/services/index"));
const ProductsPage = lazy(() => import("@/modules/public/products/index"));
const NewsPage = lazy(() => import("@/modules/public/news/index"));

export function PublicLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1">
        <Suspense fallback={<Loader fullScreen />}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

export const publicRoutes = [
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "services",
        element: (
          <main className="min-h-screen pt-20 pb-16">
            <ServicesPage />
          </main>
        ),
      },
      {
        path: "booking",
        element: <BookingPage />,
      },
      {
        path: "gallery",
        element: (
          <main className="min-h-screen pt-20 pb-16">
            <GalleryPage />
          </main>
        ),
      },
      {
        path: "branches",
        element: (
          <main className="min-h-screen pt-20 pb-16">
            <BranchesPage />
          </main>
        ),
      },
      {
        path: "products",
        element: (
          <main className="min-h-screen pt-20 pb-16">
            <ProductsPage />
          </main>
        ),
      },
      {
        path: "news",
        element: (
          <main className="min-h-screen pt-20 pb-16">
            <NewsPage />
          </main>
        ),
      },
    ],
  },
];
