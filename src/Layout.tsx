import Navbar from "./components/Navbar";
import Spinner from "./components/Spinner";
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
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default Layout;
