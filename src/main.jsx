import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/globals.css";
import App from "./App.jsx";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element #root không tìm thấy trong DOM");
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
