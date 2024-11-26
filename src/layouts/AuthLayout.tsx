import AuthHeader from "../components/auth/AuthHeader";
import { AuthProvider } from "../auth/AuthContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { Outlet } from "react-router";
import { useNavigation } from "react-router";
import TopBarProgress from "react-topbar-progress-indicator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function AuthLayout() {
  const navigation = useNavigation();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="mx-4 mb-10 mt-12 flex min-h-screen select-none flex-col items-center gap-8 sm:mx-6 sm:mt-16">
          <img
            src="/BgPattern.svg"
            className="absolute inset-0 -z-10 h-screen w-screen object-cover"
          />
          <AuthHeader />
          {navigation.state == "loading" && <TopBarProgress />}
          <Outlet />
        </div>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default AuthLayout;
