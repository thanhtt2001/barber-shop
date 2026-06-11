import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/index";
import ErrorBoundary from "@/shared/components/ErrorBoundary";
import ScrollToTop from "@/shared/components/ScrollToTop";

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter basename="/barber-shop">
        <ScrollToTop />
        <AppRouter />
      </BrowserRouter>
    </ErrorBoundary>
  );
}
