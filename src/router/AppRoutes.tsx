import { Suspense, lazy, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";
// import ProtectedRoute from "../auth/AuthGuard";

import Home from "../pages/Home";
import Login from "../pages/Login";

// Lazy load components
const Register = lazy(() => import("../pages/Register"));
const NotFound = lazy(() => import("../pages/NotFound"));

const AppRoutes = () => {
  useEffect(() => {
    // Preload components
    import("../pages/Register");
    import("../pages/NotFound");
  }, []);

  return (
    <Suspense fallback={<TopBarProgress />}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
