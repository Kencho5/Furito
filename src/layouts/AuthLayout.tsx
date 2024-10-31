import AuthHeader from "../components/auth/AuthHeader";
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

function AuthLayout() {
  const navigation = useNavigation();

  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <div className="mx-6 mt-12 flex flex-col items-center gap-8 sm:mt-20">
          <img
            src="/BgPattern.svg"
            className="absolute -top-10 -z-10 h-full w-full object-cover"
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
