import Navbar from "../components/navbar/Navbar";
import { AuthProvider } from "../auth/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router-dom";
import { useNavigation } from "react-router-dom";
import TopBarProgress from "react-topbar-progress-indicator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Layout() {
  const navigation = useNavigation();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <img
          src="/BgPattern.svg"
          className="absolute inset-0 -z-10 h-screen w-screen object-cover"
        />
        <Navbar />
        {navigation.state == "loading" && <TopBarProgress />}
        <Outlet />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default Layout;
