import { lazy } from "react";
import { Navigate } from "react-router-dom";
import ProtectedRoute from "@/modules/admin/layout/ProtectedRoute";
import AdminLayout from "@/modules/admin/layout/AdminLayout";

// Lazy load admin pages for code splitting
const LoginPage = lazy(() => import("@/modules/admin/auth/index"));
const DashboardPage = lazy(() => import("@/modules/admin/dashboard/index"));
const BookingsPage = lazy(() => import("@/modules/admin/bookings/index"));
const GalleryPage = lazy(() => import("@/modules/admin/gallery/index"));
const ServicesPage = lazy(() => import("@/modules/admin/services/index"));
const BranchesPage = lazy(() => import("@/modules/admin/branches/index"));
const ProductsPage = lazy(() => import("@/modules/admin/products/index"));
const EventsPage = lazy(() => import("@/modules/admin/events/index"));
const NewsAdminPage = lazy(() => import("@/modules/admin/news/index"));
const RevenuePage = lazy(() => import("@/modules/admin/revenue/index"));

export const adminRoutes = [
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "bookings",
        element: <BookingsPage />,
      },
      {
        path: "revenue",
        element: <RevenuePage />,
      },
      {
        path: "gallery",
        element: <GalleryPage />,
      },
      {
        path: "services",
        element: <ServicesPage />,
      },
      {
        path: "branches",
        element: <BranchesPage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "events",
        element: <EventsPage />,
      },
      {
        path: "news",
        element: <NewsAdminPage />,
      },
    ],
  },
];
