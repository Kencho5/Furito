import Navbar from "./components/Navbar";
import { AuthProvider } from "./auth/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { Suspense } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Layout() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Navbar />
        <Outlet />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default Layout;
