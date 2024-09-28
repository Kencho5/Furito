import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import "./i18n";
import { router } from "./router/Router";
import TopBarProgress from "react-topbar-progress-indicator";

TopBarProgress.config({
  barColors: {
    "0": "#fff",
    "1.0": "#fff",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
